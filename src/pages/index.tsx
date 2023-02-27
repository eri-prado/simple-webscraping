// import styles from '@/styles/Home.module.css';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
// // import puppeteer from 'puppeteer'
// import { load } from 'cheerio'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getDownloads()
  }, [])

  const getDownloads = () => {
    axios
      .get('/api/scrapping')
      .then((response) => {
        console.log(response)
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h1>React</h1>
        {data.downloads ? <h3>Este pacote tem {data.downloads} downloads no npm.</h3> : ''}
      </div>
  );
}
