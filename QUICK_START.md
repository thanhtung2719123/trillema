# Quick Start Guide | Hướng Dẫn Nhanh

## English 🇬🇧

### Installation (3 minutes)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the app**:
   ```bash
   npm start
   ```

3. **Open your browser**:
   - The app will automatically open at [http://localhost:3000](http://localhost:3000)
   - If not, manually navigate to this URL

### First Simulation (2 minutes)

1. **Get a Gemini API Key** (optional, but recommended):
   - Visit: https://aistudio.google.com/app/apikey
   - Click "Create API Key"
   - Copy the key
   - Paste it in the app's API Key input field
   - Click "Save"

2. **Run your first simulation**:
   - The app loads with Vietnam's current economic data
   - Click the **"MÔ PHỎNG"** (Simulate) button
   - See the results appear below

3. **Try changing something**:
   - Move the "Vietnam Policy Rate" slider to 7%
   - Click "Simulate" again
   - See how the exchange rate changes!

4. **Get AI explanation**:
   - Click **"TẠO GIẢI THÍCH"** (Generate Explanation)
   - Read the detailed analysis

### Example Scenarios to Try

**Scenario A: Rate Hike**
- Vietnam Rate: 7% ↑
- US Fed Rate: 4.25% (keep)
- Capital Openness: -0.166 (keep)
- Result: VND appreciates, capital inflow

**Scenario B: Capital Liberation**
- Vietnam Rate: 4.5% (keep)
- US Fed Rate: 4.25% (keep)
- Capital Openness: +1.0 ↑
- Result: Higher volatility, outflow pressure

**Scenario C: Crisis**
- Vietnam Rate: 4.5% (keep)
- US Fed Rate: 6% ↑
- Capital Openness: +0.5 ↑
- Foreign Reserves: $30B ↓
- Result: Crisis warning!

---

## Tiếng Việt 🇻🇳

### Cài Đặt (3 phút)

1. **Cài đặt các gói phụ thuộc**:
   ```bash
   npm install
   ```

2. **Khởi động ứng dụng**:
   ```bash
   npm start
   ```

3. **Mở trình duyệt**:
   - Ứng dụng sẽ tự động mở tại [http://localhost:3000](http://localhost:3000)
   - Nếu không, hãy truy cập URL này

### Mô Phỏng Đầu Tiên (2 phút)

1. **Lấy Gemini API Key** (tùy chọn, nhưng nên có):
   - Truy cập: https://aistudio.google.com/app/apikey
   - Nhấn "Create API Key"
   - Sao chép key
   - Dán vào ô nhập API Key trong ứng dụng
   - Nhấn "Lưu"

2. **Chạy mô phỏng đầu tiên**:
   - Ứng dụng tải với dữ liệu kinh tế thực tế của Việt Nam
   - Nhấn nút **"MÔ PHỎNG"**
   - Xem kết quả hiển thị bên dưới

3. **Thử thay đổi tham số**:
   - Kéo thanh trượt "Lãi Suất Tái Cấp Vốn VN" lên 7%
   - Nhấn "Mô Phỏng" lại
   - Xem tỷ giá thay đổi như thế nào!

4. **Nhận giải thích từ AI**:
   - Nhấn **"TẠO GIẢI THÍCH"**
   - Đọc phân tích chi tiết

### Các Kịch Bản Mẫu

**Kịch Bản A: Tăng Lãi Suất**
- Lãi suất VN: 7% ↑
- Lãi suất Fed Mỹ: 4.25% (giữ nguyên)
- Độ mở vốn: -0.166 (giữ nguyên)
- Kết quả: VND tăng giá, vốn chảy vào

**Kịch Bản B: Tự Do Hóa Vốn**
- Lãi suất VN: 4.5% (giữ nguyên)
- Lãi suất Fed Mỹ: 4.25% (giữ nguyên)
- Độ mở vốn: +1.0 ↑
- Kết quả: Biến động cao, áp lực vốn chảy ra

**Kịch Bản C: Khủng Hoảng**
- Lãi suất VN: 4.5% (giữ nguyên)
- Lãi suất Fed Mỹ: 6% ↑
- Độ mở vốn: +0.5 ↑
- Dự trữ ngoại hối: $30 tỷ ↓
- Kết quả: Cảnh báo khủng hoảng!

---

## Troubleshooting | Khắc Phục Sự Cố

### Problem: npm install fails
**Solution**: 
- Make sure you have Node.js v14+ installed
- Run: `npm cache clean --force`
- Try again: `npm install`

### Problem: "API Key error" when generating explanation
**Solution**:
- Get a new API key from https://aistudio.google.com/app/apikey
- Make sure you copied the entire key
- Try re-entering it

### Problem: App doesn't open
**Solution**:
- Manually navigate to http://localhost:3000
- Check if port 3000 is already in use
- Try: `npx kill-port 3000` then `npm start`

### Vấn đề: npm install lỗi
**Giải pháp**:
- Đảm bảo bạn đã cài Node.js v14 trở lên
- Chạy: `npm cache clean --force`
- Thử lại: `npm install`

### Vấn đề: "API Key error" khi tạo giải thích
**Giải pháp**:
- Lấy API key mới từ https://aistudio.google.com/app/apikey
- Đảm bảo bạn đã sao chép toàn bộ key
- Thử nhập lại

### Vấn đề: Ứng dụng không mở
**Giải pháp**:
- Tự mở trình duyệt và vào http://localhost:3000
- Kiểm tra xem cổng 3000 có đang được sử dụng không
- Thử: `npx kill-port 3000` rồi `npm start`


