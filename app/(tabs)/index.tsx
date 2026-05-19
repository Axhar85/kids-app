import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import useToddlerGame from '../../hooks/useToddlerGame';
import BigKidsGame from '../../screens/BigKidsGame';
import ModeSelection from '../../screens/ModeSelection';
import ProfileSelection from '../../screens/ProfileSelection';
import ToddlerGame from '../../screens/ToddlerGame';



export default function HomeScreen() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const {
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
  } = useToddlerGame();





  // 🔊 Play sound
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/hello.mp3')
    );
    await sound.playAsync();
  };


  // 🗣️ Speak name
  const speakName = () => {
    if (!name) return;

    const text =
      language === 'en'
        ? `Hello ${name}`
        : `السلام علیکم ${name}`;

    Speech.speak(text);
  };

  if (!selectedProfile) {
  return (
    <ProfileSelection
      setSelectedProfile={setSelectedProfile}
    />
  );
}


  // 🟡 SCREEN 1: Mode Selection
  if (!mode) {
  return (
    <ModeSelection
      setMode={setMode}
      selectedProfile={selectedProfile}
    />
  );
}


  if (mode === 'toddler') {
  return (
    <ToddlerGame
      score={score}
      level={level}
      showStars={showStars}
      targetAnimal={targetAnimal}
      selectedAnimal={selectedAnimal}
      scaleAnim={scaleAnim}
      setSelectedAnimal={setSelectedAnimal}
      animateButton={animateButton}
      playAnimalSound={playAnimalSound}
      setScore={setScore}
      setShowStars={setShowStars}
      chooseRandomAnimal={chooseRandomAnimal}
      setLevel={setLevel}
      setMode={setMode}
      handleAnimalPress={handleAnimalPress}
    />
  );
}
  if (mode === 'big') {
  return (
    <BigKidsGame
      name={name}
      setName={setName}
      language={language}
      setLanguage={setLanguage}
      playSound={playSound}
      speakName={speakName}
      setMode={setMode}
    />
  );
}
    
}