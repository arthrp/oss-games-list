import React from 'react';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <p>© {currentYear} Open-source game list</p>
    </footer>
  );
};

export default Footer; 