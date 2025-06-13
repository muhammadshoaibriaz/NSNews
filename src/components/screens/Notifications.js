import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowLeftIcon, Cog8ToothIcon} from 'react-native-heroicons/outline';
import {font} from '../constants/font';
import axios from 'axios';
import {baseUrl} from '../../db/IP';
import {useSelector} from 'react-redux';
import {IconButton} from 'react-native-paper';
export default function Notifications({navigation}) {
  const userInfo = useSelector(state => state.login.user);
  const userId = userInfo?.user?._id;
  // console.log(userInfo?.user?._id);
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    fetchNotifications();
  }, []);
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/notifications/${userId}`,
      );
      console.log(response.data);
      setNotification(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const setRead = async id => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/notifications/${id}/read`,
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const dateTime = new Date();
  let hours = dateTime.getHours();
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <SafeAreaView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 14,
          marginTop: 40,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={20} color="#777" />
          </TouchableOpacity>
          <Text
            style={{fontSize: 22, fontFamily: font.sm_bold, marginLeft: 10}}>
            Notifications
          </Text>
        </View>

        <TouchableOpacity style={styles.iconBtn}>
          <Cog8ToothIcon size={20} color="#777" />
        </TouchableOpacity>
      </SafeAreaView>
      {notification?.length === 0 ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={{
              uri: 'https://ouch-cdn2.icons8.com/EAx_DerhY0Vz_dOPZ7zPATd34M8ND6uTclhde2O-Pt8/rs:fit:368:421/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTQ4/LzhmMTEzYjhhLWY3/ODMtNGJmOC1iMzc0/LTdmODFjMzZmMzJh/Mi5zdmc.png',
            }}
            resizeMode="contain"
            style={{
              width: 200,
              height: 280,
              alignSelf: 'center',
              marginTop: 50,
              marginBottom: 30,
            }}
          />
          <Text style={{fontFamily: font.medium, fontSize: 22}}>Empty</Text>
          <Text style={{fontFamily: font.medium, marginTop: 10}}>
            You don't have any notification of this time.
          </Text>
        </View>
      ) : (
        <View style={styles.notification}>
          <FlatList
            data={notification}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              // console.log(item);
              return (
                <TouchableOpacity
                  onPress={() => setRead(item?._id)}
                  activeOpacity={1}>
                  <View
                    style={[
                      styles.notificationView,
                      {
                        backgroundColor: item?.read
                          ? 'tranparent'
                          : '#a1614b10',
                      },
                    ]}>
                    <Image
                      source={{uri: item?.sender?.image}}
                      style={{width: 50, height: 50, borderRadius: 50}}
                    />
                    <View style={{flex: 1, paddingLeft: 12}}>
                      <Text style={{fontFamily: font.regular}}>
                        <Text style={{fontFamily: font.sm_bold}}>
                          {item?.sender?.username}
                        </Text>{' '}
                        liked your post.
                      </Text>
                      <Text style={{fontFamily: font.regular}}>
                        {hours - parseInt(item?.createdAt?.slice(11, 13))} hours
                        ago
                      </Text>{' '}
                    </View>
                    <IconButton
                      icon={'dots-horizontal'}
                      size={16}
                      onPress={() => {}}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableBtn: {
    borderRadius: 40,
    backgroundColor: '#a1614b',
    width: 110,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  notification: {
    flex: 1,
    marginTop: 10,
  },
  notificationView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});
