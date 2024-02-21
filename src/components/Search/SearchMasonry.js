import React from 'react';
import {StyleSheet} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import {spacing} from '../../constants/theme';
import SearchCard from './SearchCard';

const SearchMasonry = ({list}) => {
  return (
    <MasonryList
      data={list}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={styles.masonry}
      showsVerticalScrollIndicator={false}
      renderItem={({item, i}) => <SearchCard item={item} index={i} />}
      refreshing={false}
    />
  );
};

const styles = StyleSheet.create({
  masonry: {
    paddingHorizontal: spacing.l,
  },
});

export default SearchMasonry;
