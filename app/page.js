"use client"
import Image from "next/image";
import styles from "./page.module.css";
import DownloadCsv from "./_components/DownloadCsv/DownloadCsv";
import { formatDate } from "./_libs/dataProcessing";
import FileUpload from "./_components/FileUpload/FileUpload";
import NavBar from "./_components/NavBar/NavBar"
import { useState } from "react";

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
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
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {/* Adjusted main section with flex-grow */}
      <main className={`${styles.main} flex-grow flex flex-col justify-center items-center`}>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Classify Your Expenses
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Upload a PDF of your expenses. We'll help you classify and organize them.
        </p>
        <div className="w-full max-w-sm space-y-2">
          <FileUpload />
        </div>
        {/*
        <DownloadCsv
          data={data}
          fileName="expenses"
          appendTimestamp={true}
          csvMapping={null}
        /> */}
      </main>

      {/* Footer with mt-auto to push it to the bottom */}
      <footer className="bg-white rounded-lg shadow mt-auto dark:bg-gray-800 w-full">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 <a href="#" className="hover:underline">Expense Classifier</a>. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Terms of Service</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>

          </ul>
        </div>
      </footer>
    </div>
  );
}
