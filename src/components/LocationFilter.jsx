import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LocationFilter = ({ locationName, getNewLocation }) => {

  const [locationOptions, setLocationOptions] = useState()

  useEffect(() => {
    if (!locationName) return setLocationOptions()
    const URL = `https://rickandmortyapi.com/api/location?name=${locationName}`
    axios.get(URL)
      .then(res => setLocationOptions(res.data.results))
      .catch(err => console.log(err))
  }, [locationName])

  return (
    <div className='location-list'>
      <ul>
        {
          locationOptions?.map(locationOption => <li onClick={() => getNewLocation(locationOption.url)} key={locationOption.url}>{locationOption.name}</li>)
        }
      </ul>
    </div>
  )
}

export default LocationFilter