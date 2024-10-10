import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { FaRedo } from 'react-icons/fa'; 

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  async function generateAnswer() {
    

    try {
      const response = await axios({
        url: `${import.meta.env.VITE_BASE_URL}/generateContent?key=${import.meta.env.VITE_API_KEY}`,
        method: 'post',
        data: { "contents": [{ "parts": [{ "text": question }] }] }
      });
      setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setAnswer("Sorry, I couldn't generate an answer. Please try again.");
    }
  }

  const handleReplace = () => {
    setQuestion('');
    setAnswer('');
  };

  return (
    <div className="chat-container">
      <h1>QuestionX</h1>
      <div className="answer-area">
        <pre>{answer}</pre>
      </div>
      <div className="input-area">
        <textarea 
          placeholder='Ask me anything' 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          className="question-input" 
          rows="3" 
        />
        <button onClick={handleReplace} className="replace-btn">
          <FaRedo /> 
        </button>
      </div>
      <button onClick={generateAnswer} className="generate-btn">Generate Answer</button>
      
    </div>
  );
}

export default App;
