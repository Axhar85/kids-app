import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function MemoryGame({
  setMode,
  selectedProfile,
}: any) {

  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [stars, setStars] = useState(0);
  const [memoryAchievement, setMemoryAchievement] =   useState('');

  const animalCards = [
    {
      image: require('../assets/images/dog.png'),
    },
    {
      image: require('../assets/images/cat.png'),
    },
    {
      image: require('../assets/images/cow.png'),
    },
    {
      image: require('../assets/images/lion.png'),
    },
    {
      image: require('../assets/images/duck.png'),
    },
    {
      image: require('../assets/images/monkey.png'),
    },
  ];

  useEffect(() => {
    shuffleCards();
  }, [difficulty]);

  const shuffleCards = () => {

    let selectedAnimals: any[] = [];

    if (difficulty === 'easy') {

      selectedAnimals =
        animalCards.slice(0, 3);

    } else if (difficulty === 'medium') {

      selectedAnimals =
        animalCards.slice(0, 6);

    } else {

      selectedAnimals =
        animalCards;

    }

    const duplicated = [
      ...selectedAnimals,
      ...selectedAnimals,
    ];

    const shuffled =
      [...duplicated].sort(
        () => Math.random() - 0.5
      );

    setCards(shuffled);
  };

  const resetGame = () => {

    setFlipped([]);
    setMatched([]);
    setScore(0);
    setWon(false);
    setStars(0);
  };

  const restartGame = () => {

    resetGame();
    shuffleCards();
  };

  const playCorrectSound = async () => {

    const { sound } =
      await Audio.Sound.createAsync(
        require('../assets/sounds/correct.mp3')
      );

    await sound.playAsync();
  };

  const playWrongSound = async () => {

    const { sound } =
      await Audio.Sound.createAsync(
        require('../assets/sounds/wrong.mp3')
      );

    await sound.playAsync();
  };

  const playWinSound = async () => {

    const { sound } =
      await Audio.Sound.createAsync(
        require('../assets/sounds/win.mp3')
      );

    await sound.playAsync();
  };


  const saveMemoryAchievement = async (
  achievement: string
) => {

  try {

    if (!selectedProfile) return;
    await AsyncStorage.setItem(
      `memoryBadge_${selectedProfile}`,
      JSON.stringify(achievement)
    );

  } catch (error) {

    console.log(error);

  }

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

      if (
        firstCard.image ===
        secondCard.image
      ) {

        playCorrectSound();

        const newScore =
          score + 1;

        setScore(newScore);

        const newMatched = [
          ...matched,
          ...newFlipped,
        ];

        setMatched(newMatched);

        if (
          newMatched.length ===
          cards.length
          
        ) {

          
          setWon(true);

          let achievement = '';

            if (difficulty === 'easy') {

              achievement =
                '🧠 Memory Beginner';

            }
            else if (
              difficulty === 'medium'
            ) {

              achievement =
                '🧠 Memory Expert';

            }
            else {

              achievement =
                '🧠 Memory Master';

            }

            setMemoryAchievement(
              achievement
            );

            saveMemoryAchievement(
              achievement
            );

          playWinSound();

          if (difficulty === 'easy') {

            setStars(1);

          } else if (
            difficulty === 'medium'
          ) {

            setStars(2);

          } else {

            setStars(3);
          }
        }

        setFlipped([]);

      } else {

        playWrongSound();

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
        paddingTop: 30,
      }}
    >

      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 15,
        }}
      >
        🧩 Memory Game
      </Text>

      <View
        style={{
          flexDirection: 'row',
          marginBottom: 15,
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
          <Text
            style={{
              color: 'white',
            }}
          >
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
          <Text
            style={{
              color: 'white',
            }}
          >
            Hard
          </Text>
        </TouchableOpacity>

      </View>

      <Text
        style={{
          fontSize: 22,
          marginBottom: 10,
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
            <Text
            style={{
              fontSize: 24,
              marginTop: 10,
              color: '#FF9800',
              fontWeight: 'bold',
            }}
          >
            {memoryAchievement}
          </Text>
          </Text>

          <Text
            style={{
              fontSize: 40,
              marginTop: 10,
            }}
          >
            {'⭐'.repeat(stars)}
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
          maxHeight: '60%',
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
              onPress={() =>
                handleCardPress(index)
              }
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

              {flipped.includes(index) ||
              matched.includes(index) ? (

                <Image
                  source={card.image}
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'contain',
                  }}
                />

              ) : (

                <Text
                  style={{
                    fontSize: 30,
                  }}
                >
                  ❓
                </Text>

              )}

            </TouchableOpacity>

          ))}

        </View>

      </ScrollView>

      <TouchableOpacity
        onPress={() => setMode(null)}
      >
        <Text
          style={{
            marginTop: 20,
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