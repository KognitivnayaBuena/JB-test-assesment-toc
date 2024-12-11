import React from 'react';
import styles from './Loader.module.css';

const LOADER_BLOCKS_ARRAY: string[] = [
  "0px",
  "0px 24px 0px 16px",
  "0px 0px 0px 16px",
  "0px 24px 0px 16px",
  "0px 0px 0px 32px",
  "0px 24px 0px 32px",
  "0px 0px 0px 32px",
  "0px 24px 0px 32px",
  "0px",
  "0px",
];

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer} data-testid="loader">
      {LOADER_BLOCKS_ARRAY.map((marginValue, index) => (
        <div key={index} className={styles.loaderLine} style={{margin: marginValue}}></div>
      ))}
    </div>
  );
};

export default Loader;
