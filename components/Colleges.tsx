import { useEffect, useState } from "react";
import collegesJson from "../data/colleges.json";
import styles from "../styles/Home.module.css";

const Colleges = ({ query }) => {
  //console.log(query);
  const [filteredColleges, setFilteredColleges] = useState([]);

  useEffect(() => {
    if (query === "") {
      setFilteredColleges([]);
      return;
    }
    setFilteredColleges(
      collegesJson.data.filter((college) => {
        return college.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, [query, filteredColleges]);

  return (
    <div className={styles.colleges}>
      {filteredColleges.map((college, index) => {
        return (
          <div className={styles.collegeCard} key={index}>
            <img src={college.image} alt={college.name} />
            <div>
              <h3>{college.name}</h3>
              <h4>{college.address}</h4>
              <p>{college.subjects.join(", ")}</p>
              <a href={college.website} target="_blank" rel="noreferrer">
                Visit Website
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Colleges;
