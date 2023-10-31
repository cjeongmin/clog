import Navbar from "./components/navbar";
import styles from "./styles/page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <div></div>
      </main>
    </div>
  );
}
