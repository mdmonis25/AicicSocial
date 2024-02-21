import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {colors} from '../constants/theme';
import MainHeader from '../components/shared/MainHeader';
import ScreenHeader from '../components/shared/ScreenHeader';
import TopPlacesCarousel from '../components/Home/TopPlacesCarousel';
import {PLACES, TOP_PLACES} from '../data';
import SectionHeader from '../components/shared/SectionHeader';
import TripsList from '../components/Home/TripsList';

const HomeScreen = () => {
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <MainHeader title="Travel App" />
      <ScreenHeader mainTitle="Find Your" secondTitle="Dream Trip" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopPlacesCarousel list={TOP_PLACES} />
        <SectionHeader
          title="Popular Trips"
          buttonTitle="See All"
          onPress={() => {}}
        />
        <TripsList list={PLACES} />
      </ScrollView>
    </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

export default HomeScreen;
