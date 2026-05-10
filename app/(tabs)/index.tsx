import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState<string | null>(null);

  // 🔊 Play sound
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/hello.mp3')
    );
    await sound.playAsync();
  };

  const playAnimalSound = async (animal: string) => {
  let soundFile;

  if (animal === 'dog') {
    soundFile = require('../../assets/sounds/dog.mp3');
  }

  if (animal === 'cat') {
    soundFile = require('../../assets/sounds/cat.mp3');
  }

  if (animal === 'cow') {
    soundFile = require('../../assets/sounds/cow.mp3');
  }

  const { sound } = await Audio.Sound.createAsync(soundFile);

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

      {/* DOG */}
      <TouchableOpacity
        onPress={() => playAnimalSound('dog')}
        style={{
          backgroundColor: '#FFD54F',
          padding: 20,
          borderRadius: 20,
          marginBottom: 15,
          width: 200,
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 24 }}>
          🐶 Dog
        </Text>
      </TouchableOpacity>

      {/* CAT */}
      <TouchableOpacity
        onPress={() => playAnimalSound('cat')}
        style={{
          backgroundColor: '#81C784',
          padding: 20,
          borderRadius: 20,
          marginBottom: 15,
          width: 200,
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 24 }}>
          🐱 Cat
        </Text>
      </TouchableOpacity>

      {/* COW */}
      <TouchableOpacity
        onPress={() => playAnimalSound('cow')}
        style={{
          backgroundColor: '#64B5F6',
          padding: 20,
          borderRadius: 20,
          marginBottom: 15,
          width: 200,
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 24 }}>
          🐮 Cow
        </Text>
      </TouchableOpacity>

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