import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import AnimalCard from '../components/AnimalCard';
import GameHeader from '../components/GameHeader';
import animals, { Animal, getAnimalsForLevel } from '../data/animals';

type Feedback = 'correct' | 'wrong' | 'level-up' | null;

type ToddlerGameProps = {
  score: number;
  level: number;
  showStars: boolean;
  targetAnimal: Animal | null;
  selectedAnimal: string;
  scaleAnim: any;
  feedback: Feedback;
  chooseRandomAnimal: (levelOverride?: number, announce?: boolean) => void;
  handleAnimalPress: (animal: Animal) => void;
  setMode: (mode: string | null) => void;
  badge: string;
  showBadgePopup: boolean;
  setShowBadges: (show: boolean) => void;
};

const feedbackCopy = {
  correct: {
    text: 'Great job!',
    color: '#2E7D32',
  },
  wrong: {
    text: 'Try again',
    color: '#C62828',
  },
  'level-up': {
    text: 'Level up!',
    color: '#6A1B9A',
  },
};

export default function ToddlerGame({
  score,
  level,
  showStars,
  targetAnimal,
  selectedAnimal,
  scaleAnim,
  feedback,
  chooseRandomAnimal,
  handleAnimalPress,
  setMode,
  badge,
  showBadgePopup,
  setShowBadges,
}: ToddlerGameProps) {
  const visibleAnimals = getAnimalsForLevel(level);
  const nextAnimal = animals.find((animal) => animal.unlockLevel > level);
  const feedbackMessage = feedback ? feedbackCopy[feedback] : null;

  return (
    <>
      <GameHeader
        score={score}
        level={level}
        badge={badge}
        showBadgePopup={showBadgePopup}
      />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          backgroundColor: '#FFF8E1',
          paddingHorizontal: 18,
          paddingBottom: 32,
        }}
      >
        <View
          style={{
            width: '100%',
            maxWidth: 420,
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 18,
            padding: 18,
            marginTop: 8,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#FFE0B2',
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: '#6D4C41',
              marginBottom: 6,
            }}
          >
            Your challenge
          </Text>

          <Text
            style={{
              fontSize: 30,
              fontWeight: '800',
              color: '#263238',
              textAlign: 'center',
            }}
          >
            {targetAnimal ? `Find the ${targetAnimal.name}` : 'Get ready'}
          </Text>

          {!!feedbackMessage && (
            <Text
              style={{
                fontSize: 24,
                fontWeight: '800',
                color: feedbackMessage.color,
                marginTop: 10,
              }}
            >
              {feedbackMessage.text}
            </Text>
          )}

          {showStars && (
            <Text
              style={{
                fontSize: 34,
                marginTop: 8,
              }}
            >
              ⭐⭐⭐
            </Text>
          )}

          <View
            style={{
              flexDirection: 'row',
              marginTop: 14,
            }}
          >
            <TouchableOpacity
              onPress={() => chooseRandomAnimal(level)}
              style={{
                backgroundColor: '#E91E63',
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: 14,
                marginRight: 8,
              }}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
                🔊 Repeat
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowBadges(true)}
              style={{
                backgroundColor: '#673AB7',
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: 14,
              }}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
                🏅 Badges
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={{
            width: '100%',
            maxWidth: 420,
            fontSize: 16,
            color: '#5D4037',
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          {visibleAnimals.length} animals unlocked
          {nextAnimal ? ` • Next: ${nextAnimal.name} at level ${nextAnimal.unlockLevel}` : ''}
        </Text>

        <FlatList
          data={visibleAnimals}
          keyExtractor={(item) => item.name}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          renderItem={({ item }) => (
            <AnimalCard
              animal={item}
              selectedAnimal={selectedAnimal}
              scaleAnim={scaleAnim}
              onPress={() => handleAnimalPress(item)}
            />
          )}
        />

        <TouchableOpacity onPress={() => setMode(null)}>
          <Text
            style={{
              marginTop: 18,
              color: '#1565C0',
              fontSize: 18,
              fontWeight: '700',
            }}
          >
            ⬅ Back
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
