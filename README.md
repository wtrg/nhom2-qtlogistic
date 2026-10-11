# 🚢 MTO SPEED RUN - LOGISTICS CLASSROOM ARENA

Hệ thống Mini-game thi đấu thời gian thực (Real-time Multiplayer) dành cho lớp học Logistics, phục vụ ôn tập chuyên đề: **"QUẢN TRỊ LOGISTICS: VẬN TẢI ĐA PHƯƠNG THỨC (MULTIMODAL TRANSPORT)"**.

---

## 🌟 TÍNH NĂNG NỔI BẬT

### 📱 1. Cổng Học Sinh (Mobile First) - `/student` hoặc `/`
- Tối ưu 100% cho màn hình điện thoại di động (giao diện dọc, nút bấm lớn, chống chạm nhầm).
- Nhập Tên / Mã SV + Chọn Linh vật Chibi đáng yêu (🚢 Tàu biển, 🚚 Container, ✈️ Máy bay, 🚆 Tàu hỏa...).
- Đa dạng thể loại câu hỏi (Quẹt phân loại, Trắc nghiệm tốc độ, Tình huống xử lý khủng hoảng tác nghiệp).
- **Web Audio Synthesizer tích hợp sẵn:** Nhạc nền 8-bit vui nhộn, hiệu ứng âm thanh Ding! khi trả lời đúng, Boing! khi sai, hiệu ứng pháo hoa Confetti và chuỗi Combo 🔥.
- Hệ thống tính điểm thông minh: Điểm cơ bản + Điểm phản xạ thần tốc + Điểm chuỗi Streak liên tiếp.

### 🎓 2. Bảng Điều Khiển Giáo Viên (Admin Dashboard) - `/admin`
- Màn hình lớn chuẩn máy chiếu / TV giảng đường.
- **Bục Vinh Danh 3D (Live Podium):** Cập nhật từng giây 🥇 Quán Quân, 🥈 Á Quân, 🥉 Quý Quân.
- **Bảng Xếp Hạng Toàn Lớp (Live Leaderboard):** Hiển thị điểm số, tiến độ câu hỏi, chuỗi streak, độ chính xác, trạng thái hoàn thành.
- **Bộ Phân Tích Câu Hỏi (Question Analytics):** Thống kê tỷ lệ đúng của từng câu để giáo viên biết sinh viên yếu phần nào (pháp lý NĐ 87, tính SDR, hay xử lý lỡ cut-off) để giảng giải lại ngay sau trận đấu.
- Điều khiển linh hoạt: Bắt đầu 180s, Kết thúc sớm, Đua lại, Kích học sinh nếu đặt tên không phù hợp.

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY TẠI LỚP HỌC (LAN / WIFI)

1. Mở thư mục dự án: `C:\Users\Lenovo\.gemini\antigravity\scratch\mto-classroom-game`
2. Nhấp đúp vào file `start.bat` (hoặc mở Terminal gõ `node server.js`).
3. Truy cập:
   - **Giáo viên (Laptop/Máy chiếu):** `http://localhost:3000/admin`
   - **Sinh viên (Điện thoại kết nối chung Wi-Fi):** `http://192.168.100.48:3000`

---

## 🌐 HƯỚNG DẪN DEPLOY LÊN INTERNET (HOÀN TOÀN MIỄN PHÍ)

Nếu muốn sinh viên ở nhà hoặc dùng 4G có thể tham gia bất kỳ đâu mà không cần chung Wi-Fi:

### Cách 1: Deploy lên Render.com (Khuyên dùng nhất)
1. Đẩy thư mục này lên một repository GitHub cá nhân.
2. Đăng nhập vào [Render.com](https://render.com) -> Chọn **New Web Service**.
3. Kết nối với repo GitHub -> Chọn nhánh `main`.
4. Render sẽ tự động phát hiện `package.json` và chạy lệnh:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Sau 2 phút, bạn sẽ có một đường link công khai dạng: `https://mto-game.onrender.com`.

### Cách 2: Deploy lên Railway.app
1. Truy cập [Railway.app](https://railway.app) -> Chọn **Deploy from GitHub repo**.
2. Railway tự động cấp link domain HTTPS công khai cho cả lớp truy cập.
