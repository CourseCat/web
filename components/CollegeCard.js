import Image from "next/image";
import Link from "next/link";
import styles from "./CollegeCard.module.css";

const CollegeCard = ({ elem }) => {
  return (
    <a href={`/schools/${elem._id}`} className={styles.cardContainer}>
      <Image src={elem.logoUrl} alt={elem.name} width={125} height={200} />
      <div>
        <h3>{elem.name}</h3>
        <h4>{elem.address}</h4>
        <div className={styles.subjects}>
          {elem?.subjects?.map((subject, index) => {
            return (
              <Link
                key={index}
                href={`/schools/${elem._id}/subjects/${subject._id}`}
              >
                {subject.name}
              </Link>
            );
          })}
        </div>
        <Link href={elem.website} target="_blank" rel="noreferrer">
          Visit Website
        </Link>
      </div>
    </a>
  );
};

export default CollegeCard;
