import React, { useState, useEffect } from 'react';
import { getMessages, sendMessage } from '../../services/api';
import { useParams } from 'react-router-dom';

export default function MessageThread() {
  const { jobId } = useParams();
  const [msgs, setMsgs] = useState([]);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getMessages(jobId)
      .then(setMsgs)
      .catch(err => setError(err.message));
  }, [jobId]);

  const handleSend = async () => {
    if (!draft.trim()) return;
    try {
      const newMsg = await sendMessage(jobId, draft);
      setMsgs(prev => [...prev, newMsg]);
      setDraft('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ maxHeight: 300, overflowY: 'scroll' }}>
        {msgs.map(m => <p key={m._id}><strong>{m.senderName}:</strong> {m.message}</p>)}
      </div>
      <textarea value={draft} onChange={e => setDraft(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
