import { Text, View } from 'react-native';

export default function GameHeader({
  score,
  level,
  badge,
  showBadgePopup
}: any) {
  return (
    <View
      style={{
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 15,
        backgroundColor: '#FFF8E1'
      }}
    >
      <Text
        style={{
          fontSize: 36,
          fontWeight: 'bold'
        }}
      >
        🎮 Fun Animal Game
      </Text>

      <Text style={{ fontSize: 22 }}>
        ⭐ Score: {score}
      </Text>

      <Text style={{ fontSize: 22 }}>
        🏆 Level: {level}
      </Text>

      {!!badge && (
        <Text
          style={{
            fontSize: 20,
            color: '#E65100',
            fontWeight: 'bold'
          }}
        >
          {badge}
        </Text>
      )}

      {showBadgePopup && (
        <Text
          style={{
            fontSize: 24,
            color: '#FF6F00',
            fontWeight: 'bold',
            marginTop: 10
          }}
        >
          🎉 NEW BADGE!
        </Text>
      )}
    </View>
  );
}