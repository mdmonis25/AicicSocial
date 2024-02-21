import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors, sizes, spacing} from '../../../constants/theme';
import Rating from './Rating';
import {getFractionDigitsRating} from './utils';

const RatingOverall = ({rating, containerStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.rating}>{getFractionDigitsRating(rating)}</Text>
      <View>
        <Text style={styles.caption}>Overall Rating</Text>
        <Rating rating={rating} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: sizes.title,
    color: colors.primary,
    marginRight: spacing.s,
  },
  caption: {
    fontSize: sizes.caption,
    color: colors.lightGray,
  },
});

export default RatingOverall;
