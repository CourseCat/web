import { useEffect, useState } from "react";
import styles from "./List.module.css";

const List = ({ query, array, box }) => {
  const [filtered, setFiltered] = useState([]);
  const Card = box;
  useEffect(() => {
    if (query === "") {
      setFiltered([]);
      return;
    }
    setFiltered(
      array.filter((elem) => {
        return elem.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, [query, array]);

  return (
    <div className={styles.colleges}>
      {filtered.map((elem, index) => {
        return <Card key={index} elem={elem} />;
      })}
    </div>
  );
};

export default List;
