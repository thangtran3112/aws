import { CfnOutput, Duration } from "aws-cdk-lib";
import {
  AccountRecovery,
  CfnUserPoolGroup,
  UserPool,
  UserPoolClient,
  VerificationEmailStyle,
} from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export function createSimpleCognitoPool(scope: Construct, id: string) {
  const userPool = new UserPool(scope, `${id}-simple-userpool`, {
    userPoolName: `${id}-simple-userpool`,
    selfSignUpEnabled: true,
    accountRecovery: AccountRecovery.EMAIL_ONLY,
    userVerification: {
      emailStyle: VerificationEmailStyle.CODE,
    },
    autoVerify: {
      email: true,
    },
    standardAttributes: {
      email: {
        required: true,
        mutable: true,
      },
    },
  });

  const userPoolGroup = new CfnUserPoolGroup(scope, `${id}-simple-admins`, {
    userPoolId: userPool.userPoolId,

    // the properties below are optional
    description: "Admins Group for Admins permissions",
    groupName: "Admins",
    // roleArn: "roleArn",
  });

  const userPoolClient = new UserPoolClient(scope, `${id}-simple-pool-client`, {
    userPool,
    //by default allowing ALLOW_REFRESH_TOKEN_AUTH, ALLOW_USER_SRP_AUTH, and ALLOW_CUSTOM_AUTH
    // authFlows: {
    //   userSrp: true,
    //   userPassword: true,
    //   custom: true,
    // },
    authSessionValidity: Duration.minutes(5),
    preventUserExistenceErrors: true,
    accessTokenValidity: Duration.minutes(60),
    idTokenValidity: Duration.minutes(60),
    refreshTokenValidity: Duration.days(30),
  });

  return { userPool, userPoolGroup, userPoolClient };
}
