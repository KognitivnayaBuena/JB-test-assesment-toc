import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  errorMessage: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
    return (
      <div data-testid="error-message" className={styles.errorMessage}>
        Error: {errorMessage || 'An unexpected error occurred. Please try again.'}
      </div>
  );
};

export default ErrorMessage;
