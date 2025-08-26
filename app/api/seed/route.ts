import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { Prisma, Role, SubmissionStatus } from "prisma/client";

export const GET = async () => {
  try {
    await prisma.submission.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.createMany({
      data: [
        { name: "Dr. Smith", email: "smith@example.com", password: "hashed123", role: Role.CLINICIAN },
        { name: "Dr. Adams", email: "adams@example.com", password: "hashed123", role: Role.CLINICIAN },
        { name: "John Supervisor", email: "supervisor@example.com", password: "hashed123", role: Role.SUPERVISOR },
        { name: "Mary Partner", email: "partner@example.com", password: "hashed123", role: Role.SCHOOL_PARTNER },
        { name: "Paul Payroll", email: "payroll@example.com", password: "hashed123", role: Role.PAYROLL },
      ],
    });

    const clinicians = await prisma.user.findMany({ where: { role: Role.CLINICIAN } });

    const submissionsData: Prisma.SubmissionCreateManyInput[] = [
      {
        clinicianId: clinicians[0].id,
        studentInitials: "J.D.",
        date: new Date("2025-08-25"),
        evaluationType: "Speech Assessment",
        hours: 3,
        reportUrl: "/reports/jd-speech.pdf",
        status: SubmissionStatus.PENDING, // 👈 enum not string
      },
      {
        clinicianId: clinicians[0].id,
        studentInitials: "A.B.",
        date: new Date("2025-08-20"),
        evaluationType: "Language Screening",
        hours: 2,
        reportUrl: "/reports/ab-lang.pdf",
        status: SubmissionStatus.SUPERVISOR_APPROVED,
        supervisorNotes: "Looks good.",
      },
      {
        clinicianId: clinicians[1].id,
        studentInitials: "C.D.",
        date: new Date("2025-08-18"),
        evaluationType: "Speech Therapy Session",
        hours: 1,
        reportUrl: "/reports/cd-session.pdf",
        status: SubmissionStatus.SUPERVISOR_REJECTED,
        supervisorNotes: "Missing parent signature.",
      },
      {
        clinicianId: clinicians[1].id,
        studentInitials: "E.F.",
        date: new Date("2025-08-15"),
        evaluationType: "Articulation Test",
        hours: 2,
        reportUrl: "/reports/ef-articulation.pdf",
        status: SubmissionStatus.PARTNER_APPROVED,
        supervisorNotes: "All set.",
        partnerNotes: "Attendance confirmed.",
      },
      {
        clinicianId: clinicians[0].id,
        studentInitials: "G.H.",
        date: new Date("2025-08-12"),
        evaluationType: "Comprehensive Assessment",
        hours: 4,
        reportUrl: "/reports/gh-comprehensive.pdf",
        status: SubmissionStatus.PARTNER_REJECTED,
        supervisorNotes: "Thorough report.",
        partnerNotes: "Hours mismatch with attendance.",
      },
      {
        clinicianId: clinicians[1].id,
        studentInitials: "I.J.",
        date: new Date("2025-08-10"),
        evaluationType: "Language Assessment",
        hours: 3,
        reportUrl: "/reports/ij-language.pdf",
        status: SubmissionStatus.PAYROLL_APPROVED,
        supervisorNotes: "Reviewed okay.",
        partnerNotes: "Approved.",
        payrollNotes: "Payment processed.",
      },
      {
        clinicianId: clinicians[0].id,
        studentInitials: "K.L.",
        date: new Date("2025-08-08"),
        evaluationType: "Therapy Follow-up",
        hours: 2,
        reportUrl: "/reports/kl-followup.pdf",
        status: SubmissionStatus.PAYROLL_REJECTED,
        supervisorNotes: "Fine.",
        partnerNotes: "Attendance confirmed.",
        payrollNotes: "Hours inconsistency.",
      },
      {
        clinicianId: clinicians[1].id,
        studentInitials: "M.N.",
        date: new Date("2025-08-05"),
        evaluationType: "Speech Session",
        hours: 1,
        reportUrl: "/reports/mn-session.pdf",
        status: SubmissionStatus.COMPLETED,
        supervisorNotes: "Reviewed.",
        partnerNotes: "Approved.",
        payrollNotes: "Paid.",
      },
      {
        clinicianId: clinicians[0].id,
        studentInitials: "O.P.",
        date: new Date("2025-08-03"),
        evaluationType: "Fluency Test",
        hours: 2,
        reportUrl: "/reports/op-fluency.pdf",
        status: SubmissionStatus.SUPERVISOR_APPROVED,
        supervisorNotes: "Good work.",
      },
      {
        clinicianId: clinicians[1].id,
        studentInitials: "Q.R.",
        date: new Date("2025-08-01"),
        evaluationType: "Speech Therapy Session",
        hours: 3,
        reportUrl: "/reports/qr-session.pdf",
        status: SubmissionStatus.PENDING,
      },
    ];

    await prisma.submission.createMany({ data: submissionsData });

    return NextResponse.json({ message: "Seeding complete ✅" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Seeding failed ❌" }, { status: 500 });
  }
};
