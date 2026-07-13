# 🎭 Playwright TypeScript Automation Testing Boilerplate

Đây là bộ khung nền tảng (**Boilerplate Framework**) kiểm thử tự động End-to-End (E2E) chuyên nghiệp được xây dựng trên sự kết hợp giữa **Playwright** và **TypeScript**. Framework được thiết kế theo tiêu chuẩn doanh nghiệp, tối ưu cho việc tái sử dụng, khả năng mở rộng dễ dàng, hỗ trợ đa môi trường, tích hợp sẵn CI/CD và cơ chế ngăn chặn Flaky Test thông minh.

---

## 🌟 Tính Năng Nổi Bật (Key Features)

*   **Cấu trúc Page Object Model (POM):** Phân tách rõ ràng giữa kịch bản kiểm thử (Tests) và đối tượng trang (Pages).
*   **Hỗ trợ Đa Môi Trường (Multi-environment configuration):** Tự động tải và áp dụng các cấu hình biến môi trường khác nhau thông qua tệp `.env.*`.
*   **Lá chắn Chống Flaky nâng cao (Anti-Flaky Shield):** Chặn quảng cáo, mã theo dõi bên thứ ba tự động ở cấp độ mạng (Network level) và DOM.
*   **Báo cáo Allure chuyên nghiệp (Allure Reports):** Tích hợp sẵn Allure report, hỗ trợ ghi nhận từng bước chạy chi tiết (`customStep`) và tự động chụp hình/quay phim khi lỗi xảy ra.
*   **Sẵn sàng cho CI/CD (CI/CD Ready):** Cấu hình mẫu GitHub Actions mạnh mẽ giúp thực thi kiểm thử tự động liên tục trên mỗi lượt Pull Request / Push.

---

## 📁 Cấu Trúc Thư Mục Lõi (Core Architecture)

Cây thư mục của dự án được tổ chức khoa học để dễ dàng mở rộng và bảo trì:

```text
playwright-boilerplate/
├── .github/
│   └── workflows/
│       └── playwright-ci.yml   # Workflow GitHub Actions mẫu cho CI/CD
├── src/
│   ├── config/
│   │   ├── environment.ts      # Trình quản lý & cấu hình môi trường (.env)
│   │   ├── .env.qa             # Cấu hình môi trường QA (Mẫu)
│   │   └── .env.prod           # Cấu hình môi trường Production (Mẫu)
│   ├── fixtures/
│   │   └── baseTest.ts         # Khởi tạo Fixtures cốt lõi & cơ chế AdBlocker chặn quảng cáo
│   ├── pages/
│   │   └── BasePage.ts         # Lớp cơ sở (Abstract Class) chứa các tương tác UI dùng chung
│   ├── test-data/
│   │   └── globalData.ts       # Nơi lưu trữ dữ liệu tĩnh toàn dự án
│   └── utils/
│       └── reportHelper.ts     # Trình trợ giúp tạo báo cáo Allure & tự động hóa screenshots
├── tests/
│   └── smoke/
│       └── healthCheck.spec.ts # Bộ kiểm thử kiểm tra độ ổn định của môi trường (Smoke Test)
├── .gitignore                  # Bỏ qua tệp tin không cần thiết và thông tin nhạy cảm
├── package.json                # Quản lý thư viện phụ thuộc và định nghĩa Scripts chạy test
└── playwright.config.ts        # Tệp tin cấu hình trung tâm cho Playwright Engine
```

---

## 🛠️ Yêu Cầu Hệ Thống (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo hệ thống của bạn đã cài đặt:

*   **Node.js**: Phiên bản LTS khuyến nghị (từ `18.x.x` trở lên).
*   **NPM**: Trình quản lý gói đi kèm Node.js.
*   **Java Development Kit (JDK)**: Phiên bản `8` trở lên (bắt buộc để chạy cục bộ báo cáo **Allure Report**).

---

## 🚀 Hướng Dẫn Cài Đặt (Local Setup)

Hãy clone dự án về máy và thực thi các câu lệnh sau từ thư mục gốc của dự án:

### Bước 1: Cài đặt các gói thư viện
```bash
npm install
```
> [!NOTE]
> Khi chạy trên các môi trường CI/CD, khuyến nghị sử dụng lệnh `npm ci` để đảm bảo cài đặt chính xác các phiên bản thư viện đã khóa trong tệp `package-lock.json`.

### Bước 2: Cài đặt Browsers của Playwright
Playwright tải và quản lý các trình duyệt biệt lập. Hãy tải về các Engine (Chromium, Firefox, WebKit) và các thư viện hệ thống cần thiết bằng lệnh:
```bash
npx playwright install --with-deps
```
> [!TIP]
> Tùy chọn `--with-deps` giúp tự động cấu hình các gói thư viện đồ họa cần thiết cho hệ điều hành Linux/Ubuntu trên môi trường CI, giúp tránh các lỗi crash trình duyệt ẩn danh.

### Bước 3: Thiết lập biến môi trường (.env)
1.  Truy cập vào thư mục [src/config/](file:///e:/automation_tester/basecode-playwright-ts/src/config/).
2.  Tạo tệp `.env.qa` hoặc `.env.prod` để phục vụ chạy test trên môi trường tương ứng:
    ```env
    BASE_URL=https://qa.example.com
    TEST_USER_EMAIL=admin@example.com
    TEST_USER_PASSWORD=SecretPassword123
    ```

> [!WARNING]
> Không bao giờ đẩy các tệp chứa thông tin cấu hình thật hoặc thông tin nhạy cảm lên Git. Các tệp `.env.*` đã được bỏ qua mặc định trong cấu hình `.gitignore`.

---

## 🏃 Hướng Dẫn Thực Thi Kiểm Thử (Running Tests)

Bạn có thể chạy các kịch bản kiểm thử một cách linh hoạt bằng các câu lệnh dưới đây:

### 1. Chế độ hiển thị (Execution Modes)

| Câu lệnh | Mô tả |
| :--- | :--- |
| `npx playwright test` | Thực thi kiểm thử ở chế độ ẩn danh (**Headless mode** - tối ưu cho CI) |
| `npx playwright test --headed` | Thực thi kiểm thử có hiển thị trình duyệt (**Headed mode** - tối ưu khi gỡ lỗi) |
| `npx playwright test --ui` | Mở giao diện tương tác trực quan của Playwright UI Mode |

### 2. Chọn Môi trường Chạy (Environment Selection)

Để hệ thống tự động tải đúng cấu hình biến môi trường tương ứng (`.env.qa` hoặc `.env.prod`), hãy tiền định biến `ENV` trước khi chạy test:

*   **Môi trường QA:**
    ```bash
    # Windows (PowerShell)
    $env:ENV="qa"; npx playwright test
    
    # macOS/Linux (Bash)
    ENV=qa npx playwright test
    ```
*   **Môi trường Production:**
    ```bash
    # Windows (PowerShell)
    $env:ENV="prod"; npx playwright test
    
    # macOS/Linux (Bash)
    ENV=prod npx playwright test
    ```

### 3. Lọc bài kiểm thử (Filtering & Tagging)

*   **Chạy toàn bộ test trong một thư mục chỉ định:**
    ```bash
    npx playwright test tests/smoke/
    ```
*   **Chạy bài kiểm thử chứa nhãn/tag chỉ định (Ví dụ `@smoke`):**
    ```bash
    npx playwright test --grep @smoke
    ```

---

## 📊 Báo Cáo Kiểm Thử Allure (Allure Reports)

Framework tích hợp sẵn trình báo cáo Allure Report với khả năng tùy biến cao. Để xem báo cáo một cách trực quan:

1.  **Tạo báo cáo chi tiết** từ kết quả thô sau khi hoàn thành chạy test:
    ```bash
    npx allure generate allure-results --clean -o allure-report
    ```
2.  **Khởi chạy máy chủ cục bộ** để xem trực tiếp báo cáo trên trình duyệt:
    ```bash
    npx allure open allure-report
    ```

---

## 💡 Best Practices & Quy Trình Viết Test Mới

Để duy trì chất lượng mã nguồn và tính ổn định cao nhất, vui lòng tuân thủ các nguyên tắc sau:

### 1. Kế thừa lớp cơ sở `BasePage`
Khi viết bất kỳ một Page Object mới nào, luôn thực hiện kế thừa từ [BasePage](file:///e:/automation_tester/basecode-playwright-ts/src/pages/BasePage.ts) để thừa hưởng các cơ chế tương tác UI an toàn (safe click, safe fill) có khả năng tự động chờ (auto-wait):
```typescript
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly emailInput = '#email';
  
  async login(email: string) {
    // Sử dụng hàm typeInto đã được bọc cơ chế xử lý an toàn từ BasePage
    await this.typeInto(this.emailInput, email);
  }
}
```

### 2. Sử dụng hàm bọc bước kiểm thử `customStep`
Bọc các bước xử lý logic kiểm thử trong hàm `customStep` được nhập từ [reportHelper.ts](file:///e:/automation_tester/basecode-playwright-ts/src/utils/reportHelper.ts). Điều này giúp trình báo cáo Allure phân đoạn các bước rõ ràng và tự động đính kèm ảnh chụp màn hình khi gặp lỗi mà không cần viết lại lệnh `page.screenshot()` thủ công:
```typescript
import { customStep } from "../../utils/reportHelper";

await customStep(page, "Bước 1: Nhập email người dùng", async () => {
  await loginPage.login("user@example.com");
});
```

### 3. Tận dụng lớp bảo vệ `Anti-Flaky Shield`
Khi viết các tệp kịch bản kiểm thử `.spec.ts`, hãy nhập đối tượng `test` và `expect` từ [baseTest.ts](file:///e:/automation_tester/basecode-playwright-ts/src/fixtures/baseTest.ts) thay vì thư viện gốc `@playwright/test`:
```typescript
// KHUYẾN NGHỊ:
import { test, expect } from "../../fixtures/baseTest";

// TRÁNH SỬ DỤNG:
// import { test, expect } from "@playwright/test";
```
> [!IMPORTANT]
> Lớp `baseTest.ts` chứa cơ chế ngăn chặn Flaky Test 2 lớp (cấp độ mạng và DOM), tự động chặn hoàn toàn các quảng cáo, iframe rác, và các đoạn mã theo dõi của bên thứ ba, từ đó giảm đáng kể thời gian chờ đợi vô ích và tăng tính ổn định của kịch bản kiểm thử lên mức tối đa.

---
*Chúc các bạn xây dựng những bộ kiểm thử tự động tin cậy và mượt mà!* 🚀