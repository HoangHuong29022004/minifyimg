import { useCallback } from "react"
import imageCompression from "browser-image-compression"
import { useImageStore } from "@/store/use-image-store"
import type { ImageFormat } from "@/store/use-image-store"

/**
 * Chuyển đổi HEIC/HEIF sang định dạng khác
 */
async function convertHeicFormat(
  inputBlob: Blob,
  format: ImageFormat,
  quality: number
): Promise<Blob> {
  try {
    // Dynamic import để tránh lỗi SSR
    const heic2any = (await import('heic2any')).default
    
    // Chuyển đổi HEIC/HEIF sang JPEG trước
    const convertedBlob = await heic2any({
      blob: inputBlob,
      toType: "image/jpeg",
      quality: quality / 100
    }) as Blob

    // Nếu format đích là JPEG, trả về luôn
    if (format === "jpeg") {
      return convertedBlob
    }

    // Nếu format đích khác JPEG, chuyển đổi tiếp
    return convertImageFormat(convertedBlob, format, quality)
  } catch (error) {
    throw new Error('Không thể chuyển đổi định dạng HEIC/HEIF')
  }
}

/**
 * Chuyển đổi ảnh sang định dạng khác
 */
async function convertImageFormat(
  inputBlob: Blob,
  format: ImageFormat,
  quality: number
): Promise<Blob> {
  // Xử lý HEIC/HEIF riêng
  if (inputBlob.type === 'image/heic' || inputBlob.type === 'image/heif') {
    return convertHeicFormat(inputBlob, format, quality)
  }

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      // Tạo canvas
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight

      // Vẽ ảnh lên canvas
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Không thể tạo canvas context'))
        return
      }
      ctx.drawImage(img, 0, 0)

      // Xác định MIME type cho format
      let mimeType: string
      switch (format) {
        case 'jpeg':
          mimeType = 'image/jpeg'
          break
        case 'png':
          mimeType = 'image/png'
          break
        case 'webp':
          mimeType = 'image/webp'
          break
        case 'gif':
          mimeType = 'image/gif'
          break
        case 'bmp':
          mimeType = 'image/bmp'
          break
        case 'tiff':
          mimeType = 'image/tiff'
          break
        case 'avif':
          mimeType = 'image/avif'
          break
        default:
          mimeType = 'image/jpeg'
      }

      // Chuyển đổi sang định dạng mới với nén
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Không thể chuyển đổi định dạng'))
          }
        },
        mimeType,
        quality / 100
      )
    }

    img.onerror = () => {
      reject(new Error('Không thể tải ảnh'))
    }

    // Tạo object URL từ blob
    img.src = URL.createObjectURL(inputBlob)
  })
}

/**
 * Hook xử lý ảnh
 */
export function useImageProcessor() {
  const options = useImageStore((state) => state.options)
  const images = useImageStore((state) => state.images)
  const updateImageProcessed = useImageStore((state) => state.updateImageProcessed)
  const updateImageProcessing = useImageStore((state) => state.updateImageProcessing)
  const updateImageError = useImageStore((state) => state.updateImageError)
  const setProcessing = useImageStore((state) => state.setProcessing)
  const setError = useImageStore((state) => state.setError)

  const processSingleImage = useCallback(async (imageId: string, file: File) => {
    try {
      updateImageProcessing(imageId, true)

      // Bước 1: Luôn nén ảnh trước
      let processedBlob: Blob
      
      // Cấu hình nén dựa trên format đích
      const compressionOptions: any = {
        maxSizeMB: 2, // Giới hạn kích thước để nén tốt hơn
        useWebWorker: true,
        initialQuality: options.quality / 100, // Sử dụng quality từ settings
      }

      // Thêm resize nếu được bật
      if (options.resize.enabled && (options.resize.width || options.resize.height)) {
        compressionOptions.maxWidthOrHeight = Math.max(options.resize.width || 0, options.resize.height || 0)
      }

      // Nén ảnh trước
      const compressedFile = await imageCompression(file, compressionOptions)
      processedBlob = compressedFile

      // Bước 2: Chuyển đổi định dạng (nếu cần)
      let finalBlob: Blob
      if (file.type === `image/${options.format}` && options.quality >= 90) {
        // Nếu format giống nhau và quality cao, sử dụng ảnh đã nén
        finalBlob = processedBlob
      } else {
        // Chuyển đổi sang định dạng mới
        finalBlob = await convertImageFormat(
          processedBlob,
          options.format,
          options.quality
        )
      }

      // Cập nhật state
      updateImageProcessed(imageId, finalBlob)
    } catch (error) {
      console.error("Lỗi xử lý ảnh:", error)
      updateImageError(imageId, "Có lỗi xảy ra khi xử lý ảnh")
    }
  }, [options, updateImageProcessed, updateImageProcessing, updateImageError])

  const processAllImages = useCallback(async () => {
    const unprocessedImages = images.filter(img => !img.processed && !img.processing)
    
    if (unprocessedImages.length === 0) {
      setError("Không có ảnh nào để xử lý")
      return
    }

    try {
      setProcessing(true)
      setError(null)

      // Xử lý tất cả ảnh song song
      const promises = unprocessedImages.map(image => 
        processSingleImage(image.id, image.original.file)
      )

      await Promise.all(promises)
    } catch (error) {
      console.error("Lỗi xử lý ảnh:", error)
      setError("Có lỗi xảy ra khi xử lý ảnh")
    } finally {
      setProcessing(false)
    }
  }, [images, processSingleImage, setProcessing, setError])

  return { processAllImages, processSingleImage }
} 
