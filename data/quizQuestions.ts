export type QuizCategoryId = 'math' | 'spelling' | 'science' | 'flags';

export type QuizQuestion = {
  id: string;
  category: QuizCategoryId;
  prompt: string;
  helper?: string;
  choices: string[];
  answer: string;
};

export type QuizCategory = {
  id: QuizCategoryId;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
};

export const quizCategories: QuizCategory[] = [
  {
    id: 'math',
    title: 'Math',
    subtitle: 'Quick number challenges',
    icon: '\u2795',
    color: '#2196F3',
  },
  {
    id: 'spelling',
    title: 'Spelling',
    subtitle: 'Colors, fruits, and words',
    icon: '\uD83D\uDD24',
    color: '#E91E63',
  },
  {
    id: 'science',
    title: 'Science',
    subtitle: 'Nature, space, and the body',
    icon: '\uD83D\uDD2C',
    color: '#009688',
  },
  {
    id: 'flags',
    title: 'Flags',
    subtitle: 'Guess the country',
    icon: '\uD83C\uDFF3\uFE0F',
    color: '#673AB7',
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'math-1',
    category: 'math',
    prompt: 'What is 8 + 7?',
    choices: ['13', '15', '16', '17'],
    answer: '15',
  },
  {
    id: 'math-2',
    category: 'math',
    prompt: 'What is 6 x 4?',
    choices: ['20', '22', '24', '28'],
    answer: '24',
  },
  {
    id: 'math-3',
    category: 'math',
    prompt: 'What is 36 divided by 6?',
    choices: ['5', '6', '7', '8'],
    answer: '6',
  },
  {
    id: 'math-4',
    category: 'math',
    prompt: 'What is 45 - 19?',
    choices: ['24', '25', '26', '28'],
    answer: '26',
  },
  {
    id: 'spelling-1',
    category: 'spelling',
    prompt: 'Which spelling is correct?',
    helper: 'The color of grass',
    choices: ['Grenn', 'Green', 'Grean', 'Grien'],
    answer: 'Green',
  },
  {
    id: 'spelling-2',
    category: 'spelling',
    prompt: 'Which spelling is correct?',
    helper: 'A yellow fruit',
    choices: ['Banana', 'Bannana', 'Banena', 'Bananah'],
    answer: 'Banana',
  },
  {
    id: 'spelling-3',
    category: 'spelling',
    prompt: 'Which spelling is correct?',
    helper: 'A red fruit',
    choices: ['Aple', 'Apple', 'Appel', 'Appl'],
    answer: 'Apple',
  },
  {
    id: 'spelling-4',
    category: 'spelling',
    prompt: 'Which word names this color?',
    helper: '\uD83D\uDD35',
    choices: ['Blue', 'Bloo', 'Blew', 'Blu'],
    answer: 'Blue',
  },
  {
    id: 'science-1',
    category: 'science',
    prompt: 'Which planet is closest to the Sun?',
    choices: ['Earth', 'Mars', 'Mercury', 'Jupiter'],
    answer: 'Mercury',
  },
  {
    id: 'science-2',
    category: 'science',
    prompt: 'What do plants need to make food?',
    choices: ['Sunlight', 'Plastic', 'Moon rocks', 'Sand only'],
    answer: 'Sunlight',
  },
  {
    id: 'science-3',
    category: 'science',
    prompt: 'Which part of the body pumps blood?',
    choices: ['Lungs', 'Heart', 'Stomach', 'Brain'],
    answer: 'Heart',
  },
  {
    id: 'science-4',
    category: 'science',
    prompt: 'What gas do humans breathe in to live?',
    choices: ['Oxygen', 'Helium', 'Smoke', 'Steam'],
    answer: 'Oxygen',
  },
  {
    id: 'flags-1',
    category: 'flags',
    prompt: 'Which country has this flag?',
    helper: '\uD83C\uDDEA\uD83C\uDDF8',
    choices: ['Spain', 'France', 'Italy', 'Portugal'],
    answer: 'Spain',
  },
  {
    id: 'flags-2',
    category: 'flags',
    prompt: 'Which country has this flag?',
    helper: '\uD83C\uDDEC\uD83C\uDDE7',
    choices: ['Ireland', 'United Kingdom', 'Canada', 'Germany'],
    answer: 'United Kingdom',
  },
  {
    id: 'flags-3',
    category: 'flags',
    prompt: 'Which country has this flag?',
    helper: '\uD83C\uDDEF\uD83C\uDDF5',
    choices: ['Japan', 'China', 'South Korea', 'Thailand'],
    answer: 'Japan',
  },
  {
    id: 'flags-4',
    category: 'flags',
    prompt: 'Which country has this flag?',
    helper: '\uD83C\uDDFA\uD83C\uDDF8',
    choices: ['Mexico', 'United States', 'Brazil', 'Australia'],
    answer: 'United States',
  },
];

export const getQuestionsForCategory = (category: QuizCategoryId) =>
  quizQuestions.filter((question) => question.category === category);
