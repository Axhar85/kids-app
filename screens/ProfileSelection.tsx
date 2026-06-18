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
          maxWidth: 440,
          marginBottom: 18,
        }}
      >
        <Text
          style={{
            fontSize: 34,
            fontWeight: '900',
            color: '#263238',
          }}
        >
          Choose Player
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#6D4C41',
            marginTop: 4,
          }}
        >
          Pick a child profile to continue playing.
        </Text>
      </View>

      <View style={{ width: '100%', maxWidth: 440 }}>
        {profiles.map((profile) => (
          <View
            key={profile.name}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
              padding: 16,
              marginBottom: 14,
              borderWidth: 1,
              borderColor: '#FFE0B2',
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 5,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.84}
              onPress={() => selectProfile(profile)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 14,
              }}
            >
              <View
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 33,
                  backgroundColor: '#E8F5E9',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 14,
                }}
              >
                <Text style={{ fontSize: 36 }}>{profile.avatar}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 26,
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
                  Tap to play
                </Text>
              </View>

              <Text style={{ fontSize: 26 }}>{'\u25B6\uFE0F'}</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  setEditingAvatarFor(
                    editingAvatarFor === profile.name ? null : profile.name
                  )
                }
                style={{
                  flex: 1,
                  backgroundColor: '#F3E5F5',
                  paddingVertical: 10,
                  borderRadius: 12,
                  alignItems: 'center',
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    color: '#6A1B9A',
                    fontSize: 15,
                    fontWeight: '800',
                  }}
                >
                  {'\uD83C\uDFA8'} Avatar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => startRenameProfile(profile.name)}
                style={{
                  flex: 1,
                  backgroundColor: '#FFF3E0',
                  paddingVertical: 10,
                  borderRadius: 12,
                  alignItems: 'center',
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    color: '#E65100',
                    fontSize: 15,
                    fontWeight: '800',
                  }}
                >
                  {'\u270F\uFE0F'} Rename
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteProfile(profile.name)}
                style={{
                  flex: 1,
                  backgroundColor: '#FFEBEE',
                  paddingVertical: 10,
                  borderRadius: 12,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: '#C62828',
                    fontSize: 15,
                    fontWeight: '800',
                  }}
                >
                  {'\u274C'} Delete
                </Text>
              </TouchableOpacity>
            </View>

            {editingAvatarFor === profile.name && (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  marginTop: 14,
                  paddingTop: 12,
                  borderTopWidth: 1,
                  borderTopColor: '#ECEFF1',
                }}
              >
                {avatars.map((avatar) => (
                  <TouchableOpacity
                    key={avatar}
                    onPress={() => changeAvatar(profile.name, avatar)}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 5,
                      backgroundColor:
                        profile.avatar === avatar ? '#FFC107' : '#ECEFF1',
                    }}
                  >
                    <Text style={{ fontSize: 24 }}>{avatar}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      <View
        style={{
          width: '100%',
          maxWidth: 440,
          backgroundColor: '#FFFFFF',
          borderRadius: 18,
          padding: 16,
          marginTop: 6,
          borderWidth: 1,
          borderColor: '#BBDEFB',
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: '900',
            color: '#263238',
            marginBottom: 12,
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
            borderColor: '#CFD8DC',
            paddingVertical: 11,
            paddingHorizontal: 12,
            borderRadius: 12,
            marginBottom: 12,
            backgroundColor: '#FAFAFA',
            fontSize: 16,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: 14,
          }}
        >
          {avatars.map((avatar) => (
            <TouchableOpacity
              key={avatar}
              onPress={() => setSelectedAvatar(avatar)}
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
                backgroundColor:
                  selectedAvatar === avatar ? '#FFC107' : '#ECEFF1',
              }}
            >
              <Text style={{ fontSize: 26 }}>{avatar}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={addProfile}
          style={{
            backgroundColor: '#2196F3',
            paddingVertical: 13,
            borderRadius: 14,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              fontWeight: '800',
            }}
          >
            Save Kid
          </Text>
        </TouchableOpacity>
      </View>

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
