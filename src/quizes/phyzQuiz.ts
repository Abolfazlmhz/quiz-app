interface PageData {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const physicsQuiz: PageData[] = [
  {
    id: 1,
    question: "واحد نیرو چیست؟",
    options: ["وات", "ژول", "نیوتن", "کولن"],
    answer: "نیوتن",
  },
];

export default physicsQuiz;
