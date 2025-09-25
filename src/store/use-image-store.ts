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

interface ImageItem {
  id: string
  original: {
    file: File
    preview: string
    size: number
  }
  processed: {
    blob: Blob | null
    preview: string | null
    size: number | null
  } | null
  processing: boolean
  error: string | null
}

interface ImageState {
  // Danh sách ảnh
  images: ImageItem[]

  // Trạng thái xử lý tổng thể
  processing: boolean
  error: string | null

  // Tùy chọn xử lý
  options: ProcessingOptions

  // Actions
  addImages: (files: File[]) => void
  removeImage: (id: string) => void
  updateImageProcessed: (id: string, blob: Blob) => void
  updateImageProcessing: (id: string, processing: boolean) => void
  updateImageError: (id: string, error: string | null) => void
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

export const useImageStore = create<ImageState>((set, get) => ({
  // Initial state
  images: [],
  processing: false,
  error: null,
  options: initialOptions,

  // Actions
  addImages: (files: File[]) => {
    const newImages: ImageItem[] = files.map((file) => ({
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      original: {
        file,
        preview: URL.createObjectURL(file),
        size: file.size,
      },
      processed: null,
      processing: false,
      error: null,
    }))

    set((state) => ({
      images: [...state.images, ...newImages],
      error: null,
    }))
  },

  removeImage: (id: string) => {
    set((state) => {
      const imageToRemove = state.images.find((img) => img.id === id)
      if (imageToRemove) {
        // Cleanup object URLs
        URL.revokeObjectURL(imageToRemove.original.preview)
        if (imageToRemove.processed?.preview) {
          URL.revokeObjectURL(imageToRemove.processed.preview)
        }
      }

      return {
        images: state.images.filter((img) => img.id !== id),
      }
    })
  },

  updateImageProcessed: (id: string, blob: Blob) => {
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id
          ? {
            ...img,
            processed: {
              blob,
              preview: URL.createObjectURL(blob),
              size: blob.size,
            },
            processing: false,
            error: null,
          }
          : img
      ),
    }))
  },

  updateImageProcessing: (id: string, processing: boolean) => {
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, processing } : img
      ),
    }))
  },

  updateImageError: (id: string, error: string | null) => {
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, error, processing: false } : img
      ),
    }))
  },

  setProcessing: (processing: boolean) => set({ processing }),

  setError: (error: string | null) => set({ error, processing: false }),

  setOptions: (options: Partial<ProcessingOptions>) =>
    set((state) => ({
      options: { ...state.options, ...options },
    })),

  reset: () => {
    set((state) => {
      // Cleanup tất cả object URLs
      state.images.forEach((img) => {
        URL.revokeObjectURL(img.original.preview)
        if (img.processed?.preview) {
          URL.revokeObjectURL(img.processed.preview)
        }
      })

      return {
        images: [],
        processing: false,
        error: null,
        options: initialOptions,
      }
    })
  },
})) 
