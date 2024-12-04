import { useEffect, useState } from 'react';
import './App.module.css'

function App() {
  const [data, setData] = useState(null);
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

  console.log("data", data);
  return (
    <>
      test
    </>
  )
}

export default App
