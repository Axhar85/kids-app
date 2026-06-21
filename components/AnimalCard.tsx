import { Animated, Image, Text, TouchableOpacity } from 'react-native';
import { Animal } from '../data/animals';

type AnimalCardProps = {
  animal: Animal;
  selectedAnimal: string;
  scaleAnim: Animated.Value;
  onPress: () => void;
};

export default function AnimalCard({
  animal,
  selectedAnimal,
  scaleAnim,
  onPress,
}: AnimalCardProps) {
  return (
    <Animated.View
      style={{
        transform: [
          {
            scale: selectedAnimal === animal.name ? scaleAnim : 1,
          },
        ],
      }}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        accessibilityLabel={`Play ${animal.name} sound`}
        style={{
          backgroundColor: animal.color,
          width: 148,
          minHeight: 170,
          margin: 7,
          paddingVertical: 18,
          paddingHorizontal: 12,
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.16,
          shadowRadius: 5,
        }}
      >
        <Image
          source={animal.image}
          resizeMode="contain"
          style={{
            width: 104,
            height: 104,
            marginBottom: 8,
          }}
        />

        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: '#263238',
          }}
        >
          {animal.name}
        </Text>

        <Text
          style={{
            fontSize: 13,
            color: '#455A64',
            marginTop: 4,
            fontWeight: '700',
          }}
        >
          {'\uD83D\uDD0A'} Tap to hear
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
