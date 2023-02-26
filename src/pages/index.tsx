import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('/api/scrapping')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {data.map((item: any, index: number) => (
        <div key={index}>{item.title}</div>
      ))}
    </div>
  );
}
