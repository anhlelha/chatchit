# Mockup Giao diện Chat App Launcher

## Màn hình Chính - Layout Tổng thể

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Chat App Launcher                                          [⚙️ Settings] │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ 🌐 Chat URL                                                        │  │
│  │ ┌──────────────────────────────────────────────────┐  [Launch 🚀] │  │
│  │ │ https://chat.zalo.me                             │              │  │
│  │ └──────────────────────────────────────────────────┘              │  │
│  │                                                                    │  │
│  │ Status: ⚪ Not Connected                                           │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ 💬 Chat Interface                        Mode: ◉ Manual ○ Auto    │  │
│  ├────────────────────────────────────────────────────────────────────┤  │
│  │                                                                    │  │
│  │  ┌──────────────────────────────────────────────────────────┐    │  │
│  │  │ 👤 User: Xin chào!                          10:30 AM     │    │  │
│  │  └──────────────────────────────────────────────────────────┘    │  │
│  │                                                                    │  │
│  │  ┌──────────────────────────────────────────────────────────┐    │  │
│  │  │ 🤖 AI (Pending Approval):                   10:30 AM     │    │  │
│  │  │ Chào bạn! Tôi có thể giúp gì cho bạn?                    │    │  │
│  │  │                                                            │    │  │
│  │  │ [✏️ Edit] [✅ Send] [❌ Reject]                            │    │  │
│  │  └──────────────────────────────────────────────────────────┘    │  │
│  │                                                                    │  │
│  │  ┌──────────────────────────────────────────────────────────┐    │  │
│  │  │ 🤖 AI (Sent):                               10:31 AM     │    │  │
│  │  │ Tôi đã nhận được tin nhắn của bạn.                       │    │  │
│  │  └──────────────────────────────────────────────────────────┘    │  │
│  │                                                                    │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  [▶️ Start] [⏸️ Pause] [⏹️ Stop]                                          │
│                                                                            │
└──────────────────────────────────────────────────────────────────────────┘
```

## 1. Màn hình URL Input (Not Connected)

```
╔════════════════════════════════════════════════════════════════════════╗
║  Chat App Launcher                                    [⚙️ Settings]     ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  ┌──────────────────────────────────────────────────────────────────┐  ║
║  │ 🌐 Enter Chat Application URL                                    │  ║
║  │                                                                   │  ║
║  │ ┌─────────────────────────────────────────────────┐             │  ║
║  │ │ https://chat.zalo.me                            │   [Launch]  │  ║
║  │ └─────────────────────────────────────────────────┘             │  ║
║  │                                                                   │  ║
║  │ 💡 Supported platforms:                                          │  ║
║  │    • Zalo (chat.zalo.me)                                         │  ║
║  │    • Facebook Messenger (messenger.com)                          │  ║
║  │    • WhatsApp Web (web.whatsapp.com)                             │  ║
║  │    • Telegram Web (web.telegram.org)                             │  ║
║  │                                                                   │  ║
║  │ Status: ⚪ Not Connected                                          │  ║
║  └──────────────────────────────────────────────────────────────────┘  ║
║                                                                          ║
║  ⚠️  Make sure you have Chrome DevTools MCP configured                  ║
║                                                                          ║
╚════════════════════════════════════════════════════════════════════════╝
```

## 2. Màn hình Settings Panel

```
╔════════════════════════════════════════════════════════════════════════╗
║  ⚙️ Settings                                            [✖️ Close]      ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  ┌──────────────────────────────────────────────────────────────────┐  ║
║  │ 🔑 OpenAI Configuration                                          │  ║
║  │                                                                   │  ║
║  │ API Key *                                                         │  ║
║  │ ┌─────────────────────────────────────────────────────────────┐ │  ║
║  │ │ sk-proj-********************************                    │ │  ║
║  │ └─────────────────────────────────────────────────────────────┘ │  ║
║  │                                                                   │  ║
║  │ Model                                                             │  ║
║  │ ┌─────────────────────────────────────────────────────────────┐ │  ║
║  │ │ gpt-4                                    [▼]                 │ │  ║
║  │ └─────────────────────────────────────────────────────────────┘ │  ║
║  │                                                                   │  ║
║  └──────────────────────────────────────────────────────────────────┘  ║
║                                                                          ║
║  ┌──────────────────────────────────────────────────────────────────┐  ║
║  │ 💬 Chat Style Configuration                                      │  ║
║  │                                                                   │  ║
║  │ System Prompt (How should the AI behave?)                        │  ║
║  │ ┌─────────────────────────────────────────────────────────────┐ │  ║
║  │ │ Bạn là một trợ lý thân thiện và chuyên nghiệp.              │ │  ║
║  │ │ Trả lời ngắn gọn, lịch sự và hữu ích.                        │ │  ║
║  │ │ Sử dụng emoji một cách phù hợp.                              │ │  ║
║  │ │                                                               │ │  ║
║  │ │                                                               │ │  ║
║  │ └─────────────────────────────────────────────────────────────┘ │  ║
║  │                                                                   │  ║
║  │ 📋 Quick Templates:                                              │  ║
║  │ [Friendly] [Professional] [Funny] [Technical] [Custom]          │  ║
║  │                                                                   │  ║
║  └──────────────────────────────────────────────────────────────────┘  ║
║                                                                          ║
║  ┌──────────────────────────────────────────────────────────────────┐  ║
║  │ 🎛️ Advanced Settings                                             │  ║
║  │                                                                   │  ║
║  │ Temperature: 0.7  ━━━━━━━●━━━  1.0                              │  ║
║  │ Max Tokens: 500   ━━━━●━━━━━━  2000                             │  ║
║  │                                                                   │  ║
║  │ ☑️ Auto-scroll to latest message                                 │  ║
║  │ ☑️ Show timestamps                                               │  ║
║  │ ☐ Play sound on new message                                      │  ║
║  │                                                                   │  ║
║  └──────────────────────────────────────────────────────────────────┘  ║
║                                                                          ║
║                                    [Cancel]  [Save Settings]            ║
║                                                                          ║
╚════════════════════════════════════════════════════════════════════════╝
```

## 3. Màn hình Chat Interface - Manual Mode

```
╔════════════════════════════════════════════════════════════════════════╗
║  💬 Chat Interface - chat.zalo.me                     [⚙️] [🔌 Disc.]  ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Mode: ◉ Manual  ○ Auto     Status: 🟢 Connected     Messages: 12      ║
║                                                                          ║
║  ┌────────────────────────────────────────────────────────────────┐    ║
║  │ 📜 Message History                                             │    ║
║  ├────────────────────────────────────────────────────────────────┤    ║
║  │                                                                 │    ║
║  │  👤 User: Cho tôi biết giá sản phẩm X?                         │    ║
║  │  🕐 10:25 AM                                                    │    ║
║  │                                                                 │    ║
║  │  🤖 AI: Sản phẩm X có giá 500,000 VNĐ                          │    ║
║  │  🕐 10:25 AM  ✅ Sent                                           │    ║
║  │                                                                 │    ║
║  │  👤 User: Có giảm giá không?                                    │    ║
║  │  🕐 10:27 AM                                                    │    ║
║  │                                                                 │    ║
║  │  ╔══════════════════════════════════════════════════════╗      │    ║
║  │  ║ 🤖 AI Response (Pending Approval)                   ║      │    ║
║  │  ║ 🕐 10:27 AM                                          ║      │    ║
║  │  ╠══════════════════════════════════════════════════════╣      │    ║
║  │  ║                                                      ║      │    ║
║  │  ║ Hiện tại sản phẩm X đang có chương trình giảm giá   ║      │    ║
║  │  ║ 20%, giá chỉ còn 400,000 VNĐ. Chương trình áp dụng  ║      │    ║
║  │  ║ đến hết ngày 30/11. Bạn có muốn đặt hàng không? 😊  ║      │    ║
║  │  ║                                                      ║      │    ║
║  │  ║ ┌──────────────────────────────────────────────┐   ║      │    ║
║  │  ║ │ [✏️ Edit Message]  [✅ Send]  [❌ Reject]     │   ║      │    ║
║  │  ║ └──────────────────────────────────────────────┘   ║      │    ║
║  │  ╚══════════════════════════════════════════════════════╝      │    ║
║  │                                                                 │    ║
║  └────────────────────────────────────────────────────────────────┘    ║
║                                                                          ║
║  Controls: [▶️ Start]  [⏸️ Pause]  [⏹️ Stop]  [🗑️ Clear History]        ║
║                                                                          ║
╚════════════════════════════════════════════════════════════════════════╝
```

## 4. Màn hình Chat Interface - Auto Mode

```
╔════════════════════════════════════════════════════════════════════════╗
║  💬 Chat Interface - chat.zalo.me                     [⚙️] [🔌 Disc.]  ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Mode: ○ Manual  ◉ Auto     Status: 🟢 Running      Messages: 45       ║
║                                                                          ║
║  ┌────────────────────────────────────────────────────────────────┐    ║
║  │ 📜 Message History                            [Auto-scroll ON] │    ║
║  ├────────────────────────────────────────────────────────────────┤    ║
║  │                                                                 │    ║
║  │  👤 User: Tôi muốn đặt hàng                                     │    ║
║  │  🕐 11:10 AM                                                    │    ║
║  │                                                                 │    ║
║  │  🤖 AI: Vâng, tôi sẽ hỗ trợ bạn đặt hàng. Bạn muốn đặt         │    ║
║  │     sản phẩm nào?                                               │    ║
║  │  🕐 11:10 AM  ✅ Auto-sent                                      │    ║
║  │                                                                 │    ║
║  │  👤 User: Sản phẩm X, số lượng 2                                │    ║
║  │  🕐 11:11 AM                                                    │    ║
║  │                                                                 │    ║
║  │  🤖 AI: Đã ghi nhận. Đơn hàng của bạn:                          │    ║
║  │     • Sản phẩm X x2                                             │    ║
║  │     • Tổng: 800,000 VNĐ                                         │    ║
║  │     Bạn vui lòng cho biết địa chỉ giao hàng.                   │    ║
║  │  🕐 11:11 AM  ✅ Auto-sent                                      │    ║
║  │                                                                 │    ║
║  │  ⏳ Waiting for user response...                                │    ║
║  │                                                                 │    ║
║  └────────────────────────────────────────────────────────────────┘    ║
║                                                                          ║
║  ⚠️  Auto Mode Active - AI is responding automatically                  ║
║                                                                          ║
║  Controls: [⏸️ Pause]  [⏹️ Stop]  [🗑️ Clear History]                   ║
║                                                                          ║
╚════════════════════════════════════════════════════════════════════════╝
```

## 5. Màn hình Edit Message Dialog

```
╔════════════════════════════════════════════════════════════════════════╗
║  ✏️ Edit AI Message                                      [✖️ Close]     ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Original Message:                                                      ║
║  ┌──────────────────────────────────────────────────────────────────┐  ║
║  │ Hiện tại sản phẩm X đang có chương trình giảm giá 20%, giá chỉ  │  ║
║  │ còn 400,000 VNĐ. Chương trình áp dụng đến hết ngày 30/11.       │  ║
║  │ Bạn có muốn đặt hàng không? 😊                                   │  ║
║  └──────────────────────────────────────────────────────────────────┘  ║
║                                                                          ║
║  Edit Your Message:                                                     ║
║  ┌──────────────────────────────────────────────────────────────────┐  ║
║  │ Hiện tại sản phẩm X đang có chương trình giảm giá 20%, giá chỉ  │  ║
║  │ còn 400,000 VNĐ. Chương trình áp dụng đến hết ngày 30/11.       │  ║
║  │ Bạn có muốn đặt hàng không? 😊                                   │  ║
║  │ ▌                                                                 │  ║
║  └──────────────────────────────────────────────────────────────────┘  ║
║                                                                          ║
║  Character count: 152 / 2000                                            ║
║                                                                          ║
║                                [Cancel]  [Send Edited Message]          ║
║                                                                          ║
╚════════════════════════════════════════════════════════════════════════╝
```

## 6. Màn hình Status và Notifications

```
╔════════════════════════════════════════════════════════════════════════╗
║  Status Bar                                                             ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  🟢 Connected to chat.zalo.me                                           ║
║  🤖 AI Status: Active                                                   ║
║  📊 Stats: 45 messages exchanged, 23 auto-sent, 22 manual approved     ║
║                                                                          ║
║  Recent Activity:                                                       ║
║  • 11:15:23 - Message received from user                                ║
║  • 11:15:25 - AI generated response                                     ║
║  • 11:15:26 - Message auto-sent successfully                            ║
║                                                                          ║
╚════════════════════════════════════════════════════════════════════════╝
```

## Màu sắc và Styling

### Color Palette
- **Primary**: #3b82f6 (Blue) - Buttons, links
- **Success**: #10b981 (Green) - Connected status, sent messages
- **Warning**: #f59e0b (Orange) - Pending approvals
- **Danger**: #ef4444 (Red) - Errors, disconnect
- **Background**: #f9fafb (Light gray)
- **Card**: #ffffff (White)
- **Text Primary**: #111827 (Dark gray)
- **Text Secondary**: #6b7280 (Gray)

### Typography
- **Headers**: Inter, Bold, 16-24px
- **Body**: Inter, Regular, 14px
- **Monospace**: Fira Code, 12px (for URLs, code)

### Icons
- User messages: 👤
- AI messages: 🤖
- Settings: ⚙️
- Status: 🟢/🟡/🔴
- Actions: ✏️/✅/❌/🗑️

## Component Interactions

### 1. Launch Flow
```
[Enter URL] → [Click Launch] → [Loading...] → [Browser Opens] → [Connected]
```

### 2. Manual Chat Flow
```
[User sends message in Zalo]
  → [App detects message]
  → [Send to OpenAI]
  → [Show proposed response]
  → [User reviews]
  → [User clicks Send/Edit/Reject]
  → [Message sent to Zalo]
```

### 3. Auto Chat Flow
```
[User sends message in Zalo]
  → [App detects message]
  → [Send to OpenAI]
  → [Auto-send response]
  → [Continue monitoring]
```

### 4. Settings Flow
```
[Click Settings]
  → [Settings Panel Opens]
  → [User edits config]
  → [Click Save]
  → [Validate inputs]
  → [Save to localStorage]
  → [Panel closes]
```

## Responsive Design

- Desktop: 1200px+ (Full layout as shown)
- Tablet: 768-1199px (Stacked layout, collapsible panels)
- Mobile: < 768px (Single column, drawer navigation)
