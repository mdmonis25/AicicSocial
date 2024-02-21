import React, {useContext} from 'react';
import {SEARCH_ALL, SEARCH_HOTELS, SEARCH_PLACES} from '../data';
import {StyleSheet, Text, View} from 'react-native';

import { AuthContext } from '../../App';
import MainHeader from '../components/shared/MainHeader';
import SearchInput from '../components/Search/SearchInput';
import SearchMasonry from '../components/Search/SearchMasonry';
import Tabs from '../components/shared/Tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {colors} from '../constants/theme';

const tabs = [
  {
    title: 'All',
    content: () => <SearchMasonry key="all" list={SEARCH_ALL} />,
  },
  {
    title: 'Places',
    content: () => <SearchMasonry key="places" list={SEARCH_PLACES} />,
  },
  {
    title: 'Hotels',
    content: () => <SearchMasonry key="hotels" list={SEARCH_HOTELS} />,
  },
];

const SearchScreen = () => {

  const { state, dispatch } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <MainHeader title="Search" />
      <TouchableOpacity onPress={() => dispatch({type:"LOG_OUT"})}>
        <Text style={{color:'red',textAlign:'center'}}>Logout</Text>
      </TouchableOpacity>
      <SearchInput />
      <Tabs items={tabs} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

export default SearchScreen;
