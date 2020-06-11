import React from 'react';
import {SafeAreaView} from 'react-native';

import {connect} from 'react-redux';

import Column from '../components/base/Column';
import Row from '../components/base/Row';
import Text from '../components/base/Text';
import ActionButton, {ActionButtonTitle} from '../components/ActionButton';

import theme from '../utils/theme';
import Score from '../components/Score';

const WrongAnswerView = ({navigation, totalScore}) => {
  return (
    <Column as={SafeAreaView} flex={1} bg="black">
      <Column style={{position: 'absolute', bottom: 120}}>
        <Text fontFamily={theme.fontFamily.bold} color="white" fontSize={28}>
          Game Over!{'\n\n\n\n\n'}
        </Text>

        <Text fontFamily={theme.fontFamily.bold} color="white" fontSize={18}>
          Do your best next time 🙂
        </Text>

        <Row mt={20}>
          <Text
            mr={10}
            fontFamily={theme.fontFamily.medium}
            color="white"
            fontSize={18}>
            You Score:
          </Text>
          <Score score={totalScore} />
        </Row>

        <ActionButton
          mt={30}
          borderRadius={10}
          onPress={() => navigation.navigate('Home')}
          bg="white">
          <ActionButtonTitle color="black">TRY AGAIN</ActionButtonTitle>
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

export default connect(mapStateToProps, null)(WrongAnswerView);
