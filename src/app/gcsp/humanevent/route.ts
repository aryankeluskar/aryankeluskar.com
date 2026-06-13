import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const htmlPromise = readFile(path.join(process.cwd(), "src/app/gcsp/humanevent.html"), "utf-8");

export async function GET() {
  try {
    const htmlContent = await htmlPromise;
    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
