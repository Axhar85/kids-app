import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import useToddlerGame from '../../hooks/useToddlerGame';
import BadgesScreen from '../../screens/BadgesScreen';
import BigKidsGame from '../../screens/BigKidsGame';
import MemoryGame from '../../screens/MemoryGame';
import ModeSelection from '../../screens/ModeSelection';
import ParentDashboard from '../../screens/ParentDashboard';
import ProfileSelection from '../../screens/ProfileSelection';
import ToddlerGame from '../../screens/ToddlerGame';


export default function HomeScreen() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [showBadges, setShowBadges] = useState(false);
  
  console.log('Current Profile:', selectedProfile);

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
    handleAnimalPress,
    badge,
    showBadgePopup,
  } = useToddlerGame(selectedProfile);





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

    if (showDashboard) {

    return (
      <ParentDashboard
        setShowDashboard={
          setShowDashboard
        }
      />
    );
  }
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
        setShowDashboard={setShowDashboard}
        level={level}
    />
  );
}

if (showBadges) {
  return (
    <BadgesScreen
      badge={badge}
      setShowBadges={setShowBadges}
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
      badge={badge}
      showBadgePopup={showBadgePopup}
      setShowBadges={setShowBadges}
    />
  );
}
if (mode === 'memory') {
  return (
    <MemoryGame
      setMode={setMode}
      selectedProfile={selectedProfile}
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