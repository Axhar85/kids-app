import { FlatList, ScrollView, Text, TouchableOpacity } from 'react-native';

import AnimalCard from '../components/AnimalCard';
import GameHeader from '../components/GameHeader';
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
  badge,
  showBadgePopup,
  
}: any) {

  const visibleAnimals = animals.slice(0, level + 2);

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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingVertical: 40
      }}
    >
     



      {/* STARS */}
      {showStars && (
        <Text style={{
          fontSize: 40,
          marginBottom: 20
        }}>
          ⭐⭐⭐
        </Text>
      )}



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
    <FlatList
        data={visibleAnimals}
        keyExtractor={(item) => item.name}
        numColumns={2}
        scrollEnabled={false}
        renderItem={({ item }) => (
    <AnimalCard
        animal={item}
        selectedAnimal={selectedAnimal}
        scaleAnim={scaleAnim}
        onPress={() => handleAnimalPress(item)}
        />
        )}
    />

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
    </>
  );
}