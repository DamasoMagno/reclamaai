import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

const topicSchema = z.object({
  type: z.enum(["up", "down"]),
});

export async function POST(
  req: Request,
  { params }: { params: { topicId: string[] } }
) {
  const topicId = params.topicId;
  const body = await topicSchema.parseAsync(await req.json());

  return NextResponse.json({
    message: "Hello from complaints route!",
    data: body,
  });
}
