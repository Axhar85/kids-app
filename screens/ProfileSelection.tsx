import { Text, TouchableOpacity, View } from 'react-native';

export default function ProfileSelection({
  setSelectedProfile,
}: any) {
  const profiles = [
    { name: 'Ali', emoji: '👦' },
    { name: 'Sara', emoji: '👧' },
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
          onPress={() => setSelectedProfile(profile.name)}
          style={{
            backgroundColor: '#4CAF50',
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
              fontSize: 22,
            }}
          >
            {profile.emoji} {profile.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}