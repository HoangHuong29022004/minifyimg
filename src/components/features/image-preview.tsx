import Image from "next/image"
import { formatBytes } from "@/lib/utils"

interface ImagePreviewProps {
  src: string
  size: number
  alt?: string
  width?: number
  height?: number
}

/**
 * Component hiển thị preview ảnh và thông tin
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