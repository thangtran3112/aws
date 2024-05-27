import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { createSimpleCognitoPool } from "./cognito/cognito-simple";
import { createGoogleAuth } from "./cognito/cognito-google";

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const simpleAuth = createSimpleCognitoPool(this, id);

    const googleAuth = createGoogleAuth(this);

    new CfnOutput(this, "SimpleUserPoolId", {
      value: simpleAuth.userPool.userPoolId,
    });
    new CfnOutput(this, "SimpleUserPoolClientId", {
      value: simpleAuth.userPoolClient.userPoolClientId,
    });

    new CfnOutput(this, "Region", {
      value: this.region!,
    });

    new CfnOutput(this, "GoogleUserPoolDomainUrl", {
      value: `https://${googleAuth.userPoolDomain.domainName}.auth.${this.region}.amazoncognito.com`,
    });
    new CfnOutput(this, "AuthorizedRedirectUserPoolDomainURL", {
      value: `https://${googleAuth.userPoolDomain.domainName}.auth.${this.region}.amazoncognito.com/oauth2/idpresponse`,
    });

    new CfnOutput(this, "GooleUserPoolId", {
      value: googleAuth.userPool.userPoolId,
    });
    new CfnOutput(this, "GoogleUserPoolWebClient", {
      value: googleAuth.userPoolClient.userPoolClientId,
    });
    new CfnOutput(this, "GoogleIdentityPoolId", {
      value: googleAuth.identityPool.identityPoolId,
    });
  }
}
