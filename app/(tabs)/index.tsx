import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { Animated, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AnimalCard from '../../components/AnimalCard';




export default function HomeScreen() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState<string | null>(null);
  const [targetAnimal, setTargetAnimal] = useState<any>(null);
  const [score, setScore] = useState(0);
  const scaleAnim = useState(new Animated.Value(1))[0];
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [showStars, setShowStars] = useState(false);
  const [level, setLevel] = useState(1);

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



  // 🔊 Play sound
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/hello.mp3')
    );
    await sound.playAsync();
  };

  const playAnimalSound = async (soundFile: any) => {
  const { sound } = await Audio.Sound.createAsync(soundFile);

  await sound.playAsync();
};



const animals = [
  {
    name: 'Dog',
    image: require('../../assets/images/dog.png'),
    sound: require('../../assets/sounds/dog.mp3'),
    color: '#FFD54F'
  },
  {
    name: 'Cat',
    image: require('../../assets/images/cat.png'),
    sound: require('../../assets/sounds/cat.mp3'),
    color: '#81C784'
  },
  {
    name: 'Cow',
    image: require('../../assets/images/cow.png'),
    sound: require('../../assets/sounds/cow.mp3'),
    color: '#64B5F6'
  }, 
  {
  name: 'Lion',
  image: require('../../assets/images/lion.png'),
  sound: require('../../assets/sounds/cat.mp3'),
  color: '#FF7043'
  },
  {
  name: 'Duck',
  image: require('../../assets/images/duck.png'),
  sound: require('../../assets/sounds/cow.mp3'),
  color: '#4FC3F7'
  }
 ];

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

  // Random animal function 
  const chooseRandomAnimal = () => {
  const randomIndex = Math.floor(
    Math.random() * visibleAnimals.length
    );

    setTargetAnimal(visibleAnimals[randomIndex]);
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

      {showStars && (
    <Text style={{
      fontSize: 40,
      marginBottom: 20
    }}>
     ⭐⭐⭐
   </Text>
  )}

    <Text style={{ fontSize: 22, marginBottom: 10 }}>
  🏆 Level: {level}
    </Text>

      {/* START CHALLENGE BUTTON */}
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

      {/* TARGET ANIMAL */}
      {targetAnimal && (
        <Text style={{ fontSize: 24, marginBottom: 20 }}>
          Find the {targetAnimal.name}
        </Text>
      )}

      {/* ANIMAL BUTTONS */}
      {visibleAnimals.map((animal) => (
    <AnimalCard
      key={animal.name}
      animal={animal}
      selectedAnimal={selectedAnimal}
      scaleAnim={scaleAnim}
      onPress={() => {

    setSelectedAnimal(animal.name);

    animateButton();

    playAnimalSound(animal.sound);

    if (targetAnimal?.name === animal.name) {

      setScore(score + 1);

      setShowStars(true);

      Speech.speak('Great Job!');

      setTimeout(() => {
        setShowStars(false);
      }, 1500);

      chooseRandomAnimal();

      } else {

      Speech.speak('Try Again');
      }

      if ((score + 1) % 3 === 0) {
        setLevel(level + 1);

      Speech.speak('Level Up!');
    }
    }}
    />
      ))}

      {/* BACK BUTTON */}
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