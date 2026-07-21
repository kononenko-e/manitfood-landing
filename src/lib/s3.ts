/**
 * Yandex Object Storage / S3-compatible client
 * Используется для получения URL картинок из бакета.
 */
import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: process.env.S3_REGION || 'ru-central1',
  endpoint: process.env.S3_ENDPOINT || 'https://storage.yandexcloud.net',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
});

const CDN_BASE = process.env.PUBLIC_CDN_URL || '';

/**
 * Возвращает полный URL к картинке в CDN/S3.
 * @param path относительный путь в бакете (например: "uploads/dish.jpg")
 */
export function cdnImage(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const clean = path.replace(/^\//, '');
  return `${CDN_BASE}/${clean}`;
}