# 💬 Chat App Launcher

Ứng dụng tự động hóa chat sử dụng AI, tích hợp Chrome DevTools MCP và OpenAI LLM.

## 📋 Tổng quan

Ứng dụng này cho phép bạn:
- 🌐 Kết nối với bất kỳ ứng dụng chat web nào (Zalo, Facebook Messenger, WhatsApp, Telegram)
- 🤖 Chat tự động hoặc thủ công với AI (OpenAI GPT)
- ⚙️ Tùy chỉnh phong cách chat và cấu hình AI
- 🔒 Duy trì session chat liên tục thông qua Chrome DevTools MCP

## 🎨 Xem Mockup

Để xem mockup giao diện tương tác:

```bash
# Mở file mockup.html trong browser
open mockup.html
# hoặc
firefox mockup.html
# hoặc
google-chrome mockup.html
```

## 📚 Tài liệu

- **[PLAN.md](./PLAN.md)** - Kế hoạch phát triển chi tiết
  - Kiến trúc kỹ thuật
  - Cấu trúc thư mục
  - Luồng hoạt động
  - Timeline thực hiện

- **[MOCKUP.md](./MOCKUP.md)** - Mockup giao diện ASCII
  - Tất cả các màn hình
  - Component interactions
  - Color palette
  - Typography

- **[mockup.html](./mockup.html)** - Mockup tương tác
  - Giao diện demo trực quan
  - Các tính năng có thể click
  - Responsive design preview

## 🏗️ Kiến trúc Tổng thể

```
┌─────────────────┐
│   User Input    │
│  (Chat URL)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│  React App UI   │◄────►│ Chrome DevTools  │
│   (Frontend)    │      │    MCP Server    │
└────────┬────────┘      └──────────────────┘
         │                        │
         │                        ▼
         │               ┌──────────────────┐
         │               │   Chat Website   │
         │               │  (Zalo, etc.)    │
         │               └──────────────────┘
         │
         ▼
┌─────────────────┐
│  OpenAI API     │
│  (GPT-4)        │
└─────────────────┘
```

## ✨ Tính năng chính

### 1. URL Launcher
- Nhập URL của ứng dụng chat
- Tự động mở browser qua MCP
- Duy trì session liên tục

### 2. Hai chế độ hoạt động

#### Manual Mode (Thủ công)
- AI đề xuất câu trả lời
- User xem trước và approve/edit
- User quyết định gửi hay không

#### Auto Mode (Tự động)
- AI tự động phản hồi
- Không cần sự can thiệp
- Giám sát và log tất cả

### 3. Cấu hình

#### OpenAI Configuration
- API Key
- Model selection (GPT-4, GPT-3.5)
- Temperature, Max tokens

#### Chat Style
- System prompt tùy chỉnh
- Quick templates
- Phong cách chat (Friendly, Professional, Technical, etc.)

### 4. Giao diện Chat
- Hiển thị lịch sử messages
- Status indicators
- Message approval UI
- Statistics dashboard

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand / React Context
- **MCP Integration**: Chrome DevTools Protocol
- **AI**: OpenAI API (GPT-4)

## 📦 Cấu trúc Dự án (Sẽ được tạo)

```
chatchit/
├── src/
│   ├── components/          # React components
│   │   ├── ChatInterface.tsx
│   │   ├── UrlInput.tsx
│   │   ├── ConfigPanel.tsx
│   │   ├── MessageList.tsx
│   │   └── ModeSelector.tsx
│   ├── hooks/              # Custom hooks
│   │   ├── useMCP.ts
│   │   └── useOpenAI.ts
│   ├── services/           # Business logic
│   │   ├── mcpService.ts
│   │   └── openaiService.ts
│   ├── store/              # State management
│   │   └── appStore.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── PLAN.md                 # Kế hoạch chi tiết
├── MOCKUP.md              # Mockup ASCII
├── mockup.html            # Mockup tương tác
└── README.md              # File này
```

## 🚀 Quy trình Phát triển

### Phase 1: Setup (✅ Đã hoàn thành)
- [x] Lên kế hoạch
- [x] Tạo mockup
- [x] Thiết kế kiến trúc

### Phase 2: Implementation (Chờ approval)
- [ ] Khởi tạo React + TypeScript project
- [ ] Setup Tailwind CSS + UI components
- [ ] Tích hợp Chrome DevTools MCP
- [ ] Tích hợp OpenAI API
- [ ] Implement Manual/Auto modes
- [ ] Testing & polish

## 💡 Cách hoạt động

### 1. Khởi tạo
```
User nhập URL → Click Launch → MCP mở browser → Connected
```

### 2. Chat Flow (Manual)
```
User gửi message trên Zalo
  ↓
App đọc message qua MCP
  ↓
Gửi đến OpenAI
  ↓
Hiển thị response đề xuất
  ↓
User approve/edit/reject
  ↓
Gửi message qua MCP
```

### 3. Chat Flow (Auto)
```
User gửi message trên Zalo
  ↓
App đọc message qua MCP
  ↓
Gửi đến OpenAI
  ↓
Tự động gửi response qua MCP
  ↓
Log và tiếp tục monitor
```

## 🔒 Bảo mật & Privacy

- API Key được lưu local (localStorage)
- Không gửi data lên server bên thứ 3 (ngoài OpenAI)
- Chat history không được persist (tuỳ chọn)
- Warning user về privacy khi dùng auto mode

## 📊 Metrics & Monitoring

App sẽ hiển thị:
- Tổng số messages
- Số messages đã gửi
- Số messages pending approval
- Thời gian response trung bình
- API usage stats

## 🎯 Use Cases

1. **Customer Support Automation**: Tự động trả lời khách hàng trên Zalo
2. **Personal Assistant**: Chat bot cá nhân trên Facebook Messenger
3. **Testing & QA**: Test chat flows và responses
4. **Content Creation**: Tạo nội dung chat tự động

## ⚠️ Lưu ý

- Cần cài đặt Chrome DevTools MCP server
- Cần có OpenAI API key
- Một số platform có thể block automation (cần test)
- Sử dụng có trách nhiệm, tuân thủ Terms of Service

## 📝 Tiếp theo

**Bạn có hài lòng với mockup và kế hoạch này không?**

Nếu đồng ý, tôi sẽ bắt đầu implement:
1. Khởi tạo React + TypeScript project
2. Setup dependencies
3. Build UI components theo mockup
4. Tích hợp MCP và OpenAI
5. Testing

**Thời gian ước tính: ~2-3 giờ**

---

📧 Questions? Issues? Đã có trong kế hoạch chi tiết tại [PLAN.md](./PLAN.md)
