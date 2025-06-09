import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY as string
  }
})

export const saveFileToBucket = async (file: File, fileName: string, path: string) => {
  const fileBuffer = file
  const bucketFileName = `${Date.now()}-${fileName}`
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string,
    Key: `${path}/${bucketFileName}`,
    Body: fileBuffer,
    ContentType: file?.type.includes('svg') ? 'image/svg+xml' : 'image/*'
  }

  const command = new PutObjectCommand(params)
  await s3Client.send(command)

  return bucketFileName
}
