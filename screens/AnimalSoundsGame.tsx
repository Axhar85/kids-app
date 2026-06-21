import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import animals, { Animal } from '../data/animals';

type AnimalSoundsGameProps = {
  setMode: (mode: string | null) => void;
};

export default function AnimalSoundsGame({ setMode }: AnimalSoundsGameProps) {
  const [activeAnimal, setActiveAnimal] = useState('');
  const currentSoundRef = useRef<Audio.Sound | null>(null);
  const soundStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      stopCurrentSound();
    };
  }, []);

  const stopCurrentSound = async () => {
    if (soundStopTimerRef.current) {
      clearTimeout(soundStopTimerRef.current);
      soundStopTimerRef.current = null;
    }

    const currentSound = currentSoundRef.current;
    currentSoundRef.current = null;

    if (!currentSound) return;

    try {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    } catch (error) {
      console.log('Sound stop error', error);
    }
  };

  const playAnimalSound = async (animal: Animal) => {
    setActiveAnimal(animal.name);
    Speech.stop();
    await stopCurrentSound();

    if (!animal.sound) {
      Speech.speak(animal.fallbackSoundText ?? animal.name);
      return;
    }

    try {
      const { sound } = await Audio.Sound.createAsync(animal.sound);
      currentSoundRef.current = sound;
      await sound.playAsync();

      soundStopTimerRef.current = setTimeout(() => {
        stopCurrentSound();
      }, animal.soundMaxMs ?? 5000);
    } catch (error) {
      console.log('Animal sound error', error);
      Speech.speak(animal.fallbackSoundText ?? animal.name);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingHorizontal: 18,
        paddingTop: 28,
        paddingBottom: 30,
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
            }}
          >
            {'\uD83D\uDD0A'} Animal Sounds
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#6D4C41',
              marginTop: 4,
              lineHeight: 20,
            }}
          >
            Tap an animal to hear its sound.
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          maxWidth: 360,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {animals.map((animal) => {
          const isActive = activeAnimal === animal.name;

          return (
            <TouchableOpacity
              key={animal.name}
              activeOpacity={0.84}
              onPress={() => playAnimalSound(animal)}
              style={{
                width: 104,
                minHeight: 132,
                backgroundColor: animal.color,
                borderRadius: 16,
                margin: 7,
                paddingVertical: 12,
                paddingHorizontal: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: isActive ? 3 : 0,
                borderColor: '#263238',
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 4,
              }}
            >
              <Image
                source={animal.image}
                resizeMode="contain"
                style={{
                  width: 76,
                  height: 76,
                  marginBottom: 8,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '900',
                  color: '#263238',
                  textAlign: 'center',
                }}
              >
                {animal.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
