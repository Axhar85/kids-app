import { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  getQuestionsForCategory,
  quizCategories,
  QuizCategory,
  QuizQuestion,
} from '../data/quizQuestions';

type QuizGameProps = {
  setMode: (mode: string | null) => void;
};

type AnswerState = 'correct' | 'wrong' | null;

const shuffle = <T,>(items: T[]) =>
  [...items].sort(() => Math.random() - 0.5);

export default function QuizGame({ setMode }: QuizGameProps) {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(
    null
  );
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>(null);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[questionIndex];
  const progressLabel = questions.length
    ? `${questionIndex + 1}/${questions.length}`
    : '0/0';

  const shuffledChoices = useMemo(
    () => (currentQuestion ? shuffle(currentQuestion.choices) : []),
    [currentQuestion]
  );

  const startCategory = (category: QuizCategory) => {
    const nextQuestions = shuffle(getQuestionsForCategory(category.id));

    setSelectedCategory(category);
    setQuestions(nextQuestions);
    setQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswerState(null);
    setFinished(false);
  };

  const chooseAnswer = (choice: string) => {
    if (!currentQuestion || selectedAnswer) return;

    const isCorrect = choice === currentQuestion.answer;

    setSelectedAnswer(choice);
    setAnswerState(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setScore((currentScore) => currentScore + 1);
    }
  };

  const goNext = () => {
    if (questionIndex + 1 >= questions.length) {
      setFinished(true);
      return;
    }

    setQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedAnswer(null);
    setAnswerState(null);
  };

  const restartCategory = () => {
    if (!selectedCategory) return;

    startCategory(selectedCategory);
  };

  const exitQuiz = () => {
    if (selectedCategory && !finished) {
      setSelectedCategory(null);
      setQuestions([]);
      return;
    }

    setMode(null);
  };

  if (!selectedCategory) {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          backgroundColor: '#FFF8E1',
          paddingHorizontal: 20,
          paddingTop: 34,
          paddingBottom: 28,
        }}
      >
        <View
          style={{
            width: '100%',
            maxWidth: 430,
            marginBottom: 14,
          }}
        >
          <TouchableOpacity
            onPress={() => setMode(null)}
            style={{
              alignSelf: 'flex-start',
              paddingVertical: 8,
              paddingHorizontal: 4,
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: '#1565C0',
                fontSize: 18,
                fontWeight: '700',
              }}
            >
              {'\u2B05'} Back
            </Text>
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
              padding: 18,
              borderWidth: 1,
              borderColor: '#FFE0B2',
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: '900',
                color: '#263238',
              }}
            >
              {'\uD83E\uDDE0'} Quiz Game
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#6D4C41',
                marginTop: 4,
                lineHeight: 21,
              }}
            >
              Pick a category and answer quick questions.
            </Text>
          </View>
        </View>

        <View style={{ width: '100%', maxWidth: 430 }}>
          {quizCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              activeOpacity={0.84}
              onPress={() => startCategory(category)}
              style={{
                backgroundColor: category.color,
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                minHeight: 100,
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 5,
              }}
            >
              <View
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  backgroundColor: 'rgba(255, 255, 255, 0.22)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 14,
                }}
              >
                <Text style={{ fontSize: 30 }}>{category.icon}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 21,
                    fontWeight: '800',
                    marginBottom: 4,
                  }}
                >
                  {category.title}
                </Text>
                <Text
                  style={{
                    color: '#FFFDE7',
                    fontSize: 14,
                    lineHeight: 19,
                  }}
                >
                  {category.subtitle}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingHorizontal: 20,
        paddingTop: 34,
        paddingBottom: 28,
      }}
    >
      <View
        style={{
          width: '100%',
          maxWidth: 430,
          marginBottom: 14,
        }}
      >
        <TouchableOpacity
          onPress={exitQuiz}
          style={{
            alignSelf: 'flex-start',
            paddingVertical: 8,
            paddingHorizontal: 4,
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              color: '#1565C0',
              fontSize: 18,
              fontWeight: '700',
            }}
          >
            {'\u2B05'} Back
          </Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 18,
            padding: 18,
            borderWidth: 1,
            borderColor: '#FFE0B2',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Text style={{ fontSize: 30, marginRight: 10 }}>
              {selectedCategory.icon}
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: '900',
                  color: '#263238',
                }}
              >
                {selectedCategory.title}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#607D8B',
                  marginTop: 2,
                }}
              >
                Question {progressLabel}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '900',
                color: selectedCategory.color,
              }}
            >
              {score}
            </Text>
          </View>

          <View
            style={{
              height: 10,
              backgroundColor: '#ECEFF1',
              borderRadius: 5,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                height: '100%',
                width: `${Math.round(((questionIndex + 1) / questions.length) * 100)}%` as `${number}%`,
                backgroundColor: selectedCategory.color,
              }}
            />
          </View>
        </View>
      </View>

      {finished ? (
        <View
          style={{
            width: '100%',
            maxWidth: 430,
            backgroundColor: '#E8F5E9',
            borderRadius: 18,
            padding: 20,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#A5D6A7',
          }}
        >
          <Text
            style={{
              fontSize: 34,
              fontWeight: '900',
              color: '#2E7D32',
              marginBottom: 8,
            }}
          >
            {'\uD83C\uDF89'} Finished!
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '900',
              color: '#263238',
              marginBottom: 6,
            }}
          >
            Score: {score}/{questions.length}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#546E7A',
              textAlign: 'center',
              lineHeight: 21,
              marginBottom: 16,
            }}
          >
            {score === questions.length
              ? 'Perfect round. Excellent work!'
              : 'Nice effort. Try again to improve your score.'}
          </Text>

          <TouchableOpacity
            onPress={restartCategory}
            style={{
              backgroundColor: '#4CAF50',
              paddingVertical: 13,
              paddingHorizontal: 18,
              borderRadius: 14,
              alignItems: 'center',
              width: '100%',
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: '800',
              }}
            >
              {'\uD83D\uDD04'} Try Again
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedCategory(null)}
            style={{
              backgroundColor: '#FFFFFF',
              paddingVertical: 13,
              paddingHorizontal: 18,
              borderRadius: 14,
              alignItems: 'center',
              width: '100%',
              borderWidth: 1,
              borderColor: '#C8E6C9',
            }}
          >
            <Text
              style={{
                color: '#2E7D32',
                fontSize: 16,
                fontWeight: '800',
              }}
            >
              Choose Category
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            maxWidth: 430,
            backgroundColor: '#FFFFFF',
            borderRadius: 18,
            padding: 18,
            borderWidth: 1,
            borderColor: '#BBDEFB',
          }}
        >
          {!!currentQuestion?.helper && (
            <Text
              style={{
                fontSize: currentQuestion.helper.length <= 4 ? 56 : 19,
                fontWeight: '800',
                color: '#455A64',
                textAlign: 'center',
                marginBottom: 10,
              }}
            >
              {currentQuestion.helper}
            </Text>
          )}

          <Text
            style={{
              fontSize: 25,
              fontWeight: '900',
              color: '#263238',
              textAlign: 'center',
              lineHeight: 32,
              marginBottom: 18,
            }}
          >
            {currentQuestion?.prompt}
          </Text>

          {shuffledChoices.map((choice) => {
            const isSelected = selectedAnswer === choice;
            const isCorrect = currentQuestion?.answer === choice;
            const showCorrect = !!selectedAnswer && isCorrect;
            const showWrong = isSelected && answerState === 'wrong';

            return (
              <TouchableOpacity
                key={choice}
                activeOpacity={selectedAnswer ? 1 : 0.84}
                onPress={() => chooseAnswer(choice)}
                style={{
                  backgroundColor: showCorrect
                    ? '#C8E6C9'
                    : showWrong
                      ? '#FFCDD2'
                      : '#F5F5F5',
                  borderColor: showCorrect
                    ? '#4CAF50'
                    : showWrong
                      ? '#F44336'
                      : '#CFD8DC',
                  borderWidth: 1,
                  borderRadius: 14,
                  paddingVertical: 14,
                  paddingHorizontal: 14,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: '#263238',
                    fontSize: 17,
                    fontWeight: '800',
                    textAlign: 'center',
                  }}
                >
                  {choice}
                </Text>
              </TouchableOpacity>
            );
          })}

          {!!selectedAnswer && (
            <View
              style={{
                marginTop: 8,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '900',
                  color: answerState === 'correct' ? '#2E7D32' : '#C62828',
                  marginBottom: 12,
                }}
              >
                {answerState === 'correct'
                  ? 'Correct!'
                  : `Answer: ${currentQuestion.answer}`}
              </Text>

              <TouchableOpacity
                onPress={goNext}
                style={{
                  backgroundColor: selectedCategory.color,
                  paddingVertical: 13,
                  paddingHorizontal: 18,
                  borderRadius: 14,
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: '800',
                  }}
                >
                  {questionIndex + 1 >= questions.length
                    ? 'See Score'
                    : 'Next Question'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
