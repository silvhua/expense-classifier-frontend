'use client'
import React, { useState, useEffect } from 'react';


const CSVTable = (props) => {
  // const [data, setData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { data } = props;
  console.log("props", props)


  useEffect(() => {
    // Simulating JSON data instead of fetching from files
    // const exampleData = [
    //   {
    //     "supplier_name": "Browns Socialhouse Queen Elizabeth Theatre (QE Theatre)",
    //     "total_amount": "6.18",
    //     "receipt_date": "2024-08-14",
    //     "line_items": "4 DIET COKE 4.75, SERVICE CHARGE 0.86, S. Bev Tax 0.33",
    //     "supplier_address": "675 Cambie St Vancouver, BC V6B 2P1 Canada",
    //     "category": "meals and entertainment"
    //   },
    //   {
    //     "supplier_name": "Starbucks Coffee",
    //     "total_amount": "12.50",
    //     "receipt_date": "2024-08-12",
    //     "line_items": "2 LATTE 5.75, SERVICE CHARGE 1.00",
    //     "supplier_address": "700 W Georgia St Vancouver, BC V7Y 1G5 Canada",
    //     "category": "meals and entertainment"
    //   }
    //   ,
    //   {
    //     "supplier_name": "McDonald's",
    //     "total_amount": "9.99",
    //     "receipt_date": "2024-08-10",
    //     "line_items": "1 Big Mac 6.50, Fries 2.49, Beverage Tax 1.00",
    //     "supplier_address": "500 Granville St Vancouver, BC V6C 1W6 Canada",
    //     "category": "meals and entertainment"
    //   },
    //   {
    //     "supplier_name": "Apple Store",
    //     "total_amount": "999.00",
    //     "receipt_date": "2024-07-22",
    //     "line_items": "1 iPhone 999.00",
    //     "supplier_address": "815 W Hastings St Vancouver, BC V6C 1B4 Canada",
    //     "category": "electronics"
    //   },
    //   {
    //     "supplier_name": "Walmart",
    //     "total_amount": "75.45",
    //     "receipt_date": "2024-08-18",
    //     "line_items": "Groceries 50.00, Household Items 25.45",
    //     "supplier_address": "650 SE Marine Dr Vancouver, BC V5X 2T4 Canada",
    //     "category": "groceries"
    //   },
    //   {
    //     "supplier_name": "Best Buy",
    //     "total_amount": "249.99",
    //     "receipt_date": "2024-08-20",
    //     "line_items": "Bluetooth Speaker 249.99",
    //     "supplier_address": "2220 Cambie St Vancouver, BC V5Z 2T7 Canada",
    //     "category": "electronics"
    //   }

    // ];

    // Flatten the example data
    // const combinedData = exampleData.flat();
    // setData(passedData); // Store the combined data in state
  }, []);


  // Handle checkbox changes
  const handleCategoryChange = (category) => {
    setSelectedCategories(prevSelectedCategories =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter(c => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  // Filter data based on selected categories
  const filteredData = selectedCategories.length > 0
    ? data.filter(item => selectedCategories.includes(item.category))
    : data;


  const categories = [
    "advertising",
    "allowance on eligible capital property",
    "bad debts",
    "business start-up costs",
    "business tax, fees, licenses and dues",
    "business-use-of-home expenses",
    "capital cost allowance",
    "delivery, freight and express",
    "fuel costs",
    "insurance",
    "interest and bank charges",
    "legal, accounting and other professional fees",
    "maintenance and repairs", "management and administration fees",
    "meals and entertainment",
    "motor vehicle expenses",
    "office expenses",
    "other business expenses",
    "prepaid expenses",
    "property taxes",
    "rent",
    "salaries, wages and benefits",
    "supplies",
    "telephone and utilities",
    "travel"

  ];

  return (
    <div className="px-8 overflow-x-auto max-w-full">
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-center">Categories: </h3>
      <ul className="items-center w-full text-sm font-mediumtext-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white overflow-x-auto whitespace-nowrap">
        {categories.map((category, index) => (
          <li
            key={index}
            className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
          >
            <div className="flex items-center ps-3">
              <input
                id={`checkbox-${category}`}
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor={`checkbox-${category}`}
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {category}
              </label>
            </div>
          </li>
        ))}
      </ul>

      <table className="min-w-full bg-white rounded-lg shadow mt-4">
        <thead>
          <tr className="bg-gray-200">
            {filteredData && filteredData.length > 0 && Object.keys(filteredData[0]).map((key, index) => (
              <th className="border px-6 py-3 text-left text-gray-600" key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData.map((row, rowIndex) => (
            <tr className="border-b" key={rowIndex}>
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