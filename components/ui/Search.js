import Image from "next/image";
import styles from "./Search.module.css";

function Search({ query, mode, onChange }) {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder={`Search for ${mode}..`}
        value={query}
        onChange={onChange}
        className={styles.input}
      />
      <Image
        src="/images/search.svg"
        alt="Search Icon"
        width={25}
        height={25}
      />
    </div>
  );
}

export default Search;
