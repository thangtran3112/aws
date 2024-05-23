import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  console.log(request);
  const res = await fetch(
    `https://api.frankfurter.app/latest?amount=1000&from=USD&to=CAD`
  );
  const data = await res.json();
  return NextResponse.json({ status: 200, hello: "world", data });
}
