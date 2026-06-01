import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ParentDashboard({
  setShowDashboard,
}: any) {

  const [aliScore, setAliScore] = useState(0);
  const [aliLevel, setAliLevel] = useState(1);
  const [aliBadge, setAliBadge] = useState('');
  const [aliMemoryBadge, setAliMemoryBadge] = useState('');

  const [saraScore, setSaraScore] = useState(0);
  const [saraLevel, setSaraLevel] = useState(1);
  const [saraBadge, setSaraBadge] = useState('');
  const [saraMemoryBadge, setSaraMemoryBadge] = useState('');

  const loadStats = async () => {

    try {

      const aliScoreSaved =
        await AsyncStorage.getItem('score_Ali');

      const aliLevelSaved =
        await AsyncStorage.getItem('level_Ali');

      const aliBadgeSaved =
        await AsyncStorage.getItem('badge_Ali');

      const aliMemoryBadgeSaved =
        await AsyncStorage.getItem(
          'memoryBadge_Ali'
        );

      const saraScoreSaved =
        await AsyncStorage.getItem('score_Sara');

      const saraLevelSaved =
        await AsyncStorage.getItem('level_Sara');

      const saraBadgeSaved =
        await AsyncStorage.getItem('badge_Sara');

      const saraMemoryBadgeSaved =
        await AsyncStorage.getItem(
          'memoryBadge_Sara'
        );

      if (aliScoreSaved) {
        setAliScore(
          JSON.parse(aliScoreSaved)
        );
      }

      if (aliLevelSaved) {
        setAliLevel(
          JSON.parse(aliLevelSaved)
        );
      }

      if (aliBadgeSaved) {
        setAliBadge(
          JSON.parse(aliBadgeSaved)
        );
      }

      if (aliMemoryBadgeSaved) {
        setAliMemoryBadge(
          JSON.parse(
            aliMemoryBadgeSaved
          )
        );
      }

      if (saraScoreSaved) {
        setSaraScore(
          JSON.parse(saraScoreSaved)
        );
      }

      if (saraLevelSaved) {
        setSaraLevel(
          JSON.parse(saraLevelSaved)
        );
      }

      if (saraBadgeSaved) {
        setSaraBadge(
          JSON.parse(saraBadgeSaved)
        );
      }

      if (saraMemoryBadgeSaved) {
        setSaraMemoryBadge(
          JSON.parse(
            saraMemoryBadgeSaved
          )
        );
      }

    } catch (error) {

      console.log(
        'Dashboard load error',
        error
      );

    }

  };

  useEffect(() => {
    loadStats();
  }, []);

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

      {/* ALI */}

      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
        }}
      >
        👦 Ali
      </Text>

      <Text>
        Score: {aliScore}
      </Text>

      <Text>
        Level: {aliLevel}
      </Text>

      <Text>
        Animal Badge:
        {' '}
        {aliBadge || 'None'}
      </Text>

      <Text
        style={{
          marginBottom: 20,
        }}
      >
        Memory Badge:
        {' '}
        {aliMemoryBadge || 'None'}
      </Text>

      {/* SARA */}

      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
        }}
      >
        👧 Sara
      </Text>

      <Text>
        Score: {saraScore}
      </Text>

      <Text>
        Level: {saraLevel}
      </Text>

      <Text>
        Animal Badge:
        {' '}
        {saraBadge || 'None'}
      </Text>

      <Text
        style={{
          marginBottom: 20,
        }}
      >
        Memory Badge:
        {' '}
        {saraMemoryBadge || 'None'}
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