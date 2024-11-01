import CSVTable from "../_components/CSVTable/CSVTable"
import NavBar from "../_components/NavBar/NavBar"
import styles from "../page.module.css"


function DisplayPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {/* Adjusted main section with flex-grow */}
      <main className={`${styles.main} flex-grow flex flex-col justify-center items-center`}>
        <h1 className="mb-4 text-l font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Your<span className="text-gray-400 dark:text-gray-300"> Expenses</span> Summarized:</h1>
        {/* <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"></p> */}





      </main>

      <CSVTable />
      {/* Footer with mt-auto to push it to the bottom */}
      <footer className="bg-white rounded-lg shadow mt-auto dark:bg-gray-800 w-full">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 <a href="#" className="hover:underline">Expense AI</a>. All Rights Reserved.
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

export default DisplayPage;