"use client";

import { Amplify, type ResourcesConfig } from "aws-amplify";

const DEFAULT_APP_CLIENT_ID = "7vm1k8f8hd4pepnrhngnanbnen";
const DEFAULT_POOL_ID = "us-east-1_kiKf2LBdd";
export const DEFAULT_ADMIN_GROUP = "Admins";

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: String(process.env.USER_POOL_ID || DEFAULT_POOL_ID),
    userPoolClientId: String(
      process.env.APP_CLIENT_ID || DEFAULT_APP_CLIENT_ID
    ),
  },
};

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
