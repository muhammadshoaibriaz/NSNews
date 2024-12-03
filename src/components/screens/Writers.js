import {useNavigation, useRoute} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ArrowRightIcon, BookmarkIcon} from 'react-native-heroicons/outline';
import {font} from '../constants/font';
export const SPACING = 14;

export default function Writers({data, title}) {
  const navigation = useNavigation();
  return (
    <View style={{marginTop: 14}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 14,
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontFamily: font.medium,
            fontSize: 18,
          }}>
          {title}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Writer')}>
          <ArrowRightIcon size={20} color="#a1614b" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingLeft: SPACING}}
        renderItem={({item, index}) => {
          return (
            <TouchableWithoutFeedback key={index}>
              <View style={styles.card}>
                <Image source={item?.image_url} style={styles.image} />
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: font.medium,
                      marginTop: 4,
                    }}
                    numberOfLines={1}>
                    {item?.author}
                  </Text>

                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: font.regular,
                      color: '#777',
                    }}
                    numberOfLines={1}>
                    {item?.channel_name}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    marginRight: 6,
    paddingVertical: 14,
    borderRadius: 8,
    paddingHorizontal: 6,
    minWidth: 100,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
