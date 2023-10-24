import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  let event = await req.body.json();
  console.log(event);
  return NextResponse.json({ status: 200 });
}
