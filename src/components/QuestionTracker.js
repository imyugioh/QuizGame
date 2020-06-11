import React from 'react';
import Text from './base/Text';

function QuestionTracker({currentQuestion, amountQuestions}) {
  return (
    <Text
      fontFamily="Poppins-Bold"
      fontSize={18}
      color="white">{`${currentQuestion}/${amountQuestions}`}</Text>
  );
}

export default QuestionTracker;
