import { useRouter } from "next/router";

function CourseDetails() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Course Details: {id}</h1>
      <p>Here you can display information about the selected course.</p>
    </div>
  );
}

export default CourseDetails;
