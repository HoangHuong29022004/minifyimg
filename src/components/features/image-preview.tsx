import Image from "next/image"
import { formatBytes } from "@/lib/utils"
import { useImageStore } from "@/store/use-image-store"
import { Button } from "@/components/ui/button"
import { X, Download } from "lucide-react"

interface ImagePreviewProps {
  src: string
  size: number
  alt?: string
  width?: number
  height?: number
}

/**
 * Component hiển thị preview ảnh đơn lẻ
 */
export function ImagePreview({
  src,
  size,
  alt = "Preview",
  width = 300,
  height = 300,
}: ImagePreviewProps) {
  return (
    <div className="d-flex flex-column align-items-center gap-2">
      <div className="position-relative w-100" style={{maxWidth: '300px', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '0.75rem', border: '1px solid #dee2e6'}}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-fit-contain"
          priority
        />
      </div>
      <p className="text-secondary small">
        Kích thước: {formatBytes(size)}
      </p>
    </div>
  )
}

/**
 * Component hiển thị danh sách ảnh
 */
export function ImageList() {
  const images = useImageStore((state) => state.images)
  const removeImage = useImageStore((state) => state.removeImage)

  if (images.length === 0) {
    return null
  }

  return (
    <div className="d-flex flex-column gap-3">
      <h3 className="h6 fw-semibold">Danh sách ảnh ({images.length})</h3>
      <div className="row g-3">
        {images.map((image) => (
          <div key={image.id} className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="card-title small mb-0 text-truncate" style={{maxWidth: '200px'}}>
                    {image.original.file.name}
                  </h6>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeImage(image.id)}
                    className="p-1"
                    style={{width: '24px', height: '24px'}}
                  >
                    <X size={12} />
                  </Button>
                </div>
                
                <div className="position-relative mb-2" style={{aspectRatio: '1/1', overflow: 'hidden', borderRadius: '0.5rem', border: '1px solid #dee2e6'}}>
                  <Image
                    src={image.original.preview}
                    alt={image.original.file.name}
                    width={200}
                    height={200}
                    className="object-fit-contain w-100 h-100"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-secondary small">
                    {formatBytes(image.original.size)}
                  </span>
                  
                  {image.processed && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const url = URL.createObjectURL(image.processed!.blob!)
                        const a = document.createElement("a")
                        a.href = url
                        a.download = image.original.file.name.replace(/\.[^/.]+$/, `.${image.processed!.blob!.type.split('/')[1]}`)
                        a.click()
                        URL.revokeObjectURL(url)
                      }}
                      className="p-1"
                      style={{width: '24px', height: '24px'}}
                    >
                      <Download size={12} />
                    </Button>
                  )}
                </div>

                {image.processing && (
                  <div className="mt-2">
                    <div className="progress" style={{height: '4px'}}>
                      <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: '100%'}}></div>
                    </div>
                    <small className="text-muted">Đang xử lý...</small>
                  </div>
                )}

                {image.error && (
                  <div className="mt-2">
                    <small className="text-danger">{image.error}</small>
                  </div>
                )}

                {image.processed && (
                  <div className="mt-2">
                    <small className="text-success">
                      Đã xử lý: {formatBytes(image.processed.size!)}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
