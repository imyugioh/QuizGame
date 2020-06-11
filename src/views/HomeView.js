import React, {useState, useLayoutEffect} from 'react';
import {SafeAreaView, ImageBackground, StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import * as actions from '../redux/actions';
import Text from '../components/base/Text';

import Column from '../components/base/Column';
import ActionButton, {ActionButtonTitle} from '../components/ActionButton';
import ModalView from '../components/ModalView';

import theme from '../utils/theme';
const bgImage = require('../assets/background.png');

const HomeView = ({categories, fetchAllCategories, loading, navigation}) => {
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  return (
    <ImageBackground source={bgImage} style={styles.container}>
      <Column as={SafeAreaView} flex={1}>
        <Column flex={1} mt={40}>
          <Text
            fontFamily={theme.fontFamily.bold}
            color="white"
            mt={-40}
            fontSize={40}>
            🎖Puzzle Game🎖
          </Text>
          <Text fontFamily={theme.fontFamily.bold} color="white" fontSize={15}>
            Only 60 Seconds - Challenge
          </Text>
        </Column>

        <Column flex={1}>
          <ActionButton mt={40} onPress={() => setVisible(!visible)} bg="white">
            <ActionButtonTitle color="grey">Let's Start</ActionButtonTitle>
          </ActionButton>
        </Column>

        <ModalView
          visible={visible}
          loading={loading}
          setVisible={setVisible}
          categories={categories}
          navigation={navigation}
        />
      </Column>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
});
const mapStateToProps = ({questionsReducer}) => {
  const {categories, loading} = questionsReducer;
  return {
    categories,
    loading,
  };
};

export default connect(mapStateToProps, actions)(HomeView);
