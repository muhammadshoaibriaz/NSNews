import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  BackspaceIcon,
  EllipsisVerticalIcon,
} from 'react-native-heroicons/outline';
import {font} from '../constants/font';
import {Menu} from 'react-native-paper';

const ITEM_WIDTH = Dimensions.get('screen').width / 2 - 20;

export default function CardView({onPress, item, route, onIconPress}) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <TouchableOpacity
          style={[
            styles.crossIcon,
            {display: route?.name === 'Bookmarks' ? 'flex' : 'none'},
          ]}
          onPress={onIconPress}>
          <BackspaceIcon size={22} color="chocolate" />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item?.imageUrl}}
            style={styles.blogImage}
            resizeMode="cover"
          />
        </View>

        {/* Content and Author Information */}
        <View style={styles.contentContainer}>
          <Text style={styles.sourceText}>{item?.category}</Text>
          <Text style={styles.contentText} numberOfLines={2}>
            {item?.title}
          </Text>

          {/* Author Info and More Options */}
          <View style={styles.infoRow}>
            <View style={styles.authorContainer}>
              <Image
                source={{uri: item?.authorImage}}
                style={styles.authorImage}
              />
              <Text style={styles.authorText}>{item?.authorName}</Text>
            </View>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              contentStyle={{backgroundColor: '#fff'}}
              anchor={
                <EllipsisVerticalIcon
                  onPress={openMenu}
                  size={20}
                  color="#777"
                />
              }>
              <Menu.Item
                onPress={() => {
                  /* Handle share */
                }}
                title="Share"
                style={{borderBottomColor: '#eee', borderBottomWidth: 1}}
              />
              <Menu.Item
                onPress={() => {
                  /* Handle bookmark */
                }}
                style={{borderBottomColor: '#eee', borderBottomWidth: 1}}
                title="Bookmark"
              />
              <Menu.Item
                onPress={() => {
                  /* Handle report */
                }}
                title="Report"
              />
            </Menu>

            {/* <TouchableOpacity style={styles.moreOptionsBtn}>
              <EllipsisVerticalIcon size={20} color="#777" />
            </TouchableOpacity> */}
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
    textTransform: 'capitalize',
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
  crossIcon: {
    width: 35,
    height: 35,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 0,
    zIndex: 111,
  },
});
