import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {colors, sizes, spacing} from '../../constants/theme';
import Rating from '../shared/Rating/Rating';
import Divider from '../shared/Divider';

const Review = ({review}) => {
  return (
    <>
      <Divider enabledSpacing={false} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.avatar} source={review.author.avatar} />
          <View style={styles.userBox}>
            <Text style={styles.user}>{review.author.username}</Text>
            <Text style={styles.date}>{review.date}</Text>
          </View>
          <Rating rating={review.rating} showLabelTop />
        </View>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.l,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  avatar: {
    height: 30,
    width: 30,
    resizeMode: 'cover',
    borderRadius: sizes.radius,
    marginRight: spacing.s,
  },
  userBox: {
    flex: 1,
    marginRight: spacing.s,
  },
  user: {
    color: colors.primary,
    fontSize: sizes.body,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  date: {
    fontSize: sizes.caption,
    color: colors.lightGray,
  },
  text: {
    color: colors.gray,
  },
});

export default Review;
