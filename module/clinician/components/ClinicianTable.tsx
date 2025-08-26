"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Download, Clock, CheckCircle2, XCircle } from "lucide-react";

type Submission = {
  id: number;
  student: string;
  date: string;
  hours: number;
  status: "Pending" | "Approved" | "Rejected";
  fileName?: string;
  fileUrl?: string;
  createdAt: string;
};

export default function ClinicianTable() {
  // --- initial dummy data ---
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 1,
      student: "A.B.",
      date: "20-Aug-2025",
      hours: 2,
      status: "Pending",
      fileName: "report1.pdf",
      fileUrl: "/demo.pdf",
      createdAt: "20-Aug-2025, 10:15 AM",
    },
    {
      id: 2,
      student: "C.D.",
      date: "21-Aug-2025",
      hours: 4,
      status: "Approved",
      fileName: "report2.pdf",
      fileUrl: "/demo.pdf",
      createdAt: "21-Aug-2025, 2:45 PM",
    },
    {
      id: 3,
      student: "E.F.",
      date: "22-Aug-2025",
      hours: 3,
      status: "Rejected",
      fileName: "report3.pdf",
      fileUrl: "/demo.pdf",
      createdAt: "22-Aug-2025, 9:30 AM",
    },
    {
      id: 4,
      student: "G.H.",
      date: "23-Aug-2025",
      hours: 5,
      status: "Pending",
      fileName: "report4.pdf",
      fileUrl: "/demo.pdf",
      createdAt: "23-Aug-2025, 4:00 PM",
    },
  ]);

  const [student, setStudent] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hours, setHours] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // control Dialog open state
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    const newSubmission: Submission = {
      id: submissions.length + 1,
      student,
      date: format(date, "dd-MMM-yyyy"),
      hours: Number(hours),
      status: "Pending",
      fileName: file ? file.name : undefined,
      fileUrl: file ? URL.createObjectURL(file) : undefined,
      createdAt: new Date().toLocaleString(),
    };

    setSubmissions([...submissions, newSubmission]);

    // reset form
    setStudent("");
    setDate(undefined);
    setHours("");
    setFile(null);

    // close dialog after submission
    setIsOpen(false);
  };

  const getStatusBadge = (status: Submission["status"]) => {
    switch (status) {
      case "Pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-700 flex items-center gap-1">
            <Clock size={14} /> Pending
          </Badge>
        );
      case "Approved":
        return (
          <Badge className="bg-green-500/20 text-green-700 flex items-center gap-1">
            <CheckCircle2 size={14} /> Approved
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-red-500/20 text-red-700 flex items-center gap-1">
            <XCircle size={14} /> Rejected
          </Badge>
        );
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Submission Table</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)}>+ New Submission</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Evaluation Submission</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Student Initials</Label>
                <Input
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Number of Hours</Label>
                <Input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Upload Document</Label>
                <Input type="file" onChange={handleFileChange} required />
                {file && (
                  <p className="text-sm mt-1 text-gray-500">
                    Selected: {file.name}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
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
              <TableCell className="font-medium">{s.id}</TableCell>
              <TableCell>{s.student}</TableCell>
              <TableCell>{s.date}</TableCell>
              <TableCell>{s.hours}</TableCell>
              <TableCell>{getStatusBadge(s.status)}</TableCell>
              <TableCell>
                {s.fileUrl ? (
                  <a
                    href={s.fileUrl}
                    download={s.fileName}
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <Download size={16} /> {s.fileName}
                  </a>
                ) : (
                  "—"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
