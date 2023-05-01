import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./CourseCard.module.css";

const CourseCard = ({ course }) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/courses/${course._id}`);
  };

  return (
    <Card onClick={handleOnClick} className={styles.cardContainer}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          {course.courseNumber}
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          {course.name}
        </Typography>
        <Typography variant="body1" className={styles.description} gutterBottom>
          {course.description}
        </Typography>
        <Typography variant="body2" className={styles.subject} gutterBottom>
          <span>Subject : </span>
          {course?.subject?.name}
        </Typography>
        <Typography variant="body2" className={styles.college} gutterBottom>
          <span>College : </span>
          <Link href={`/schools/${course?.school?._id}`}>
            {course?.school.name}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
