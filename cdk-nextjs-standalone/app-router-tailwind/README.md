# Template for app-router nextjs project, with tailwind

- Created with `npx create-next-app@latest`
- All assets must be put into `public/static` for proper Cloudfront redirects
- Utilize [cdk-nextjs](https://github.com/jetbridge/cdk-nextjs)
- Construct for [cdk-nextjs-standalone](https://constructs.dev/packages/cdk-nextjs-standalone)
- Application must be built into [standalone mode](https://nextjs.org/docs/pages/api-reference/next-config-js/output):

```
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
};
```

## Deployment Steps

```
npm install
cdk bootstrap
cdk synth
cdk deploy
```

## The deployment will also have a <baseUrl>/api route

- View in Local: http://localhost:3000/api
- View in Cloudfront: https:<CloudfrontURL>/api
