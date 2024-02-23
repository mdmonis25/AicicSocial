import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {sizes, spacing} from '../../constants/theme';

import { AuthContext } from '../../../App';
import Icon from './Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from '@rneui/themed/dist/config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const MainHeader = () => {
  const onLogoutPress = () => {
    dispatch({type:"LOG_OUT"});
  }

  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {marginTop: insets.top}]}>
      <Icon icon="Hamburger" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: "#7F27FF",
  },
});

export default MainHeader;
