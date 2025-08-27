import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

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