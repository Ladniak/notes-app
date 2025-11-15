import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Task from "@/models/Task";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const userId = session.user.id;
    const tasks = await Task.find({ userId });

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "done").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const pending = tasks.filter((t) => t.status === "pending").length;

    return NextResponse.json({
      total,
      completed,
      inProgress,
      pending,
    });
  } catch (e) {
    return NextResponse.json(
      { message: "Server error", error: e },
      { status: 500 }
    );
  }
}
