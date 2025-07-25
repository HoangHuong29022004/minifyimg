import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"
import { useImageStore } from "@/store/use-image-store"
import { isImageFile } from "@/lib/utils"

const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp']
}

/**
 * Component cho phép kéo thả hoặc chọn file ảnh
 */
export function ImageDropzone() {
  const setOriginal = useImageStore((state) => state.setOriginal)
  const setError = useImageStore((state) => state.setError)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      if (!isImageFile(file)) {
        setError("Vui lòng chọn file ảnh")
        return
      }

      // Kiểm tra định dạng được hỗ trợ
      if (!Object.keys(ACCEPTED_TYPES).includes(file.type)) {
        setError("Định dạng ảnh không được hỗ trợ. Vui lòng sử dụng JPG, PNG hoặc WebP")
        return
      }

      setOriginal(file)
    },
    [setOriginal, setError]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxFiles: 1,
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={`border border-2 rounded-3 d-flex flex-column align-items-center justify-content-center w-100" style={{height: '256px', cursor: 'pointer', background: isDragActive ? '#e9ecef' : '#f8f9fa'}}`}
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
          JPG, PNG hoặc WebP
        </p>
      </div>
    </div>
  )
} 