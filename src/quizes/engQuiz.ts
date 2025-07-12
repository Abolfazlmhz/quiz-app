interface PageData {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const languageQuiz: PageData[] = [
  {
    id: 1,
    question: "کدام گزینه معنی کلمه 'apple' است؟",
    options: ["سیب", "موز", "پرتقال", "هویج"],
    answer: "سیب",
  },
];

export default languageQuiz;
