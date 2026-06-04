import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ParentDashboard({
  setShowDashboard,
}: any) {
  const [profilesStats, setProfilesStats] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const savedProfiles = await AsyncStorage.getItem('profiles');

    if (!savedProfiles) {
      setProfilesStats([]);
      return;
    }

    const profiles = JSON.parse(savedProfiles);

    const stats = await Promise.all(
      profiles.map(async (profile: any) => {
        const scoreSaved = await AsyncStorage.getItem(
          `score_${profile.name}`
        );

        const levelSaved = await AsyncStorage.getItem(
          `level_${profile.name}`
        );

        const animalBadgeSaved = await AsyncStorage.getItem(
          `badge_${profile.name}`
        );

        const memoryBadgeSaved = await AsyncStorage.getItem(
          `memoryBadge_${profile.name}`
        );

        return {
          name: profile.name,
          avatar: profile.avatar,
          score: scoreSaved ? JSON.parse(scoreSaved) : 0,
          level: levelSaved ? JSON.parse(levelSaved) : 1,
          animalBadge: animalBadgeSaved
            ? JSON.parse(animalBadgeSaved)
            : 'None',
          memoryBadge: memoryBadgeSaved
            ? JSON.parse(memoryBadgeSaved)
            : 'None',
        };
      })
    );

    setProfilesStats(stats);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingVertical: 40,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 30,
        }}
      >
        👨 Parent Dashboard
      </Text>

      {profilesStats.length === 0 && (
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          No profiles found.
        </Text>
      )}

      {profilesStats.map((profile) => (
        <View
          key={profile.name}
          style={{
            alignItems: 'center',
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
            }}
          >
            {profile.avatar} {profile.name}
          </Text>

          <Text>Score: {profile.score}</Text>
          <Text>Level: {profile.level}</Text>
          <Text>Animal Badge: {profile.animalBadge}</Text>
          <Text>Memory Badge: {profile.memoryBadge}</Text>
        </View>
      ))}

      <TouchableOpacity onPress={() => setShowDashboard(false)}>
        <Text
          style={{
            color: 'blue',
            fontSize: 20,
          }}
        >
          ⬅ Back
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}