import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const tasks = await Task.find({ userId: session.user.id }).sort({
    createdAt: -1,
  });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log("SESSION USER:", session.user);

    const { title, description, status } = await req.json();

    const newTask = await Task.create({
      title,
      description,
      status: status || "pending",
      userId: session.user.id,
    });

    console.log("TASK CREATED:", newTask);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("TASK CREATE ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
