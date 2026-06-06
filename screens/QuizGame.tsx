import { Text, TouchableOpacity, View } from 'react-native';

export default function QuizGame({ setMode }: any) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
      }}
    >
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 20 }}>
        🧠 Quiz Game
      </Text>

      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Coming soon!
      </Text>

      <TouchableOpacity onPress={() => setMode(null)}>
        <Text style={{ color: 'blue', fontSize: 20 }}>
          ⬅ Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}