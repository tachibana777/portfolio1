# Kritsada Hongpatsa — Security Portfolio

---

## 🛠️ Tech Stack

- **Core & Framework:**
  - [Next.js](https://nextjs.org/) 15 (App Router)
  - [React](https://react.dev/) 19
  - [TypeScript](https://www.typescriptlang.org/)
- **Styling & UI:**
  - [Tailwind CSS](https://tailwindcss.com/) 3
  - [PostCSS](https://postcss.org/) & Autoprefixer
  - Custom Modern Dark/Cyberpunk Theme & Glassmorphism (`app/globals.css`)
- **Animation & Motion:**
  - [Framer Motion](https://www.framer.com/motion/) (Scroll Reveal, Hover Effects, Page Animations)
- **Icons & Display Components:**
  - [Lucide React](https://lucide.dev/)
  - [React Icons](https://react-icons.github.io/react-icons/) (FontAwesome, Simple Icons)
  - [react-github-calendar](https://github.com/grubersjoe/react-github-calendar)
- **Theme Management:**
  - [next-themes](https://github.com/pacocoursey/next-themes) (ระบบสลับ Dark Mode / Light Mode)

---

## 📁 โครงสร้างโปรเจกต์และจุดแก้ไขข้อมูล (Project Structure & Guide)

```text
newportfolio/
├── app/                        # เส้นทางหน้าเว็บ (Routes) และการตั้งค่าหน้าเพจ
│   ├── layout.tsx              # โครงสร้างหลักของทุกหน้า (Root Layout, Navbar, Footer, ThemeProvider)
│   ├── globals.css             # สไตล์รวม, ฟอนต์, เอฟเฟกต์สี, แอนิเมชันพื้นหลัง
│   ├── page.tsx                # หน้าแรก (Home Page) รวมทุก Section
│   ├── projects/page.tsx       # หน้ารวมผลงานทั้งหมด (All Projects)
│   ├── certifications/page.tsx # หน้ารวมใบรับรองและเกียรติบัตร (All Certifications)
│   ├── experience/page.tsx     # หน้าประวัติการทำงานและแล็บ (Experience)
│   ├── technologies/page.tsx   # หน้ารวมทักษะและเครื่องมือทั้งหมด (All Technologies)
│   └── events/page.tsx         # หน้าประมวลภาพกิจกรรมและการแข่งขัน (Events Gallery)
│
├── components/                 # คอมโพเนนต์แยกตามฟังก์ชัน
│   ├── layout/                 # ส่วนโครงหน้าเว็บส่วนกลาง
│   │   ├── Header.tsx          # แถบเมนูด้านบน (Navigation Bar)
│   │   ├── Footer.tsx          # ส่วนท้ายของหน้าเว็บ (Footer & Copyright)
│   │   └── PageShell.tsx       # คอนเทนเนอร์หุ้มหน้าเพจย่อย
│   │
│   ├── home/                   # ส่วนประกอบย่อยในหน้าแรก
│   │   ├── HeroSection.tsx     # ส่วนหัวหน้าเว็บ (ชื่อ, แนะนำตัว, ปุ่ม CTA)
│   │   ├── ProfileAvatar.tsx   # รูปโปรไฟล์พร้อมลูกเล่นการ์ดหมุน/สลับภาพ
│   │   ├── BackgroundSection.tsx # ส่วนเกริ่นประวัติความเป็นมาและข้อมูลแนะนำ
│   │   ├── ExperienceSection.tsx # ส่วนแสดงประวัติการทำงานแบบย่อหน้าแรก
│   │   ├── ProjectsSection.tsx   # ส่วนแสดงโปรเจกต์ไฮไลต์หน้าแรก
│   │   ├── TechnologiesSection.tsx # แถบเลื่อนแสดงไอคอนเครื่องมือ (Marquee)
│   │   ├── GitHubActivity.tsx  # ส่วนแสดงกราฟการ Commit จาก GitHub
│   │   ├── OutsideSection.tsx  # ภาพกิจกรรมและชีวิตนอกเวลางาน
│   │   └── ContactSection.tsx  # ข้อมูลติดต่อ และช่องทางโซเชียลมีเดีย
│   │
│   ├── projects/               # คอมโพเนนต์เกี่ยวกับผลงาน
│   │   ├── ProjectCard.tsx     # การ์ดแสดงผลงานแต่ละรายการ
│   │   └── ProjectList.tsx     # การจัดเลย์เอาต์รายการโปรเจกต์
│   │
│   ├── certifications/         # คอมโพเนนต์เกี่ยวกับใบรับรอง
│   │   ├── CertificateList.tsx # รายการใบเซอร์ พร้อมระบบเปิดดูรูปขนาดใหญ่ (Modal)
│   │   └── CertificateThumbnail.tsx # การ์ดแสดงพรีวิวใบเซอร์
│   │
│   ├── theme/                  # ระบบสลับธีมหน้าเว็บ
│   │   ├── ThemeProvider.tsx   # Provider สำหรับจัดการ Dark/Light Theme
│   │   └── ThemeToggle.tsx     # ปุ่มกดสลับ Dark / Light Mode
│   │
│   └── ui/                     # คอมโพเนนต์ UI ทั่วไปที่ใช้ซ้ำ
│       ├── Reveal.tsx          # แอนิเมชัน Fade-in เมื่อเลื่อนหน้าจอ (Scroll Reveal)
│       ├── SectionHeading.tsx  # หัวข้อประจำแต่ละ Section
│       ├── PageIntro.tsx       # หัวข้อประจำหน้าเพจย่อย
│       ├── Marquee.tsx         # เอฟเฟกต์ตัวอักษรหรือไอคอนวิ่งวนลูป
│       └── Pagination.tsx      # แถบสลับหน้า (Pagination)
│
├── lib/                        # **จุดสำคัญ: แหล่งข้อมูลเนื้อหาของเว็บไซต์**
│   ├── data.ts                 # 📌 แก้ไขข้อมูลโปรเจกต์, ประวัติงาน, ใบเซอร์, ภาพกิจกรรม
│   ├── technologies.ts         # 📌 แก้ไขรายการทักษะ, เครื่องมือ, ไอคอน, สีไอคอน
│   └── types.ts                # โครงสร้าง Type ทางเทคนิค (TypeScript Interfaces)
│
└── public/                     # ไฟล์สื่อ รูปภาพ และไฟล์เอกสารสำหรับดาวน์โหลด
    ├── profile.jpg             # รูปโปรไฟล์หลัก
    ├── anime.jpg               # รูปโปรไฟล์สำรอง/ภาพอนิเมะ
    ├── kritsada-hongpatsa-cv.png # ไฟล์รูป CV/เรซูเม่
    ├── certificates/           # โฟลเดอร์เก็บไฟล์ภาพใบรับรอง/ใบเซอร์ทั้งหมด (.jpg/.png)
    ├── events/                 # โฟลเดอร์เก็บไฟล์ภาพกิจกรรม/CTF/Hackathon ทั้งหมด
    └── outside/                # โฟลเดอร์เก็บไฟล์ภาพกิจกรรมทั่วไป
```

---

## 🎯 สรุปจุดที่ต้องเข้าไปแก้ไขเมื่อต้องการอัปเดตข้อมูล

| ข้อมูลที่ต้องการแก้ | ไฟล์ / โฟลเดอร์ที่ต้องไปแก้ |
| :--- | :--- |
| **เพิ่ม/แก้ ข้อมูลโปรเจกต์** (ชื่อ, ตำแหน่ง, รายละเอียด, ลิงก์) | [`lib/data.ts`](file:///c:/Users/KRITSADA/Desktop/newportfolio/lib/data.ts) ในตัวแปร `projects` |
| **เพิ่ม/แก้ ประวัติการทำงานและแล็บ** | [`lib/data.ts`](file:///c:/Users/KRITSADA/Desktop/newportfolio/lib/data.ts) ในตัวแปร `experiences` |
| **เพิ่ม/แก้ ใบเซอร์และเกียรติบัตร** | [`lib/data.ts`](file:///c:/Users/KRITSADA/Desktop/newportfolio/lib/data.ts) ในตัวแปร `certificates` |
| **เพิ่ม/ลบ รูปภาพกิจกรรมและ CTF** | [`lib/data.ts`](file:///c:/Users/KRITSADA/Desktop/newportfolio/lib/data.ts) ในตัวแปร `eventImages` และนำไฟล์ไปวางที่ `public/events/` |
| **เพิ่ม/แก้ ทักษะและเครื่องมือ (Skills & Tech)** | [`lib/technologies.ts`](file:///c:/Users/KRITSADA/Desktop/newportfolio/lib/technologies.ts) |
| **เปลี่ยนรูปภาพโปรไฟล์ หรือรูปใบเซอร์** | โฟลเดอร์ [`public/`](file:///c:/Users/KRITSADA/Desktop/newportfolio/public) |
| **แก้ไขข้อความส่วนหัวหน้าเว็บ (Hero) / ติดต่อ (Contact)** | [`components/home/HeroSection.tsx`](file:///c:/Users/KRITSADA/Desktop/newportfolio/components/home/HeroSection.tsx) และ [`components/home/ContactSection.tsx`](file:///c:/Users/KRITSADA/Desktop/newportfolio/components/home/ContactSection.tsx) |
| **แก้ไขเมนูบาร์ (Navbar) และ Footer** | [`components/layout/Header.tsx`](file:///c:/Users/KRITSADA/Desktop/newportfolio/components/layout/Header.tsx) และ [`components/layout/Footer.tsx`](file:///c:/Users/KRITSADA/Desktop/newportfolio/components/layout/Footer.tsx) |
| **แก้ไขชุดสีหลัก, ฟอนต์ หรือพื้นหลัง Global** | [`app/globals.css`](file:///c:/Users/KRITSADA/Desktop/newportfolio/app/globals.css) และ [`tailwind.config.ts`](file:///c:/Users/KRITSADA/Desktop/newportfolio/tailwind.config.ts) |
