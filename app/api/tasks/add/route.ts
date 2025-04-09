// app/api/tasks/add/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, userId } = body;

  const task = await prisma.task.create({
    data: {
      title,
      userId,
    },
  });

  return NextResponse.json(task);
}
