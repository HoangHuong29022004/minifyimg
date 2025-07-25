"use client"

import { ImageDropzone } from "@/components/features/image-dropzone"
import { ImagePreview } from "@/components/features/image-preview"
import { ImageSettings } from "@/components/features/image-settings"
import { Button } from "@/components/ui/button"
import { useImageProcessor } from "@/lib/hooks/use-image-processor"
import { useImageStore } from "@/store/use-image-store"
import { createNewFilename, formatBytes } from "@/lib/utils"

/**
 * Trang chính của ứng dụng
 */
export default function Home() {
  const original = useImageStore((state) => state.original)
  const processed = useImageStore((state) => state.processed)
  const processing = useImageStore((state) => state.processing)
  const error = useImageStore((state) => state.error)
  const options = useImageStore((state) => state.options)
  const reset = useImageStore((state) => state.reset)
  const { processImage } = useImageProcessor()

  const handleDownload = () => {
    if (!processed?.blob || !original?.file) return

    const url = URL.createObjectURL(processed.blob)
    const a = document.createElement("a")
    a.href = url
    a.download = createNewFilename(
      original.file.name,
      `_${options.format}_${options.quality}_${formatBytes(processed.size).replace(" ", "")}`,
      options.format
    )
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="container py-4">
      <div className="mx-auto" style={{maxWidth: '900px'}}>
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold">MinifyIMG</h1>
          <p className="mt-2 text-secondary">
            Tối ưu và chuyển đổi định dạng ảnh trực tiếp trên trình duyệt
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row g-4">
          <div className="col-md-6">
            <h2 className="h5 fw-semibold mb-3">Ảnh gốc</h2>
            {original ? (
              <>
                <ImagePreview
                  src={original.preview}
                  size={original.size}
                  alt="Original"
                />
                <Button onClick={reset} variant="outline" className="w-100 mt-2">
                  Chọn ảnh khác
                </Button>
              </>
            ) : (
              <ImageDropzone />
            )}
          </div>

          <div className="col-md-6">
            <h2 className="h5 fw-semibold mb-3">Ảnh đã xử lý</h2>
            {processed ? (
              <>
                <ImagePreview
                  src={processed.preview}
                  size={processed.size}
                  alt="Processed"
                />
                <Button onClick={handleDownload} className="w-100 mt-2">
                  Tải xuống
                </Button>
              </>
            ) : original ? (
              <>
                <ImageSettings />
                <Button
                  onClick={processImage}
                  disabled={processing}
                  className="w-100 mt-2"
                >
                  {processing ? "Đang xử lý..." : "Xử lý ảnh"}
                </Button>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center border border-2 rounded-3 text-secondary" style={{height: '256px'}}>
                Chọn ảnh để bắt đầu
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
