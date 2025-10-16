# 🎯 START HERE - Hướng Dẫn Nhanh

## Bạn đang ở bước nào?

### ✅ BƯỚC 1: Chạy Local (Đã xong!)
Nếu bạn đang đọc này, có lẽ app đã chạy OK trên máy. 

Nếu chưa:
```bash
npm install
npm start
```

---

### 📦 BƯỚC 2: Push lên GitHub

**Cách Nhanh Nhất (Windows):**
```bash
# Chỉ cần chạy file này:
push-to-github.bat
```

**Hoặc thủ công:**
```bash
git init
git remote add origin https://github.com/thanhtung2719123/trillema.git
git add .
git commit -m "Initial commit: Vietnam Exchange Rate Simulation"
git push -u origin main
```

⚠️ **Lần đầu push sẽ cần:**
- Username: `thanhtung2719123`
- Password: **Personal Access Token** (không phải password GitHub)
  - Lấy tại: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Chọn scope: `repo`
  - Copy token và dùng làm password

📖 **Chi tiết:** Xem [GITHUB_SETUP.md](./GITHUB_SETUP.md)

---

### 🚀 BƯỚC 3: Deploy lên Vercel (Online!)

Sau khi đã push lên GitHub:

1. Vào: https://vercel.com/
2. Đăng nhập bằng GitHub
3. Click **"New Project"**
4. Import repo: `thanhtung2719123/trillema`
5. Click **"Deploy"** (không cần config gì!)
6. Đợi 2-3 phút → **Done!**

App sẽ có URL kiểu: `https://trillema-abc123.vercel.app`

📖 **Chi tiết:** Xem [DEPLOY.md](./DEPLOY.md)

---

## 🔑 Về Gemini API Key

### Hiện tại:
App đã có API key mặc định: `AIzaSyCkTDvFKxr18HDzUXqjSLCdB5F9sfPzaGI`

### Nếu muốn đổi:
Sửa file `src/config/apiConfig.js`:
```javascript
export const DEFAULT_GEMINI_API_KEY = 'your_new_key_here';
```

### Nếu muốn bảo mật hơn:
1. Set `REQUIRE_API_KEY = true` trong `apiConfig.js`
2. User sẽ phải tự nhập key khi dùng app
3. Hoặc dùng Vercel Environment Variables (production)

---

## 📁 Cấu Trúc Project

```
vmqtt/
├── src/
│   ├── components/        # React components
│   ├── config/           # Configuration (API key ở đây!)
│   ├── services/         # Gemini AI service
│   └── utils/            # Simulation engine
├── public/               # Static files
├── run.bat              # Chạy app (Windows)
├── push-to-github.bat   # Push lên GitHub (Windows)
├── vercel.json          # Vercel config (auto deploy)
└── README.md            # Documentation chính
```

---

## 🆘 Troubleshooting

### "npm install" lỗi?
```bash
# Xóa và cài lại
rm -rf node_modules package-lock.json
npm install
```

### "npm start" lỗi?
- Check Node.js version: `node --version` (cần v14+)
- Check port 3000 có đang dùng không
- Chạy: `npx kill-port 3000` rồi `npm start` lại

### Git push lỗi?
- Check authentication (token chưa?)
- Check remote URL: `git remote -v`
- Xem chi tiết: [GITHUB_SETUP.md](./GITHUB_SETUP.md)

### Vercel deploy lỗi?
- Check build local: `npm run build`
- Check logs trong Vercel Dashboard
- Xem chi tiết: [DEPLOY.md](./DEPLOY.md)

---

## 📚 Tài Liệu Đầy Đủ

| File | Mục đích |
|------|----------|
| [README.md](./README.md) | Overview và features |
| [GITHUB_SETUP.md](./GITHUB_SETUP.md) | Hướng dẫn push GitHub |
| [DEPLOY.md](./DEPLOY.md) | Hướng dẫn deploy Vercel |
| [QUICK_START.md](./QUICK_START.md) | Hướng dẫn chạy local |
| [EXAMPLES.md](./EXAMPLES.md) | Ví dụ các kịch bản |
| [FAQ.md](./FAQ.md) | Câu hỏi thường gặp |

---

## ✅ Checklist Hoàn Thành

- [ ] App chạy được local (`npm start`)
- [ ] Code đã push lên GitHub
- [ ] Verify trên https://github.com/thanhtung2719123/trillema
- [ ] App đã deploy lên Vercel
- [ ] Test app online hoạt động
- [ ] ⭐ Star repo của mình!

---

## 🎊 Xong Rồi? Làm Gì Tiếp?

1. **Share với bạn bè:** Gửi link app online
2. **Viết blog:** Giải thích về Impossible Trinity
3. **Improve:** Thêm features mới (xem TODO trong code)
4. **Contribute:** Nếu tìm bug, tạo GitHub Issue
5. **Learn:** Đọc code để hiểu React + Economics

---

## 🌟 Link Quan Trọng

- **GitHub Repo:** https://github.com/thanhtung2719123/trillema
- **Vercel Deploy:** https://vercel.com/dashboard (sau khi deploy)
- **Gemini API:** https://aistudio.google.com/app/apikey
- **React Docs:** https://react.dev/

---

**Happy Coding! 🚀**

*Nếu có vấn đề gì, mở GitHub Issue hoặc check FAQ.md*

