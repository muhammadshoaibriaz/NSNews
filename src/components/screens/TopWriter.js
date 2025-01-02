import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import axios from 'axios';
import {baseUrl} from '../../db/IP';
import {font} from '../constants/font';
import {useSelector} from 'react-redux';
import User from '../customs/User';

export default function TopWriter({navigation}) {
  const [writers, setWriters] = useState([]);
  const userInfo = useSelector(user => user.login.user);
  const token = userInfo?.token;

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/get_users`);
        setWriters(response.data);
      } catch (error) {
        console.error('Error fetching writers:', error);
      }
    };

    fetchWriters();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ArrowLeftIcon size={20} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Top Writer</Text>
      </View>

      {/* Writers List */}
      {!writers ? (
        <View style={styles.indicator}>
          <ActivityIndicator size={30} color={'chocolate'} />
        </View>
      ) : (
        <FlatList
          data={writers}
          renderItem={({item, index}) => (
            <User
              token={token}
              navigation={navigation}
              item={item}
              index={index}
            />
          )}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item?.username}-${index}`}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: font.sm_bold,
    marginLeft: 14,
  },
  flatListContent: {
    paddingBottom: 60,
  },
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
    fontFamily: font.sm_bold,
    fontSize: 16,
    color: '#333',
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
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
