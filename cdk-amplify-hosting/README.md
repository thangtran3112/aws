# This solution utilize [Amplify Hosting CDN compute](https://docs.aws.amazon.com/amplify/latest/userguide/update-app-nextjs-version.html):

- This solution simplifies the need for setting up NextJS running on AWS Lambda or Lambda@Edge
- However, for this solution, we cannot specify the performance of `WEB_COMPUTE` that Amplify is using

## References:

- [Amplify Hosting Fullstack CDK](https://github.com/focusOtter/fullstack-nextjs-cdk-starter)
- [Google Auth NextJs Cognito](https://github.com/focusOtter/fullstack-google-auth-flow-cdk/blob/main/backend/lib/cognito/auth.ts)
- [cognito-at-edge-federated-ui](https://github.com/awslabs/cognito-at-edge) or [cloudfront-authorization-at-edge](https://github.com/aws-samples/cloudfront-authorization-at-edge)

## Alternatives:

- Alternative 1: Using [cdk-nextjs](https://github.com/jetbridge/cdk-nextjs/blob/2d9c5a34ada73c97ff00f0dcacc365f892429c96/API.md) or `SST` to deploy to Lambda@Edge. If cognito is needed, a userPool canbe used directly inside Next Server Lambda to authenticate request through `middleware.ts`
- Alternative 2: Using [Lambda Web Adapter](https://github.com/awslabs/aws-lambda-web-adapter) with dockered Lambda, through `aws-lambda-nextjs` or `trpc-ssr-prisma-lambda` solutions.

## Installations:
