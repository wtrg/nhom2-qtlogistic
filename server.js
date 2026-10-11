const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'student.html')));
app.get('/student', (req, res) => res.sendFile(path.join(__dirname, 'public', 'student.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));

// 15 CÂU HỎI KAHOOT – VẬN TẢI ĐA PHƯƠNG THỨC (XÁO TRỘN 5 CÂU ĐÁNH LỪA CHUYÊN SÂU)
const QUESTIONS = [
  {
    id: 1,
    round: "Câu 1 – Dễ | Trắc nghiệm",
    category: "Khái niệm căn bản",
    icon: "🚢",
    text: "Vận tải đa phương thức là gì?",
    options: [
      { label: "A", text: "Chỉ vận chuyển bằng đường bộ", isCorrect: false },
      { label: "B", text: "Kết hợp từ hai phương thức vận tải trở lên", isCorrect: true },
      { label: "C", text: "Chỉ vận chuyển bằng đường biển", isCorrect: false },
      { label: "D", text: "Chỉ vận chuyển bằng đường hàng không", isCorrect: false }
    ],
    expl: "Vận tải đa phương thức (Multimodal Transport) là phương thức vận chuyển kết hợp từ hai phương thức vận tải trở lên dựa trên 01 hợp đồng dịch vụ vận tải duy nhất."
  },
  {
    id: 2,
    round: "Câu 2 – Khó | Trắc nghiệm đánh lừa",
    category: "Bản chất vai trò MTO",
    icon: "⚡",
    text: "Trong vận tải đa phương thức, đặc điểm nào phản ánh chính xác nhất vai trò của MTO?",
    options: [
      { label: "A", text: "Trực tiếp thực hiện toàn bộ các chặng vận tải bằng phương tiện do mình quản lý.", isCorrect: false },
      { label: "B", text: "Tổ chức chuỗi vận tải kết hợp nhiều phương thức và chịu trách nhiệm theo hợp đồng.", isCorrect: true },
      { label: "C", text: "Điều phối các nhà vận tải riêng lẻ nhưng chỉ chịu trách nhiệm đối với chặng đầu tiên.", isCorrect: false },
      { label: "D", text: "Đại diện chủ hàng lựa chọn phương thức vận tải nhưng không tham gia tổ chức vận chuyển.", isCorrect: false }
    ],
    expl: "MTO tổ chức chuỗi vận tải đa phương thức và chịu trách nhiệm theo phạm vi hợp đồng, không nhất thiết sở hữu hay trực tiếp vận hành toàn bộ phương tiện."
  },
  {
    id: 3,
    round: "Câu 3 – Dễ | Đúng / Sai",
    category: "Đặc điểm sở hữu phương tiện",
    icon: "🏢",
    text: "MTO bắt buộc phải sở hữu tất cả phương tiện vận tải được sử dụng.",
    options: [
      { label: "A", text: "Đúng", isCorrect: false },
      { label: "B", text: "Sai", isCorrect: true }
    ],
    expl: "Sai! MTO không bắt buộc phải sở hữu phương tiện vận tải. MTO có thể là người không sở hữu tàu/phương tiện (NVO-MTO) mà đi thuê phương tiện của các hãng chuyên ngành."
  },
  {
    id: 4,
    round: "Câu 4 – Khó | Trắc nghiệm tình huống",
    category: "Nhận diện VTĐPT",
    icon: "🚛",
    text: "Một lô hàng được vận chuyển bằng xe tải, tàu biển rồi xe tải. Toàn bộ hành trình do một MTO nhận trách nhiệm theo hợp đồng. Đặc điểm nào quan trọng nhất để xác định đây là vận tải đa phương thức?",
    options: [
      { label: "A", text: "Hàng hóa được vận chuyển qua nhiều quốc gia", isCorrect: false },
      { label: "B", text: "Có sử dụng phương tiện thuộc nhiều doanh nghiệp", isCorrect: false },
      { label: "C", text: "Kết hợp nhiều phương thức và có một đơn vị chịu trách nhiệm theo hợp đồng", isCorrect: true },
      { label: "D", text: "Hàng hóa được đóng trong container", isCorrect: false }
    ],
    expl: "Đặc điểm quyết định: Kết hợp từ 2 phương thức vận tải trở lên và toàn bộ hành trình do duy nhất một MTO chịu trách nhiệm theo một hợp đồng trọn gói."
  },
  {
    id: 5,
    round: "Câu 5 – Khó | Trắc nghiệm đánh lừa",
    category: "Tác nghiệp xử lý tổn thất",
    icon: "📦",
    text: "Khi phát hiện hàng hóa bị hư hỏng lúc nhận hàng, cách xử lý nào hợp lý nhất?",
    options: [
      { label: "A", text: "Thông báo ngay cho MTO, sau đó chờ hướng dẫn rồi mới kiểm tra và ghi nhận tổn thất.", isCorrect: false },
      { label: "B", text: "Lập biên bản với đơn vị giao hàng, tiếp tục vận chuyển rồi bổ sung chứng cứ khi cần.", isCorrect: false },
      { label: "C", text: "Chụp ảnh hiện trạng, yêu cầu bồi thường sơ bộ rồi tiến hành giám định sau khi thống nhất.", isCorrect: false },
      { label: "D", text: "Kiểm tra và ghi nhận hiện trạng, lập biên bản, thông báo bên liên quan và phối hợp giám định.", isCorrect: true }
    ],
    expl: "Cần ghi nhận hiện trạng và chứng cứ, lập biên bản, thông báo các bên liên quan rồi phối hợp giám định, xử lý tổn thất."
  },
  {
    id: 6,
    round: "Câu 6 – Dễ | Trắc nghiệm phương thức",
    category: "Đặc tính phương thức",
    icon: "✈️",
    text: "Phương thức vận tải nào nhanh nhất nhưng thường có chi phí cao?",
    options: [
      { label: "A", text: "Đường bộ", isCorrect: false },
      { label: "B", text: "Đường sắt", isCorrect: false },
      { label: "C", text: "Đường biển", isCorrect: false },
      { label: "D", text: "Đường hàng không", isCorrect: true }
    ],
    expl: "Vận tải hàng không (Air Transport) có tốc độ hành trình nhanh nhất nhưng chi phí cước vận chuyển cao nhất trong các phương thức."
  },
  {
    id: 7,
    round: "Câu 7 – Khó | Trắc nghiệm đánh lừa",
    category: "Căn cứ trách nhiệm chặng biển",
    icon: "⚓",
    text: "Khi hàng hóa bị hư hỏng ở chặng đường biển trong chuỗi vận tải đa phương thức, yếu tố nào cần được xem xét để xác định trách nhiệm của MTO?",
    options: [
      { label: "A", text: "Điều khoản hợp đồng, pháp luật áp dụng và chứng cứ liên quan đến tổn thất.", isCorrect: true },
      { label: "B", text: "Giá trị hàng hóa, thời gian vận chuyển và mức phí của chặng đường biển.", isCorrect: false },
      { label: "C", text: "Số lượng nhà vận tải tham gia, phương tiện sử dụng và thời điểm bàn giao hàng.", isCorrect: false },
      { label: "D", text: "Phạm vi bảo hiểm, lịch trình dự kiến và cam kết giao hàng của đơn vị vận tải.", isCorrect: false }
    ],
    expl: "Trách nhiệm cần được xem xét dựa trên hợp đồng, quy định pháp luật áp dụng và chứng cứ về tổn thất."
  },
  {
    id: 8,
    round: "Câu 8 – Khó | Sắp xếp thứ tự",
    category: "Quy trình xử lý tổn thất",
    icon: "📋",
    text: "Sắp xếp quy trình xử lý khi phát hiện hàng hóa bị hư hỏng:\n[A] Thông báo cho MTO và bên bảo hiểm\n[B] Kiểm tra, chụp ảnh hiện trạng hàng hóa\n[C] Lập biên bản ghi nhận tổn thất\n[D] Phối hợp giám định và đề xuất phương án xử lý",
    options: [
      { label: "A", text: "B → C → A → D", isCorrect: true },
      { label: "B", text: "A → B → C → D", isCorrect: false },
      { label: "C", text: "C → B → D → A", isCorrect: false },
      { label: "D", text: "B → A → C → D", isCorrect: false }
    ],
    expl: "Quy trình xử lý chuẩn: [B] Kiểm tra, chụp ảnh hiện trạng → [C] Lập biên bản tổn thất → [A] Thông báo cho MTO & Bảo hiểm → [D] Phối hợp giám định & đề xuất xử lý."
  },
  {
    id: 9,
    round: "Câu 9 – Dễ | Đúng / Sai",
    category: "Khả năng kết hợp",
    icon: "🚢",
    text: "Xe tải kết hợp tàu biển có thể tạo thành vận tải đa phương thức.",
    options: [
      { label: "A", text: "Đúng", isCorrect: true },
      { label: "B", text: "Sai", isCorrect: false }
    ],
    expl: "Đúng! Xe tải (đường bộ) kết hợp với tàu biển (đường biển) là hai phương thức vận tải khác nhau. Khi kết hợp dưới 1 hợp đồng VTĐPT sẽ tạo thành vận tải đa phương thức."
  },
  {
    id: 10,
    round: "Câu 10 – Khó | Trắc nghiệm đánh lừa",
    category: "Chiến lược tối ưu chuỗi",
    icon: "🎯",
    text: "Lợi ích nào thể hiện đúng nhất việc lựa chọn và kết hợp các phương thức vận tải phù hợp?",
    options: [
      { label: "A", text: "Giảm chi phí vận chuyển bằng cách ưu tiên phương thức có giá cước thấp nhất.", isCorrect: false },
      { label: "B", text: "Rút ngắn thời gian giao hàng bằng cách hạn chế số lần chuyển tải giữa các phương thức.", isCorrect: false },
      { label: "C", text: "Cân đối chi phí, thời gian và hiệu quả vận hành theo đặc điểm của lô hàng.", isCorrect: true },
      { label: "D", text: "Hạn chế tổn thất bằng cách sử dụng phương thức vận tải có mức độ an toàn cao nhất.", isCorrect: false }
    ],
    expl: "Kết hợp phương thức phù hợp nhằm cân đối đồng thời chi phí, thời gian và hiệu quả; không chỉ tối ưu một yếu tố riêng lẻ."
  },
  {
    id: 11,
    round: "Câu 11 – Dễ | Trắc nghiệm",
    category: "Vai trò MTO",
    icon: "🌐",
    text: "Vai trò chính của MTO là gì?",
    options: [
      { label: "A", text: "Sản xuất hàng hóa", isCorrect: false },
      { label: "B", text: "Tổ chức vận tải đa phương thức", isCorrect: true },
      { label: "C", text: "Bán bảo hiểm hàng hóa", isCorrect: false },
      { label: "D", text: "Sản xuất phương tiện vận tải", isCorrect: false }
    ],
    expl: "MTO (Multimodal Transport Operator) là người đứng ra ký kết hợp đồng, thiết kế mạng lưới tuyến đường và tổ chức toàn diện quá trình vận tải đa phương thức."
  },
  {
    id: 12,
    round: "Câu 12 – Khó | Trắc nghiệm pháp lý",
    category: "Chế độ trách nhiệm",
    icon: "⚖️",
    text: "Một lô hàng bị hư hỏng trong chặng vận tải biển. Khi xác định trách nhiệm của MTO, yếu tố nào cần được xem xét?",
    options: [
      { label: "A", text: "Chỉ giá trị hợp đồng mua bán", isCorrect: false },
      { label: "B", text: "Quy định pháp luật áp dụng và chứng cứ về tổn thất", isCorrect: true },
      { label: "C", text: "Chỉ số lượng phương tiện tham gia", isCorrect: false },
      { label: "D", text: "Chỉ thời gian giao hàng dự kiến", isCorrect: false }
    ],
    expl: "Trong chế độ trách nhiệm từng chặng (Network Liability), khi xảy ra tổn thất ở chặng biển, cần áp dụng luật điều chỉnh chặng biển và các chứng cứ pháp lý xác minh tổn thất."
  },
  {
    id: 13,
    round: "Câu 13 – Khó | Trắc nghiệm đánh lừa",
    category: "Xử lý đứt gãy chặng",
    icon: "🔄",
    text: "Một chặng đường biển bị chậm, khiến lô hàng có nguy cơ lỡ chặng vận tải tiếp theo. MTO nên ưu tiên phương án nào?",
    options: [
      { label: "A", text: "Giữ nguyên lịch trình ban đầu và chờ xác nhận thời gian cập cảng thực tế.", isCorrect: false },
      { label: "B", text: "Theo dõi tiến độ, phối hợp điều chỉnh chặng tiếp theo và cập nhật các bên liên quan.", isCorrect: true },
      { label: "C", text: "Chuyển ngay sang phương thức vận tải thay thế mà không cần chờ xác nhận từ các bên.", isCorrect: false },
      { label: "D", text: "Thông báo nguy cơ giao trễ cho khách hàng và xử lý các chặng tiếp theo sau khi hàng đến.", isCorrect: false }
    ],
    expl: "Chủ động theo dõi và phối hợp điều chỉnh giúp giảm nguy cơ chậm trễ dây chuyền và đảm bảo các bên được cập nhật."
  },
  {
    id: 14,
    round: "Câu 14 – Khó | Trắc nghiệm phân tích",
    category: "Hiệu quả đa phương thức",
    icon: "📈",
    text: "Doanh nghiệp chọn vận tải đa phương thức để giao hàng quốc tế. Lợi ích nào có thể đạt được khi phối hợp các phương thức vận tải hợp lý?",
    options: [
      { label: "A", text: "Loại bỏ hoàn toàn mọi rủi ro vận chuyển", isCorrect: false },
      { label: "B", text: "Không cần chuẩn bị chứng từ", isCorrect: false },
      { label: "C", text: "Tối ưu chi phí và thời gian vận chuyển", isCorrect: true },
      { label: "D", text: "Đảm bảo hàng hóa không bao giờ bị hư hỏng", isCorrect: false }
    ],
    expl: "Phối hợp hợp lý các phương thức vận tải (ví dụ kết hợp biển - bộ, đường sắt - biển) giúp tối ưu hóa tổng chi phí logistics và rút ngắn thời gian giao hàng."
  },
  {
    id: 15,
    round: "Câu 15 – Khó | Về đích F1",
    category: "Ứng phó sự cố chuỗi",
    icon: "🏁",
    text: "Một lô hàng giao trễ do chặng đường biển bị chậm, khiến chặng vận tải tiếp theo bị ảnh hưởng. Doanh nghiệp nên làm gì để hạn chế thiệt hại?",
    options: [
      { label: "A", text: "Chờ hàng đến nơi rồi mới tìm hiểu nguyên nhân", isCorrect: false },
      { label: "B", text: "Theo dõi hành trình, cập nhật lịch trình và phối hợp điều chỉnh chặng tiếp theo", isCorrect: true },
      { label: "C", text: "Hủy toàn bộ hợp đồng ngay lập tức", isCorrect: false },
      { label: "D", text: "Bỏ qua việc thông báo cho khách hàng", isCorrect: false }
    ],
    expl: "Cần chủ động theo dõi định vị hành trình, liên tục cập nhật thông tin và nhanh chóng phối hợp điều chỉnh phương án hoặc lịch trình chặng kế tiếp để hạn chế tối đa rủi ro dây chuyền."
  }
];

const QUESTION_TIME = 15; // 15s answering time (giảm xuống 15s theo yêu cầu)
const REVEAL_TIME = 8;    // 3s xem đáp án + 5s đếm ngược to câu tiếp theo
const START_COUNTDOWN_TIME = 5; // 5s đếm ngược to trước khi vào trận

// Server Game State
let gameState = {
  status: 'waiting', // 'waiting' | 'countdown' | 'question' | 'reveal' | 'finished'
  currentQuestionIndex: 0,
  timerSeconds: QUESTION_TIME,
  totalQuestions: QUESTIONS.length,
  answersCount: 0
};

let students = new Map(); // socket.id -> student
let currentRoundAnswers = new Map(); // socket.id -> { optionIndex, isCorrect, pointsEarned, timeSpent }
let gameTimerLoop = null;

function getLeaderboard() {
  const list = Array.from(students.values()).map(s => ({
    id: s.id,
    name: s.name,
    avatar: s.avatar,
    carColor: s.carColor || '#ef4444',
    score: s.score,
    streak: s.streak,
    maxStreak: s.maxStreak,
    correctCount: s.correctCount,
    wrongCount: s.wrongCount,
    lastAnswerCorrect: s.lastAnswerCorrect
  }));

  list.sort((a, b) => b.score - a.score);
  return list;
}

function broadcastLeaderboard() {
  io.emit('sync:leaderboard', {
    leaderboard: getLeaderboard(),
    studentCount: students.size,
    gameState
  });
}

function startCountdownToGame() {
  clearInterval(gameTimerLoop);
  gameState.status = 'countdown';
  gameState.timerSeconds = START_COUNTDOWN_TIME;
  gameState.currentQuestionIndex = 0;
  currentRoundAnswers.clear();

  students.forEach(s => {
    s.score = 0;
    s.streak = 0;
    s.maxStreak = 0;
    s.correctCount = 0;
    s.wrongCount = 0;
    s.lastAnswerCorrect = null;
  });

  io.emit('game:countdown_start', {
    seconds: START_COUNTDOWN_TIME,
    title: '🚦 CHUẨN BỊ XUẤT PHÁT!',
    subtitle: 'Cuộc đua kiến thức chuẩn bị bắt đầu...',
    tip: 'Hãy chuẩn bị ngón tay sẵn sàng trên màn hình!',
    type: 'start'
  });

  let remaining = START_COUNTDOWN_TIME;
  gameTimerLoop = setInterval(() => {
    remaining--;
    gameState.timerSeconds = remaining;

    if (remaining > 0) {
      io.emit('game:countdown_tick', {
        seconds: remaining,
        type: 'start'
      });
    } else {
      // Đạt 0s: Báo xuất phát, sau 700ms bắt đầu câu hỏi 1
      io.emit('game:countdown_tick', {
        seconds: 0,
        type: 'start'
      });
      clearInterval(gameTimerLoop);

      setTimeout(() => {
        gameState.status = 'question';
        gameState.currentQuestionIndex = 0;
        gameState.timerSeconds = QUESTION_TIME;
        currentRoundAnswers.clear();

        const q = QUESTIONS[0];
        io.emit('game:started', {
          questionIndex: 0,
          totalQuestions: QUESTIONS.length,
          question: {
            id: q.id,
            round: q.round,
            category: q.category,
            icon: q.icon,
            text: q.text,
            options: q.options.map(o => ({ label: o.label, text: o.text }))
          },
          timerSeconds: QUESTION_TIME
        });

        startSyncTimer();
        broadcastLeaderboard();
      }, 700);
    }
  }, 1000);
}

function startSyncTimer() {
  clearInterval(gameTimerLoop);

  gameTimerLoop = setInterval(() => {
    if (gameState.status === 'question') {
      gameState.timerSeconds--;

      io.emit('sync:tick', {
        status: gameState.status,
        timerSeconds: gameState.timerSeconds,
        currentQuestionIndex: gameState.currentQuestionIndex,
        answersCount: currentRoundAnswers.size,
        totalStudents: students.size
      });

      // Chỉ chuyển sang reveal khi hết đúng thời gian quy định
      if (gameState.timerSeconds <= 0) {
        transitionToReveal();
      }
    } else if (gameState.status === 'reveal') {
      gameState.timerSeconds--;

      io.emit('sync:tick', {
        status: gameState.status,
        timerSeconds: gameState.timerSeconds,
        currentQuestionIndex: gameState.currentQuestionIndex
      });

      // Ở 5 giây cuối của phần xem đáp án (nếu còn câu tiếp theo), kích hoạt đếm ngược 5s to
      if (gameState.timerSeconds === 5 && gameState.currentQuestionIndex + 1 < QUESTIONS.length) {
        io.emit('game:countdown_start', {
          seconds: 5,
          title: `⚡ CÂU HỎI TIẾP THEO: ${gameState.currentQuestionIndex + 2} / ${QUESTIONS.length}`,
          subtitle: 'Chuẩn bị màn hình sẵn sàng chốt đáp án...',
          tip: 'Tập trung cao độ để bứt phá bảng xếp hạng!',
          type: 'next'
        });
      }

      if (gameState.timerSeconds <= 5 && gameState.timerSeconds >= 0 && gameState.currentQuestionIndex + 1 < QUESTIONS.length) {
        io.emit('game:countdown_tick', {
          seconds: gameState.timerSeconds,
          type: 'next'
        });
      }

      if (gameState.timerSeconds <= 0) {
        transitionToNextQuestion();
      }
    }
  }, 1000);
}

function transitionToReveal() {
  gameState.status = 'reveal';
  gameState.timerSeconds = REVEAL_TIME;

  const q = QUESTIONS[gameState.currentQuestionIndex];
  const correctIdx = q.options.findIndex(o => o.isCorrect);

  const correctRacers = [];
  const wrongRacers = [];
  const statCounts = { A: 0, B: 0, C: 0, D: 0 };

  students.forEach((student, socketId) => {
    const ans = currentRoundAnswers.get(socketId);
    if (ans && ans.isCorrect) {
      student.score += ans.pointsEarned;
      student.streak++;
      if (student.streak > student.maxStreak) student.maxStreak = student.streak;
      student.correctCount++;
      student.lastAnswerCorrect = true;
      correctRacers.push({
        id: student.id,
        name: student.name,
        avatar: student.avatar,
        carColor: student.carColor,
        pointsEarned: ans.pointsEarned,
        streak: student.streak,
        score: student.score
      });
    } else {
      student.streak = 0;
      student.wrongCount++;
      student.lastAnswerCorrect = false;
      wrongRacers.push({
        id: student.id,
        name: student.name,
        avatar: student.avatar,
        carColor: student.carColor,
        score: student.score
      });
    }

    if (ans) {
      const label = ['A', 'B', 'C', 'D'][ans.optionIndex];
      if (label && statCounts[label] !== undefined) statCounts[label]++;
    }
  });

  io.emit('round:reveal', {
    questionIndex: gameState.currentQuestionIndex,
    correctOptionIndex: correctIdx,
    correctRacers,
    wrongRacers,
    stats: statCounts,
    explanation: q.expl,
    leaderboard: getLeaderboard()
  });

  broadcastLeaderboard();
}

function transitionToNextQuestion() {
  if (gameState.currentQuestionIndex + 1 < QUESTIONS.length) {
    gameState.currentQuestionIndex++;
    gameState.status = 'question';
    gameState.timerSeconds = QUESTION_TIME;
    currentRoundAnswers.clear();

    const q = QUESTIONS[gameState.currentQuestionIndex];

    io.emit('round:next', {
      questionIndex: gameState.currentQuestionIndex,
      totalQuestions: QUESTIONS.length,
      question: {
        id: q.id,
        round: q.round,
        category: q.category,
        icon: q.icon,
        text: q.text,
        options: q.options.map(o => ({ label: o.label, text: o.text })) // Hide isCorrect from client inspection
      },
      timerSeconds: QUESTION_TIME,
      leaderboard: getLeaderboard()
    });

    broadcastLeaderboard();
  } else {
    // End Game
    gameState.status = 'finished';
    clearInterval(gameTimerLoop);

    io.emit('game:finished', {
      leaderboard: getLeaderboard(),
      podium: getLeaderboard().slice(0, 3)
    });

    broadcastLeaderboard();
  }
}

io.on('connection', (socket) => {
  // Sync state on connect
  socket.emit('sync:init', {
    gameState,
    studentCount: students.size,
    currentQuestion: QUESTIONS[gameState.currentQuestionIndex]
  });

  // Student join lobby
  socket.on('student:join', (data) => {
    const cleanName = (data.name || 'Tay Đua F1').trim().slice(0, 30);
    students.set(socket.id, {
      id: socket.id,
      name: cleanName,
      avatar: data.avatar || '🏎️',
      carColor: data.carColor || '#ef4444',
      score: 0,
      streak: 0,
      maxStreak: 0,
      correctCount: 0,
      wrongCount: 0,
      lastAnswerCorrect: null
    });

    socket.emit('student:join_ack', {
      success: true,
      studentId: socket.id,
      gameState
    });

    broadcastLeaderboard();
  });

  // Student submits answer for CURRENT synchronized question
  socket.on('student:answer', (data) => {
    if (gameState.status !== 'question') return;
    if (currentRoundAnswers.has(socket.id)) return; // already answered

    const { optionIndex, timeSpent } = data;
    const q = QUESTIONS[gameState.currentQuestionIndex];
    const isCorrect = q && q.options[optionIndex] && q.options[optionIndex].isCorrect;

    // Calculate score: Base 100 + Speed Bonus (up to 50) + Streak bonus
    let points = 0;
    if (isCorrect) {
      const student = students.get(socket.id);
      const currentStreak = student ? student.streak : 0;
      const speedBonus = Math.max(0, Math.floor(50 - (timeSpent / 400)));
      const streakBonus = currentStreak >= 2 ? (currentStreak * 20) : 0;
      points = 100 + speedBonus + streakBonus;
    }

    currentRoundAnswers.set(socket.id, {
      optionIndex,
      isCorrect,
      pointsEarned: points,
      timeSpent
    });

    socket.emit('student:answer_ack', {
      submitted: true,
      optionIndex
    });

    // Notify admin about answers count
    io.emit('sync:progress', {
      answersCount: currentRoundAnswers.size,
      totalStudents: students.size
    });

    // Ghi nhận ngầm câu trả lời, không chuyển sớm mà để hết 20s
  });

  // Admin controls
  socket.on('admin:start_game', () => {
    if (gameState.status === 'countdown') return;
    startCountdownToGame();
  });

  socket.on('admin:skip_question', () => {
    if (gameState.status === 'countdown') {
      clearInterval(gameTimerLoop);
      gameState.status = 'question';
      gameState.currentQuestionIndex = 0;
      gameState.timerSeconds = QUESTION_TIME;
      currentRoundAnswers.clear();
      const q = QUESTIONS[0];
      io.emit('game:started', {
        questionIndex: 0,
        totalQuestions: QUESTIONS.length,
        question: {
          id: q.id,
          round: q.round,
          category: q.category,
          icon: q.icon,
          text: q.text,
          options: q.options.map(o => ({ label: o.label, text: o.text }))
        },
        timerSeconds: QUESTION_TIME
      });
      startSyncTimer();
      broadcastLeaderboard();
    } else if (gameState.status === 'question') {
      transitionToReveal();
    } else if (gameState.status === 'reveal') {
      transitionToNextQuestion();
    }
  });

  socket.on('admin:end_game', () => {
    gameState.status = 'finished';
    clearInterval(gameTimerLoop);

    io.emit('game:finished', {
      leaderboard: getLeaderboard(),
      podium: getLeaderboard().slice(0, 3)
    });
  });

  socket.on('admin:reset_game', () => {
    gameState.status = 'waiting';
    gameState.currentQuestionIndex = 0;
    gameState.timerSeconds = QUESTION_TIME;
    clearInterval(gameTimerLoop);
    currentRoundAnswers.clear();

    students.forEach(s => {
      s.score = 0;
      s.streak = 0;
      s.maxStreak = 0;
      s.correctCount = 0;
      s.wrongCount = 0;
      s.lastAnswerCorrect = null;
    });

    io.emit('game:reset', { gameState });
    broadcastLeaderboard();
  });

  socket.on('admin:kick_student', (studentId) => {
    if (students.has(studentId)) {
      io.to(studentId).emit('student:kicked');
      students.delete(studentId);
      currentRoundAnswers.delete(studentId);
      broadcastLeaderboard();
    }
  });

  socket.on('disconnect', () => {
    if (students.has(socket.id)) {
      students.delete(socket.id);
      currentRoundAnswers.delete(socket.id);
      broadcastLeaderboard();
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`===============================================`);
  console.log(`🏎️💨 SYNCHRONIZED F1 CLASSROOM ARENA RUNNING`);
  console.log(`📱 Cổng Học Sinh (Mobile): http://localhost:${PORT}`);
  console.log(`🎓 Dashboard Giáo Viên:    http://localhost:${PORT}/admin`);
  console.log(`===============================================`);
});
