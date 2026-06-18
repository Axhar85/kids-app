import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import achievements from '../data/achievements';
import animals, { getAnimalsForLevel } from '../data/animals';

type Profile = {
  name: string;
  avatar: string;
};

type ProfileStats = Profile & {
  score: number;
  level: number;
  animalBadge: string;
  memoryBadge: string;
  memoryWins: number;
};

type ParentDashboardProps = {
  setShowDashboard: (show: boolean) => void;
};

const normalizeBadge = (badge: string) => {
  if (badge.includes('Animal Master')) return 'Animal Master';
  if (badge.includes('Animal Expert')) return 'Animal Expert';
  if (badge.includes('Animal Explorer')) return 'Animal Explorer';
  if (badge.includes('Memory Master')) return 'Memory Master';
  if (badge.includes('Memory Expert')) return 'Memory Expert';
  if (badge.includes('Memory Beginner')) return 'Memory Beginner';

  return badge || 'None';
};

const getNextAnimal = (level: number) =>
  animals.find((animal) => animal.unlockLevel > level);

const getLevelProgress = (score: number) => {
  const progress = score % 3;
  const percent = Math.round((progress / 3) * 100);

  return {
    progress,
    label: `${progress}/3`,
    percent,
  };
};

function StatPill({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        minWidth: 92,
        backgroundColor: color,
        borderRadius: 14,
        paddingVertical: 10,
        paddingHorizontal: 10,
        margin: 4,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: '800',
          color: '#263238',
          textAlign: 'center',
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: '#455A64',
          textAlign: 'center',
          marginTop: 2,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function ParentDashboard({
  setShowDashboard,
}: ParentDashboardProps) {
  const [profilesStats, setProfilesStats] = useState<ProfileStats[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const savedProfiles = await AsyncStorage.getItem('profiles');

    if (!savedProfiles) {
      setProfilesStats([]);
      return;
    }

    const profiles: Profile[] = JSON.parse(savedProfiles);
    const stats = await Promise.all(
      profiles.map(async (profile) => {
        const scoreSaved = await AsyncStorage.getItem(`score_${profile.name}`);
        const levelSaved = await AsyncStorage.getItem(`level_${profile.name}`);
        const animalBadgeSaved = await AsyncStorage.getItem(
          `badge_${profile.name}`
        );
        const memoryBadgeSaved = await AsyncStorage.getItem(
          `memoryBadge_${profile.name}`
        );
        const memoryWinsSaved = await AsyncStorage.getItem(
          `memoryWins_${profile.name}`
        );

        return {
          name: profile.name,
          avatar: profile.avatar,
          score: scoreSaved ? JSON.parse(scoreSaved) : 0,
          level: levelSaved ? JSON.parse(levelSaved) : 1,
          animalBadge: animalBadgeSaved
            ? normalizeBadge(JSON.parse(animalBadgeSaved))
            : 'None',
          memoryBadge: memoryBadgeSaved
            ? normalizeBadge(JSON.parse(memoryBadgeSaved))
            : 'None',
          memoryWins: memoryWinsSaved ? JSON.parse(memoryWinsSaved) : 0,
        };
      })
    );

    setProfilesStats(stats);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingHorizontal: 20,
        paddingTop: 34,
        paddingBottom: 28,
      }}
    >
      <View
        style={{
          width: '100%',
          maxWidth: 460,
          marginBottom: 18,
        }}
      >
        <TouchableOpacity
          onPress={() => setShowDashboard(false)}
          style={{
            alignSelf: 'flex-start',
            paddingVertical: 8,
            paddingHorizontal: 4,
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              color: '#1565C0',
              fontSize: 18,
              fontWeight: '700',
            }}
          >
            {'\u2B05'} Back
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 32,
            fontWeight: '900',
            color: '#263238',
          }}
        >
          Parent Dashboard
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#6D4C41',
            marginTop: 4,
          }}
        >
          Track each child's progress across games.
        </Text>
      </View>

      {profilesStats.length === 0 && (
        <View
          style={{
            width: '100%',
            maxWidth: 460,
            backgroundColor: '#FFFFFF',
            borderRadius: 18,
            padding: 18,
            borderWidth: 1,
            borderColor: '#FFE0B2',
          }}
        >
          <Text style={{ fontSize: 20, color: '#455A64' }}>
            No profiles found.
          </Text>
        </View>
      )}

      {profilesStats.map((profile) => {
        const unlockedAnimals = getAnimalsForLevel(profile.level);
        const nextAnimal = getNextAnimal(profile.level);
        const levelProgress = getLevelProgress(profile.score);
        const earnedAchievements = [
          profile.animalBadge,
          profile.memoryBadge,
        ].filter((badge) => badge !== 'None');
        const achievementCount = earnedAchievements.length;

        return (
          <View
            key={profile.name}
            style={{
              width: '100%',
              maxWidth: 460,
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
              padding: 18,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: '#FFE0B2',
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 5,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 14,
              }}
            >
              <View
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 29,
                  backgroundColor: '#E8F5E9',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <Text style={{ fontSize: 31 }}>{profile.avatar}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: '900',
                    color: '#263238',
                  }}
                >
                  {profile.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#607D8B',
                    marginTop: 2,
                  }}
                >
                  {achievementCount} of 2 active achievements earned
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginHorizontal: -4,
                marginBottom: 14,
              }}
            >
              <StatPill label="Level" value={profile.level} color="#FFF3E0" />
              <StatPill label="Score" value={profile.score} color="#E3F2FD" />
              <StatPill
                label="Animals"
                value={`${unlockedAnimals.length}/${animals.length}`}
                color="#E8F5E9"
              />
              <StatPill
                label="Memory Wins"
                value={profile.memoryWins}
                color="#F3E5F5"
              />
            </View>

            <View style={{ marginBottom: 14 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '800',
                    color: '#455A64',
                  }}
                >
                  Next level progress
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '800',
                    color: '#455A64',
                  }}
                >
                  {levelProgress.label}
                </Text>
              </View>
              <View
                style={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#ECEFF1',
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    width: `${levelProgress.percent}%` as `${number}%`,
                    height: '100%',
                    backgroundColor: '#FF9800',
                  }}
                />
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#FAFAFA',
                borderRadius: 14,
                padding: 12,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '800',
                  color: '#455A64',
                  marginBottom: 6,
                }}
              >
                Learning Path
              </Text>
              <Text style={{ fontSize: 14, color: '#546E7A', lineHeight: 20 }}>
                Unlocked animals: {unlockedAnimals.map((animal) => animal.name).join(', ')}
              </Text>
              <Text style={{ fontSize: 14, color: '#546E7A', lineHeight: 20 }}>
                {nextAnimal
                  ? `Next unlock: ${nextAnimal.name} at level ${nextAnimal.unlockLevel}`
                  : 'All current animals are unlocked'}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#FAFAFA',
                borderRadius: 14,
                padding: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '800',
                  color: '#455A64',
                  marginBottom: 6,
                }}
              >
                Badges
              </Text>
              <Text style={{ fontSize: 14, color: '#546E7A', lineHeight: 20 }}>
                Animal: {profile.animalBadge}
              </Text>
              <Text style={{ fontSize: 14, color: '#546E7A', lineHeight: 20 }}>
                Memory: {profile.memoryBadge}
              </Text>
              <Text style={{ fontSize: 14, color: '#546E7A', lineHeight: 20 }}>
                Animal badge goals: {achievements.map((item) => item.title).join(', ')}
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
