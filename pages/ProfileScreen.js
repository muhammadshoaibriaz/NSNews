import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {TouchableRipple, Switch} from 'react-native-paper';
export default function ProfileScreen({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome name="align-left" size={20} color="#009ad2" />
        </TouchableOpacity>
        <Text style={styles.setting}>Settings</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.out}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileCard}>
        <Image
          source={require('../images/img23.jpg')}
          style={styles.img}
          resizeMode="cover"
        />
        <View style={{marginLeft: 10}}>
          <Text style={styles.name}>Muhammad Shoaib</Text>
          <Text style={styles.mail}>shoaibriaze@gmail.com</Text>
        </View>
      </View>
      <View style={styles.mainContent}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            paddingHorizontal: 14,
            paddingVertical: 20,
            backgroundColor: '#efefef',
          }}>
          Account
        </Text>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.touchables}>
            <View style={styles.notify}>
              <FontAwesome name="bell-o" style={{width: 25}} size={20} />
              <Text style={styles.btns}>Push Notifications</Text>
            </View>
            <Switch />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.touchable}>
            <View style={styles.notify}>
              <FontAwesome name="dollar" style={{width: 25}} size={20} />
              <Text style={styles.btns}>Currency</Text>
            </View>
            <FontAwesome name="angle-right" size={24} color="#999" />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.touchable}>
            <View style={styles.notify}>
              <FontAwesome name="map-marker" style={{width: 25}} size={20} />
              <Text style={styles.btns}>Location</Text>
            </View>
            <FontAwesome name="angle-right" size={24} color="#999" />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.touchable}>
            <View style={styles.notify}>
              <FontAwesome name="globe" style={{width: 25}} size={20} />
              <Text style={styles.btns}>Language</Text>
            </View>
            <FontAwesome name="angle-right" size={24} color="#999" />
          </View>
        </TouchableRipple>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            paddingHorizontal: 14,
            marginBottom: 5,
            paddingVertical: 20,
            backgroundColor: '#efefef',
          }}>
          More
        </Text>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.touchable}>
            <View style={styles.notify}>
              <AntDesign name="infocirlce" style={{width: 25}} size={20} />
              <Text style={styles.btns}>About us</Text>
            </View>
            <FontAwesome name="angle-right" size={24} color="#999" />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.touchable}>
            <View style={styles.notify}>
              <AntDesign name="bulb1" style={{width: 25}} size={20} />
              <Text style={styles.btns}>Terms and Policies</Text>
            </View>
            <FontAwesome name="angle-right" size={24} color="#999" />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.touchable}>
            <View style={styles.notify}>
              <AntDesign name="profile" style={{width: 25}} size={20} />
              <Text style={styles.btns}>Faqs</Text>
            </View>
            <FontAwesome name="angle-right" size={24} color="#999" />
          </View>
        </TouchableRipple>
      </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    alignItems: 'center',
    paddingVertical: 15,
  },
  btns: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 14,
  },
  touchables: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 14,
  },
  setting: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 35,
  },
  notify: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  out: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#009ad2',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 20,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#eee',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mail: {
    color: 'gray',
    fontSize: 15,
  },
  mainContent: {
    // paddingHorizontal: 14,
    marginTop: 10,
  },
});
