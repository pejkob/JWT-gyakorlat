import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [termekek, setTermekek] = useState([]);

  const fetchProducts = async (token) => {
    try {
      const response = await axios.get("https://jwt.sulla.hu/termekek", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setTermekek(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    if (jwtToken) {
      fetchProducts(jwtToken.token);
    }
  }, [jwtToken]);

  const onSubmitAction = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jwt.sulla.hu/login', {
        username: username,
        password: password
      });
      setJwtToken(response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <form className='form'>
              <div className="form-group">
                <label htmlFor="user">Username:</label>
                <input
                  type="text"
                  id="user"
                  name="username"
                  className='form-control'
                  placeholder='Enter your username'
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className='form-control'
                  placeholder='Enter your password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type='submit' className='btn btn-success' onClick={onSubmitAction}>Submit</button>
            </form>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            {termekek.map((item) => (
              <div className="card" style={{ width: '18rem' }} key={item.id}>
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
