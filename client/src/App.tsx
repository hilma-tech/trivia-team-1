import React from 'react';
import EditQuiz from './components/EditQuiz';
import AnswersProvider from './context/AnswersContext';

function App() {
  return (
    <div className="App">
      <AnswersProvider>
        <EditQuiz />
      </AnswersProvider>
    </div>
  );
}

export default App;
