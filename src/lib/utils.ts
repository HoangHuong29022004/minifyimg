import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Kết hợp các class TailwindCSS và xử lý conflict
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Chuyển đổi bytes sang đơn vị đọc được
 */
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

/**
 * Tạo unique ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Kiểm tra file có phải là ảnh không
 */
export function isImageFile(file: File) {
  return file.type.startsWith("image/")
}

/**
 * Lấy tên file không có phần mở rộng
 */
export function getBaseName(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".")
  return lastDotIndex === -1 ? filename : filename.slice(0, lastDotIndex)
}

/**
 * Tạo tên file mới với suffix và định dạng mới
 */
export function createNewFilename(originalName: string, suffix: string, newFormat: string): string {
  const baseName = getBaseName(originalName)
  return `${baseName}${suffix}.${newFormat}`
} 