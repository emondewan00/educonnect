import EnrolledCourseCard from "../_components/EnrolledCourseCard";

function EnrolledCourses() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <EnrolledCourseCard />
    </div>
  );
}

export default EnrolledCourses;