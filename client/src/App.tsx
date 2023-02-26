import React from 'react';
import EditQuiz from './components/EditQuiz';
import AnswersProvider from './context/AnswersContext';
import './App.css';
import EditQuizMobile from './components/edit-quiz-mobile/EditQuizMobile';

function App() {
  return (
    <div className="App">
      <AnswersProvider>
        <EditQuizMobile />
      </AnswersProvider>
    </div>
  );
}

export default App;
