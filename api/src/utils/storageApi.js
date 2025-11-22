import axios from 'axios';
import { config } from 'dotenv';
import crypto from 'crypto';
import { supabaseAdmin } from '../config/supabase.js';

config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const S3_ENDPOINT = process.env.S3_ENDPOINT || process.env.SUPABASE_S3_ENDPOINT || 'https://aajnykxpckkzedbhzsip.storage.supabase.co/storage/v1/s3';
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY || '';
const S3_SECRET_KEY = process.env.S3_SECRET_KEY || '';
const S3_REGION = process.env.S3_REGION || 'ap-southeast-1';
const HAS_S3 = !!(S3_ACCESS_KEY && S3_SECRET_KEY);

/**
 * Generate AWS Signature Version 4 headers
 */
function getAWSHeaders(method, url, body, contentType) {
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:\-]|\..{3}/g, '');
  const dateStamp = amzDate.substr(0, 8);
  
  const urlObj = new URL(url);
  const host = urlObj.hostname;
  const path = urlObj.pathname;
  
  // Create canonical request
  const payloadHash = body ? crypto.createHash('sha256').update(body).digest('hex') : 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  
  const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
  const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
  const canonicalRequest = `${method}\n${path}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
  
  // Create string to sign
  const credentialScope = `${dateStamp}/${S3_REGION}/s3/aws4_request`;
  const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`;
  
  // Calculate signature
  const kDate = crypto.createHmac('sha256', `AWS4${S3_SECRET_KEY}`).update(dateStamp).digest();
  const kRegion = crypto.createHmac('sha256', kDate).update(S3_REGION).digest();
  const kService = crypto.createHmac('sha256', kRegion).update('s3').digest();
  const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
  const signature = crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex');
  
  return {
    'Authorization': `AWS4-HMAC-SHA256 Credential=${S3_ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    'x-amz-date': amzDate,
    'x-amz-content-sha256': payloadHash,
  };
}

/**
 * Upload file to Supabase Storage using S3-compatible API
 */
export async function uploadToStorage(bucket, path, buffer, contentType) {
  try {
    const actualBucket = bucket === 'uploads' ? 'MATHWA storage' : bucket;
    if (!HAS_S3) {
      const { error } = await supabaseAdmin.storage
        .from(actualBucket)
        .upload(path, buffer, { contentType, upsert: false });
      if (error) throw error;
      const { data: puh } = supabaseAdmin.storage
        .from(actualBucket)
        .getPublicUrl(path);
      return puh.publicUrl;
    }
    const url = `${S3_ENDPOINT}/${actualBucket}/${path}`;
    const awsHeaders = getAWSHeaders('PUT', url, buffer, contentType);
    const response = await axios.put(url, buffer, {
      headers: {
        ...awsHeaders,
        'Content-Type': contentType,
      }
    });
    if (response.status === 200 || response.status === 201) {
      return `${SUPABASE_URL}/storage/v1/object/public/${actualBucket}/${path}`;
    }
    throw new Error(`Upload failed with status: ${response.status}`);
  } catch (error) {
    throw error;
  }
}

/**
 * Delete file from Supabase Storage using S3-compatible API
 */
export async function deleteFromStorage(bucket, path) {
  try {
    const actualBucket = bucket === 'uploads' ? 'MATHWA storage' : bucket;
    if (!HAS_S3) {
      const { error } = await supabaseAdmin.storage
        .from(actualBucket)
        .remove([path]);
      if (error) throw error;
      return;
    }
    const url = `${S3_ENDPOINT}/${actualBucket}/${path}`;
    const awsHeaders = getAWSHeaders('DELETE', url, null, null);
    const response = await axios.delete(url, { headers: awsHeaders });
    if (response.status !== 200 && response.status !== 204) {
      throw new Error(`Delete failed with status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}
