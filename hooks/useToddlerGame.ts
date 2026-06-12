import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import animals from '../data/animals';

type Animal = (typeof animals)[number];

export default function useToddlerGame(selectedProfile: string | null) {
  const [targetAnimal, setTargetAnimal] = useState<Animal | null>(null);
  const [score, setScore] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [showStars, setShowStars] = useState(false);
  const [level, setLevel] = useState(1);
  const [badge, setBadge] = useState('');
  const [showBadgePopup, setShowBadgePopup] = useState(false);

  const scaleAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    if (selectedProfile) {
      loadProgress();
    }
  }, [selectedProfile]);

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

  const playAnimalSound = async (soundFile: any) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };

  const chooseRandomAnimal = () => {
    const visibleAnimals = animals.slice(0, level + 2);
    const randomIndex = Math.floor(Math.random() * visibleAnimals.length);

    setTargetAnimal(visibleAnimals[randomIndex]);
  };

  const saveBadge = async (newBadge: string) => {
    try {
      if (!selectedProfile) return;

      await AsyncStorage.setItem(
        `badge_${selectedProfile}`,
        JSON.stringify(newBadge)
      );
    } catch (error) {
      console.log('Badge save error', error);
    }
  };

  const checkBadge = (newScore: number) => {
    let newBadge = '';

    if (newScore >= 10) {
      newBadge = '🥇 Animal Master';
    } else if (newScore >= 5) {
      newBadge = '🥈 Animal Expert';
    } else if (newScore >= 1) {
      newBadge = '🥉 Animal Explorer';
    }

    if (newBadge && newBadge !== badge) {
      setBadge(newBadge);
      saveBadge(newBadge);
      setShowBadgePopup(true);

      setTimeout(() => {
        setShowBadgePopup(false);
      }, 2000);
    }
  };

  const handleAnimalPress = (animal: Animal) => {
    setSelectedAnimal(animal.name);
    animateButton();
    playAnimalSound(animal.sound);

    if (targetAnimal?.name !== animal.name) {
      Speech.speak('Try Again');
      return;
    }

    const newScore = score + 1;
    const newLevel = newScore % 3 === 0 ? level + 1 : level;

    setScore(newScore);
    setLevel(newLevel);
    setShowStars(true);
    checkBadge(newScore);
    saveProgress(newScore, newLevel);
    Speech.speak(newLevel > level ? 'Level Up!' : 'Great Job!');

    setTimeout(() => {
      setShowStars(false);
    }, 1500);

    chooseRandomAnimal();
  };

  const saveProgress = async (newScore: number, newLevel: number) => {
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

  const loadProgress = async () => {
    try {
      if (!selectedProfile) return;

      const savedScore = await AsyncStorage.getItem(`score_${selectedProfile}`);
      const savedLevel = await AsyncStorage.getItem(`level_${selectedProfile}`);
      const savedBadge = await AsyncStorage.getItem(`badge_${selectedProfile}`);

      if (savedScore !== null) {
        setScore(JSON.parse(savedScore));
      }

      if (savedLevel !== null) {
        setLevel(JSON.parse(savedLevel));
      }

      if (savedBadge !== null) {
        setBadge(JSON.parse(savedBadge));
      }
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
    handleAnimalPress,
    badge,
    showBadgePopup,
  };
}
