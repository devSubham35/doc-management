import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PATCH(req: NextRequest, context: any) {

  const { id } = context?.params;

  try {
    const { role, action, notes } = await req.json();

    let status = "PENDING";
    const updateData: Record<string, unknown> = {};

    if (role === "SUPERVISOR") {
      status = action === "APPROVE" ? "SUPERVISOR_APPROVED" : "SUPERVISOR_REJECTED";
      updateData.supervisorNotes = notes;
    } else if (role === "PARTNER") {
      status = action === "APPROVE" ? "PARTNER_APPROVED" : "PARTNER_REJECTED";
      updateData.partnerNotes = notes;
    } else if (role === "PAYROLL") {
      status = action === "APPROVE" ? "PAYROLL_APPROVED" : "PAYROLL_REJECTED";
      updateData.payrollNotes = notes;
    }

    updateData.status = status;

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
