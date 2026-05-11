import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState<string | null>(null);
  const [targetAnimal, setTargetAnimal] = useState<any>(null);
  const [score, setScore] = useState(0);

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
    emoji: '🐶',
    sound: require('../../assets/sounds/dog.mp3'),
    color: '#FFD54F'
  },
  {
    name: 'Cat',
    emoji: '🐱',
    sound: require('../../assets/sounds/cat.mp3'),
    color: '#81C784'
  },
  {
    name: 'Cow',
    emoji: '🐮',
    sound: require('../../assets/sounds/cow.mp3'),
    color: '#64B5F6'
  }
];

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
  const randomIndex = Math.floor(Math.random() * animals.length);

  setTargetAnimal(animals[randomIndex]);
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

  // 🟢 SCREEN 2: Toddler Mode
if (mode === 'toddler') {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    }}>


      <Text style={{ fontSize: 28, marginBottom: 30 }}>
      🐾 Animal Sounds
      </Text>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        ⭐ Score: {score}
      </Text>

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

  {targetAnimal && (
    <Text style={{ fontSize: 24, marginBottom: 20 }}>
      Find the {targetAnimal.name}
    </Text>
  )}

      {animals.map((animal) => (
  <TouchableOpacity
    key={animal.name}
    onPress={() => {
    playAnimalSound(animal.sound);

    if (targetAnimal?.name === animal.name) {
      setScore(score + 1);
      Speech.speak('Great Job!');
      chooseRandomAnimal();
    } else {
    Speech.speak('Try Again');
    }
  }}

    style={{
      backgroundColor: animal.color,
      padding: 20,
      borderRadius: 20,
      marginBottom: 15,
      width: 200,
      alignItems: 'center'
    }}
  >
    <Text style={{ fontSize: 24 }}>
      {animal.emoji} {animal.name}
    </Text>
  </TouchableOpacity>
  
))}

      {/* BACK */}
      <TouchableOpacity onPress={() => setMode(null)}>
        <Text style={{ marginTop: 20, color: 'blue' }}>
          ⬅ Back
        </Text>
      </TouchableOpacity>

    </View>
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