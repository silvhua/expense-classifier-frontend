import AWS from 'aws-sdk';
/* 
Documentation:
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/

*/
class AwsClient {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_AWS_REGION
    });
  }

  async s3Upload(bucketName, key, fileContent) {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: fileContent
    };

    try {
      const response = await this.s3.upload(params).promise();
      this.logResponse(response, 's3Upload');
      return response;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async s3Delete(bucketName, key) {
    const params = {
      Bucket: bucketName,
      Key: key
    };

    try {
      const response = await this.s3.deleteObject(params).promise();
      this.logResponse(response, 's3Delete');
      return response;
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  logResponse(response, method) {
    // Helper method to perform console.log() on API response objects during development.
    console.log(
      `${verb} API response status for "${method}" method: \n${response.status} - ${response.statusText}.`
    );
    console.log(`Data:`, response.data);
  }
}

const awsClient = new AwsClient();
export default awsClient;