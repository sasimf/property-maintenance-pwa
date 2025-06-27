import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMessages, sendMessage } from '../../services/api';

function MessageThread() {
  const { jobId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    async function fetchMessages() {
      const data = await getMessages(jobId);
      setMessages(data);
    }
    fetchMessages();
  }, [jobId]);

  const handleSend = async () => {
    await sendMessage(jobId, input);
    const data = await getMessages(jobId);
    setMessages(data);
    setInput('');
  };

  return (
    <div>
      <h2>Messages for Job {jobId}</h2>
      <div>
        {messages.map((msg, i) => <p key={i}><strong>{msg.from}:</strong> {msg.text}</p>)}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageThread;