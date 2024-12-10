import React from 'react';
import styles from './Placeholder.module.css';

const Placeholder: React.FC = () => {
  return (
    <div className={styles.placeholder}>
      <p>Loading Table of Contents...</p>
    </div>
  );
};

export default Placeholder;