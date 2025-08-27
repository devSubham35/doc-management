import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAGE_PATHS } from "@/lib/routes/PageRoutes";

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center max-w-2xl">
        {/* Title */}
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold text-gray-900">
          Streamlined Clinician <br /> Submission & Review
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-[17px] md:text-lg text-gray-600">
          A unified platform for clinicians, supervisors, school partners, and payroll 
          to manage evaluation submissions, approvals, and processing seamlessly.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link href={PAGE_PATHS.clinician.dashboard.root}>
            <Button size="lg" className="rounded-full text-base">
              Get Started <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
