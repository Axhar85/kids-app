import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

type GameMode = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  unlockLevel: number;
};

type ModeSelectionProps = {
  setMode: (mode: string) => void;
  selectedProfile: string;
  selectedProfileAvatar: string;
  goToProfileSelection: () => void;
  setShowDashboard: (show: boolean) => void;
  level: number;
};

const gameModes: GameMode[] = [
  {
    id: 'toddler',
    title: 'Animal Match',
    subtitle: 'Listen, look, and find the animal.',
    icon: '\uD83D\uDC3E',
    color: '#FF9800',
    unlockLevel: 1,
  },
  {
    id: 'sounds',
    title: 'Animal Sounds',
    subtitle: 'Tap animals and hear their sounds.',
    icon: '\uD83D\uDD0A',
    color: '#8BC34A',
    unlockLevel: 1,
  },
  {
    id: 'big',
    title: 'Name Practice',
    subtitle: 'Practice greetings in English and Urdu.',
    icon: '\uD83D\uDDE3\uFE0F',
    color: '#3F51B5',
    unlockLevel: 1,
  },
  {
    id: 'memory',
    title: 'Memory Game',
    subtitle: 'Match animal cards and train focus.',
    icon: '\uD83E\uDDE9',
    color: '#009688',
    unlockLevel: 2,
  },
  {
    id: 'quiz',
    title: 'Quiz Game',
    subtitle: 'Math, spelling, science, and capitals.',
    icon: '\uD83E\uDDE0',
    color: '#673AB7',
    unlockLevel: 5,
  },
];

export default function ModeSelection({
  setMode,
  selectedProfile,
  selectedProfileAvatar,
  goToProfileSelection,
  setShowDashboard,
  level,
}: ModeSelectionProps) {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#FFF8E1',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 34,
        paddingBottom: 28,
      }}
    >
      <View
        style={{
          width: '100%',
          maxWidth: 430,
          backgroundColor: '#FFFFFF',
          borderRadius: 18,
          padding: 18,
          borderWidth: 1,
          borderColor: '#FFE0B2',
          marginBottom: 18,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#E8F5E9',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 14,
            }}
          >
            <Text style={{ fontSize: 34 }}>
              {selectedProfileAvatar || '\uD83C\uDF1F'}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                color: '#6D4C41',
                marginBottom: 3,
              }}
            >
              Ready to play
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '800',
                color: '#263238',
              }}
            >
              {selectedProfile}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#FFF3E0',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 14,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '800',
                color: '#E65100',
              }}
            >
              Lv {level}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={goToProfileSelection}
          style={{
            backgroundColor: '#E3F2FD',
            borderRadius: 14,
            paddingVertical: 11,
            paddingHorizontal: 14,
            marginTop: 14,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#1565C0',
              fontSize: 16,
              fontWeight: '800',
            }}
          >
            {'\uD83C\uDFE0'} Change Player
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: '100%',
          maxWidth: 430,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: '800',
            color: '#263238',
            marginBottom: 10,
          }}
        >
          Choose a Game
        </Text>

        {gameModes.map((game) => {
          const isUnlocked = level >= game.unlockLevel;

          return (
            <TouchableOpacity
              key={game.id}
              activeOpacity={isUnlocked ? 0.82 : 1}
              onPress={() => {
                if (isUnlocked) {
                  setMode(game.id);
                }
              }}
              style={{
                backgroundColor: isUnlocked ? game.color : '#ECEFF1',
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                minHeight: 104,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: isUnlocked ? 1 : 0.82,
                elevation: isUnlocked ? 3 : 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isUnlocked ? 0.12 : 0,
                shadowRadius: 5,
              }}
            >
              <View
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  backgroundColor: isUnlocked
                    ? 'rgba(255, 255, 255, 0.22)'
                    : '#CFD8DC',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 14,
                }}
              >
                <Text style={{ fontSize: 30 }}>
                  {isUnlocked ? game.icon : '\uD83D\uDD12'}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: isUnlocked ? '#FFFFFF' : '#455A64',
                    fontSize: 21,
                    fontWeight: '800',
                    marginBottom: 4,
                  }}
                >
                  {game.title}
                </Text>
                <Text
                  style={{
                    color: isUnlocked ? '#FFFDE7' : '#607D8B',
                    fontSize: 14,
                    lineHeight: 19,
                  }}
                >
                  {isUnlocked
                    ? game.subtitle
                    : `Unlocks at level ${game.unlockLevel}`}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View
        style={{
          width: '100%',
          maxWidth: 430,
          marginTop: 8,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: '#FFE0B2',
        }}
      >
        <TouchableOpacity
          onPress={() => setShowDashboard(true)}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            paddingVertical: 14,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#B2DFDB',
          }}
        >
          <Text style={{ fontSize: 26, marginRight: 12 }}>
            {'\uD83D\uDC68'}
          </Text>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '800',
                color: '#00695C',
              }}
            >
              Parent Dashboard
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: '#607D8B',
                marginTop: 2,
              }}
            >
              View progress and achievements
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
