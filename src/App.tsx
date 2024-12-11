import React from 'react';

import TableOfContent from './components/TableOfContent';
import { TOCData } from './components/TableOfContent/types';
import useFetch from './hooks/useFetch';

const App: React.FC = () => {
  const [data, loading, error] = useFetch<TOCData>('http://localhost:3000/serverData/TOCData.json');

  return (
    <TableOfContent data={data} loading={loading} error={error} />
  );
};

export default App;
