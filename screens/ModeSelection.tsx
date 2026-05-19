import { Text, TouchableOpacity, View } from 'react-native';

export default function ModeSelection({
  setMode,
  selectedProfile,
}: {
  setMode: (mode: string) => void;
  selectedProfile: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
      }}
    >
      <Text
        style={{
          fontSize: 22,
          marginBottom: 10,
        }}
      >
        Welcome {selectedProfile} 👋
      </Text>

      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 30,
        }}
      >
        🎮 Choose Game Type
      </Text>

      <TouchableOpacity
        onPress={() => setMode('toddler')}
        style={{
          backgroundColor: '#FF9800',
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 20,
          marginBottom: 15,
          width: 220,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
          }}
        >
          👶 Little Kids
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setMode('big')}
        style={{
          backgroundColor: '#3F51B5',
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 20,
          width: 220,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
          }}
        >
          🧒 Big Kids
        </Text>
      </TouchableOpacity>
    </View>
  );
}