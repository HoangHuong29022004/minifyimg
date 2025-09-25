# Hướng dẫn Deploy MinifyIMG lên cPanel

## 📁 Files đã tạo:

1. **`minifyimg-deploy.zip`** (267KB) - File deploy chính cho cPanel
2. **`minifyimg-full-project.zip`** (75KB) - Source code đầy đủ (backup)

## 🚀 Cách deploy lên cPanel:

### Bước 1: Upload file
1. Đăng nhập vào cPanel
2. Vào **File Manager**
3. Navigate đến thư mục **public_html** (hoặc subdomain folder)
4. Upload file **`minifyimg-deploy.zip`**

### Bước 2: Extract files
1. Right-click vào file `minifyimg-deploy.zip`
2. Chọn **Extract**
3. Xóa file zip sau khi extract xong

### Bước 3: Cấu hình (nếu cần)
1. Đảm bảo file `index.html` nằm trong thư mục gốc
2. Kiểm tra quyền truy cập file (644 cho files, 755 cho folders)

## 📋 Cấu trúc thư mục sau khi deploy:

```
public_html/
├── index.html          # Trang chính
├── 404.html           # Trang lỗi 404
├── favicon.ico        # Icon website
├── _next/             # Static assets của Next.js
│   ├── static/
│   └── ...
├── file.svg           # Icons
├── vercel.svg
├── next.svg
├── globe.svg
└── window.svg
```

## ✅ Kiểm tra sau khi deploy:

1. Truy cập domain/subdomain
2. Test upload ảnh
3. Test xử lý ảnh
4. Test tải file ZIP

## 🔧 Tính năng đã hỗ trợ:

- ✅ Upload nhiều ảnh cùng lúc
- ✅ Hỗ trợ tất cả định dạng: JPG, PNG, WebP, GIF, BMP, TIFF, AVIF, HEIC, HEIF
- ✅ Xử lý ảnh song song
- ✅ Tải về file ZIP
- ✅ Responsive design
- ✅ Chạy hoàn toàn trên client-side (không cần server)

## 📞 Hỗ trợ:

Nếu gặp vấn đề, kiểm tra:
1. File `index.html` có trong thư mục gốc không
2. Thư mục `_next` có đầy đủ không
3. Quyền truy cập file có đúng không
4. Browser console có lỗi gì không

---
**MinifyIMG** - Công cụ tối ưu và chuyển đổi định dạng ảnh
