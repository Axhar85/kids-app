import { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function MemoryGame({
  setMode,
}: any) {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [cards, setCards] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');

  useEffect(() => {
  shuffleCards();
}, [difficulty]);

  const shuffleCards = () => {
    let cardList: string[] = [];

if (difficulty === 'easy') {

  cardList = [
    '🐶','🐶',
    '🐱','🐱',
    '🐮','🐮',
  ];

} else if (difficulty === 'medium') {

  cardList = [
    '🐶','🐶',
    '🐱','🐱',
    '🐮','🐮',
    '🦁','🦁',
    '🦆','🦆',
    '🐵','🐵',
  ];

} else {

  cardList = [
    '🐶','🐶',
    '🐱','🐱',
    '🐮','🐮',
    '🦁','🦁',
    '🦆','🦆',
    '🐵','🐵',
    '🐸','🐸',
    '🐼','🐼',
    '🐷','🐷',
    '🐰','🐰',
  ];

}

    const shuffled = [...cardList].sort(
      () => Math.random() - 0.5
    );

    setCards(shuffled);
  };


    const resetGame = () => {

  setFlipped([]);

  setMatched([]);

  setScore(0);

  setWon(false);
};

    const restartGame = () => {

    resetGame();

    shuffleCards();
    };

  const handleCardPress = (index: number) => {
    if (
      flipped.includes(index) ||
      matched.includes(index)
    ) {
      return;
    }

    const newFlipped = [
      ...flipped,
      index,
    ];

    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const firstCard =
        cards[newFlipped[0]];

      const secondCard =
        cards[newFlipped[1]];

      if (firstCard === secondCard) {
        setScore(score + 1);

        const newMatched = [
          ...matched,
          ...newFlipped,
        ];

        setMatched(newMatched);

        if (newMatched.length === cards.length) {
          setWon(true);
        }

        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingTop: 50,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        🧩 Memory Game
      </Text>

      <View
  style={{
    flexDirection: 'row',
    marginBottom: 20,
  }}
>

  <TouchableOpacity
    onPress={() => {
      resetGame();
      setDifficulty('easy');
    }}
    style={{
      backgroundColor: '#4CAF50',
      padding: 10,
      margin: 5,
      borderRadius: 10,
    }}
  >
    <Text style={{ color: 'white' }}>
      Easy
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => {
      resetGame();
      setDifficulty('medium');
    }}
    style={{
      backgroundColor: '#FFC107',
      padding: 10,
      margin: 5,
      borderRadius: 10,
    }}
  >
    <Text>
      Medium
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => {
      resetGame();
      setDifficulty('hard');
    }}
    style={{
      backgroundColor: '#F44336',
      padding: 10,
      margin: 5,
      borderRadius: 10,
    }}
  >
    <Text style={{ color: 'white' }}>
      Hard
    </Text>
  </TouchableOpacity>

</View>


      <Text
        style={{
          fontSize: 22,
          marginBottom: 20,
        }}
      >
        🏆 Score: {score}
      </Text>

      {won && (
        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'green',
            }}
          >
            🎉 YOU WIN! 🎉
          </Text>

          <Text
            style={{
              fontSize: 22,
              marginTop: 10,
            }}
          >
            Final Score: {score}
          </Text>

          <TouchableOpacity
            onPress={restartGame}
            style={{
              backgroundColor: '#4CAF50',
              padding: 12,
              borderRadius: 15,
              marginTop: 15,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 18,
              }}
            >
              🔄 Play Again
            </Text>
          </TouchableOpacity>
        </View>
      )}

        <ScrollView
            style={{
            maxHeight: '60%'
            }}
        >            
 
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: 320,
          justifyContent: 'center',
        }}
      >
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCardPress(index)}
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#4FC3F7',
              margin: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 30,
              }}
            >
              {flipped.includes(index) ||
              matched.includes(index)
                ? card
                : '❓'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
        </ScrollView>

      <TouchableOpacity
        onPress={() => setMode(null)}
      >
        <Text
          style={{
            marginTop: 30,
            fontSize: 20,
            color: 'blue',
          }}
        >
          ⬅ Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}