import { useRouter } from "next/router";

function SubjectDetails() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Subject Details: {id}</h1>
      <p>Here you can display information about the selected subject.</p>
    </div>
  );
}

export default SubjectDetails;
