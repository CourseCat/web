import { useEffect, useState } from "react";
import styles from "./CardList.module.css";

const List = ({ query, items, container }) => {
  const [filtered, setFiltered] = useState([]);
  const Card = container;
  useEffect(() => {
    if (query === "") {
      setFiltered([]);
      return;
    }
    setFiltered(
      items.filter((elem) => {
        return elem.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, [query, items]);

  return (
    <div className={styles.items}>
      {filtered.map((elem, index) => {
        return <Card key={index} elem={elem} />;
      })}
    </div>
  );
};

export default List;
