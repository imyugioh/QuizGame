import React from 'react';
import Button from './base/Button';
import Text from './base/Text';

function AnswerButton({children, ...props}) {
  return (
    <Button
      minWidth="300px"
      height="50px"
      borderRadius="normal"
      bg="white"
      {...props}>
      {children}
    </Button>
  );
}

export function AnswerButtonTitle({children, ...props}) {
  return (
    <Text
      color="black"
      fontWeight="bold"
      style={{textTransform: 'uppercase'}}
      {...props}>
      {children}
    </Text>
  );
}

export default AnswerButton;
