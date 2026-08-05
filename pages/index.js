import { useState } from 'react';

export default function Home() {
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchId.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/verify?id=${encodeURIComponent(searchId)}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: true });
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: '400px', padding: '25px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 5px 0' }}>Azad Media Group</h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '20px' }}>Member Verification Portal</p>
        
        <input 
          type="text" 
          placeholder="Enter Member ID Card Number" 
          value={searchId} 
          onChange={(e) => setSearchId(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
        
        <button 
          onClick={handleSearch}
          style={{ width: '100%', padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {loading ? 'Searching...' : 'Verify Now'}
        </button>

        {result && (
          <div style={{ marginTop: '20px' }}>
            {result.found ? (
              <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', padding: '15px', borderRadius: '5px', color: '#155724' }}>
                <h4 style={{ margin: '0 0 10px 0' }}>✔ Verified Member</h4>
                <p style={{ margin: '3px 0' }}><b>ID:</b> {result.member.id}</p>
                <p style={{ margin: '3px 0' }}><b>Name:</b> {result.member.name}</p>
                <p style={{ margin: '3px 0' }}><b>Designation:</b> {result.member.designation}</p>
                <p style={{ margin: '3px 0' }}><b>Status:</b> {result.member.status}</p>
              </div>
            ) : (
              <div style={{ background: '#f8d7da', border: '1px solid #f5c6cb', padding: '15px', borderRadius: '5px', color: '#721c24' }}>
                ✖ <b>Record Not Found</b><br/>Ye ID card Azad Media Group ke database mein majood nahi hai.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
