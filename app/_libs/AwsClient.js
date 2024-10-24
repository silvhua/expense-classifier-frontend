import {
  PutObjectCommand, 
  DeleteObjectCommand,
  S3Client,
  S3ServiceException,
  waitUntilObjectNotExists,
} from "@aws-sdk/client-s3";



/* 
Documentation:

https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/
https://aws.amazon.com/sdk-for-javascript/

*/
class AwsClient {
  constructor() {
    const credentials = {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    }
    console.log(credentials)
    this.client = new S3Client({
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      credentials: credentials
    });
  }

  async s3Upload(bucketName, key, fileContent) {
    // Example: https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/s3/actions/put-object.js
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: fileContent
    };
    const command = new PutObjectCommand(params);

    try {
      const response = await this.client.send(command);
      this.logResponse(response, 's3Upload');
      return response;
    } catch (caught) {
      console.log(caught);
      if (
        caught instanceof S3ServiceException &&
        caught.name === "EntityTooLarge"
      ) {
        console.error(`Error from S3 while uploading object to ${bucketName}. The object was too large.`);
      } else if (caught instanceof S3ServiceException) {
        console.error(
          `Error from S3 while uploading object to ${bucketName}.  ${caught.name}: ${caught.message}`,
        );
      } else {
        throw caught;
      }
    }
  }

  async s3Delete(bucketName, key) {
    // Example: https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/s3/actions/delete-object.js
    const params = {
      Bucket: bucketName,
      Key: key
    };

    try {
      const response = await client.send(
        new DeleteObjectCommand(params),
      );
      await waitUntilObjectNotExists(
        { client },
        { Bucket: bucketName, Key: key },
      );
      // A successful delete, or a delete for a non-existent object, both return
      // a 204 response code.
      this.logResponse(response, 's3Delete');
    } catch (caught) {
      if (
        caught instanceof S3ServiceException &&
        caught.name === "NoSuchBucket"
      ) {
        console.error(
          `Error from S3 while deleting object from ${bucketName}. The bucket doesn't exist.`,
        );
      } else if (caught instanceof S3ServiceException) {
        console.error(
          `Error from S3 while deleting object from ${bucketName}.  ${caught.name}: ${caught.message}`,
        );
      } else {
        throw caught;
      }
    }
  }

  logResponse(response, method) {
    // Helper method to perform console.log() on API response objects during development.
    const metadata = response['$metadata'];
    console.log(
      `API response status for "${method}" method: \n${metadata.httpStatusCode}.`
    );
  }
}

const awsClient = new AwsClient();
export default awsClient;