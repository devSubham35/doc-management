import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET all submissions (for Clinician table)
export async function GET() {
  const submissions = await prisma.submission.findMany({
    include: { clinician: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(submissions);
}


// ✅ POST new submission
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newSubmission = await prisma.submission.create({
      data: {
        clinicianId: body.clinicianId, // should come from auth session later
        studentInitials: body.studentInitials,
        workDate: new Date(body.workDate),
        evaluationType: body.evaluationType,
        hours: body.hours,
        reportUrl: body.reportUrl,
        status: "PENDING", // default when clinician submits
      },
    });

    return NextResponse.json(newSubmission, { status: 201 });
  } catch (err) {
    console.error("Error creating submission", err);
    return NextResponse.json({ error: "Failed to create submission" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, role, action, notes } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing submission id" }, { status: 400 });
    }

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
