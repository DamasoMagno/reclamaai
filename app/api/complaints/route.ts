import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";
// import { client } from "../../lib/open-api";
import z from "zod";

const complaintSchema = z.object({
  text: z.string().min(10),
  location: z.string().min(5),
  category: z.string().min(3),
});

export async function POST(req: Request) {
  const body = await complaintSchema.parseAsync(await req.json());

  // const completion = await client.chat.completions.create({
  //   model: "gpt-4.1-mini",
  //   messages: [
  //     {
  //       role: "system",
  //       content: "Classifique o texto em categoria, intenção e gravidade.",
  //     },
  //     {
  //       role: "user",
  //       content: body.text,
  //     },
  //   ],
  //   response_format: { type: "json_object" },
  // });

  await prisma.complaint.create({
    data: {
      text: body.text,
      location: body.location,
      category: body.category,
    },
  });

  return NextResponse.json({
    message: "Hello from complaints route!",
    data: body,
  });
}

export async function GET() {
  const response = await prisma.complaint.findMany();
  return NextResponse.json(response);
}
