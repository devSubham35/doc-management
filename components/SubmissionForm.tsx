"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import { useAuthStore } from "@/stores/useAuthStore";

type Props = {
  onAdd: (submission: unknown) => void;
};

export default function SubmissionForm({ onAdd }: Props) {

    const { user } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false);

  const [student, setStudent] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hours, setHours] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [evaluationType, setEvaluationType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    setLoading(true);
    const body = {
      clinicianId: user?.id, // TODO: replace with auth user
      studentInitials: student,
      workDate: date.toISOString(),
      evaluationType,
      hours: Number(hours),
      reportUrl: file ? `/uploads/${file.name}` : undefined,
    };

    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      const newSubmission = await res.json();
      onAdd(newSubmission);
      setIsOpen(false);

      // reset
      setStudent("");
      setDate(undefined);
      setHours("");
      setFile(null);
      setEvaluationType("");
    }
  };

  return (
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
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label>Evaluation Type</Label>
            <Input
              value={evaluationType}
              onChange={(e) => setEvaluationType(e.target.value)}
              required
            />
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
            <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            {file && <p className="text-sm mt-1 text-gray-500">Selected: {file.name}</p>}
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
