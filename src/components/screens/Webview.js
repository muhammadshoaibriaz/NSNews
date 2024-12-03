import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
export default function Webview({navigation}) {
  return (
    <View style={styles.container}>
      <WebView
        style={{flex: 1}}
        contentMode="desktop"
        source={{uri: 'https://shoaib-portfolio-kz7z.vercel.app/'}}></WebView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
