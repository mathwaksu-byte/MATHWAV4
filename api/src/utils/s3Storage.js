import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Region = process.env.S3_REGION || 'ap-southeast-1';
const s3Endpoint = process.env.S3_ENDPOINT || process.env.SUPABASE_S3_ENDPOINT || 'https://aajnykxpckkzedbhzsip.storage.supabase.co';
const s3AccessKey = process.env.S3_ACCESS_KEY || '';
const s3SecretKey = process.env.S3_SECRET_KEY || '';

const hasS3 = !!(s3AccessKey && s3SecretKey);
const s3Client = hasS3
  ? new S3Client({
      region: s3Region,
      endpoint: s3Endpoint,
      credentials: {
        accessKeyId: s3AccessKey,
        secretAccessKey: s3SecretKey,
      },
      forcePathStyle: true,
    })
  : null;

export async function uploadToS3(bucket, key, buffer, contentType) {
  try {
    if (!s3Client) throw new Error('S3 not configured');
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ACL: 'public-read',
    });

    await s3Client.send(command);
    
    // Return the public URL
    return `https://aajnykxpckkzedbhzsip.storage.supabase.co/${bucket}/${key}`;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw error;
  }
}

export async function deleteFromS3(bucket, key) {
  try {
    if (!s3Client) throw new Error('S3 not configured');
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error('S3 delete error:', error);
    throw error;
  }
}

export { s3Client };
