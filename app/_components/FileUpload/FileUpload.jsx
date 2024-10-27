import { useState } from 'react';
import awsClient from '@/app/_libs/AwsClient';
import Button from '../Button/Button';
import './FileUpload.scss';
import { formatDate } from "../../_libs/dataProcessing";
import { Receipt, Loader2 } from "lucide-react"
import DownloadCsv from '../DownloadCsv/DownloadCsv';
const FileUpload = ({ buttonText }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [filesStrings, setFilesStrings] = useState([]);
  const [data, setData] = useState([]);


  const handleFileChange = (event) => {
    const inputFiles = event.target.files;
    setSelectedFiles(inputFiles);
    setFilesStrings([]);
    let filenames = [];
    for (let i = 0; i < inputFiles.length; i++) {
      const filename = inputFiles[i].name;
      filenames.push(`${filename}`);
    }
    setFilesStrings(filenames);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadStatus('No files selected.');
      return;
    }
    setIsUploading(true);
    setUploadStatus('Uploading...');

    try {
      let receipts = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        // const bucketName = "my-first-bucket"; // Replace with your S3 bucket name
        const filename_date = `${Date.now()}_${file.name}`;
        const key = `receipts/${filename_date}`; // add timestamp in ms to start of the filename

        receipts.push(filename_date);
        const fileContent = file;

        const response = await awsClient.s3Upload(key, fileContent);
      }
      setUploadStatus('Upload successful!');
      setIsUploading(false);
      console.log("receipts: ", receipts);
      // Call the api to process the uploaded files
      // const response = await fetch('/api/process-files');
      for (let i = 0; i < receipts.length; i++) {
        console.log("body json", JSON.stringify(
          {
            "body": {
              "filename": receipts[i]
            }
          }

        ))
        const response = await fetch(process.env.NEXT_PUBLIC_AWS_COORDINATOR_FUNCTION_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              "body": {
                "filename": receipts[i]
              }
            }

          ),
        });
        const resJson = await response.json();
        console.log("resJson", resJson);
        // get the key, value pairs and replacen with spaces from the values
        const modifiedSupplierData = Object.fromEntries(
          Object.entries(resJson).map(([key, value]) => [
            key,
            typeof value === 'string' ? value.replace(/\n/g, ' ') : value
          ])
        );

        console.log("modified data", modifiedSupplierData);

        setData([...data, modifiedSupplierData]);
      }

      console.log("data after all", data);
    } catch (error) {
      setUploadStatus(`ERROR : ${error.message}`);
      setIsUploading(false);
    }
  };

  return (
    <>
      <div>
        {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file */}
        <input
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          type="file" multiple
          onChange={handleFileChange}
          name="file-input" id="file-input"
          accept=".pdf,.png,.jpg,.jpeg,.bmp,.tiff,.svg,.heic,.bmp,.raw,.webp"
        />
        <p>Selected files:</p>
        {
          filesStrings.map((filename, index) => {
            return <p key={index}>{filename}</p>
          })
        }
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-lg ${isUploading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
            }`}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Receipt className="mr-2 h-4 w-4" />
              Upload PDF
            </>
          )}
        </button>
        <p className='red-text'>Status: {uploadStatus}</p>
      </div>
      <DownloadCsv
        data={data}
        fileName="expenses"
        appendTimestamp={true}
        csvMapping={null}
      />
    </>

  );
};

export default FileUpload;