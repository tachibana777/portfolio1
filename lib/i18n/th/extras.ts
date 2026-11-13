import { hashKey, type Dict } from "../core";

// Small leftovers: diagram labels and generated strings.
const extras: Dict = {
  "13an80h": "เครื่องทั้งห้ากับ layer ทั้งสี่เชื่อมต่อกันอย่างไร",
  r2bb1u: "แหล่ง hash · .142",
  "121mavf": "Rule + ที่เก็บ evidence · .144",
  "1mhfnxc": "Agent, auditd, script · .143",
  "18io7wx": "attacker จำลอง · .145",
  "1fns5fl": "แหล่ง IOC · .142",
  "18r8vzy": "Correlation rule · .144",
};

// Buttons created at run time (image zoom dialog, theme switch).
const ui: Record<string, string> = {
  "Close image": "ปิดรูป",
  "Zoom in": "zoom in",
  "Zoom out": "zoom out",
  "Switch to light mode": "เปลี่ยนเป็น light mode",
  "Switch to dark mode": "เปลี่ยนเป็น dark mode",
  "Toggle color theme": "สลับ dark/light mode",
};
for (const [en, th] of Object.entries(ui)) extras[hashKey(en)] = th;

for (let n = 1; n <= 8; n++) extras[hashKey(`Kritsada outside the IDE, photo ${n}`)] = `Kritsada นอก IDE รูปที่ ${n}`;

export default extras;
