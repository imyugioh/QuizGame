import React from 'react';
import Text from './base/Text';
import Row from './base/Row';

import CoinIcon from './icons/coin';

function Score({score}) {
  return (
    <Row>
      <CoinIcon />
      <Text fontSize={18} color="lightGrey">
        {score}
      </Text>
    </Row>
  );
}

export default Score;
