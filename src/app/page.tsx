import Navbar from "./components/navbar";
import styles from "./styles/page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Navbar />
      </nav>
    </main>
  );
}
