import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import animals, { Animal, getAnimalsForLevel } from '../data/animals';

type Feedback = 'correct' | 'wrong' | 'level-up' | null;

const getRandomAnimal = (level: number) => {
  const visibleAnimals = getAnimalsForLevel(level);
  const randomIndex = Math.floor(Math.random() * visibleAnimals.length);

  return visibleAnimals[randomIndex] ?? animals[0];
};

const normalizeSavedBadge = (savedBadge: string) => {
  if (savedBadge.includes('Animal Master')) return 'Animal Master';
  if (savedBadge.includes('Animal Expert')) return 'Animal Expert';
  if (savedBadge.includes('Animal Explorer')) return 'Animal Explorer';

  return savedBadge;
};

const speak = (text: string) => {
  Speech.stop();
  Speech.speak(text);
};

export default function useToddlerGame(selectedProfile: string | null) {
  const [targetAnimal, setTargetAnimal] = useState<Animal | null>(null);
  const [score, setScore] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [showStars, setShowStars] = useState(false);
  const [level, setLevel] = useState(1);
  const [badge, setBadge] = useState('');
  const [showBadgePopup, setShowBadgePopup] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const currentSoundRef = useRef<Audio.Sound | null>(null);
  const soundStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scaleAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    if (selectedProfile) {
      loadProgress();
    }
  }, [selectedProfile]);

  useEffect(() => {
    return () => {
      stopCurrentSound();
    };
  }, []);

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

  const speakInstruction = (animal: Animal) => {
    speak(`Find the ${animal.name}`);
  };

  const stopCurrentSound = async () => {
    if (soundStopTimerRef.current) {
      clearTimeout(soundStopTimerRef.current);
      soundStopTimerRef.current = null;
    }

    const currentSound = currentSoundRef.current;
    currentSoundRef.current = null;

    if (!currentSound) return;

    try {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    } catch (error) {
      console.log('Sound stop error', error);
    }
  };

  const playSound = async (soundFile: number, maxMs = 1400) => {
    await stopCurrentSound();

    const { sound } = await Audio.Sound.createAsync(soundFile);
    currentSoundRef.current = sound;

    await sound.playAsync();

    soundStopTimerRef.current = setTimeout(() => {
      stopCurrentSound();
    }, maxMs);
  };

  const playAnimalSound = async (animal: Animal) => {
    if (animal.sound) {
      await playSound(animal.sound, animal.soundMaxMs);
      return;
    }

    await stopCurrentSound();
    speak(animal.fallbackSoundText ?? animal.name);
  };

  const chooseRandomAnimal = (levelOverride = level, announce = true) => {
    const nextAnimal = getRandomAnimal(levelOverride);

    setTargetAnimal(nextAnimal);

    if (announce) {
      speakInstruction(nextAnimal);
    }
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
      newBadge = 'Animal Master';
    } else if (newScore >= 5) {
      newBadge = 'Animal Expert';
    } else if (newScore >= 1) {
      newBadge = 'Animal Explorer';
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

  const clearFeedbackSoon = () => {
    setTimeout(() => {
      setFeedback(null);
      setShowStars(false);
    }, 1400);
  };

  const handleAnimalPress = (animal: Animal) => {
    if (!targetAnimal) {
      chooseRandomAnimal();
      return;
    }

    setSelectedAnimal(animal.name);
    animateButton();
    playAnimalSound(animal);

    if (targetAnimal.name !== animal.name) {
      setFeedback('wrong');
      speak('Try again');
      clearFeedbackSoon();
      return;
    }

    const newScore = score + 1;
    const newLevel = newScore % 3 === 0 ? level + 1 : level;
    const didLevelUp = newLevel > level;

    setScore(newScore);
    setLevel(newLevel);
    setShowStars(true);
    setFeedback(didLevelUp ? 'level-up' : 'correct');
    checkBadge(newScore);
    saveProgress(newScore, newLevel);
    speak(didLevelUp ? 'Level up!' : 'Great job!');
    clearFeedbackSoon();

    setTimeout(() => {
      chooseRandomAnimal(newLevel);
    }, 900);
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
      const loadedScore = savedScore !== null ? JSON.parse(savedScore) : 0;
      const loadedLevel = savedLevel !== null ? JSON.parse(savedLevel) : 1;

      setScore(loadedScore);
      setLevel(loadedLevel);

      if (savedBadge !== null) {
        setBadge(normalizeSavedBadge(JSON.parse(savedBadge)));
      }

      chooseRandomAnimal(loadedLevel, false);
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
    feedback,
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
