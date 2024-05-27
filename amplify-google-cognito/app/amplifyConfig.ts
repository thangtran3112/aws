import { ResourcesConfig } from "aws-amplify";

export const config: ResourcesConfig = {
  Auth: {
    Cognito: {
      identityPoolId: "us-east-1:60e4c9b5-b8ef-44b7-a0fd-9bbac95adb15",
      // region: "us-east-1",
      userPoolId: "us-east-1_UmunWuSHQ",
      userPoolClientId: "3v1ll0857ch9qqpil1t6m6056f",
      loginWith: {
        oauth: {
          domain: "google-auth-domain.auth.us-east-1.amazoncognito.com",
          scopes: [
            "phone",
            "email",
            "profile",
            "openid",
            "aws.cognito.signin.user.admin",
          ],
          redirectSignIn: ["http://localhost:3000/"],
          redirectSignOut: ["http://localhost:3000/"],
          responseType: "code",
        },
      },
    },
  },
};
