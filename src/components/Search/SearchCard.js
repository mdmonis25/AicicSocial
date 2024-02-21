import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Card from '../shared/Card/Card';
import CardMedia from '../shared/Card/CardMedia';
import CardContent from '../shared/Card/CardContent';
import {spacing, sizes, colors} from '../../constants/theme';
import CardFavoriteIcon from '../shared/Card/CardFavoriteIcon';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';

const SearchCard = ({item, index}) => {
  const navigation = useNavigation();
  const even = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index < 6 ? index * 80 : 0)}
      style={{
        paddingTop: index === 1 ? spacing.l : 0,
        paddingLeft: !even ? spacing.l / 2 : 0,
        paddingRight: even ? spacing.l / 2 : 0,
        paddingBottom: spacing.l,
      }}>
      <Card
        onPress={() => {
          item.type === 'PLACE'
            ? navigation.navigate('TripDetails', {trip: item})
            : null;
        }}
        style={{
          width: '100%',
          height: index % 3 === 0 ? 180 : 240,
        }}>
        <CardFavoriteIcon onPress={() => {}} />
        <SharedElement id={`trip.${item.id}.image`} style={styles.media}>
          <CardMedia source={item.image} borderBottomRadius />
        </SharedElement>
        <CardContent>
          <View style={styles.titleBox}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </CardContent>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  media: {
    flex: 1,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    fontSize: sizes.body,
    fontWeight: 'bold',
    color: colors.primary,
    marginVertical: 4,
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
});

export default SearchCard;
