import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { createJob } from '../../services/api';

function PostJob() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    category: '', description: '', urgency: 'scheduled',
    preferredDate: '', address: user?.address || '',
    postcode: user?.postcode || '', tenantName: '', tenantPhone: '', files: null
  });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = e => setFormData({ ...formData, files: e.target.files });

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'files' && value) {
        Array.from(value).forEach(file => data.append('files', file));
      } else {
        data.append(key, value);
      }
    });

    const result = await createJob(data);
    alert(result?.message || 'Job posted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Post a Job</h2>
      <select name="category" onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="plumbing">Plumbing</option>
        <option value="electrical">Electrical</option>
        <option value="heating">Heating</option>
        <option value="miscellaneous">Miscellaneous</option>
      </select>
      <textarea name="description" placeholder="Job Description" onChange={handleChange} required />
      <input type="file" multiple onChange={handleFileChange} />
      <select name="urgency" onChange={handleChange}>
        <option value="immediate">Immediate</option>
        <option value="scheduled">Scheduled</option>
      </select>
      <input name="preferredDate" type="datetime-local" onChange={handleChange} />
      <input name="tenantName" placeholder="Tenant's Name" onChange={handleChange} required />
      <input name="tenantPhone" placeholder="Tenant's Phone" onChange={handleChange} required />
      <input name="address" placeholder="Job Address" value={formData.address} onChange={handleChange} required />
      <input name="postcode" placeholder="Postcode" value={formData.postcode} onChange={handleChange} required />
      <button type="submit">Post Job</button>
    </form>
  );
}

export default PostJob;
