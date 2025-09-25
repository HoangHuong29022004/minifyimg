import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"
import { useImageStore } from "@/store/use-image-store"
import { isImageFile } from "@/lib/utils"

const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/gif': ['.gif'],
  'image/bmp': ['.bmp'],
  'image/tiff': ['.tiff', '.tif'],
  'image/avif': ['.avif'],
  'image/heic': ['.heic'],
  'image/heif': ['.heif']
}

/**
 * Component cho phép kéo thả hoặc chọn nhiều file ảnh
 */
export function ImageDropzone() {
  const addImages = useImageStore((state) => state.addImages)
  const setError = useImageStore((state) => state.setError)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      // Kiểm tra tất cả file
      const validFiles: File[] = []
      for (const file of acceptedFiles) {
        if (!isImageFile(file)) {
          setError(`File "${file.name}" không phải là ảnh`)
          return
        }

        // Kiểm tra định dạng được hỗ trợ
        if (!Object.keys(ACCEPTED_TYPES).includes(file.type)) {
          setError(`Định dạng ảnh "${file.name}" không được hỗ trợ. Vui lòng sử dụng JPG, PNG, WebP, GIF, BMP, TIFF, AVIF, HEIC, HEIF`)
          return
        }

        validFiles.push(file)
      }

      if (validFiles.length > 0) {
        addImages(validFiles)
      }
    },
    [addImages, setError]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    multiple: true,
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 rounded-3 d-flex flex-column align-items-center justify-content-center w-100" style={{height: '256px', cursor: 'pointer', background: isDragActive ? '#e9ecef' : '#f8f9fa'}}`}
    >
      <input {...getInputProps()} />
      <div className="d-flex flex-column align-items-center justify-content-center pt-3 pb-4">
        <Upload
          className={`mb-3" style={{width: '40px', height: '40px', color: isDragActive ? '#0d6efd' : '#adb5bd'}}`}
        />
        <p className="mb-2 text-secondary">
          {isDragActive ? (
            <span className="fw-semibold text-primary">Thả ảnh vào đây</span>
          ) : (
            <span>
              <span className="fw-semibold">Nhấp để tải lên</span> hoặc kéo thả
            </span>
          )}
        </p>
        <p className="text-muted small">
          JPG, PNG, WebP, GIF, BMP, TIFF, AVIF, HEIC, HEIF (có thể chọn nhiều ảnh)
        </p>
      </div>
    </div>
  )
} 
