import React, {useState, useEffect} from 'react';

import {Dimensions, View} from 'react-native';

import {connect} from 'react-redux';
import * as actions from '../redux/actions';

import {CustomPicker} from 'react-native-custom-picker';
import Modal from 'react-native-modal';

import Text from './base/Text';
import ActionButton, {ActionButtonTitle} from './ActionButton';
import Column from './base/Column';
import Row from './base/Row';

const ModalView = ({
  visible,
  loading,
  setVisible,
  categories,
  startGame,
  navigation,
}) => {
  const [difficulty, setDifficulty] = useState('easy');
  const [category, setCategory] = useState([]);

  // Only categories labels
  const editedCategory = categories.map((c) => c.label);

  // Get selected category id
  const getCategoryId = (selectedCategory) =>
    categories.find((c) => c.label === selectedCategory);

  const selectedCategoryIdState = getCategoryId(category);

  // Custom Picker Settings

  const renderHeader = () => {
    return (
      <Row justifyContent="flex-start" m={10}>
        <Text fontSize={18} fontFamily="Poppins-Medium" color="purple">
          All Categories
        </Text>
      </Row>
    );
  };

  const renderField = (settings) => {
    const {selectedItem, defaultText, getLabel} = settings;
    return (
      <View>
        <View>
          {!selectedItem && (
            <View>
              <Text color="white">{defaultText}</Text>
            </View>
          )}
          {selectedItem && (
            <View>
              <Text color="white">{getLabel(selectedItem)}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderOption = (settings) => {
    const {item, getLabel} = settings;
    return (
      <Row justifyContent="flex-start" m={10} borderRadius={8}>
        <Text fontSize={16} color="black">
          {getLabel(item)}
        </Text>
      </Row>
    );
  };

  return (
    <Column bg="red">
      <Modal isVisible={visible}>
        <Column bg="grey" p={20} borderRadius={8}>
          <Text fontFamily="Poppins-Bold" fontSize={24} color="white">
            Select your level
          </Text>

          <Row
            justifyContent="space-evenly"
            width={Dimensions.get('window').width / 2}
            m={10}>
            <Text fontFamily="Poppins-Medium" color="white" mr={80}>
              Difficulty
            </Text>
            <CustomPicker
              placeholder="Select Difficulty"
              options={['Easy', 'Medium', 'Hard']}
              fieldTemplate={renderField}
              optionTemplate={renderOption}
              headerTemplate={renderHeader}
              onValueChange={(value) => {
                setDifficulty(value.toLowerCase());
              }}
            />
          </Row>

          <Row
            justifyContent="space-evenly"
            width={Dimensions.get('window').width / 2}>
            <Text fontFamily="Poppins-Medium" color="white" mr={80}>
              Category
            </Text>

            {loading === true ? (
              <Text> Loading... </Text>
            ) : (
              <CustomPicker
                placeholder="Select Category"
                options={editedCategory}
                fieldTemplate={renderField}
                optionTemplate={renderOption}
                headerTemplate={renderHeader}
                onValueChange={(value) => {
                  setCategory(value);
                }}
              />
            )}
          </Row>

          <ActionButton
            borderRadius={10}
            mt={20}
            onPress={() => {
              startGame(difficulty, selectedCategoryIdState);
              setVisible(!visible);
              setTimeout(() => navigation.navigate('Questions'), 500);
            }}
            bg="grey">
            <ActionButtonTitle color="white" fontSize={20}>
              START
            </ActionButtonTitle>
          </ActionButton>
        </Column>
      </Modal>
    </Column>
  );
};

const mapStateToProps = ({questionsReducer}) => {
  const {loading} = questionsReducer;
  return {
    loading,
  };
};

export default connect(mapStateToProps, actions)(ModalView);
