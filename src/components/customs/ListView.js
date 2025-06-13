import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  StyleSheet,
  Share,
  ToastAndroid,
} from 'react-native';
import {
  BackspaceIcon,
  BookmarkIcon,
  EllipsisVerticalIcon,
} from 'react-native-heroicons/outline';
import {font} from '../constants/font';
import {Menu} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {addBookMark} from '../redux/slices/bookMarkSlice';

export default function ListView({
  onPress,
  item,
  onIconPress,
  route,
  onLongPress,
}) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const dispatch = useDispatch();
  return (
    <TouchableWithoutFeedback onLongPress={onLongPress} onPress={onPress}>
      <View style={styles.card}>
        <TouchableOpacity
          style={[
            styles.crossIcon,
            {display: route?.name === 'Bookmarks' ? 'flex' : 'none'},
          ]}
          onPress={onIconPress}>
          <BackspaceIcon size={20} color="chocolate" />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={item?.image_url || {uri: item?.imageUrl}}
            style={styles.blogImage}
            resizeMode="cover"
          />
        </View>

        {/* Content and Author Information */}
        <View style={styles.contentContainer}>
          <Text style={styles.sourceText}>
            {item?.category?.replace('_', ' ')}
          </Text>
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
              <Text style={styles.authorText}>
                {item?.authorName?.replace('_', ' ')} ·{' '}
                {item?.datePosted?.slice(0, 10)}
              </Text>
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
                  Share.share({
                    message: item?.description,
                    title: item?.title,
                    url: item?.image_url,
                  });
                  closeMenu();
                }}
                title="Share"
                style={{borderBottomColor: '#ddd', borderBottomWidth: 0.5}}
              />
              <Menu.Item
                onPress={() => {
                  dispatch(addBookMark(item));
                  closeMenu();
                }}
                title="Bookmark"
                style={{borderBottomColor: '#ddd', borderBottomWidth: 0.5}}
              />
              <Menu.Item
                onPress={() => {
                  ToastAndroid.show(
                    'We will check your report and address it as soon as possible!',
                    3000,
                  );
                  closeMenu();
                }}
                title="Report"
              />
            </Menu>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    backgroundColor: '#fff',
    position: 'relative',
    width: '100%',
  },
  crossIcon: {
    width: 35,
    height: 35,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 111,
  },
  imageContainer: {
    position: 'relative',
  },
  blogImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  contentContainer: {
    marginLeft: 12,
    flex: 1,
  },
  sourceText: {
    fontSize: 11,
    fontFamily: font.medium,
    opacity: 0.6,
    textTransform: 'capitalize',
    color: 'chocolate',
  },
  contentText: {
    fontSize: 17,
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
    textTransform: 'capitalize',
    flex: 1,
  },
  moreOptionsBtn: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
