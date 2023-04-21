import { useEffect, useState } from 'react';
import Colleges from '../components/Colleges';
import styles from '../styles/Home.module.css';

const Home = () => {
    const [query, setQuery] = useState("");

    return (
        <section className={styles.home}>
            <img src="/logo.png" alt="coursecat logo" />
            <h1>CourseCat</h1>
            <div className={styles.searchWrap}>
                <input type="text" placeholder="Search for a college..." value={query} onChange={(e) => setQuery(e.target.value)} />
                <img src="/search.svg" alt="search icon" />
            </div>
            <Colleges query={query} />
        </section>
    )
}

export default Home;