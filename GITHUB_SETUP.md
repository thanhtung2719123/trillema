# 📦 Push lên GitHub - Hướng Dẫn Chi Tiết

## Bước 1: Chuẩn Bị Git

### Kiểm tra Git đã cài chưa
```bash
git --version
```

Nếu chưa có, tải Git tại: https://git-scm.com/

### Cấu hình Git (lần đầu)
```bash
git config --global user.name "thanhtung2719123"
git config --global user.email "your-email@example.com"
```

---

## Bước 2: Initialize Repository

Trong folder `H:\vmqtt`:

```bash
# 1. Initialize git repository
git init

# 2. Add remote repository
git remote add origin https://github.com/thanhtung2719123/trillema.git

# 3. Verify remote
git remote -v
```

---

## Bước 3: Commit Code

```bash
# 1. Check status
git status

# 2. Add all files
git add .

# 3. Commit với message
git commit -m "Initial commit: Vietnam Exchange Rate Simulation with Gemini AI

Features:
- Impossible Trinity simulation
- Time-series charts (30 days)
- Interest rate deviation chart
- 7 scenario presets (VN, Hard Peg, Floating, Crisis, etc.)
- Gemini AI explanations
- Bilingual (Vietnamese/English)
- Responsive design
- Ready for Vercel deployment"

# 4. Set main branch
git branch -M main
```

---

## Bước 4: Push lên GitHub

```bash
# Push lên GitHub
git push -u origin main
```

### Nếu gặp lỗi authentication:

#### Option A: Personal Access Token (Khuyến nghị)
1. Truy cập: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Chọn scopes:
   - ✅ repo (full control)
   - ✅ workflow
4. Click **"Generate token"**
5. Copy token (chỉ hiện 1 lần!)
6. Khi push, dùng token làm password:
   ```bash
   Username: thanhtung2719123
   Password: [paste token ở đây]
   ```

#### Option B: SSH Key
```bash
# 1. Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# 2. Copy public key
cat ~/.ssh/id_ed25519.pub

# 3. Add vào GitHub: Settings → SSH and GPG keys → New SSH key

# 4. Đổi remote URL
git remote set-url origin git@github.com:thanhtung2719123/trillema.git

# 5. Push lại
git push -u origin main
```

---

## Bước 5: Verify trên GitHub

1. Truy cập: https://github.com/thanhtung2719123/trillema
2. Kiểm tra files đã xuất hiện
3. Kiểm tra README.md hiển thị đẹp

---

## Bước 6: Cập Nhật Sau Này

Khi có thay đổi:

```bash
# 1. Check what changed
git status

# 2. Add changes
git add .

# 3. Commit với message mô tả
git commit -m "Update: Add new feature X"

# 4. Push
git push
```

---

## 🎯 Quick Commands Reference

### Check status
```bash
git status
```

### View commit history
```bash
git log --oneline
```

### Undo last commit (keep changes)
```bash
git reset --soft HEAD~1
```

### Discard local changes
```bash
git checkout -- <file>
```

### Pull latest from GitHub
```bash
git pull origin main
```

### Create new branch
```bash
git checkout -b feature/new-feature
```

### Switch branch
```bash
git checkout main
```

---

## 🚨 Common Errors & Fixes

### Error: "Repository not found"
```bash
# Check remote URL
git remote -v

# Fix URL if wrong
git remote set-url origin https://github.com/thanhtung2719123/trillema.git
```

### Error: "Failed to push - non-fast-forward"
```bash
# Pull first, then push
git pull origin main --rebase
git push origin main
```

### Error: "Permission denied"
- Check authentication (token or SSH)
- Make sure you have write access to the repo

### Error: "Large files"
```bash
# If you accidentally added large files
git rm --cached <large-file>
git commit -m "Remove large file"
git push
```

---

## 📁 What Gets Pushed

Files được push (theo .gitignore):
- ✅ All source code (`src/`)
- ✅ Public files (`public/`)
- ✅ Configuration (`package.json`, `vercel.json`)
- ✅ Documentation (`.md` files)
- ❌ node_modules (quá lớn, rebuild trên Vercel)
- ❌ build folder (generated khi deploy)
- ❌ .env files (bảo mật)

---

## 🔐 Security Best Practices

1. **NEVER commit:**
   - API keys trong code
   - Passwords
   - Private keys
   - .env files với secrets

2. **If you accidentally committed secrets:**
   ```bash
   # Remove from history (cẩn thận!)
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch path/to/secret/file" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push (sau khi backup!)
   git push origin --force --all
   
   # Revoke API key ngay lập tức
   ```

3. **Use environment variables:**
   - Local: `.env.local` (gitignored)
   - Production: Vercel Environment Variables

---

## ✅ Checklist

- [ ] Git đã cài đặt
- [ ] Git config đã setup (name, email)
- [ ] Repository đã initialize
- [ ] Remote đã add đúng URL
- [ ] Files đã commit
- [ ] Push thành công
- [ ] Verify trên GitHub
- [ ] README hiển thị đẹp

---

## 🎊 Done!

Repository của bạn giờ đã online tại:
**https://github.com/thanhtung2719123/trillema**

Next steps:
1. ⭐ Star your own repo (để dễ tìm)
2. 📝 Edit README nếu cần
3. 🚀 Deploy lên Vercel (xem DEPLOY.md)

---

**Happy Coding! 💻**

