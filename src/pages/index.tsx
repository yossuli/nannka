import styles from './index.module.css';

const Home = () => {
  return (
    // <div className={styles.container}>
    <div className={styles.separate}>
      <div className={styles.main}>
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
      <div className={styles.main}>
        <div className={styles.base3}>
          <div className={styles.one2} />
          <div className={styles.two2} />
          <div className={styles.four2} />
          <div className={styles.base4}>
            <div className={styles.five2} />
            <div className={styles.parent}>
              <div className={styles.six3} />
            </div>
            <div className={styles.seven4} />
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Home;
