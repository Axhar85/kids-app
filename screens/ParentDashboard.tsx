import { Text, TouchableOpacity, View } from 'react-native';

export default function ParentDashboard({
  setShowDashboard,
}: any) {

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
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        👨 Parent Dashboard
      </Text>

      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        Statistics Coming Soon...
      </Text>

      <TouchableOpacity
        onPress={() =>
          setShowDashboard(false)
        }
      >
        <Text
          style={{
            color: 'blue',
            fontSize: 20,
          }}
        >
          ⬅ Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}