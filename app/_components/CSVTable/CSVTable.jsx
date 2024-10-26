'use client'
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import styles from "../../page.module.css"
import styles_table from "./CSVTable.css"

const CSVTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load the CSV file from the public folder
    fetch('/direct_dummy_purchase_data.csv')
      .then(response => response.text())
      .then(csvText => {
        // Parse the CSV data
        const parsedData = Papa.parse(csvText, { header: true });
        setData(parsedData.data); // Store the parsed data in state
      });
  }, []);

  return (
    <div className="px-8 overflow-x-auto max-w-full">
      {/* <h1></h1> */}
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
        <tr className="bg-gray-200">
            {/* Display column headers dynamically */}
            {data.length > 0 && Object.keys(data[0]).map((key, index) => (
              <th className=" border px-6 py-3 text-left text-gray-600" key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr className="border-b" key={rowIndex}>
              {/* Display row data dynamically */}
              {Object.values(row).map((value, colIndex) => (
                <td className="px-4 py-2" key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default CSVTable;