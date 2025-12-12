"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  submissionId: number;
  role: "SUPERVISOR" | "PARTNER" | "PAYROLL";
  onActionDone: () => void;
};

export default function SubmissionActions({ submissionId, role, onActionDone }: Props) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<"APPROVE" | "REJECT" | null>(null);

  const handleSubmit = async () => {
    if (!action) return;
    setLoading(true);

    const res = await fetch("/api/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: submissionId, role, action, notes }),
    });
    
    setLoading(false);
    if (res.ok) {
      setOpen(false);
      setNotes("");
      onActionDone();
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => { setAction("APPROVE"); setOpen(true); }}>
          Approve
        </Button>
        <Button size="sm" variant="destructive" onClick={() => { setAction("REJECT"); setOpen(true); }}>
          Reject
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === "APPROVE" ? "Approve Submission" : "Reject Submission"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Notes</Label>
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Enter notes..." />
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
