import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {baseUrl, onFollowing} from '../../db/IP';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {font} from '../constants/font';

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 195);
  const g = Math.floor(Math.random() * 195);
  const b = Math.floor(Math.random() * 195);
  return `rgb(${r}, ${g}, ${b})`;
};

const User = React.memo(({item, index, navigation, token}) => {
  const bgColor = generateRandomColor();
  // console.log(item);
  const userId = item?._id;

  // console.log('followId' + followId + 'userId' + userId);
  const [following, setFollowing] = useState(false);
  // console.log(userInfo);
  const checkFollowStatus = (targetUserId, followingArray) => {
    return followingArray.includes(targetUserId);
  };

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/register`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const isFollowing = checkFollowStatus(userId, response.data.following);
        setFollowing(isFollowing);
        // console.log(isFollowing);
      } catch (error) {
        console.log('Error fetching user details', error.message);
      }
    };
    fetchFollowStatus();
  }, []);

  const handleFollow = async () => {
    try {
      await onFollowing(userId, token);
      setFollowing(!following);
    } catch (error) {
      console.error('Error handling follow action:', error.message);
    }
  };

  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('UserProfile', {item})}
      underlayColor={'#eee'}
      key={index}>
      <View style={styles.listView}>
        {/* <Text style={styles.writerCount}>{index + 1}</Text> */}
        <View>
          {!item?.image ? (
            <View style={[styles.avatar, {backgroundColor: bgColor}]}>
              <Text style={styles.avatarText}>
                {item?.username?.charAt(0)?.toUpperCase() ||
                  item?.name?.first?.charAt(0).toUpperCase(0)}
              </Text>
            </View>
          ) : (
            <Image
              source={{uri: item.image || item?.picture?.thumbnail}}
              style={styles.avatar}
            />
          )}
        </View>
        <View style={styles.listItem}>
          <Text style={styles.name}>
            {item?.username?.replace('_', ' ') ||
              item?.name?.first + ' ' + item?.name?.last}
          </Text>
          <Text style={styles.source}>
            @
            {item?.username?.replace(/\s+/g, '') ||
              item?.name?.first + ' ' + item?.name?.last}
          </Text>
        </View>
        {!following ? (
          <TouchableOpacity style={styles.followBtn} onPress={handleFollow}>
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.followBtn,
              {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#eee',
              },
            ]}
            onPress={handleFollow}>
            <Text style={[styles.followText, {color: 'chocolate'}]}>
              Unfollow
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableHighlight>
  );
});

export default User;

const styles = StyleSheet.create({
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: font.medium,
    fontSize: 20,
    color: '#fff',
  },
  listItem: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontFamily: font.medium,
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  source: {
    fontFamily: font.regular,
    fontSize: 12,
    color: '#777',
    textTransform: 'lowercase',
  },
  writerCount: {
    fontFamily: font.sm_bold,
    fontSize: 16,
    color: '#555',
    marginRight: 10,
  },
  followBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#a1614b',
    borderRadius: 20,
  },
  followText: {
    fontFamily: font.medium,
    fontSize: 12,
    color: '#fff',
  },
});
