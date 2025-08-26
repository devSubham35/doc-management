import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const ClinicianOverview = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Submissions */}
            <Card className="shadow-none rounded-2xl">
                <CardHeader>
                    <CardTitle>Total Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">12</p>
                    <p className="text-sm text-gray-500">Across all students</p>
                </CardContent>
            </Card>

            {/* Pending Reviews */}
            <Card className="shadow-none rounded-2xl">
                <CardHeader>
                    <CardTitle>Pending Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">5</p>
                    <p className="text-sm text-gray-500">Awaiting supervisor approval</p>
                </CardContent>
            </Card>

            {/* Approved Submissions */}
            <Card className="shadow-none rounded-2xl">
                <CardHeader>
                    <CardTitle>Approved</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">6</p>
                    <p className="text-sm text-gray-500">Ready for payroll</p>
                </CardContent>
            </Card>

            {/* Hours Logged */}
            <Card className="shadow-none rounded-2xl">
                <CardHeader>
                    <CardTitle>Total Hours</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">28</p>
                    <p className="text-sm text-gray-500">Across all submissions</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default ClinicianOverview
