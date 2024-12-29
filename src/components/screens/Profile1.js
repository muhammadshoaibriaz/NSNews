import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Header from '../customs/Header';
import About from './About';
import Articles from './Articles';
import {font} from '../constants/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {baseUrl} from '../../db/IP';

export default function Profile1({navigation}) {
  const [activeTab, setActiveTab] = useState(1);
  const [articles, setArticles] = useState([]);
  const userInfo = useSelector(state => state.login.user);
  const [user, setUser] = useState(userInfo?.user);
  const userId = user?._id;
  // console.log(userId);
  console.log('userInfo', userInfo);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${baseUrl}/api/register`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data;
      setUser(data);
    } catch (error) {
      console.log('error getting user info', error.message);
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/register/${userId}/articles`,
        );
        setArticles(response.data.articles);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching articles', error);
      }
    };

    fetchArticles();
  }, []);
  // Render the selected component based on the active tab
  const renderContent = () => {
    return activeTab === 1 ? (
      <Articles
        token={userInfo?.token}
        navigation={navigation}
        articles={articles}
      />
    ) : (
      <About navigation={navigation} />
    );
  };
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Header
        title="Profile"
        icon1="mail-outline"
        icon2="ellipsis-horizontal-circle-outline"
        navigation={navigation}
      />

      {/* Profile Card Section */}
      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <Image
            source={
              user?.image !== ''
                ? {uri: user?.image}
                : require('../../../assets/images/avatar_3.jpg')
            }
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.usernameText}>
              {!user?.username
                ? 'Shabii🥀'
                : user?.username.slice(0, 15).replace('_', ' ') + '...'}
            </Text>
            <Text style={styles.userHandle}>@{user?.username}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <StatItem label="Articles" value={user?.articles?.length} />
        <StatItem
          onPress={() => navigation.navigate('Following', {user})}
          label="Following"
          value={`${user?.following?.length}`}
        />
        <StatItem
          label="Followers"
          value={user?.followers?.length}
          onPress={() => navigation.navigate('Follower', {user})}
          style={{borderRightWidth: 0}}
        />
      </View>

      {/* Tabs Section */}
      <View style={styles.tabsContainer}>
        <TabItem
          title="Articles"
          isActive={activeTab === 1}
          onPress={() => setActiveTab(1)}
        />
        <TabItem
          title="About"
          isActive={activeTab === 2}
          onPress={() => setActiveTab(2)}
        />
      </View>

      {/* Dynamic Content Section */}
      <View style={{flex: 1}}>{renderContent()}</View>
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

const TabItem = ({title, isActive, onPress}) => (
  <TouchableOpacity style={styles.tabItem} onPress={onPress}>
    <Text style={[styles.tabText, {color: isActive ? '#a1614b' : '#333'}]}>
      {title}
    </Text>
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
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  followButtonText: {
    fontSize: 12,
    fontFamily: font.medium,
    color: '#a1614b',
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
});
