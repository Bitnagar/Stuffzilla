import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  let event = await req.body.json();
  return NextResponse.json({ status: 200 });
}
