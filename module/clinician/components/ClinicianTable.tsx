"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Clock, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";
import SubmissionActions from "@/components/SubmissionActions";
import { useAuthStore } from "@/stores/useAuthStore";
import SubmissionForm from "@/components/SubmissionForm"; // ✅ import

type Submission = {
  id: number;
  studentInitials: string;
  workDate: string;
  evaluationType: string;
  hours: number;
  status: string;
  reportUrl?: string;
  createdAt: string;
};

export default function SubmissionTable() {
  const { user } = useAuthStore();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch("/api/submissions")
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-700 flex items-center gap-1">
            <Clock size={14} /> Pending
          </Badge>
        );
      case "SUPERVISOR_APPROVED":
      case "PARTNER_APPROVED":
      case "PAYROLL_APPROVED":
      case "COMPLETED":
        return (
          <Badge className="bg-green-500/20 text-green-700 flex items-center gap-1">
            <CheckCircle2 size={14} /> {status.replace("_", " ")}
          </Badge>
        );
      case "SUPERVISOR_REJECTED":
      case "PARTNER_REJECTED":
      case "PAYROLL_REJECTED":
        return (
          <Badge className="bg-red-500/20 text-red-700 flex items-center gap-1">
            <XCircle size={14} /> {status.replace("_", " ")}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* ✅ Clinician-only add button */}
      {user?.role === "CLINICIAN" && (
        <SubmissionForm onAdd={() => fetchData()} />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Evaluation</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>File</TableHead>
              {user?.role !== "CLINICIAN" && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.studentInitials}</TableCell>
                <TableCell>{format(new Date(s.workDate), "dd-MMM-yyyy")}</TableCell>
                <TableCell>{s.evaluationType}</TableCell>
                <TableCell>{s.hours}</TableCell>
                <TableCell>{getStatusBadge(s.status)}</TableCell>
                <TableCell>
                  {s.reportUrl ? (
                    <a
                      href={s.reportUrl}
                      download
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <Download size={16} /> Report
                    </a>
                  ) : "—"}
                </TableCell>
                {user?.role !== "CLINICIAN" && (
                  <TableCell>
                    <SubmissionActions
                      submissionId={s.id}
                      role={user?.role as "SUPERVISOR" | "PARTNER" | "PAYROLL"}
                      onActionDone={fetchData}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
