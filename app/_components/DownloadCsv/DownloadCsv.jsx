// import './DownloadCsv.scss';
import Button from '../Button/Button';
import { formatDate } from '@/app/_libs/dataProcessing';

/**
 * A React component that downloads a CSV file from a given array of objects.
 * @param {object} props
 * @param {Array.<Object>} props.data The array of objects to export as a CSV file.
 * @param {string} props.fileName The filename of the CSV file to download.
 * @param {Object.<string, string>} [props.csvMapping] An object mapping property names of the data objects to column headers.
 * @param {boolean} [props.appendTimestamp] Whether to append a timestamp to the filename.
 * @returns A React component that, when clicked, downloads a CSV file from the given array of objects.
 */
const DownloadCsv = ({ data, fileName, csvMapping, appendTimestamp }) => {
  if (appendTimestamp) {
    fileName = `${fileName}_${formatDate(new Date(), 'filename')}`;
  }
  console.log("DownloadCSV data", data);

  /**
   * Converts a given array of objects to a CSV string.
   * @param {Array.<Object>} objArray The array of objects to convert.
   * @param {boolean} addHeader Whether to add a header row to the CSV string.
   * @return {string} The CSV string.
   */
  const convertToCSV = (objArray, addHeader = true) => {
    let array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    if (csvMapping) {
      array = array.map(object => {
        const simplifiedObject = {};
        Object.keys(csvMapping).forEach(property => {
          const mappedColumn = csvMapping[property];
          let value = object[property];
          if (value === null || value === 'null') {
            value = "";
          } else if (value instanceof Date) {
            value = formatDate(value, 'readable timestamp')
          }
          simplifiedObject[mappedColumn] = value
        })
        return simplifiedObject
      })
    }
    let str = '';

    if (addHeader) {
      const headerObject = {}
      // if array is empty, return an empty string
      if (array.length === 0) {
        return str;
      }
      Object.keys(array[0]).forEach(key => {
        headerObject[key] = key;
      });

      objArray = array.unshift(headerObject);
    }

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line !== '') line += ',';

        const value = array[i][index];
        if (typeof value === 'string' && value.includes(',')) {
          line += `"${value}"`;
        } else {
          line += value;
        }
      }
      str += line + '\r\n';
    }
    return str;
  };

  const downloadCSV = () => {
    const csvData = new Blob([convertToCSV(data, true)], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const buttonProps = {
    text: 'Export to CSV',
    onClick: downloadCSV
  }

  return (
    <button
      type="button"
      className="flex items-center justify-center w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      onClick={downloadCSV}
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Export to CSV
    </button>
  );
}

export default DownloadCsv;


