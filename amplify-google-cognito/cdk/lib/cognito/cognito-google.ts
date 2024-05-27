import { Construct } from "constructs";
import * as awsCognito from "aws-cdk-lib/aws-cognito";
import {
  IdentityPool,
  UserPoolAuthenticationProvider,
} from "@aws-cdk/aws-cognito-identitypool-alpha";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";

type CDKContext = {
  appName: string;
  auth: {
    google: {
      clientSecret: string;
      clientId: string;
      callbackUrls: string[];
      logoutUrls: string[];
    };
    userpoolDomainPrefix: string;
  };
};

const context: CDKContext = {
  appName: "google-auth-example",
  auth: {
    google: {
      clientSecret: "GoogleClientSecret",
      clientId:
        "1064067913814-v7jqnfcjvsiob3kmki8g04bhq0mdhbrd.apps.googleusercontent.com",
      //local frontend callbacks
      callbackUrls: ["http://localhost:3000/"],
      logoutUrls: ["http://localhost:3000/"],
    },
    userpoolDomainPrefix: "google-auth-domain",
  },
};

export function createGoogleAuth(scope: Construct) {
  // create a bare bones user pool since users with auth via google
  const userPool = new awsCognito.UserPool(
    scope,
    `${context.appName}-google-pool`,
    {
      userPoolName: `${context.appName}-google-pool`,
    }
  );

  // Define a user pool domain that will be used to host the sign in page (google needs this url)
  const userPoolDomain = new awsCognito.UserPoolDomain(
    scope,
    `${context.appName}-google-pool-domain`,
    {
      userPool,

      cognitoDomain: {
        domainPrefix: context.auth.userpoolDomainPrefix, // Specify a unique domain prefix
      },
    }
  );

  // create a google identity provider.
  // when users sign up with google, they will be added to the userpool
  const googleSecretValue = Secret.fromSecretNameV2(
    scope,
    `${context.appName}-google-secret`,
    context.auth.google.clientSecret
  );

  const googleProvider = new awsCognito.UserPoolIdentityProviderGoogle(
    scope,
    `${context.appName}-google-provider`,
    {
      clientId: context.auth.google.clientId,
      clientSecretValue: googleSecretValue.secretValue, // Replace with your Google Client Secret
      scopes: ["openid", "profile", "email"],
      attributeMapping: {
        email: awsCognito.ProviderAttribute.GOOGLE_EMAIL,
        givenName: awsCognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
        familyName: awsCognito.ProviderAttribute.GOOGLE_FAMILY_NAME,
        phoneNumber: awsCognito.ProviderAttribute.GOOGLE_PHONE_NUMBERS,
      },
      userPool,
    }
  );

  // a user pool client to allow us to do this on the frontend
  const userPoolClient = new awsCognito.UserPoolClient(
    scope,
    `${context.appName}-google-pool-client`,
    {
      userPool,

      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        // Replace with your actual callback URL
        callbackUrls: context.auth.google.callbackUrls,
        // Replace with your actual logout URL
        logoutUrls: context.auth.google.logoutUrls,
      },
    }
  );

  //This is needed to make sure that the google provider is created before we add it to the userpool
  userPoolClient.node.addDependency(googleProvider);

  // Add our google identity provider to the user pool
  userPool.registerIdentityProvider(googleProvider);

  // Create an identity pool so that authenticated users are authorized to make calls
  //* 🗒️ You typically want to keep this in a separate file since other resources may need the .authenticatedRole and .unauthenticatedRole it returns
  const identityPool = new IdentityPool(
    scope,
    `${context.appName}-identityPool`,
    {
      identityPoolName: `${context.appName}-identityPool`,
      allowUnauthenticatedIdentities: true,
      authenticationProviders: {
        userPools: [
          new UserPoolAuthenticationProvider({
            userPool: userPool,
            userPoolClient: userPoolClient,
          }),
        ],
      },
    }
  );

  return { userPoolDomain, userPool, identityPool, userPoolClient };
}
