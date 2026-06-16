import { Text, TouchableOpacity, View } from 'react-native';

type BadgesScreenProps = {
  badge: string;
  setShowBadges: (show: boolean) => void;
};

const badges = [
  { name: 'Animal Explorer', icon: '\uD83E\uDD49' },
  { name: 'Animal Expert', icon: '\uD83E\uDD48' },
  { name: 'Animal Master', icon: '\uD83E\uDD47' },
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
        {'\uD83C\uDFC5'} My Badges
      </Text>

      {badges.map((item) => {
        const isUnlocked = item.name === badge;

        return (
          <Text
            key={item.name}
            style={{
              fontSize: 22,
              marginBottom: 10,
            }}
          >
            {isUnlocked ? '\u2705 ' : '\u274C '}
            {item.icon} {item.name}
          </Text>
        );
      })}

      <TouchableOpacity onPress={() => setShowBadges(false)}>
        <Text
          style={{
            marginTop: 30,
            color: 'blue',
            fontSize: 20,
          }}
        >
          {'\u2B05'} Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}
