import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MinifyIMG - Tối ưu và chuyển đổi định dạng ảnh",
  description:
    "Công cụ tối ưu và chuyển đổi định dạng ảnh trực tiếp trên trình duyệt, không cần tải lên server.",
  authors: [{ name: "MinifyIMG" }],
  keywords: [
    "image optimization",
    "image compression",
    "image converter",
    "webp",
    "jpeg",
    "png",
    "avif",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
