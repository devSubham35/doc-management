import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// GET single submission
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }   // 👈 params is a Promise
) {
  const { id } = await context.params;           // 👈 must await
  const submission = await prisma.submission.findUnique({
    where: { id },
  });

  if (!submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  return NextResponse.json(submission, { status: 200 });
}

// UPDATE (approve / reject with notes)
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;         // 👈 await here
    const body = await req.json();
    const { role, action, notes } = body;

    let status = "PENDING";
    let updateData: Record<string, unknown> = {};

    if (role === "SUPERVISOR") {
      status = action === "APPROVE" ? "SUPERVISOR_APPROVED" : "SUPERVISOR_REJECTED";
      updateData = { status, supervisorNotes: notes };
    } else if (role === "PARTNER") {
      status = action === "APPROVE" ? "PARTNER_APPROVED" : "PARTNER_REJECTED";
      updateData = { status, partnerNotes: notes };
    } else if (role === "PAYROLL") {
      status = action === "APPROVE" ? "PAYROLL_APPROVED" : "PAYROLL_REJECTED";
      updateData = { status, payrollNotes: notes };
    }

    const updated = await prisma.submission.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
