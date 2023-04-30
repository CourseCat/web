import styles from "../styles/Home.module.css";

const CollegeCard = ({ elem }) => {
  return (
    <a href={`/schools/${elem._id}`} className={styles.collegeCard}>
      <img src={elem.logoUrl} alt={elem.name} />
      <div>
        <h3>{elem.name}</h3>
        <h4>{elem.address}</h4>
        <div className={styles.subjects}>
          {elem?.subjects?.map((subject, index) => {
            return (
              <a
                key={index}
                href={`/schools/${elem._id}/subjects/${subject._id}`}
              >
                {subject.name}
              </a>
            );
          })}
        </div>
        <a href={elem.website} target="_blank" rel="noreferrer">
          Visit Website
        </a>
      </div>
    </a>
  );
};

export default CollegeCard;
