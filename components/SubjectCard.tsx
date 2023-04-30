import styles from "../styles/Home.module.css";

const SubjectCard = ({ elem }) => {
  return (
    <a href={`/subjects/${elem._id}`} className={styles.collegeCard}>
      <div>
        <h3>
          {elem.name}
          <br />
          <span>{elem?.abbreviation?.join(", ")}</span>
        </h3>
      </div>
    </a>
  );
};

export default SubjectCard;
