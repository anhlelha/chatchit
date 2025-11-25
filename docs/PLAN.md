# Kế hoạch Phát triển Chat App Launcher

## 1. Tổng quan Dự án

Ứng dụng cho phép người dùng:
- Nhập URL ứng dụng chat (ví dụ: chat.zalo.me)
- Tự động mở browser thông qua Chrome DevTools MCP
- Chat tự động/thủ công với AI (OpenAI LLM)
- Cấu hình API Key và phong cách chat

## 2. Kiến trúc Kỹ thuật

### 2.1 Tech Stack
- **Frontend**: React + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **State Management**: React Context / Zustand
- **MCP Integration**: Chrome DevTools MCP Server
- **AI Integration**: OpenAI API
- **Build Tool**: Vite

### 2.2 Cấu trúc thư mục
```
chatchit/
├── src/
│   ├── components/
│   │   ├── ChatInterface.tsx      # Giao diện chat chính
│   │   ├── UrlInput.tsx            # Ô nhập URL
│   │   ├── ConfigPanel.tsx         # Panel cấu hình
│   │   ├── MessageList.tsx         # Danh sách tin nhắn
│   │   └── ModeSelector.tsx        # Chọn Manual/Auto
│   ├── hooks/
│   │   ├── useMCP.ts               # Hook tích hợp MCP
│   │   └── useOpenAI.ts            # Hook tích hợp OpenAI
│   ├── services/
│   │   ├── mcpService.ts           # Service MCP
│   │   └── openaiService.ts        # Service OpenAI
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   ├── store/
│   │   └── appStore.ts             # Global state
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### 2.3 Các Component Chính

1. **UrlInput**: Nhập URL chat app
2. **ConfigPanel**: Cấu hình API Key, phong cách chat
3. **ModeSelector**: Toggle Manual/Auto
4. **ChatInterface**: Hiển thị messages và controls
5. **MessageList**: Render danh sách tin nhắn
6. **MessageApproval**: (Manual mode) Approve trước khi gửi

## 3. Luồng Hoạt động

### 3.1 Luồng Khởi tạo
1. Người dùng nhập URL (chat.zalo.me)
2. Nhấn "Launch"
3. Ứng dụng gọi Chrome DevTools MCP
4. MCP mở browser với URL đã nhập
5. Giữ session để tiếp tục chat

### 3.2 Luồng Chat Auto
1. Ứng dụng đọc messages từ browser (qua MCP)
2. Gửi context đến OpenAI
3. Nhận response từ OpenAI
4. Tự động gửi message vào chat (qua MCP)

### 3.3 Luồng Chat Manual
1. Ứng dụng đọc messages từ browser (qua MCP)
2. Gửi context đến OpenAI
3. Nhận response từ OpenAI
4. **Hiển thị message đề xuất cho user**
5. **Chờ user approve/edit**
6. Gửi message sau khi approve (qua MCP)

## 4. Tích hợp MCP

### 4.1 Chrome DevTools MCP
- Sử dụng MCP để điều khiển Chrome
- Mở URL trong tab mới
- Đọc nội dung chat từ DOM
- Gửi tin nhắn vào input field
- Maintain session

### 4.2 MCP Commands cần thiết
```typescript
// Mở browser với URL
mcp.browser.navigate(url)

// Đọc messages từ chat
mcp.browser.query(selector)

// Gửi message
mcp.browser.type(selector, message)
mcp.browser.click(submitButton)
```

## 5. Tích hợp OpenAI

### 5.1 Configuration
- API Key (người dùng cấu hình)
- Model: GPT-4 hoặc GPT-3.5-turbo
- System Prompt: Phong cách chat (người dùng cấu hình)

### 5.2 Chat Flow
```typescript
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: chatStyle },
    ...conversationHistory,
    { role: 'user', content: latestMessage }
  ]
})
```

## 6. Các Tính năng

### 6.1 Phase 1 - MVP
- [x] Nhập URL
- [x] Cấu hình API Key
- [x] Cấu hình Chat Style
- [x] Manual Mode
- [x] Auto Mode
- [x] Tích hợp MCP
- [x] Tích hợp OpenAI

### 6.2 Phase 2 - Enhancements (Future)
- [ ] Lưu conversation history
- [ ] Export chat logs
- [ ] Multiple chat sessions
- [ ] Custom CSS selectors cho từng platform
- [ ] Response templates

## 7. Timeline Thực hiện

1. **Setup Project** (20 phút)
   - Khởi tạo Vite + React + TypeScript
   - Cài đặt dependencies
   - Setup Tailwind CSS

2. **Build UI Components** (40 phút)
   - UrlInput component
   - ConfigPanel component
   - ChatInterface component
   - MessageList component

3. **MCP Integration** (30 phút)
   - Setup MCP client
   - Browser control functions
   - DOM manipulation

4. **OpenAI Integration** (20 phút)
   - OpenAI API setup
   - Chat completion logic
   - Context management

5. **Mode Implementation** (30 phút)
   - Manual mode logic
   - Auto mode logic
   - State management

6. **Testing & Polish** (20 phút)
   - Test với Zalo
   - Bug fixes
   - UI improvements

**Total: ~2.5 giờ**

## 8. Rủi ro và Giải pháp

### 8.1 Rủi ro
1. **MCP không hoạt động với Zalo**: DOM selectors không đúng
2. **CORS issues**: Zalo block external access
3. **Session timeout**: Zalo logout tự động

### 8.2 Giải pháp
1. Cho phép user cấu hình custom selectors
2. Sử dụng MCP để bypass CORS
3. Implement auto-refresh session

## 9. Bảo mật

- API Key được lưu trong localStorage (client-side)
- Không lưu chat history trên server
- Warning user về privacy khi dùng auto mode
