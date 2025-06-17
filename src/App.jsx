import { useState } from 'react';
import './index.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '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';
  const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173', // Important!
          'X-Title': 'ChatGPT Clone'
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: 'user', content: input }],
          temperature: 0.7
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || 'Something went wrong!');
      }

      setResponse(data.choices?.[0]?.message?.content || 'No response.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🧠 ChatGPT Clone</h1>
      <input
        type="text"
        placeholder="Ask me anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{
          padding: '0.8rem',
          width: '70%',
          borderRadius: '0.5rem',
          border: 'none',
          marginBottom: '1rem',
          backgroundColor: '#40414f',
          color: '#ececf1'
        }}
      />
      <br />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: '0.6rem 1.2rem',
          backgroundColor: 'antiquewhite',
          borderRadius: '0.4rem',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Loading...' : 'Send'}
      </button>

      {error && <p style={{ color: 'tomato', marginTop: '1rem' }}>{error}</p>}

      {response && (
        <div style={{
          marginTop: '2rem',
          backgroundColor: '#444654',
          padding: '1rem',
          borderRadius: '0.6rem',
          whiteSpace: 'pre-wrap'
        }}>
          {response}
        </div>
      )}
    </div>
  );
}

export default App;
