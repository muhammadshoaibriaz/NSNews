import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {ArrowRightIcon} from 'react-native-heroicons/outline';
import {font} from '../constants/font';

// Constants
export const SPACING = 14;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Writers({data, title, navigation}) {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Writer')}>
          <ArrowRightIcon size={20} color="#a1614b" />
        </TouchableOpacity>
      </View>

      {/* Writers List */}
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        keyExtractor={(item, index) => `${item.username}-${index}`}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.card}
            onPress={() => navigation.navigate('UserProfile', {item})}>
            <Image source={{uri: item?.image}} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.username} numberOfLines={1}>
                {item?.username}
              </Text>
              <Text style={styles.preference} numberOfLines={1}>
                {item?.preferences[0]}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    marginTop: SPACING,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SPACING,
    marginBottom: 10,
  },
  title: {
    fontFamily: font.medium,
    fontSize: 18,
  },
  flatListContent: {
    paddingLeft: SPACING,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    marginRight: 6,
    paddingVertical: 14,
    borderRadius: 8,
    paddingHorizontal: 6,
    width: SCREEN_WIDTH * 0.25, // Adjust card width dynamically
    maxWidth: 120,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30, // Perfect circle
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  username: {
    fontSize: 12,
    fontFamily: font.medium,
    textTransform: 'capitalize',
  },
  preference: {
    fontSize: 10,
    fontFamily: font.regular,
    color: '#777',
    textTransform: 'capitalize',
  },
});
