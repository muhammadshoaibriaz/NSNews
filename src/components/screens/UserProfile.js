import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Articles from './Articles';
import {font} from '../constants/font';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {baseUrl, onFollowing} from '../../db/IP';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fetchArticles} from '../../db/funtionalDatabase';
<<<<<<< HEAD
import {fetchUserData} from '../redux/slices/profileSlice';
=======
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28

export default function UserProfile({navigation, route}) {
  const [following, setFollowing] = useState(false);
  const userInfo = useSelector(state => state.login.user);
  // console.log('userInfos', userInfo);
  const {item} = route?.params;
  const userId = item?._id;
  const token = userInfo?.token;
<<<<<<< HEAD
  const profile = item;

=======
  const user = item;

  // console.log('userInfo', item);
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28
  const followUser = async () => {
    try {
      await onFollowing(userId, token);
    } catch (error) {
      console.log('Error while following user', error);
    }
  };

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

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const getArticle = async () => {
      const response = await fetchArticles(userId);
      setArticles(response.articles);
      // console.log('response', response.articles);
    };
    getArticle();
  }, []);

  const randomNumber = Math.floor(Math.random() * 999);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={22} />
      </TouchableOpacity>
      {/* Profile Card Section */}
      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <Image
            source={
              item?.image !== ''
                ? {uri: item?.image}
                : require('../../../assets/images/avatar_3.jpg')
            }
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.usernameText}>
              {!item?.username
                ? 'Shabii'
                : item?.username.slice(0, 15).replace('_', ' ') + '...'}
            </Text>
            <Text style={styles.userHandle}>
              @{item?.username + randomNumber}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.followButton,
            {
              backgroundColor: following ? '#fff' : '#a1614b',
              borderColor: following ? '#a1614b' : '#fff',
            },
          ]}
          onPress={() => {
            setFollowing(!following);
            followUser();
          }}>
          <Text
            style={[
              styles.followButtonText,
              {color: following ? '#a1614b' : '#fff'},
            ]}>
            {following ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <StatItem label="Articles" value={item?.articles?.length} />
        <StatItem
          onPress={() => navigation.navigate('Following', {profile})}
          label="Following"
          value={`${item?.following?.length}`}
        />
        <StatItem
          label="Followers"
          value={item?.followers?.length}
          onPress={() => navigation.navigate('Follower', {profile})}
          style={{borderRightWidth: 0}}
        />
      </View>

      {/* Dynamic Content Section */}
      <View style={{flex: 1}}>
        <Articles articles={articles} navigation={navigation} />
      </View>
    </View>
  );
}

// Sub-components
const StatItem = ({label, value, onPress, style}) => (
  <TouchableOpacity
    activeOpacity={1}
    style={[styles.statItem, style]}
    onPress={onPress}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginTop: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileDetails: {
    marginLeft: 10,
    flex: 1,
  },
  usernameText: {
    fontFamily: font.sm_bold,
    fontSize: 18,
    textTransform: 'capitalize',
  },
  userHandle: {
    fontFamily: font.regular,
    opacity: 0.6,
    textTransform: 'lowercase',
  },
  followButton: {
    paddingHorizontal: 14,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  followButtonText: {
    fontSize: 16,
    fontFamily: font.medium,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    marginHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  statItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '33%',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  statValue: {
    fontFamily: font.medium,
    fontSize: 20,
  },
  statLabel: {
    fontFamily: font.regular,
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tabItem: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  tabText: {
    fontFamily: font.medium,
    fontSize: 16,
  },
  backButton: {
    width: 30,
    height: 30,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    left: 14,
  },
});
