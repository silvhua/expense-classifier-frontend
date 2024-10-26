import { useState } from 'react';
import awsClient from '@/app/_libs/AwsClient';
import Button from '../Button/Button';
import './FileUpload.scss';

const FileUpload = ({ buttonText }) => {
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

    setUploadStatus('Uploading...');

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const bucketName = 'eclassifierbucket'; // Replace with your S3 bucket name
        const key = `receipts/${Date.now()}_${file.name}`; // add timestamp in ms to start of the filename
        const fileContent = file;

        const response = await awsClient.s3Upload(bucketName, key, fileContent);
      }
      setUploadStatus('Upload successful!');
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

      <Button buttonProps={buttonProps} />
      <p className='red-text'>Upload status: {uploadStatus}</p>
    </div>
  );
};

export default FileUpload;