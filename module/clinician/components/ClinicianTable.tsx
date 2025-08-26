"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Submission = {
  id: number;
  student: string;
  date: string;
  hours: number;
  status: string;
  fileName?: string;
  fileUrl?: string;
};

export default function ClinicianTable() {
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 1,
      student: "J.D.",
      date: "25-Aug-2025",
      hours: 3,
      status: "Pending",
      fileName: "demo.pdf",
      fileUrl: "/demo.pdf", // static file in /public
    },
  ]);

  const [student, setStudent] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSubmission: Submission = {
      id: submissions.length + 1,
      student,
      date,
      hours: Number(hours),
      status: "Pending",
      fileName: file ? file.name : undefined,
      fileUrl: file ? URL.createObjectURL(file) : undefined,
    };

    setSubmissions([...submissions, newSubmission]);

    // reset form
    setStudent("");
    setDate("");
    setHours("");
    setFile(null);
  };

  return (
    <>
      {/* Add Submission Button + Form */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">+ New Submission</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Evaluation Submission</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Student Initials</Label>
              <Input value={student} onChange={(e) => setStudent(e.target.value)} required />
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
              <Label>Number of Hours</Label>
              <Input type="number" value={hours} onChange={(e) => setHours(e.target.value)} required />
            </div>
            <div>
              <Label>Upload Document</Label>
              <Input type="file" onChange={handleFileChange} required />
              {file && <p className="text-sm mt-1 text-gray-500">Selected: {file.name}</p>}
            </div>
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Submissions Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>File</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.id}</TableCell>
              <TableCell>{s.student}</TableCell>
              <TableCell>{s.date}</TableCell>
              <TableCell>{s.hours}</TableCell>
              <TableCell>{s.status}</TableCell>
              <TableCell>
                {s.fileUrl ? (
                  <a
                    href={s.fileUrl}
                    download={s.fileName}
                    className="text-blue-600 hover:underline"
                  >
                    Download
                  </a>
                ) : (
                  "—"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
