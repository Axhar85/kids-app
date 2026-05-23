import { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';



export default function MemoryGame({
  setMode,
}: any) {

  const cards = [
    '🐶',
    '🐶',
    '🐱',
    '🐱',
    '🐮',
    '🐮',
  ];


    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);

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

      setMatched([
        ...matched,
        ...newFlipped,
      ]);

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
          flexWrap: 'wrap',
          width: 240,
          justifyContent: 'center',
        }}
      >
        {cards.map((card, index) => (

          <TouchableOpacity
            key={index}
            onPress={() => handleCardPress(index)}
            style={{
              width: 70,
              height: 70,
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