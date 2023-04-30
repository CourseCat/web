import { Box, Card } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./CollegeCard.module.css";

const CollegeCard = ({ college }) => {
  const router = useRouter();

  const onClickHandler = () => {
    router.push(`/schools/${college._id}`);
  };

  return (
    <Card onClick={onClickHandler} className={styles.cardContainer}>
      <Image
        src={college.logoUrl}
        alt={college.name}
        width={125}
        height={200}
      />
      <Box>
        <h3>{college.name}</h3>
        <h4>{college.address}</h4>
        <div className={styles.subjects}>
          {college?.subjects?.map((subject, index) => {
            return (
              <Link
                key={index}
                href={`/schools/${college._id}/subjects/${subject._id}`}
              >
                {subject.name}
              </Link>
            );
          })}
        </div>
        <Link href={college.website} target="_blank" rel="noreferrer">
          Visit Website
        </Link>
      </Box>
    </Card>
  );
};

export default CollegeCard;
