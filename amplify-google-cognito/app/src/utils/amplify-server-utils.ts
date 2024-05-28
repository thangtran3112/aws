import { NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
import { config } from "../../amplifyConfig";

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        if (!session.tokens) {
          return;
        }
        const user = {
          ...(await getCurrentUser(contextSpec)),
          isAdmin: false,
        };
        // const groups = session.tokens.accessToken.payload["cognito:groups"];
        // // @ts-ignore
        // user.isAdmin = Boolean(groups && groups.includes(DEFAULT_ADMIN_GROUP));

        return user;
      } catch (error) {
        console.log(error);
      }
    },
  });
}
