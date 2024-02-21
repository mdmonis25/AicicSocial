import React from 'react';
import {View, StyleSheet} from 'react-native';
import Review from './Review';
import {spacing} from '../../constants/theme';

const Reviews = ({reviews = []}) => {
  return (
    <View style={styles.container}>
      {reviews.map(review => (
        <Review review={review} key={review.id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.l,
  },
});

export default Reviews;
