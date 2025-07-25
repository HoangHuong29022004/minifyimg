# MinifyIMG

Công cụ tối ưu và chuyển đổi định dạng ảnh trực tiếp trên trình duyệt.

## Tính năng

- Upload ảnh bằng kéo thả hoặc chọn file
- Hỗ trợ các định dạng: JPG, PNG, WebP
- Tối ưu kích thước ảnh
- Chuyển đổi định dạng
- Xử lý hoàn toàn trên trình duyệt
- Giao diện hiện đại, dễ sử dụng
- Hỗ trợ Dark mode

## Công nghệ sử dụng

- Next.js 14
- TypeScript
- TailwindCSS 4
- @squoosh/lib
- Zustand
- React-Dropzone

## Cài đặt

```bash
# Clone repository
git clone https://github.com/yourusername/minifyimg.git

# Di chuyển vào thư mục
cd minifyimg

# Cài đặt dependencies
pnpm install

# Chạy development server
pnpm dev
```

## Cấu trúc thư mục

```
src/
├── app/                 # Next.js pages
├── components/          # React components
│   ├── ui/             # UI components
│   └── features/       # Feature components
├── lib/                # Utilities
│   ├── hooks/         # Custom hooks
│   └── utils/         # Helper functions
└── store/             # State management
```

## Scripts

- `pnpm dev` - Chạy development server
- `pnpm build` - Build production
- `pnpm start` - Chạy production server
- `pnpm lint` - Kiểm tra lỗi với ESLint

## License

MIT
