"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { config } from "../../amplifyConfig";
import ProtectedPage from "@/app/protected/page";

Amplify.configure(config);
export default function AuthProvider() {
  return (
    <Authenticator socialProviders={["google"]}>
      {({ signOut, user }) => <ProtectedPage signOut={signOut} />}
    </Authenticator>
  );
}
