import React from 'react';
import {SafeAreaView} from 'react-native';

import {connect} from 'react-redux';

import Column from '../components/base/Column';
import Row from '../components/base/Row';
import Text from '../components/base/Text';
import ActionButton, {ActionButtonTitle} from '../components/ActionButton';

import theme from '../utils/theme';
import Score from '../components/Score';

const CorrectAnswerView = ({navigation, totalScore}) => {
  return (
    <Column as={SafeAreaView} flex={1} bg="black">
      <Column style={{position: 'absolute', bottom: 150}}>
        <Text fontFamily={theme.fontFamily.bold} color="white" fontSize={28}>
          Congratulations!{'\n\n\n\n\n'}
        </Text>

        <Row>
          <Text
            mr={10}
            fontFamily={theme.fontFamily.medium}
            color="white"
            fontSize={18}>
            You're won
          </Text>
          <Score score={100} />
        </Row>

        <Row mt={20}>
          <Text
            mr={10}
            fontFamily={theme.fontFamily.medium}
            color="white"
            fontSize={18}>
            Total:
          </Text>
          <Score score={totalScore} />
        </Row>

        <ActionButton
          mt={20}
          borderRadius={10}
          onPress={() => navigation.navigate('Questions')}
          bg="white">
          <ActionButtonTitle color="black">NEXT</ActionButtonTitle>
        </ActionButton>
      </Column>
    </Column>
  );
};

const mapStateToProps = ({questionsReducer}) => {
  const {totalScore} = questionsReducer;

  return {
    totalScore,
  };
};

export default connect(mapStateToProps, null)(CorrectAnswerView);
