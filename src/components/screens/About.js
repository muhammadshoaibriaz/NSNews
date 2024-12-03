import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {font} from '../constants/font';

export default function About({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionText}>
            My name is Shoaib Riaz. I'm a Front-End-Developer etc.
          </Text>
        </View>

        {/* Social Media Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Media</Text>
          {[
            {name: 'whatsapp', label: 'Whatsapp'},
            {name: 'facebook-square', label: 'Facebook'},
            {name: 'twitter', label: 'Twitter'},
            {name: 'instagram', label: 'Instagram'},
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.socialButton}
              onPress={() => navigation.navigate('WebView')}>
              <FontAwesome
                name={item.name}
                size={24}
                color={styles.iconColor.color}
              />
              <Text style={styles.socialText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* More Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Info</Text>
          {[
            {icon: 'globe', text: 'www.exampledomain.com'},
            {icon: 'map-pin', text: 'Khanewal Punjab, Pakistan'},
            {icon: 'info', text: 'Joined, since August 24, 2024'},
            {icon: 'bar-chart', text: '3,453,536 readers'},
          ].map((item, index) => (
            <View key={index} style={styles.infoRow}>
              <Feather
                name={item.icon}
                size={18}
                color={styles.iconColor.color}
              />
              <Text style={styles.infoText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  section: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontFamily: font.medium,
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionText: {
    fontFamily: font.regular,
    color: '#555',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginBottom: 10,
  },
  socialText: {
    fontFamily: font.medium,
    color: '#a1614b',
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoText: {
    fontFamily: font.medium,
    color: '#555',
    marginLeft: 10,
  },
  iconColor: {
    color: '#a1614b',
  },
});
