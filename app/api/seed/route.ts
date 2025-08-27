import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { Role, SubmissionStatus } from "prisma/client";

export const GET = async () => {
  try {
    // Clear existing data in correct order
    await prisma.approvalHistory.deleteMany();
    await prisma.submission.deleteMany();
    await prisma.user.deleteMany();

    // Create 4 users - one per role
    await prisma.user.createMany({
      data: [
        { name: "Dr. Smith", email: "smith@example.com", password: "hashed123", role: Role.CLINICIAN },
        { name: "John Supervisor", email: "supervisor@example.com", password: "hashed123", role: Role.SUPERVISOR },
        { name: "Mary Partner", email: "partner@example.com", password: "hashed123", role: Role.PARTNER },
        { name: "Paul Payroll", email: "payroll@example.com", password: "hashed123", role: Role.PAYROLL },
      ],
    });

    const clinician = await prisma.user.findFirst({ where: { role: Role.CLINICIAN } });

    // Create 10 submissions with correct schema fields
    const submissionsData = [
      {
        clinicianId: clinician!.id,
        studentInitials: "J.D.",
        workDate: new Date("2025-08-25"),
        evaluationType: "Speech Assessment",
        hours: 3,
        reportUrl: "/reports/jd-speech.pdf",
        status: SubmissionStatus.PENDING,
      },
      {
        clinicianId: clinician!.id,
        studentInitials: "A.B.",
        workDate: new Date("2025-08-20"),
        evaluationType: "Language Screening",
        hours: 2,
        reportUrl: "/reports/ab-lang.pdf",
        status: SubmissionStatus.SUPERVISOR_APPROVED,
        supervisorNotes: "Looks good.",
      },
      {
        clinicianId: clinician!.id,
        studentInitials: "C.D.",
        workDate: new Date("2025-08-18"),
        evaluationType: "Speech Therapy Session",
        hours: 1,
        reportUrl: "/reports/cd-session.pdf",
        status: SubmissionStatus.SUPERVISOR_REJECTED,
        supervisorNotes: "Missing parent signature.",
      },
      {
        clinicianId: clinician!.id,
        studentInitials: "E.F.",
        workDate: new Date("2025-08-15"),
        evaluationType: "Articulation Test",
        hours: 2,
        reportUrl: "/reports/ef-articulation.pdf",
        status: SubmissionStatus.PARTNER_APPROVED,
        supervisorNotes: "All set.",
        partnerNotes: "Attendance confirmed.",
      },
      {
        clinicianId: clinician!.id,
        studentInitials: "G.H.",
        workDate: new Date("2025-08-12"),
        evaluationType: "Comprehensive Assessment",
        hours: 4,
        reportUrl: "/reports/gh-comprehensive.pdf",
        status: SubmissionStatus.PARTNER_REJECTED,
        supervisorNotes: "Thorough report.",
        partnerNotes: "Hours mismatch with attendance.",
      },
      {
        clinicianId: clinician!.id,
        studentInitials: "I.J.",
        workDate: new Date("2025-08-10"),
        evaluationType: "Language Assessment",
        hours: 3,
        reportUrl: "/reports/ij-language.pdf",
        status: SubmissionStatus.PAYROLL_APPROVED,
        supervisorNotes: "Reviewed okay.",
        partnerNotes: "Approved.",
        payrollNotes: "Payment processed.",
      },
      {
        clinicianId: clinician!.id,
        studentInitials: "K.L.",
        workDate: new Date("2025-08-08"),
        evaluationType: "Therapy Follow-up",
        hours: 2,
        reportUrl: "/reports/kl-followup.pdf",
        status: SubmissionStatus.PAYROLL_REJECTED,
        supervisorNotes: "Fine.",
        partnerNotes: "Attendance confirmed.",
        payrollNotes: "Hours inconsistency.",
      },
      {
        clinicianId: clinician!.id,
        studentInitials: "M.N.",
        workDate: new Date("2025-08-05"),
        evaluationType: "Speech Session",
        hours: 1,
        reportUrl: "/reports/mn-session.pdf",
        status: SubmissionStatus.COMPLETED,
        supervisorNotes: "Reviewed.",
        partnerNotes: "Approved.",
        payrollNotes: "Paid.",
        isCompleted: true,
      },
      {
        clinicianId: clinician!.id,
        studentInitials: "O.P.",
        workDate: new Date("2025-08-03"),
        evaluationType: "Fluency Test",
        hours: 2,
        reportUrl: "/reports/op-fluency.pdf",
        status: SubmissionStatus.SUPERVISOR_APPROVED,
        supervisorNotes: "Good work.",
      },
      {
        clinicianId: clinician!.id,
        studentInitials: "Q.R.",
        workDate: new Date("2025-08-01"),
        evaluationType: "Speech Therapy Session",
        hours: 3,
        reportUrl: "/reports/qr-session.pdf",
        status: SubmissionStatus.PENDING,
      },
    ];

    await prisma.submission.createMany({ data: submissionsData });

    // Return summary counts
    const counts = {
      users: await prisma.user.count(),
      submissions: await prisma.submission.count(),
      byStatus: {
        pending: await prisma.submission.count({ where: { status: SubmissionStatus.PENDING } }),
        supervisorApproved: await prisma.submission.count({ where: { status: SubmissionStatus.SUPERVISOR_APPROVED } }),
        supervisorRejected: await prisma.submission.count({ where: { status: SubmissionStatus.SUPERVISOR_REJECTED } }),
        partnerApproved: await prisma.submission.count({ where: { status: SubmissionStatus.PARTNER_APPROVED } }),
        partnerRejected: await prisma.submission.count({ where: { status: SubmissionStatus.PARTNER_REJECTED } }),
        payrollApproved: await prisma.submission.count({ where: { status: SubmissionStatus.PAYROLL_APPROVED } }),
        payrollRejected: await prisma.submission.count({ where: { status: SubmissionStatus.PAYROLL_REJECTED } }),
        completed: await prisma.submission.count({ where: { status: SubmissionStatus.COMPLETED } }),
      }
    };

    return NextResponse.json({ 
      message: "Seeding complete ✅", 
      counts 
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: "Seeding failed ❌" }, { status: 500 });
  }
};
