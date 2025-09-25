"use client"

import { ImageDropzone } from "@/components/features/image-dropzone"
import { ImageList } from "@/components/features/image-preview"
import { ImageSettings } from "@/components/features/image-settings"
import { Button } from "@/components/ui/button"
import { useImageProcessor } from "@/lib/hooks/use-image-processor"
import { useImageStore } from "@/store/use-image-store"
import { createNewFilename, formatBytes, createZipFromBlobs, downloadZip } from "@/lib/utils"
import { Download, Package } from "lucide-react"

/**
 * Trang chính của ứng dụng
 */
export default function Home() {
  const images = useImageStore((state) => state.images)
  const processing = useImageStore((state) => state.processing)
  const error = useImageStore((state) => state.error)
  const options = useImageStore((state) => state.options)
  const reset = useImageStore((state) => state.reset)
  const { processAllImages } = useImageProcessor()

  const handleDownloadZip = async () => {
    const processedImages = images.filter(img => img.processed)
    
    if (processedImages.length === 0) {
      alert("Không có ảnh nào đã được xử lý")
      return
    }

    try {
      const blobs = processedImages.map(img => ({
        blob: img.processed!.blob!,
        filename: createNewFilename(
          img.original.file.name,
          `_${options.format}_${options.quality}`,
          options.format
        )
      }))

      const zipBlob = await createZipFromBlobs(blobs, `processed_images_${new Date().getTime()}.zip`)
      downloadZip(zipBlob)
    } catch (error) {
      console.error("Lỗi tạo file zip:", error)
      alert("Có lỗi xảy ra khi tạo file zip")
    }
  }

  const processedCount = images.filter(img => img.processed).length
  const hasImages = images.length > 0

  return (
    <main className="container py-4">
      <div className="mx-auto" style={{maxWidth: '1200px'}}>
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
          <div className="col-lg-4">
            <div className="sticky-top" style={{top: '20px'}}>
              <h2 className="h5 fw-semibold mb-3">Tải lên ảnh</h2>
              {hasImages ? (
                <div className="d-flex flex-column gap-2">
                  <ImageDropzone />
                  <Button onClick={reset} variant="outline" className="w-100">
                    Xóa tất cả
                  </Button>
                </div>
              ) : (
                <ImageDropzone />
              )}
            </div>
          </div>

          <div className="col-lg-8">
            {hasImages ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 fw-semibold mb-0">Cài đặt & Xử lý</h2>
                  <div className="d-flex gap-2">
                    {processedCount > 0 && (
                      <Button
                        onClick={handleDownloadZip}
                        variant="outline"
                        className="d-flex align-items-center gap-2"
                      >
                        <Package size={16} />
                        Tải ZIP ({processedCount})
                      </Button>
                    )}
                  </div>
                </div>

                <div className="card mb-4">
                  <div className="card-body">
                    <ImageSettings />
                    <Button
                      onClick={processAllImages}
                      disabled={processing}
                      className="w-100 mt-3"
                    >
                      {processing ? "Đang xử lý..." : `Xử lý tất cả ảnh (${images.length})`}
                    </Button>
                  </div>
                </div>

                <ImageList />
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center border-2 rounded-3 text-secondary" style={{height: '400px'}}>
                <div className="text-center">
                  <Package size={48} className="mb-3 text-muted" />
                  <p className="mb-0">Chọn ảnh để bắt đầu</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
