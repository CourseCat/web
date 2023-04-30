import styles from "../styles/Home.module.css";

const CourseCard = ({ elem }) => {
  return (
    <a href={`/courses/${elem._id}`} className={styles.collegeCard}>
      <div>
        <h3>
          {elem.name}
          <br />
          <span>{elem.courseNumber}</span>
        </h3>
        <h4 className={styles.description}>{elem.description}</h4>
        <p className={styles.subject}>
          <span>Subject : </span>
          {elem?.subject?.name}
        </p>
      </div>
    </a>
  );
};

export default CourseCard;
