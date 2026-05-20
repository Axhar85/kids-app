import { ScrollView, Text, TouchableOpacity } from 'react-native';

import AnimalCard from '../components/AnimalCard';
import animals from '../data/animals';

export default function ToddlerGame({
  score,
  level,
  showStars,
  targetAnimal,
  selectedAnimal,
  scaleAnim,
  setSelectedAnimal,
  animateButton,
  playAnimalSound,
  setScore,
  setShowStars,
  chooseRandomAnimal,
  setLevel,
  handleAnimalPress,
  setMode,
  
}: any) {

  const visibleAnimals = animals.slice(0, level + 2);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingVertical: 40
      }}
    >

      {/* TITLE */}
      <Text style={{
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20
      }}>
        🎮 Fun Animal Game
      </Text>

      {/* SCORE */}
      <Text style={{ fontSize: 22, marginBottom: 10 }}>
        ⭐ Score: {score}
      </Text>

      {/* STARS */}
      {showStars && (
        <Text style={{
          fontSize: 40,
          marginBottom: 20
        }}>
          ⭐⭐⭐
        </Text>
      )}

      {/* LEVEL */}
      <Text style={{ fontSize: 22, marginBottom: 10 }}>
        🏆 Level: {level}
      </Text>

      {/* START CHALLENGE */}
      <TouchableOpacity
        onPress={chooseRandomAnimal}
        style={{
          backgroundColor: '#E91E63',
          padding: 15,
          borderRadius: 20,
          marginBottom: 20
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>
          🎯 Start Challenge
        </Text>
      </TouchableOpacity>

      {/* TARGET */}
      {targetAnimal && (
        <Text style={{ fontSize: 24, marginBottom: 20 }}>
          Find the {targetAnimal.name}
        </Text>
      )}

      {/* ANIMALS */}
      {visibleAnimals.map((animal) => (
        <AnimalCard
            key={animal.name}
            animal={animal}
            selectedAnimal={selectedAnimal}
            scaleAnim={scaleAnim}
            onPress={() => handleAnimalPress(animal)}
        />
      ))}

      {/* BACK */}
      <TouchableOpacity onPress={() => setMode(null)}>
        <Text style={{
          marginTop: 20,
          color: 'blue',
          fontSize: 18
        }}>
          ⬅ Back
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}