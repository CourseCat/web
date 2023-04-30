import Link from "next/link";
import styles from "./CourseCard.module.css";

const CourseCard = ({ elem }) => {
  return (
    <Link href={`/courses/${elem._id}`} className={styles.cardContainer}>
      <h3>
        <span>{elem.courseNumber}</span>
        <br /> {elem.name}
      </h3>
      <h4 className={styles.description}>{elem.description}</h4>
      <p className={styles.subject}>
        <span>Subject : </span>
        {elem?.subject?.name}
      </p>
      <p className={styles.college}>
        <span>College : </span>
        <Link href={`/schools/${elem?.school?._id}`}>{elem?.school.name}</Link>
      </p>
    </Link>
  );
};

export default CourseCard;
