import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  // images: {
  //   domains: [`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}-web-storage.s3.amazonaws.com`]
  // }
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}-web-storage.s3.amazonaws.com`,
        pathname: '/**'
      }
    ]
  }
}

export default withNextIntl(nextConfig)
