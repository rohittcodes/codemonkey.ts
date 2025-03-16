import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Problem } from "@/zod-schema/problems";
import { Difficulty } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const validationResult = Problem.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.format() },
        { status: 400 },
      );
    }

    const { title, description, difficulty, tags, template, tests } =
      validationResult.data;

    const problem = await prisma.problem.create({
      data: {
        title,
        description,
        difficulty: difficulty.toUpperCase() as Difficulty,
        tags,
        template,
        author: {
          connect: { id: session.user.id },
        },
        slug: title.toLowerCase().replace(/ /g, "-"),
        testCases: {
          create: tests.map((test) => ({
            input: test.input,
            output: test.output,
          })),
        },
      },
    });

    return NextResponse.json(
      { success: true, problemId: problem.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating problem:", error);
    return NextResponse.json(
      { error: "Failed to create problem" },
      { status: 500 },
    );
  }
}
