// Auth is handled client-side via localStorage mock in this prototype.
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Auth is mocked client-side." }, { status: 404 });
}
export async function POST() {
  return NextResponse.json({ message: "Auth is mocked client-side." }, { status: 404 });
}
