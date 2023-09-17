import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.base}>
        <div className={styles.one} />
        <div className={styles.two} />
        <div className={styles.four} />
        <div className={styles.base2}>
          <div className={styles.five} />
          <div className={styles.six} />
          <div className={styles.seven} />
        </div>
      </div>
    </div>
  );
};

export default Home;
