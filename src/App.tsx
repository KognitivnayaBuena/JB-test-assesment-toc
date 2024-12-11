import React from 'react';

import TableOfContent from './components/TableOfContent';
// import { TOCData } from './components/TableOfContent/types';
// import useFetch from './hooks/useFetch';

import demoData from "../serverData/TOCData.json";

const App: React.FC = () => {
  // const [data, loading, error] = useFetch<TOCData>('http://localhost:3000/serverData/TOCData.json');

  return (
    <TableOfContent data={demoData} loading={false} error={null} />
  );
};

export default App;
