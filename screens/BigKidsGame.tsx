import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type BigKidsGameProps = {
  name: string;
  setName: (name: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  playSound: () => void;
  speakName: () => void;
  setMode: (mode: string | null) => void;
};

export default function BigKidsGame({
  name,
  setName,
  language,
  setLanguage,
  playSound,
  speakName,
  setMode,
}: BigKidsGameProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
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
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 16,
          }}
        >
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
          width: 220,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Text style={{ fontSize: 28 }}>
        {language === 'en'
          ? `Hello ${name} 👋`
          : `السلام علیکم ${name} 👋`}
      </Text>

      <TouchableOpacity onPress={() => setMode(null)}>
        <Text
          style={{
            marginTop: 20,
            color: 'blue',
          }}
        >
          ⬅ Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}
