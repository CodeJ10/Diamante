import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PropertyOwnership from './contracts/PropertyOwnership.json';
import { useForm } from 'react-hook-form';

const App = () => {
  const [account, setAccount] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(PropertyOwnership.abi, '0xYourContractAddress');

  const { register, handleSubmit, errors } = useForm();

  const initialize = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      setError('Failed to load accounts.');
    }
  };      

  useEffect(() => {
    initialize();
  }, []);

  const handleRegisterProperty = async (data) => {
    setLoading(true);
    setError('');
    try {
      const response = await contract.methods.registerProperty(data.title, data.location).send({ from: account });
      setPropertyId(response.events.PropertyRegistered.returnValues.tokenId);
    } catch (error) {
      setError('Failed to register property.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyProperty = async () => {
    setLoading(true);
    setError('');
    try {
      await contract.methods.verifyProperty(propertyId).send({ from: account });
    } catch (error) {
      setError('Failed to verify property.');
    } finally {
      setLoading(false);
    }
  };

  const handleTransferProperty = async (to) => {
    setLoading(true);
    setError('');
    try {
      await contract.methods.transferOwnership(to, propertyId).send({ from: account });
    } catch (error) {
      setError('Failed to transfer property.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Property Ownership Verification</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit(handleRegisterProperty)}>
        <input type="text" placeholder="Title" {...register('title')} />
        <input type="text" placeholder="Location" {...register('location')} />
        <button type="submit" disabled={loading}>Register Property</button>
      </form>
      <button onClick={handleVerifyProperty} disabled={loading}>Verify Property</button>
      <input type="text" placeholder="Transfer To" onChange={(e) => handleTransferProperty(e.target.value)} />
      {loading && <p>Processing...</p>}
    </div>
  );
};

export default App;