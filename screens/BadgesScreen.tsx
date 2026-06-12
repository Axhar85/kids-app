import { Text, TouchableOpacity, View } from 'react-native';

type BadgesScreenProps = {
  badge: string;
  setShowBadges: (show: boolean) => void;
};

const badges = [
  '🥉 Animal Explorer',
  '🥈 Animal Expert',
  '🥇 Animal Master',
];

export default function BadgesScreen({
  badge,
  setShowBadges,
}: BadgesScreenProps) {
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
          fontSize: 30,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        🏅 My Badges
      </Text>

      {badges.map((item) => (
        <Text
          key={item}
          style={{
            fontSize: 22,
            marginBottom: 10,
          }}
        >
          {item === badge ? '✅ ' : '❌ '}
          {item}
        </Text>
      ))}

      <TouchableOpacity onPress={() => setShowBadges(false)}>
        <Text
          style={{
            marginTop: 30,
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
