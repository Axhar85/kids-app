import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import animals from '../data/animals';

export default function useToddlerGame(selectedProfile: string | null) {

  const [targetAnimal, setTargetAnimal] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [showStars, setShowStars] = useState(false);
  const [level, setLevel] = useState(1);

  const scaleAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
  if (selectedProfile) {
    loadProgress();
  }
}, [selectedProfile]);

  // ANIMATION
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // PLAY SOUND
  const playAnimalSound = async (soundFile: any) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);

    await sound.playAsync();
  };

  // RANDOM ANIMAL
  const chooseRandomAnimal = () => {

    const visibleAnimals = animals.slice(0, level + 2);

    const randomIndex = Math.floor(
      Math.random() * visibleAnimals.length
    );

    setTargetAnimal(visibleAnimals[randomIndex]);
  };

  // HANDLE PRESS
  const handleAnimalPress = (animal: any) => {

    setSelectedAnimal(animal.name);

    animateButton();

    playAnimalSound(animal.sound);

    if (targetAnimal?.name === animal.name) {
        console.log('Correct animal clicked');
        console.log('CORRECT ANSWER');
        console.log('Profile:', selectedProfile);
        
      setScore(score + 1);
      saveProgress(score + 1, level);

      setShowStars(true);

      Speech.speak('Great Job!');

      setTimeout(() => {
        setShowStars(false);
      }, 1500);

      chooseRandomAnimal();

      if ((score + 1) % 3 === 0) {
        
        setLevel(level + 1);
        saveProgress(score + 1, level + 1);

        Speech.speak('Level Up!');
      }

    } else {

      Speech.speak('Try Again');
    }
  };

  // Save function
  const saveProgress = async (
  newScore: number,
  newLevel: number,
) => {
    
  console.log('Saving profile:', selectedProfile);
  console.log('Saving score:', newScore);
  console.log('Saving level:', newLevel);

  try {

    if (!selectedProfile) return;

    await AsyncStorage.setItem(
    `score_${selectedProfile}`,
        JSON.stringify(newScore)
    );

    await AsyncStorage.setItem(
    `level_${selectedProfile}`,
    JSON.stringify(newLevel)
    );

  } catch (error) {

    console.log('Save error', error);
  }
};


    // Load function
    const loadProgress = async () => {
        
  try {

    if (!selectedProfile) return;

    const savedScore =
    await AsyncStorage.getItem(
    `score_${selectedProfile}`
    );

    const savedLevel =
    await AsyncStorage.getItem(
    `level_${selectedProfile}`
    );

    if (savedScore !== null) {
      setScore(JSON.parse(savedScore));
    }

    if (savedLevel !== null) {
      setLevel(JSON.parse(savedLevel));
    }
console.log('Loading profile:', selectedProfile);
console.log('Saved score:', savedScore);
console.log('Saved level:', savedLevel);
  } catch (error) {

    console.log('Load error', error);
  }
  
};



  return {
    targetAnimal,
    score,
    selectedAnimal,
    showStars,
    level,
    scaleAnim,
    setSelectedAnimal,
    animateButton,
    playAnimalSound,
    setScore,
    setShowStars,
    chooseRandomAnimal,
    setLevel,
    handleAnimalPress
  };
}