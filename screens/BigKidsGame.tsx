import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Language = 'en' | 'ur';

type BigKidsGameProps = {
  name: string;
  setName: (name: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  playSound: () => void;
  speakName: () => void;
  setMode: (mode: string | null) => void;
};

const copy = {
  en: {
    title: 'Name Practice',
    subtitle: 'Type your name and hear a friendly greeting.',
    prompt: 'Enter your name',
    placeholder: 'Type name',
    switchLabel: 'Urdu',
    greeting: (name: string) => `Hello ${name || 'friend'}`,
    speakButton: 'Speak Greeting',
  },
  ur: {
    title: 'نام کی مشق',
    subtitle: 'اپنا نام لکھیں اور سلام سنیں۔',
    prompt: 'اپنا نام لکھیں',
    placeholder: 'نام لکھیں',
    switchLabel: 'English',
    greeting: (name: string) => `السلام علیکم ${name || 'دوست'}`,
    speakButton: 'سلام سنیں',
  },
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
  const activeLanguage: Language = language === 'ur' ? 'ur' : 'en';
  const activeCopy = copy[activeLanguage];

  const speakGreeting = () => {
    if (!name.trim()) return;

    playSound();
    speakName();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingHorizontal: 20,
        paddingTop: 34,
        paddingBottom: 28,
      }}
    >
      <View
        style={{
          width: '100%',
          maxWidth: 430,
          marginBottom: 14,
        }}
      >
        <TouchableOpacity
          onPress={() => setMode(null)}
          style={{
            alignSelf: 'flex-start',
            paddingVertical: 8,
            paddingHorizontal: 4,
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              color: '#1565C0',
              fontSize: 18,
              fontWeight: '700',
            }}
          >
            {'\u2B05'} Back
          </Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 18,
            padding: 18,
            borderWidth: 1,
            borderColor: '#FFE0B2',
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: '900',
              color: '#263238',
              textAlign: activeLanguage === 'ur' ? 'right' : 'left',
            }}
          >
            {activeCopy.title}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#6D4C41',
              marginTop: 4,
              lineHeight: 21,
              textAlign: activeLanguage === 'ur' ? 'right' : 'left',
            }}
          >
            {activeCopy.subtitle}
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          maxWidth: 430,
          backgroundColor: '#FFFFFF',
          borderRadius: 18,
          padding: 18,
          borderWidth: 1,
          borderColor: '#BBDEFB',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => setLanguage('en')}
            style={{
              flex: 1,
              backgroundColor: activeLanguage === 'en' ? '#3F51B5' : '#ECEFF1',
              paddingVertical: 11,
              borderRadius: 12,
              alignItems: 'center',
              marginRight: 6,
            }}
          >
            <Text
              style={{
                color: activeLanguage === 'en' ? '#FFFFFF' : '#455A64',
                fontWeight: '800',
              }}
            >
              English
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setLanguage('ur')}
            style={{
              flex: 1,
              backgroundColor: activeLanguage === 'ur' ? '#3F51B5' : '#ECEFF1',
              paddingVertical: 11,
              borderRadius: 12,
              alignItems: 'center',
              marginLeft: 6,
            }}
          >
            <Text
              style={{
                color: activeLanguage === 'ur' ? '#FFFFFF' : '#455A64',
                fontWeight: '800',
              }}
            >
              Urdu
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 17,
            fontWeight: '800',
            color: '#455A64',
            marginBottom: 8,
            textAlign: activeLanguage === 'ur' ? 'right' : 'left',
          }}
        >
          {activeCopy.prompt}
        </Text>

        <TextInput
          placeholder={activeCopy.placeholder}
          value={name}
          onChangeText={setName}
          onSubmitEditing={speakGreeting}
          textAlign={activeLanguage === 'ur' ? 'right' : 'left'}
          style={{
            borderWidth: 1,
            borderColor: '#CFD8DC',
            backgroundColor: '#FAFAFA',
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 14,
            fontSize: 18,
            marginBottom: 16,
          }}
        />

        <View
          style={{
            backgroundColor: '#E8F5E9',
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: '#607D8B',
              marginBottom: 6,
              textAlign: activeLanguage === 'ur' ? 'right' : 'left',
            }}
          >
            Preview
          </Text>
          <Text
            style={{
              fontSize: 27,
              fontWeight: '900',
              color: '#1B5E20',
              textAlign: activeLanguage === 'ur' ? 'right' : 'left',
            }}
          >
            {activeCopy.greeting(name)} {'\uD83D\uDC4B'}
          </Text>
        </View>

        <TouchableOpacity
          onPress={speakGreeting}
          disabled={!name.trim()}
          style={{
            backgroundColor: name.trim() ? '#4CAF50' : '#B0BEC5',
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 17,
              fontWeight: '800',
            }}
          >
            {'\uD83D\uDD0A'} {activeCopy.speakButton}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
