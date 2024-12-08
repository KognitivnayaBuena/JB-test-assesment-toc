import { useEffect, useState } from 'react';

import { FocusProvider } from './context/FocusContext';

import Accordion from './componets/Accordion';
import { TOCData } from './componets/types';

import './App.module.css'

function App() {
  const [data, setData] = useState<TOCData | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/serverData/TOCData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load JSON data");
        }
        return response.json();
      })
      .then((jsonData) => setData(jsonData))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <FocusProvider>
      {data && <Accordion data={data} />}
    </FocusProvider>
  )
}

export default App
