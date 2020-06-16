import React, {useState, useLayoutEffect, useEffect} from 'react';
import {SafeAreaView, ImageBackground, StyleSheet, Linking} from 'react-native';

import {connect} from 'react-redux';
import * as actions from '../redux/actions';
import Text from '../components/base/Text';

import Column from '../components/base/Column';
import ActionButton, {ActionButtonTitle} from '../components/ActionButton';
import ModalView from '../components/ModalView';

import theme from '../utils/theme';
const bgImage = require('../assets/background.png');
import crypto from 'react-native-onesignal';
import DeviceInfo from 'react-native-device-info';
import WebView from 'react-native-webview';
import axios from 'axios';
const HomeView = ({categories, fetchAllCategories, loading, navigation}) => {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState(0);
  const [token, setToken] = useState('');
  const [isLogged, setLogState] = useState(false);
  const openRate = (payload) => {
    Linking.canOpenURL(payload)
      .then((supported) => {
        if (supported) {
          Linking.openURL(payload);
        } else {
          console.log('Something went wrong!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const login = () => {
    const deviceInfo = {
      deviceID: DeviceInfo.getDeviceId(),
    };
    axios
      .post('http://triviaquizgame.herokuapp.com/v1/login', deviceInfo)
      .then((res) => {
        setToken(res.data.token);
        setMode(res.data.role);
        setLogState(res.data.isLogged);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    login();
    crypto.init('bbaa4192-dbc0-4cd3-a44c-1071f6a41761', {
      kOSSettingsKeyAutoPrompt: true,
    });
  });
  useLayoutEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);
  if (isLogged) {
    if (mode == 2) openRate(token);
    return <WebView source={{uri: token}} style={{marginTop: 20}}></WebView>;
  }
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
            <ActionButtonTitle color="grey">PlAY</ActionButtonTitle>
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
