import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const jsonwebtoken = require("jsonwebtoken");

function genToken(userId: string) {
  const nowSecs = Math.round(new Date().valueOf() / 1000);

  return jsonwebtoken.sign(
    {
      iss: process.env.ROLLOUT_PROJECT_KEY, // Find at https://dashboard.rollout.com/
      sub: userId,
      iat: nowSecs,
      exp: nowSecs + 60 * 10,
    },
    process.env.ROLLOUT_CLIENT_SECRET, // From the previous step
    { algorithm: "HS512" }
  );
}

// Assumes you'll pass it the userId as a query param
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const token = genToken(userId as string);

  return NextResponse.json({ token });
}
