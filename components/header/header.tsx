import Link from 'next/link';
import React from 'react';
import styles from './header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
                Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/statistics" className={styles.navLink}>
                Statistics
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/faq" className={styles.navLink}>
                FAQ
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" className={styles.navLink}>
                About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;