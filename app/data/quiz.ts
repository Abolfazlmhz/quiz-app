import { PageData } from "./types";

 const quizData: Array<PageData> = [
   {
     id: 1,
     question: "کدام یک زبان برنامه‌نویسی front-end محسوب می‌شود؟",
     options: ["Python", "Java", "HTML", "C++"],
     answer: "HTML",
   },
   {
     id: 2,
     question: "در جاوااسکریپت، خروجی `typeof null` چیست؟",
     options: ["null", "object", "undefined", "string"],
     answer: "object",
   },
   {
     id: 3,
     question: "در HTML، تگ `<a>` برای چه استفاده می‌شود؟",
     options: ["عنوان صفحه", "درج تصویر", "پیوند (لینک)", "لیست شماره‌دار"],
     answer: "پیوند (لینک)",
   },
   {
     id: 4,
     question: "کدام یک از این موارد یک hook در React نیست؟",
     options: ["useEffect", "useState", "useRouter", "useRef"],
     answer: "useRouter",
   },
   {
     id: 5,
     question:
       "کدام یک از روش‌های زیر باعث کپی سطحی (shallow copy) آرایه در JS می‌شود؟",
     options: ["slice()", "map()", "push()", "pop()"],
     answer: "slice()",
   },
   {
     id: 6,
     question: "کدام عنصر برای تعریف یک جدول در HTML استفاده می‌شود؟",
     options: ["<ul>", "<table>", "<div>", "<form>"],
     answer: "<table>",
   },
   {
     id: 7,
     question: "واحد rem در CSS وابسته به چیست؟",
     options: ["فونت صفحه", "اندازه مرورگر", "فونت والد", "فونت root (html)"],
     answer: "فونت root (html)",
   },
   {
     id: 8,
     question: "در React، کلید `key` در لیست‌ها برای چیست؟",
     options: [
       "برای استایل دادن",
       "برای تعیین هویت یونیک هر آیتم",
       "برای ترتیب نمایش",
       "برای متدهای lifecycle",
     ],
     answer: "برای تعیین هویت یونیک هر آیتم",
   },
   {
     id: 9,
     question: "کدام متد برای تبدیل object به string در JS استفاده می‌شود؟",
     options: ["parse()", "stringify()", "toString()", "convert()"],
     answer: "stringify()",
   },
   {
     id: 10,
     question: "در HTTP، کد وضعیت 404 به چه معناست؟",
     options: ["درخواست موفق", "خطای سرور", "یافت نشد", "دسترسی غیرمجاز"],
     answer: "یافت نشد",
   },
 ];

 export default quizData;
