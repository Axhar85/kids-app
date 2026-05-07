import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function HomeScreen() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('en');

  const speakName = () => {
  if (!name) return;

  const text =
    language === 'en'
      ? `Hello ${name}`
      : `السلام علیکم ${name}`;

  Speech.speak(text);
};

  const playSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require('../../assets/sounds/hello.mp3')
  );
  await sound.playAsync();
};

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
          playSound();   // پہلے sound
          speakName();   // پھر بولے
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
        {language === 'en' ? `Hello ${name} 👋` : `السلام علیکم ${name} 👋`}
      </Text>

    </View>
  );
}