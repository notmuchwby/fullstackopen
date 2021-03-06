import { useState, useEffect} from "react";
import axios from 'axios'

const CountrySearchItem = ({countryFound}) => {
  const [weather, setWeather] = useState()
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + countryFound.capital + '&APPID=' + api_key)
    .then(response => setWeather(response.data))
  }, [api_key, countryFound.capital])

  console.log(weather)

  return (
    <div>
      <h2>{countryFound.name}</h2>
      <p>capital: {countryFound.capital}</p>
      <p>population: {countryFound.population}</p>

      <h2>languages</h2>
      <ul>
       {countryFound.languages.map(language => 
        <li key={language.iso639_1}>{language.name}</li>
        )}
      </ul>
      <img src={countryFound.flag} alt={'flag'} height="124px" width="124px"/>

      <h2>Weather in {countryFound.capital}</h2>
      <p><b>temperature:</b> {parseInt(weather?.main?.temp - 273)} celsius</p>
      <p>{weather?.weather[0]?.description}</p>
      <p>wind speed : {weather?.wind?.speed}</p>
  </div>
  )
}


const CountryFound = ({countriesList, countryEntered, setCountryEntered}) => {
  const countryFound = countriesList.filter(country => country.name.toLowerCase().includes(countryEntered.toLowerCase()))
  console.log(countryFound)

  if(countryFound.length === countriesList.length) {
    return (
      <div></div>
    )
  } else if(countryFound.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if(countryFound.length <= 10  && countryFound.length !== 1) {
   
    return (
      <div>{countryFound.map(countryFound => 
        <div key={countryFound.alpha2Code}>
          {countryFound.name}
          <button onClick={() => setCountryEntered(countryFound.name)}>show</button>
        </div>)}
      </div>
    )
  } 
  return (
    countryFound.map(countryFound => <CountrySearchItem key={countryFound.alpha2Code} countryFound={countryFound}/>)
  )
}

const EnterCountries = ({countryEntered, handleSetCountry}) => {
  return (
    <form>
      find countries <input value={countryEntered} onChange={handleSetCountry}/>
    </form>
  )
}

const App = () => {
  const [countryEntered, setCountryEntered] = useState('');
  const [countriesList, setCountriesList] = useState([])

  const handleSetCountry = (event) => {
    console.log(event.target.value)
    setCountryEntered(event.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountriesList(response.data)
    })
  }, [])

  return (
    <div>
       <EnterCountries countryEntered={countryEntered} handleSetCountry={handleSetCountry}/>
       <CountryFound countriesList={countriesList} countryEntered={countryEntered} setCountryEntered={setCountryEntered}/>
    </div>
  );
}

export default App;
