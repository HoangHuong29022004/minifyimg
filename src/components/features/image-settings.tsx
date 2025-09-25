import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useImageStore } from "@/store/use-image-store"
import type { ImageFormat } from "@/store/use-image-store"

const formats: { value: ImageFormat; label: string; description: string }[] = [
  { 
    value: "webp", 
    label: "WebP",
    description: "Định dạng hiện đại, nén tốt nhất"
  },
  { 
    value: "avif", 
    label: "AVIF",
    description: "Định dạng mới nhất, nén siêu hiệu quả"
  },
  { 
    value: "jpeg", 
    label: "JPEG",
    description: "Phù hợp cho ảnh chụp, ảnh thực tế"
  },
  { 
    value: "png", 
    label: "PNG",
    description: "Chất lượng cao, hỗ trợ trong suốt"
  },
  { 
    value: "gif", 
    label: "GIF",
    description: "Hỗ trợ ảnh động, nén không mất dữ liệu"
  },
  { 
    value: "bmp", 
    label: "BMP",
    description: "Định dạng bitmap không nén"
  },
  { 
    value: "tiff", 
    label: "TIFF",
    description: "Chất lượng cao, thường dùng trong in ấn"
  },
  { 
    value: "heic", 
    label: "HEIC",
    description: "Định dạng Apple, nén hiệu quả"
  },
  { 
    value: "heif", 
    label: "HEIF",
    description: "Định dạng Apple, hỗ trợ ảnh động"
  },
]

/**
 * Component điều chỉnh các tùy chọn xử lý ảnh
 */
export function ImageSettings() {
  const options = useImageStore((state) => state.options)
  const setOptions = useImageStore((state) => state.setOptions)

  return (
    <div className="d-flex flex-column gap-4 w-100" style={{maxWidth: '400px'}}>
      <div className="d-flex flex-column gap-2">
        <label className="form-label">Định dạng</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-100 d-flex justify-content-between align-items-center">
              {formats.find((f) => f.value === options.format)?.label}
              <span className="visually-hidden">Chọn định dạng</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-100">
            {formats.map((format) => (
              <DropdownMenuItem
                key={format.value}
                onClick={() => setOptions({ format: format.value })}
                className="d-flex flex-column align-items-start"
              >
                <span className="fw-medium">{format.label}</span>
                <span className="text-muted small">{format.description}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="d-flex flex-column gap-2">
        <div className="d-flex justify-content-between align-items-center">
          <label className="form-label">Chất lượng</label>
          <span className="text-secondary">{options.quality}%</span>
        </div>
        <Slider
          value={[options.quality]}
          min={1}
          max={100}
          step={1}
          onValueChange={([value]) => setOptions({ quality: value })}
        />
      </div>

      <div className="d-flex align-items-center gap-2">
        <input
          type="checkbox"
          id="resize"
          checked={options.resize.enabled}
          onChange={(e) =>
            setOptions({
              resize: { ...options.resize, enabled: e.target.checked },
            })
          }
          className="form-check-input"
        />
        <label htmlFor="resize" className="form-label mb-0">
          Thay đổi kích thước
        </label>
      </div>

      {options.resize.enabled && (
        <div className="row g-3">
          <div className="col">
            <label className="form-label">Chiều rộng</label>
            <input
              type="number"
              value={options.resize.width || ""}
              onChange={(e) =>
                setOptions({
                  resize: {
                    ...options.resize,
                    width: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
              className="form-control"
              placeholder="Tự động"
            />
          </div>
          <div className="col">
            <label className="form-label">Chiều cao</label>
            <input
              type="number"
              value={options.resize.height || ""}
              onChange={(e) =>
                setOptions({
                  resize: {
                    ...options.resize,
                    height: e.target.value ? Number(e.target.value) : null,
                  },
                })
              }
              className="form-control"
              placeholder="Tự động"
            />
          </div>
        </div>
      )}
    </div>
  )
} 
