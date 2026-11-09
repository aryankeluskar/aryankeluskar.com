import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect("https://dub.sh/aryans-resume", { status: 308 });
}
