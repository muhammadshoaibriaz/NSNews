import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import BottomSheet from 'react-native-raw-bottom-sheet';
import Button from './Button';

export default function Bottom() {
  const bottomRef = useRef();
  const handleBottomSheet = () => {
    bottomRef.current.open();
  };
  return (
    <BottomSheet
      customModalProps={{
        statusBarTranslucent: true,
      }}
      customStyles={{
        container: {
          backgroundColor: 'white',
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
          paddingHorizontal: 14,
        },
      }}
      draggable
      dragOnContent={true}
      ref={bottomRef}>
      <View style={{width: '100%'}}>
        <Button
          onPress={() => {
            bottomRef.current.close();
          }}
          icon={'heart-outline'}
          title={'Add To Favorite'}
        />
        <Button
          onPress={() => {
            bottomRef.current.close();
          }}
          icon={'person-circle-outline'}
          title={'View Artist'}
        />
      </View>
    </BottomSheet>
  );
}
