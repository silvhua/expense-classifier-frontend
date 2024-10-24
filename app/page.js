"use client"
import Image from "next/image";
import styles from "./page.module.css";
import DownloadCsv from "./_components/DownloadCsv/DownloadCsv";
import { formatDate } from "./_libs/dataProcessing";

export default function Home() {

  const data = [
    {
      'date': formatDate(new Date(), 'readable timestamp'),
      'amount': 100,
      'description': 'Lunch'
    },
    {
      'date': formatDate(new Date(), 'readable timestamp'),
      'amount': 200,
      'description': 'Dinner'
    }
  ]
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        Hello, world!
        <DownloadCsv
          data={data}
          fileName='expenses'
          appendTimestamp={true}
          csvMapping={null}
        />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
