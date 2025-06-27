import React, { useEffect, useState, useContext } from 'react';
import { getJobs } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

function ContractorJobs() {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const allJobs = await getJobs();
      if (!user || !user.expertise) {
        setJobs([]);
        return;
      }

      const filtered = allJobs.filter(job => {
        const expertiseMatch = user.expertise.some(ex => job.category?.toLowerCase().includes(ex.toLowerCase()));
        const postcodeMatch = user.postcode && job.postcode && job.postcode.startsWith(user.postcode.slice(0, 3));
        return expertiseMatch && postcodeMatch;
      });

      setJobs(filtered);
    }

    fetchJobs();
  }, [user]);

  return (
    <div>
      <h2>Jobs Near You</h2>
      {jobs.length === 0 ? <p>No matching jobs found.</p> : (
        jobs.map((job, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h4>{job.category}</h4>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Urgency:</strong> {job.urgency}</p>
            <p><strong>Address:</strong> {job.address}, {job.postcode}</p>
            <p><strong>Tenant:</strong> {job.tenantName} ({job.tenantPhone})</p>
            <button>Express Interest</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ContractorJobs;
