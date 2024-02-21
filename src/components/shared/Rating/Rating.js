import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {colors} from '../../../constants/theme';
import {
  getCorrectRating,
  getFractionDigitsRating,
  getRatingLabel,
} from './utils';

const Rating = ({
  showLabelInline,
  showLabelTop,
  containerStyle,
  rating,
  disabled = true,
  size = 12,
}) => {
  const _rating = getCorrectRating(rating);
  return (
    <View
      style={[styles.container, containerStyle].concat(
        showLabelInline ? styles.containerRow : null,
      )}>
      {showLabelTop && (
        <Text style={styles.label}>
          {getRatingLabel(_rating)} {getFractionDigitsRating(rating)}
        </Text>
      )}
      <AirbnbRating
        defaultRating={_rating}
        count={5}
        showRating={false}
        selectedColor={colors.primary}
        isDisabled={disabled}
        size={size}
      />
      {showLabelInline && (
        <Text style={styles.label}>{getFractionDigitsRating(rating)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    marginHorizontal: -2,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: colors.primary,
    marginLeft: 4,
  },
});

export default Rating;
