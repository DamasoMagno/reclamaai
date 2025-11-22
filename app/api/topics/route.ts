import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await prisma.topic.findMany();
  return NextResponse.json(response);
}
