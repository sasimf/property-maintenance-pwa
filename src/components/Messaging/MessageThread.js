import React, { useState, useEffect, useContext } from 'react';
import { useParams }             from 'react-router-dom';
import { getMessages, sendMessage } from '../../services/api';
import { AuthContext }           from '../../context/AuthContext';

export default function MessageThread() {
  const { jobId } = useParams();
  const { user }  = useContext(AuthContext);

  const [msgs, setMsgs]     = useState([]);
  const [draft, setDraft]   = useState('');
  const [error, setError]   = useState('');

  useEffect(() => {
    getMessages(jobId)
      .then(setMsgs)
      .catch(err => setError(err.message));
  }, [jobId]);

  const handleSend = async () => {
    if (!draft.trim()) return;
    try {
      const newMsg = await sendMessage(jobId, draft, user.id);
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

      <div style={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10 }}>
        {msgs.map(m => (
          <p key={m._id}>
            <strong>{m.senderName}:</strong> {m.message}
          </p>
        ))}
      </div>

      <textarea
        rows={3}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        placeholder="Type your message…"
        style={{ width: '100%', marginTop: 10 }}
      />
      <button onClick={handleSend} style={{ marginTop: 5 }}>
        Send
      </button>
    </div>
  );
}
