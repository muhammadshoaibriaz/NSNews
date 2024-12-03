import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {font} from '../constants/font';

export default function Header({
  navigation,
  title,
  icon1,
  icon2,
  onPress1,
  onPress2,
}) {
  return (
    <SafeAreaView style={styles.header}>
      {/* Logo and Title Section */}
      <View style={styles.titleContainer}>
        <Image
          source={require('../../../assets/images/logo1.png')}
          style={styles.logo}
        />
        <Text style={styles.titleText}>{title}</Text>
      </View>

      {/* Icon Buttons Section */}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconBtn} onPress={onPress1}>
          <Ionicons name={icon1} size={20} color="#777" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={onPress2}>
          <Ionicons name={icon2} size={20} color="#777" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
  titleText: {
    fontSize: 22,
    fontFamily: font.sm_bold,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '24%',
  },
  iconBtn: {
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
