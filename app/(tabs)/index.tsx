import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import animals from '../../data/animals';
import useToddlerGame from '../../hooks/useToddlerGame';
import ToddlerGame from '../../screens/ToddlerGame';



export default function HomeScreen() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState<string | null>(null);

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



 const visibleAnimals = animals.slice(0, level + 2);

  // 🗣️ Speak name
  const speakName = () => {
    if (!name) return;

    const text =
      language === 'en'
        ? `Hello ${name}`
        : `السلام علیکم ${name}`;

    Speech.speak(text);
  };



  // 🟡 SCREEN 1: Mode Selection
  if (!mode) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 22, marginBottom: 10 }}>
          Choose Game Type
        </Text>

        <TouchableOpacity
          onPress={() => setMode('toddler')}
          style={{
            backgroundColor: '#FF9800',
            padding: 15,
            borderRadius: 20,
            marginBottom: 10
          }}
        >
          <Text style={{ color: 'white' }}>👶 Little Kids</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setMode('big')}
          style={{
            backgroundColor: '#3F51B5',
            padding: 15,
            borderRadius: 20 
          }}
        >
          <Text style={{ color: 'white' }}>🧒 Big Kids</Text>
        </TouchableOpacity>
      </View>
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



  // 🔵 SCREEN 3: Big Kids Mode (your current app)
  if (mode === 'big') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        
        <Text style={{ fontSize: 24, marginBottom: 20 }}>
          {language === 'en' ? 'Enter your name:' : 'اپنا نام لکھیں:'}
        </Text>

        <TouchableOpacity
          onPress={() => setLanguage(language === 'en' ? 'ur' : 'en')}
          style={{
            backgroundColor: '#4CAF50',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 25,
            marginBottom: 20
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>
            {language === 'en' ? 'Switch to Urdu' : 'Switch to English'}
          </Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Type name"
          value={name}
          onChangeText={setName}
          onEndEditing={() => {
            if (name) {
              playSound();
              speakName();
            }
          }}
          style={{
            borderWidth: 1,
            width: 200,
            padding: 10,
            marginBottom: 20
          }}
        />

        <Text style={{ fontSize: 28 }}>
          {language === 'en'
            ? `Hello ${name} 👋`
            : `السلام علیکم ${name} 👋`}
        </Text>

        <TouchableOpacity onPress={() => setMode(null)}>
          <Text style={{ marginTop: 20 }}>⬅ Back</Text>
        </TouchableOpacity>

      </View>
    );
  }
}