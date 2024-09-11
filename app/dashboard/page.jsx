import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice";
import { getCourseByInstructor } from "@/queries/courses";
import { getUserById } from "@/queries/users";
import { redirect } from "next/navigation";
formatPrice;

const DashboardPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const instructor = await getUserById(session.user.id);
  if (instructor?.role !== "instructor") {
    redirect("/login");
  }

  const coursesStatus = await getCourseByInstructor(instructor._id);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* total courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coursesStatus.courses}</div>
          </CardContent>
        </Card>
        {/* total enrollments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {coursesStatus.totalEnrollments}
            </div>
          </CardContent>
        </Card>
        {/* total revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(coursesStatus.totalRevenue)}
            </div>
          </CardContent>
        </Card>
      </div>
      {/*  */}
    </div>
  );
};

export default DashboardPage;