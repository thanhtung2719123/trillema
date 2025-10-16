# 🚀 Deploy Guide - Hướng Dẫn Deploy

## Deploy lên Vercel (Miễn phí!)

### Bước 1: Chuẩn bị GitHub Repository

```bash
# 1. Initialize git (nếu chưa có)
git init

# 2. Add remote repository
git remote add origin https://github.com/thanhtung2719123/trillema.git

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial commit: Vietnam Exchange Rate Simulation"

# 5. Push lên GitHub
git branch -M main
git push -u origin main
```

### Bước 2: Deploy trên Vercel

#### Option A: Deploy qua Vercel Dashboard (Dễ nhất)

1. Truy cập: https://vercel.com/
2. Đăng nhập bằng GitHub
3. Click **"New Project"**
4. Import repository: `thanhtung2719123/trillema`
5. Framework Preset: **Create React App** (tự động detect)
6. Build Settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
7. Click **"Deploy"**
8. Đợi 2-3 phút → Xong!

#### Option B: Deploy qua Vercel CLI

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Follow prompts:
# - Set up and deploy? Y
# - Which scope? Your account
# - Link to existing project? N
# - Project name? trillema
# - In which directory? ./
# - Want to override settings? N

# 5. Deploy to production
vercel --prod
```

### Bước 3: Cấu hình Domain (Optional)

Sau khi deploy, bạn sẽ có URL kiểu:
- `https://trillema-abc123.vercel.app`

Để dùng domain riêng:
1. Vào Vercel Dashboard → Project Settings → Domains
2. Add domain của bạn
3. Cấu hình DNS theo hướng dẫn

---

## 🔑 Gemini API Key

### Cách 1: User tự nhập (Khuyến nghị)
- User mở app → Nhập API key vào ô input
- Key được lưu trong localStorage của browser
- Mỗi user dùng key riêng

### Cách 2: Hardcode key sẵn (Demo only)
File `src/config/apiConfig.js`:
```javascript
export const DEFAULT_GEMINI_API_KEY = 'YOUR_KEY_HERE';
```

⚠️ **LƯU Ý BẢO MẬT:**
- Nếu hardcode key, key sẽ public trên GitHub
- Ai cũng có thể dùng key của bạn
- Key có thể bị Google revoke
- Chỉ nên dùng cho demo, test

### Cách 3: Tốt nhất - Environment Variables (Production)
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add: `REACT_APP_GEMINI_API_KEY` = your_key
3. Redeploy

---

## 📋 Checklist Trước Khi Deploy

- [x] Test local: `npm start` chạy OK
- [x] Build OK: `npm run build` không lỗi
- [x] API key đã cấu hình
- [x] Gemini API hoạt động
- [x] Git repository đã push
- [x] vercel.json đã tạo
- [x] .gitignore đã cập nhật

---

## 🐛 Troubleshooting

### Lỗi: "Module not found"
```bash
# Xóa node_modules và reinstall
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: "Build failed"
```bash
# Check build local trước
npm run build

# Nếu lỗi, fix rồi commit lại
git add .
git commit -m "Fix build errors"
git push
```

### Lỗi: Vercel build timeout
- Vào Vercel Dashboard → Settings → General
- Increase "Build & Development Settings" → Build timeout

### Gemini API không hoạt động
1. Check API key đã nhập đúng chưa
2. Check API key còn quota không tại: https://aistudio.google.com/app/apikey
3. Check network requests trong DevTools

---

## 🌐 URLs Sau Khi Deploy

Sau khi deploy thành công, bạn sẽ có:

- **Production URL**: https://trillema.vercel.app (hoặc tương tự)
- **GitHub Repo**: https://github.com/thanhtung2719123/trillema
- **Preview URLs**: Mỗi PR/commit sẽ có preview URL riêng

---

## 📊 Performance Tips

### 1. Enable Compression
Vercel tự động enable gzip/brotli

### 2. Caching
Static assets tự động cache

### 3. CDN
Vercel Edge Network (global CDN) tự động

### 4. Analytics
Vercel Dashboard → Analytics để xem traffic

---

## 🔄 Auto Deploy

Sau khi setup xong:
- Mỗi lần push lên GitHub main branch
- Vercel tự động build và deploy
- Check status tại: https://vercel.com/dashboard

---

## 💰 Cost

**Vercel Free Tier:**
- ✅ Unlimited personal projects
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Analytics

**Nếu vượt quota:**
- Upgrade lên Pro: $20/month
- Hoặc optimize assets

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **GitHub Issues**: https://github.com/thanhtung2719123/trillema/issues
- **Gemini API**: https://ai.google.dev/

---

**Happy Deploying! 🚀**

