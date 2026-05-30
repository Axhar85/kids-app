import { Text, TouchableOpacity, View } from 'react-native';

export default function ProfileSelection({
  setSelectedProfile,
}: any) {
  const profiles = [
    {
    name: 'Ali',
    avatar: '🦸'
  },
  {
    name: 'Sara',
    avatar: '👸'
  },
  ];

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
          marginBottom: 30,
        }}
      >
        Choose Player
      </Text>

      {profiles.map((profile) => (

      <TouchableOpacity
        key={profile.name}
        onPress={() =>
          setSelectedProfile(profile.name)
        }
        style={{
          backgroundColor: '#4CAF50',
          padding: 20,
          borderRadius: 20,
          marginBottom: 15,
          width: 250,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 28,
          }}
        >
          {profile.avatar} {profile.name}
        </Text>
      </TouchableOpacity>

    ))}
    </View>
  );
}