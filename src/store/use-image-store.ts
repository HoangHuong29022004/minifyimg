import { create } from "zustand"

export type ImageFormat = "jpeg" | "webp" | "png"

interface ProcessingOptions {
  format: ImageFormat
  quality: number
  resize: {
    width: number | null
    height: number | null
    enabled: boolean
  }
}

interface ImageState {
  // Thông tin ảnh gốc
  original: {
    file: File | null
    preview: string
    size: number
  } | null

  // Thông tin ảnh đã xử lý
  processed: {
    blob: Blob | null
    preview: string
    size: number
  } | null

  // Trạng thái xử lý
  processing: boolean
  error: string | null

  // Tùy chọn xử lý
  options: ProcessingOptions

  // Actions
  setOriginal: (file: File) => void
  setProcessed: (blob: Blob) => void
  setProcessing: (processing: boolean) => void
  setError: (error: string | null) => void
  setOptions: (options: Partial<ProcessingOptions>) => void
  reset: () => void
}

const initialOptions: ProcessingOptions = {
  format: "webp", // Mặc định là WebP vì nén tốt nhất
  quality: 85, // Tăng chất lượng mặc định lên 85%
  resize: {
    width: null,
    height: null,
    enabled: false,
  },
}

export const useImageStore = create<ImageState>((set) => ({
  // Initial state
  original: null,
  processed: null,
  processing: false,
  error: null,
  options: initialOptions,

  // Actions
  setOriginal: (file: File) =>
    set({
      original: {
        file,
        preview: URL.createObjectURL(file),
        size: file.size,
      },
      processed: null,
      error: null,
    }),

  setProcessed: (blob: Blob) =>
    set({
      processed: {
        blob,
        preview: URL.createObjectURL(blob),
        size: blob.size,
      },
      processing: false,
      error: null,
    }),

  setProcessing: (processing: boolean) => set({ processing }),

  setError: (error: string | null) => set({ error, processing: false }),

  setOptions: (options: Partial<ProcessingOptions>) =>
    set((state) => ({
      options: { ...state.options, ...options },
    })),

  reset: () => {
    set((state) => {
      // Cleanup object URLs
      if (state.original?.preview) {
        URL.revokeObjectURL(state.original.preview)
      }
      if (state.processed?.preview) {
        URL.revokeObjectURL(state.processed.preview)
      }

      return {
        original: null,
        processed: null,
        processing: false,
        error: null,
        options: initialOptions,
      }
    })
  },
})) 