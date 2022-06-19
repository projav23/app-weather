import axios from 'axios';
import './styles/App.css';
import { useState, useEffect } from 'react';
import Card from './components/Card/Card'
import { Container, Box, Stack, TextField, Autocomplete, CircularProgress, Typography } from '@mui/material';

function App() {
  const [weather, setWeather] = useState([]);
  const [citiesOptions, setCities] = useState([]);
  const [cityValue, setCity] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingCity, setLoadingCity] = useState(false);
  
  const getWeather = async (value) => {
    try {
      const url = value ? `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=70b39daa0cdf53e15a79260fc530b953` : 'http://api.openweathermap.org/data/2.5/group?id=524901,3684785,658225,4379478,5128581,3128760,3117732,3173435,703448,2643743&units=metric&appid=70b39daa0cdf53e15a79260fc530b953'
      if (value) {
        setLoadingCity(false);
        const response = await axios.get(url);
        const { data } = response;
        setWeather(new Array(data));
        setLoadingCity(true);

      } else {
        const response = await axios.get(url);
        const { data } = response;
        setWeather(data.list );
        const citiesArr = () => {
          return data.list.map((city) => (
            {
              label: city.name,
              value: city.id
            }
          ))
        };
        setCities(citiesArr);
        setLoading(true);
        setLoadingCity(true);
      }
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getWeather(cityValue);
    }, [2000])
  }, [cityValue])

  return (
      <Container  maxWidth="md" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography align='center' variant='h4' mt={4}>Weather App</Typography>
        {!loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
            <CircularProgress />
          </Box>
          )
          :
          <>
            <Autocomplete
              inputValue={cityValue}
              onInputChange={(event, newInputValue) => {
                setCity(newInputValue);
              }}
              disablePortal
              id="combo-box-demo"
              options={citiesOptions}
              sx={{ marginTop: '10%', width: '100%'}}
              renderInput={(params) => <TextField {...params} label="Choose a city" />}
            />
            <div style={{width: '100%'}}>
              <Stack className='boxes' spacing={4} mt={4} sx={{ textAlign: "center", height: '100vh', alignItems: 'center'}}>
                {!loadingCity ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
                    <CircularProgress />
                  </Box>
                ) : weather?.map((item) =>
                  <Box key={item.id} alignItems="center" sx={{width: '300px', height: 'auto', background: '#373132fc', color: '#fff', borderRadius: '10px', marginTop:'32px'}}>
                    <Card item={item} />
                  </Box> 
                )
                }
              </Stack>
            </div>
          </>
        }
      </Container>
  );
}

export default App;
