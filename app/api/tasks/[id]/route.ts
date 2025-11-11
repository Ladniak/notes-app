import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();
    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { title, description, status, priority, dueDate } = await req.json();

  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, userId: session.user.id },
    { title, description, status, priority, dueDate },
    { new: true }
  );

  if (!updatedTask)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json(updatedTask);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();
  await Task.findOneAndDelete({ _id: id, userId: session.user.id });

  return NextResponse.json({ message: "Deleted" });
}
