import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';

const {height} = Dimensions.get('window'); // Screen height
const ITEM_HEIGHT = 80; // Height of each item
const HANDLE_HEIGHT = 50; // Height of the scroll handle

export default function SpotifyScrollWithHandle() {
  const scrollY = useRef(new Animated.Value(0)).current; // Tracks list scroll
  const handlePosition = useRef(new Animated.Value(0)).current; // Tracks handle drag
  const listRef = useRef(null);

  const data = Array.from({length: 50}, (_, i) => `Item ${i + 1}`); // Mock data

  // Calculate scroll-to-handle sync
  const maxHandleTranslate = height - HANDLE_HEIGHT;
  const maxScrollTranslate = data.length * ITEM_HEIGHT - height;

  // PanResponder for draggable handle
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const newY = Math.min(
        maxHandleTranslate,
        Math.max(0, gestureState.moveY - HANDLE_HEIGHT / 2),
      );
      handlePosition.setValue(newY);

      const scrollTo = (newY / maxHandleTranslate) * maxScrollTranslate;
      if (listRef.current) {
        listRef.current.scrollToOffset({offset: scrollTo, animated: false});
      }
    },
  });

  // Sync handle position when list scrolls
  scrollY.addListener(({value}) => {
    const newHandlePosition = (value / maxScrollTranslate) * maxHandleTranslate;
    handlePosition.setValue(newHandlePosition);
  });

  return (
    <View style={styles.container}>
      {/* Scrollable List */}
      <FlatList
        ref={listRef}
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
      />

      {/* Scroll Handle */}
      <Animated.View
        style={[
          styles.handle,
          {
            transform: [{translateY: handlePosition}],
          },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DB954',
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 18,
  },
  handle: {
    position: 'absolute',
    width: 30,
    height: HANDLE_HEIGHT,
    backgroundColor: '#ddd',
    right: 0,
    top: 0,
    zIndex: 2,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  },
});
