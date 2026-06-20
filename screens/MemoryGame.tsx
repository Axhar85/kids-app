import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import animals, { Animal } from '../data/animals';

type Difficulty = 'easy' | 'medium' | 'hard';

type MemoryCard = {
  id: string;
  animal: Animal;
};

type MemoryGameProps = {
  setMode: (mode: string | null) => void;
  selectedProfile: string;
};

const difficultyConfig = {
  easy: {
    label: 'Easy',
    pairs: 4,
    color: '#4CAF50',
    achievement: 'Memory Beginner',
    stars: 1,
  },
  medium: {
    label: 'Medium',
    pairs: 6,
    color: '#FFC107',
    achievement: 'Memory Expert',
    stars: 2,
  },
  hard: {
    label: 'Hard',
    pairs: animals.length,
    color: '#F44336',
    achievement: 'Memory Master',
    stars: 3,
  },
};

const shuffle = <T,>(items: T[]) =>
  [...items].sort(() => Math.random() - 0.5);

export default function MemoryGame({
  setMode,
  selectedProfile,
}: MemoryGameProps) {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [memoryAchievement, setMemoryAchievement] = useState('');

  useEffect(() => {
    restartGame();
  }, [difficulty]);

  const buildCards = () => {
    const selectedAnimals = animals.slice(0, difficultyConfig[difficulty].pairs);
    const duplicated = selectedAnimals.flatMap((animal) => [
      { id: `${animal.name}-a`, animal },
      { id: `${animal.name}-b`, animal },
    ]);

    setCards(shuffle(duplicated));
  };

  const resetGame = () => {
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setMoves(0);
    setWon(false);
    setMemoryAchievement('');
  };

  const restartGame = () => {
    resetGame();
    buildCards();
  };

  const saveMemoryWin = async () => {
    if (!selectedProfile) return;

    const savedWins = await AsyncStorage.getItem(
      `memoryWins_${selectedProfile}`
    );
    const wins = savedWins ? JSON.parse(savedWins) : 0;

    await AsyncStorage.setItem(
      `memoryWins_${selectedProfile}`,
      JSON.stringify(wins + 1)
    );
  };

  const playSound = async (soundFile: number) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };

  const saveMemoryAchievement = async (achievement: string) => {
    if (!selectedProfile) return;

    await AsyncStorage.setItem(
      `memoryBadge_${selectedProfile}`,
      JSON.stringify(achievement)
    );
  };

  const finishGame = () => {
    const achievement = difficultyConfig[difficulty].achievement;

    setWon(true);
    setMemoryAchievement(achievement);
    saveMemoryWin();
    saveMemoryAchievement(achievement);
    playSound(require('../assets/sounds/win.mp3'));
  };

  const handleCardPress = (index: number) => {
    if (won || flipped.includes(index) || matched.includes(index)) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length !== 2) return;

    setMoves((currentMoves) => currentMoves + 1);

    const firstCard = cards[newFlipped[0]];
    const secondCard = cards[newFlipped[1]];

    if (firstCard.animal.name === secondCard.animal.name) {
      playSound(require('../assets/sounds/correct.mp3'));

      const newScore = score + 1;
      const newMatched = [...matched, ...newFlipped];

      setScore(newScore);
      setMatched(newMatched);
      setFlipped([]);

      if (newMatched.length === cards.length) {
        finishGame();
      }

      return;
    }

    playSound(require('../assets/sounds/wrong.mp3'));
    setTimeout(() => {
      setFlipped([]);
    }, 850);
  };

  const activeConfig = difficultyConfig[difficulty];

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingHorizontal: 18,
        paddingTop: 28,
        paddingBottom: 30,
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
            {'\uD83E\uDDE9'} Memory Game
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#6D4C41',
              marginTop: 4,
              lineHeight: 20,
            }}
          >
            Match the animal pairs. Fewer moves means sharper focus.
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          maxWidth: 430,
          flexDirection: 'row',
          marginBottom: 12,
        }}
      >
        {(Object.keys(difficultyConfig) as Difficulty[]).map((item) => {
          const option = difficultyConfig[item];
          const selected = item === difficulty;

          return (
            <TouchableOpacity
              key={item}
              onPress={() => setDifficulty(item)}
              style={{
                flex: 1,
                backgroundColor: selected ? option.color : '#FFFFFF',
                borderColor: option.color,
                borderWidth: 1,
                paddingVertical: 10,
                marginHorizontal: 4,
                borderRadius: 12,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: selected ? '#FFFFFF' : '#455A64',
                  fontWeight: '800',
                }}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View
        style={{
          width: '100%',
          maxWidth: 430,
          flexDirection: 'row',
          marginBottom: 14,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#E3F2FD',
            borderRadius: 14,
            padding: 12,
            marginRight: 6,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: '900', color: '#263238' }}>
            {score}/{activeConfig.pairs}
          </Text>
          <Text style={{ fontSize: 13, color: '#546E7A', marginTop: 2 }}>
            Matches
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: '#F3E5F5',
            borderRadius: 14,
            padding: 12,
            marginLeft: 6,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: '900', color: '#263238' }}>
            {moves}
          </Text>
          <Text style={{ fontSize: 13, color: '#546E7A', marginTop: 2 }}>
            Moves
          </Text>
        </View>
      </View>

      {won && (
        <View
          style={{
            width: '100%',
            maxWidth: 430,
            backgroundColor: '#E8F5E9',
            borderRadius: 18,
            padding: 16,
            alignItems: 'center',
            marginBottom: 14,
            borderWidth: 1,
            borderColor: '#A5D6A7',
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: '900',
              color: '#2E7D32',
            }}
          >
            {'\uD83C\uDF89'} You win!
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#33691E',
              marginTop: 6,
              fontWeight: '700',
            }}
          >
            {memoryAchievement}
          </Text>
          <Text style={{ fontSize: 34, marginTop: 6 }}>
            {'\u2B50'.repeat(activeConfig.stars)}
          </Text>

          <TouchableOpacity
            onPress={restartGame}
            style={{
              backgroundColor: '#4CAF50',
              paddingVertical: 11,
              paddingHorizontal: 18,
              borderRadius: 14,
              marginTop: 12,
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: '800',
              }}
            >
              {'\uD83D\uDD04'} Play Again
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View
        style={{
          width: '100%',
          maxWidth: 360,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {cards.map((card, index) => {
          const isVisible = flipped.includes(index) || matched.includes(index);
          const isMatched = matched.includes(index);

          return (
            <TouchableOpacity
              key={card.id}
              activeOpacity={0.84}
              onPress={() => handleCardPress(index)}
              style={{
                width: 76,
                height: 86,
                backgroundColor: isVisible ? card.animal.color : '#4FC3F7',
                margin: 6,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 14,
                borderWidth: isMatched ? 2 : 0,
                borderColor: '#2E7D32',
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 4,
              }}
            >
              {isVisible ? (
                <Image
                  source={card.animal.image}
                  resizeMode="contain"
                  style={{
                    width: 58,
                    height: 58,
                  }}
                />
              ) : (
                <Text style={{ fontSize: 30 }}>{'\u2753'}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
