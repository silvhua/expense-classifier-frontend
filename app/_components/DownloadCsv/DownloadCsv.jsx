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

  /**
   * Converts a given array of objects to a CSV string.
   * @param {Array.<Object>} objArray The array of objects to convert.
   * @param {boolean} addHeader Whether to add a header row to the CSV string.
   * @return {string} The CSV string.
   */
  const convertToCSV = (objArray, addHeader=true) => {
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
    <Button
      buttonProps={buttonProps}
    />
  );
}

export default DownloadCsv;


