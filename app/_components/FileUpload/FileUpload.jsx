import { useState } from 'react';
import awsClient from '@/app/_libs/AwsClient';
import Button from '../Button/Button';
import './FileUpload.scss';
import { Receipt, Loader2 } from "lucide-react"
const FileUpload = ({ buttonText }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [filesStrings, setFilesStrings] = useState([]);

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
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        // const bucketName = "my-first-bucket"; // Replace with your S3 bucket name
        const key = `receipts/${Date.now()}_${file.name}`; // add timestamp in ms to start of the filename
        const fileContent = file;

        const response = await awsClient.s3Upload(key, fileContent);
      }
      setUploadStatus('Upload successful!');
      setIsUploading(false);
    } catch (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
    }
  };

  const buttonProps = {
    onClick: handleUpload,
    text: buttonText,
  }

  return (
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

      {/* <Button buttonProps={buttonProps} /> */}
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
      <p className='red-text'>Upload status: {uploadStatus}</p>
    </div>
  );
};

export default FileUpload;