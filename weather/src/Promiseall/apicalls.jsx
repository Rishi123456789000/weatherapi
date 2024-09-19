import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MultiAsync = () => {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/carts'),
        ]);

        setData1(response1.data);
        setData2(response2.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h3>{error}</h3>;

  return (
    <div>
      <h3>Data 1:</h3>
      {data1 && data1.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <pre>{JSON.stringify(item, null, 2)}</pre> {/* Prettified JSON */}
        </div>
      ))}
      
      <h4>Data 2:</h4>
      {data2 && data2.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <pre>{JSON.stringify(item, null, 2)}</pre> {/* Prettified JSON */}
        </div>
      ))}
    </div>
  );
};

export default MultiAsync;
