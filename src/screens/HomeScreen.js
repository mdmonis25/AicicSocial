import {AppBar, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PLACES, TOP_PLACES} from '../data';

import MainHeader from '../components/shared/MainHeader';
import React from 'react';
import ScreenHeader from '../components/shared/ScreenHeader';
import SectionHeader from '../components/shared/SectionHeader';
import TopPlacesCarousel from '../components/Home/TopPlacesCarousel';
import TripsList from '../components/Home/TripsList';
import {colors} from '../constants/theme';

const HomeScreen = () => {
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <MainHeader />
      <ScreenHeader mainTitle="Find Your" secondTitle="Dream Trip" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopPlacesCarousel list={TOP_PLACES} />
        <SectionHeader
          title="Popular Trips"
          buttonTitle="See All"
          onPress={() => {}}
        />
        <TripsList list={PLACES} />
        <TouchableOpacity>
            <Text style={{color:'red',textAlign:'center'}}>Logout</Text>
        </TouchableOpacity>
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
