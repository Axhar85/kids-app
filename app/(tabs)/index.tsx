import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import useToddlerGame from '../../hooks/useToddlerGame';
import AnimalSoundsGame from '../../screens/AnimalSoundsGame';
import BadgesScreen from '../../screens/BadgesScreen';
import BigKidsGame from '../../screens/BigKidsGame';
import MemoryGame from '../../screens/MemoryGame';
import ModeSelection from '../../screens/ModeSelection';
import ParentDashboard from '../../screens/ParentDashboard';
import ProfileSelection from '../../screens/ProfileSelection';
import QuizGame from '../../screens/QuizGame';
import ToddlerGame from '../../screens/ToddlerGame';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [selectedProfileAvatar, setSelectedProfileAvatar] = useState('');
  const [showBadges, setShowBadges] = useState(false);

  const {
    targetAnimal,
    score,
    selectedAnimal,
    showStars,
    level,
    scaleAnim,
    feedback,
    chooseRandomAnimal,
    handleAnimalPress,
    badge,
    showBadgePopup,
  } = useToddlerGame(selectedProfile);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/animals/hello.mp3')
    );
    await sound.playAsync();
  };

  const speakName = () => {
    if (!name.trim()) return;

    const text =
      language === 'en' ? `Hello ${name}` : `السلام علیکم ${name}`;

    Speech.stop();
    Speech.speak(text);
  };

  const goToProfileSelection = () => {
    setMode(null);
    setShowDashboard(false);
    setShowBadges(false);
    setSelectedProfile(null);
    setSelectedProfileAvatar('');
  };

  if (showDashboard) {
    return <ParentDashboard setShowDashboard={setShowDashboard} />;
  }

  if (!selectedProfile) {
    return (
      <ProfileSelection
        setSelectedProfile={setSelectedProfile}
        setSelectedProfileAvatar={setSelectedProfileAvatar}
      />
    );
  }

  if (!mode) {
    return (
      <ModeSelection
        setMode={setMode}
        selectedProfile={selectedProfile}
        selectedProfileAvatar={selectedProfileAvatar}
        goToProfileSelection={goToProfileSelection}
        setShowDashboard={setShowDashboard}
        level={level}
      />
    );
  }

  if (showBadges) {
    return <BadgesScreen badge={badge} setShowBadges={setShowBadges} />;
  }

  if (mode === 'sounds') {
    return <AnimalSoundsGame setMode={setMode} />;
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
        feedback={feedback}
        chooseRandomAnimal={chooseRandomAnimal}
        setMode={setMode}
        handleAnimalPress={handleAnimalPress}
        badge={badge}
        showBadgePopup={showBadgePopup}
        setShowBadges={setShowBadges}
      />
    );
  }

  if (mode === 'memory') {
    return <MemoryGame setMode={setMode} selectedProfile={selectedProfile} />;
  }

  if (mode === 'quiz') {
    return <QuizGame setMode={setMode} />;
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

  return null;
}
