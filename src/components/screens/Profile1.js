import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Header from '../customs/Header';
import About from './About';
import Articles from './Articles';
import {font} from '../constants/font';

export default function Profile1({navigation}) {
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  // Generate a random number for the username suffix
  const randomNumber = Math.floor(Math.random() * 999);

  // Render the selected component based on the active tab
  const renderContent = () => {
    return activeTab === 1 ? (
      <Articles navigation={navigation} />
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
        // onPress2={() => navigation.navigate('Bookmarks')}
      />

      {/* Profile Card Section */}
      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <Image
            source={require('../../../assets/images/tolgaa.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.usernameText}>Shabii</Text>
            <Text style={styles.userHandle}>@{'shabii' + randomNumber}</Text>
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
          onPress={() => setFollowing(!following)}>
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
        <StatItem label="Articles" value="365" />
        <StatItem label="Following" value={0} />
        <StatItem label="Followers" value={0} />
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
const StatItem = ({label, value}) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
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
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  profileDetails: {
    marginLeft: 10,
  },
  usernameText: {
    fontFamily: font.sm_bold,
    fontSize: 18,
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
});
