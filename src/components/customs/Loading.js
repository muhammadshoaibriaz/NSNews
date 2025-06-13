import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

export default function Loading() {
  return (
    <View style={styles.imageWrapper}>
      <ActivityIndicator size={40} color={'chocolate'} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 100,
  },
});
