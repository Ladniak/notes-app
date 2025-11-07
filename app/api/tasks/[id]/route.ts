import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { title, description, status } = await req.json();

  const updatedTask = await Task.findOneAndUpdate(
    { _id: params.id, userId: session.user.id },
    { title, description, status },
    { new: true }
  );

  if (!updatedTask)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(updatedTask);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();
  await Task.findOneAndDelete({ _id: params.id, userId: session.user.id });

  return NextResponse.json({ message: "Deleted" });
}
