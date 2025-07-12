interface PageData {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const mathQuiz: PageData[] = [
  {
    id: 1,
    question: "حاصل ۲ + ۲ چیست؟",
    options: ["۳", "۴", "۵", "۶"],
    answer: "۴",
  },
  {
    id: 2,
    question: "چند زاویه در یک مثلث وجود دارد؟",
    options: ["۱", "۲", "۳", "۴"],
    answer: "۳",
  },
];

export default mathQuiz;
