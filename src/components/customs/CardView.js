import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {EllipsisVerticalIcon} from 'react-native-heroicons/outline';
import {font} from '../constants/font';

const ITEM_WIDTH = Dimensions.get('screen').width / 2 - 20;

export default function CardView({onPress, item}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={item?.image_url}
            style={styles.blogImage}
            resizeMode="cover"
          />
        </View>

        {/* Content and Author Information */}
        <View style={styles.contentContainer}>
          <Text style={styles.sourceText}>{item?.channel_name}</Text>
          <Text style={styles.contentText} numberOfLines={2}>
            {item?.title}
          </Text>

          {/* Author Info and More Options */}
          <View style={styles.infoRow}>
            <View style={styles.authorContainer}>
              <Image source={item?.author_image} style={styles.authorImage} />
              <Text style={styles.authorText}>{item?.author}</Text>
            </View>

            <TouchableOpacity style={styles.moreOptionsBtn}>
              <EllipsisVerticalIcon size={20} color="#777" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    marginVertical: 6,
    backgroundColor: '#f7f7f7',
    width: ITEM_WIDTH,
    padding: 12,
    borderRadius: 12,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  blogImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
  },
  sourceText: {
    fontSize: 11,
    fontFamily: font.medium,
    opacity: 0.6,
    marginTop: 8,
  },
  contentText: {
    fontSize: 14,
    fontFamily: font.medium,
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 20,
    height: 20,
    borderRadius: 12,
  },
  authorText: {
    fontSize: 10,
    marginLeft: 5,
    fontFamily: font.medium,
    opacity: 0.6,
  },
  moreOptionsBtn: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
