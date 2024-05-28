import { authenticatedUser } from "@/utils/amplify-server-utils";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const isProtected = request.nextUrl.pathname.startsWith("/protected");

  if (isProtected) {
    if (!user) return NextResponse.redirect(new URL("/", request.nextUrl));
    return response;
  } else if (user) {
    return NextResponse.redirect(new URL("/protected", request.nextUrl));
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
