import styles from './BloodDivider.module.css';

function BloodDivider() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bloodGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8a2323" />
            <stop offset="100%" stopColor="#4a1010" />
          </linearGradient>
        </defs>
        <path
          d="M0,0 L1440,0 L1440,18
             C1400,18 1390,55 1370,55
             C1350,55 1345,25 1330,25
             C1310,25 1305,70 1285,70
             C1265,70 1260,20 1240,20
             C1200,20 1195,45 1160,45
             C1120,45 1115,30 1080,30
             C1040,30 1035,60 1000,60
             C960,60 955,15 920,15
             C880,15 875,40 840,40
             C800,40 795,25 760,25
             C720,25 715,50 680,50
             C640,50 635,20 600,20
             C560,20 555,35 520,35
             C480,35 475,60 440,60
             C400,60 395,18 360,18
             C320,18 315,45 280,45
             C240,45 235,25 200,25
             C160,25 155,55 120,55
             C80,55 75,15 40,15
             C20,15 10,18 0,18 Z"
          fill="url(#bloodGradient)"
        />
      </svg>
    </div>
  );
}

export default BloodDivider;