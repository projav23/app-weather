import React from 'react'

function Card(props) {
  const { item } = props;

  const getHour = (value) => {
    const d = new Date()
    const localTime = d.getTime()
    const localOffset = d.getTimezoneOffset() * 60000
    const utc = localTime + localOffset
    const city = utc + (1000 * value)
    const hour = new Date(city).toString().slice(15, 21)
    return hour
  }

  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-around'}}>
      <div>
        <div className='info'>
          <p className='city'><strong>{item.name}</strong></p>
        </div>
        <div className='time'>
          <p>{getHour(item.sys.timezone) || getHour(item.timezone)}</p>
        </div>
        <div className='info'>
          <p className='italic'>{item.weather[0].description}</p>
        </div>
      </div>
      <div style={{textAlign: 'end'}}>
        <div className='temp'>
          <div id="icon"><img id="wicon" src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="Weather icon" /></div>
          <p>{Math.round(item.main.temp)}º</p>
        </div>
        <div style={{marginTop: '18px', fontSize: '0.9rem'}}>
          <p className='italic'>Max {Math.round(item.main.temp_max)}º / Min { Math.round(item.main.temp_min)}º</p>
        </div>
      </div>
    </div>
  )
}

export default Card