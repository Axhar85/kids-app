import { Animated, Image, Text, TouchableOpacity } from 'react-native';

export default function AnimalCard({
  animal,
  selectedAnimal,
  scaleAnim,
  onPress
}: any) {
  return (
    <Animated.View
      style={{
        transform: [
          {
            scale:
              selectedAnimal === animal.name
                ? scaleAnim
                : 1
          }
        ]
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: animal.color,
          paddingVertical: 25,
          paddingHorizontal: 20,
          borderRadius: 20,
          marginBottom: 15,
          width: 220,
          alignItems: 'center',
          elevation: 5
        }}
      >
        <Image
          source={animal.image}
          style={{
            width: 100,
            height: 100,
            marginBottom: 10
          }}
        />

        <Text style={{ fontSize: 24 }}>
          {animal.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}