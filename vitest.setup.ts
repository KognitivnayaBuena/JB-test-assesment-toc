import '@testing-library/jest-dom';

// Fixing Error: Not implemented: window.scrollTo thrown from jsdom
global.scrollTo = () => {}