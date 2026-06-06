import { Text, TouchableOpacity, View } from 'react-native';


export default function ModeSelection({
  setMode,
  selectedProfile,
  setShowDashboard,
  level,
}: {
  setMode: (mode: string) => void;
  selectedProfile: string;
  setShowDashboard: (show: boolean) => void;
  level: number;
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
      <TouchableOpacity
        onPress={() => {
          if (level >= 2) {
            setMode('memory');
          }
        }}
        style={{
          backgroundColor: level >= 2 ? '#009688' : '#9E9E9E',
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 20,
          width: 220,
          alignItems: 'center',
          marginTop: 15,
        }}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>
          {level >= 2 ? '🧩 Memory Game' : '🔒 Memory Game'}
        </Text>
      </TouchableOpacity>
          <TouchableOpacity
  onPress={() => {
    if (level >= 5) {
      setMode('quiz');
    }
  }}
  style={{
    backgroundColor: level >= 5 ? '#673AB7' : '#9E9E9E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: 220,
    alignItems: 'center',
    marginTop: 15,
  }}
>
  <Text style={{ color: 'white', fontSize: 20 }}>
    {level >= 5 ? '🧠 Quiz Game' : '🔒 Quiz Game'}
  </Text>
</TouchableOpacity>
      <TouchableOpacity
        onPress={() => setShowDashboard(true)}
        style={{
          backgroundColor: '#009688',
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 20,
          width: 220,
          alignItems: 'center',
          marginTop: 15,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
          }}
        >
          👨 Dashboard
        </Text>
      </TouchableOpacity>
          
    </View>
  );
}