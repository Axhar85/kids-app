import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Profile = {
  name: string;
  avatar: string;
};

type ProfileSelectionProps = {
  setSelectedProfile: (profileName: string) => void;
  setSelectedProfileAvatar: (avatar: string) => void;
};

const avatars = [
  '\uD83D\uDC66',
  '\uD83D\uDC67',
  '\uD83E\uDDB8',
  '\uD83D\uDC78',
  '\uD83E\uDD81',
  '\uD83D\uDE80',
  '\uD83D\uDC36',
  '\uD83D\uDC31',
];
const progressKeys = ['score', 'level', 'badge', 'memoryBadge', 'gamesPlayed'];

export default function ProfileSelection({
  setSelectedProfile,
  setSelectedProfileAvatar,
}: ProfileSelectionProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [newName, setNewName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [editingAvatarFor, setEditingAvatarFor] = useState<string | null>(null);
  const [renamingProfile, setRenamingProfile] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    const savedProfiles = await AsyncStorage.getItem('profiles');

    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
      return;
    }

    const defaultProfiles = [
      { name: 'Ali', avatar: avatars[0] },
      { name: 'Sara', avatar: avatars[1] },
    ];

    setProfiles(defaultProfiles);
    await AsyncStorage.setItem('profiles', JSON.stringify(defaultProfiles));
  };

  const selectProfile = (profile: Profile) => {
    setSelectedProfile(profile.name);
    setSelectedProfileAvatar(profile.avatar);
  };

  const addProfile = async () => {
    if (!newName.trim()) return;

    const updatedProfiles = [
      ...profiles,
      {
        name: newName.trim(),
        avatar: selectedAvatar,
      },
    ];

    setProfiles(updatedProfiles);
    await AsyncStorage.setItem('profiles', JSON.stringify(updatedProfiles));

    setNewName('');
    setSelectedAvatar(avatars[0]);
  };

  const removeProfile = async (profileName: string) => {
    const updatedProfiles = profiles.filter(
      (profile) => profile.name !== profileName
    );

    setProfiles(updatedProfiles);
    await AsyncStorage.setItem('profiles', JSON.stringify(updatedProfiles));

    for (const key of progressKeys) {
      await AsyncStorage.removeItem(`${key}_${profileName}`);
    }
  };

  const deleteProfile = (profileName: string) => {
    Alert.alert(
      'Delete profile?',
      `This will remove ${profileName}'s saved progress.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeProfile(profileName),
        },
      ]
    );
  };

  const startRenameProfile = (profileName: string) => {
    setRenamingProfile(profileName);
    setRenameValue(profileName);
  };

  const saveRenamedProfile = async () => {
    if (!renamingProfile || !renameValue.trim()) return;

    const oldName = renamingProfile;
    const cleanName = renameValue.trim();
    const updatedProfiles = profiles.map((profile) =>
      profile.name === oldName
        ? { ...profile, name: cleanName }
        : profile
    );

    setProfiles(updatedProfiles);
    await AsyncStorage.setItem('profiles', JSON.stringify(updatedProfiles));

    for (const key of progressKeys) {
      const oldValue = await AsyncStorage.getItem(`${key}_${oldName}`);

      if (oldValue !== null) {
        await AsyncStorage.setItem(`${key}_${cleanName}`, oldValue);
        await AsyncStorage.removeItem(`${key}_${oldName}`);
      }
    }

    setRenamingProfile(null);
    setRenameValue('');
  };

  const changeAvatar = async (profileName: string, newAvatar: string) => {
    const updatedProfiles = profiles.map((profile) =>
      profile.name === profileName
        ? { ...profile, avatar: newAvatar }
        : profile
    );

    setProfiles(updatedProfiles);
    await AsyncStorage.setItem('profiles', JSON.stringify(updatedProfiles));
    setEditingAvatarFor(null);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 25,
        }}
      >
        Choose Player
      </Text>

      {profiles.map((profile) => (
        <View
          key={profile.name}
          style={{
            alignItems: 'center',
            marginBottom: 15,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => selectProfile(profile)}
              style={{
                backgroundColor: '#4CAF50',
                padding: 15,
                borderRadius: 20,
                width: 190,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                }}
              >
                {profile.avatar} {profile.name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setEditingAvatarFor(
                  editingAvatarFor === profile.name ? null : profile.name
                )
              }
              style={{
                backgroundColor: '#9C27B0',
                marginLeft: 10,
                padding: 15,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                }}
              >
                {'\uD83C\uDFA8'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => startRenameProfile(profile.name)}
              style={{
                backgroundColor: '#FFC107',
                marginLeft: 10,
                padding: 15,
                borderRadius: 15,
              }}
            >
              <Text style={{ fontSize: 20 }}>{'\u270F\uFE0F'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => deleteProfile(profile.name)}
              style={{
                backgroundColor: '#F44336',
                marginLeft: 10,
                padding: 15,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                }}
              >
                {'\u274C'}
              </Text>
            </TouchableOpacity>
          </View>

          {editingAvatarFor === profile.name && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: 260,
                marginTop: 10,
              }}
            >
              {avatars.map((avatar) => (
                <TouchableOpacity
                  key={avatar}
                  onPress={() => changeAvatar(profile.name, avatar)}
                  style={{
                    padding: 8,
                    margin: 4,
                    borderRadius: 10,
                    backgroundColor:
                      profile.avatar === avatar ? '#FFC107' : '#E0E0E0',
                  }}
                >
                  <Text style={{ fontSize: 24 }}>{avatar}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}

      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 25,
          marginBottom: 10,
        }}
      >
        {'\u2795'} Add New Kid
      </Text>

      <TextInput
        placeholder="Kid name"
        value={newName}
        onChangeText={setNewName}
        style={{
          borderWidth: 1,
          width: 240,
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
          backgroundColor: 'white',
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: 260,
          marginBottom: 15,
        }}
      >
        {avatars.map((avatar) => (
          <TouchableOpacity
            key={avatar}
            onPress={() => setSelectedAvatar(avatar)}
            style={{
              padding: 10,
              margin: 5,
              borderRadius: 10,
              backgroundColor:
                selectedAvatar === avatar ? '#FFC107' : '#E0E0E0',
            }}
          >
            <Text style={{ fontSize: 28 }}>{avatar}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={addProfile}
        style={{
          backgroundColor: '#2196F3',
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 18,
          }}
        >
          Save Kid
        </Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={!!renamingProfile}
        animationType="fade"
        onRequestClose={() => setRenamingProfile(null)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            padding: 20,
          }}
        >
          <View
            style={{
              width: '100%',
              maxWidth: 320,
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginBottom: 12,
              }}
            >
              Rename Kid
            </Text>

            <TextInput
              autoFocus
              value={renameValue}
              onChangeText={setRenameValue}
              placeholder="Kid name"
              style={{
                borderWidth: 1,
                borderColor: '#BDBDBD',
                borderRadius: 10,
                padding: 10,
                marginBottom: 16,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <TouchableOpacity
                onPress={() => setRenamingProfile(null)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  marginRight: 8,
                }}
              >
                <Text style={{ fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={saveRenamedProfile}
                style={{
                  backgroundColor: '#4CAF50',
                  paddingVertical: 10,
                  paddingHorizontal: 18,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
