import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { DEFAULT_ADMIN_GROUP } from "@/app/amplify-cognito-config";

export default function useAuthUser() {
  const [user, setUser] = useState<Record<string, any>>();

  useEffect(() => {
    async function getUser() {
      const session = await fetchAuthSession();
      if (!session.tokens) {
        return;
      }
      const user = {
        ...(await getCurrentUser()),
        ...(await fetchUserAttributes()),
        isAdmin: false,
      };
      const groups = session.tokens.accessToken.payload["cognito:groups"];
      // @ts-ignore
      user.isAdmin = Boolean(groups && groups.includes(DEFAULT_ADMIN_GROUP));
      setUser(user);
    }

    getUser();
  }, []);

  return user;
}
