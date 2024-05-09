import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Country() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://crio-location-selector.onrender.com/countries');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (countryName) => {
    try {
      const response = await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async (countryName, stateName) => {
    try {
      const response = await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedState('');
    setSelectedCity('');
    setStates([]);
    setCities([]);
    fetchStates(selectedCountry);
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    setSelectedCity('');
    setCities([]);
    fetchCities(selectedCountry, selectedState);
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    setSelectedLocation(`${selectedCity}, ${selectedState}, ${selectedCountry}`);
  };

  return (
    <div>
      <h2>Select Location </h2>
      <div>
        <label htmlFor="country">Select Country:</label>
        <select id="country" onChange={handleCountryChange} value={selectedCountry}>
          <option value="">Select Country</option>
          {countries && countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      {selectedCountry && (
        <div>
          <label htmlFor="state">Select State:</label>
          <select id="state" onChange={handleStateChange} value={selectedState}>
            <option value="">Select State</option>
            {states && states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      )}
      {selectedState && (
        <div>
          <label htmlFor="city">Select City:</label>
          <select id="city" onChange={handleCityChange} value={selectedCity}>
            <option value="">Select City</option>
            {cities && cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      )}
      {selectedLocation && (
        <p>You Selected {selectedLocation}</p>
      )}
    </div>
  );
}

export default Country;
