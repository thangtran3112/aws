import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import {
  AccountRecovery,
  CfnUserPoolGroup,
  UserPool,
  UserPoolClient,
  VerificationEmailStyle,
} from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const userPool = new UserPool(this, `${id}-userpool`, {
      userPoolName: `${id}-userpool`,
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

    const cfnUserPoolGroup = new CfnUserPoolGroup(this, `${id}-admins-group`, {
      userPoolId: userPool.userPoolId,

      // the properties below are optional
      description: "Admins Group for Admins permissions",
      groupName: "Admins",
      // roleArn: "roleArn",
    });

    const userPoolClient = new UserPoolClient(this, `${id}-userpoolClient`, {
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

    new CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
    });
    new CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });
  }
}
