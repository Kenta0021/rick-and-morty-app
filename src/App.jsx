import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorMessage from './components/ErrorMessage'
import LocationFilter from './components/LocationFilter'
import LocationInfo from './components/LocationInfo'
import ResidentList from './components/ResidentList'
import getRandomNumber from './utils/getRandomNumbers'

const RESIDENTS_PER_PAGE = 10

function App() {

  const [location, setLocation] = useState()
  const [locationName, setLocationName] = useState()
  const [showError, setShowError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [residentsFilter, setResidentsFilter] = useState([])


  const getDataDimension = (idDimension) => {
    if (idDimension) {
      const URL = `https://rickandmortyapi.com/api/location/${idDimension}`
      axios.get(URL)
        .then(res => setLocation(res.data))
        .catch(err => {
          setShowError(true)
          setTimeout(() => {
            setShowError(false)
          }, 2000)
          console.log(err)
        })
    } else {
      alert('Write Something!')
    }
  }

  useEffect(() => {
    const randomdDimension = getRandomNumber()
    getDataDimension(randomdDimension)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const dimensionSearch = e.target.searchValue.value
    getDataDimension(dimensionSearch)
  }

  const handleChangeInput = (e) => {
    setLocationName(e.target.value)
  }

  const getNewLocation = (URL) => {
    axios.get(URL)
      .then(res => setLocation(res.data))
      .catch(err => console.log(err))
  }

  const getAllPages = () => {
    const arrayPages = []
    for (let i = 1; i <= lastPage; i++) {
      arrayPages.push(i)
    }
    return arrayPages
  }

  useEffect(() => {
    if (!location) return
    const quantityResidents = location.residents.length
    const quantityPages = Math.ceil(quantityResidents / RESIDENTS_PER_PAGE)
    setLastPage(quantityPages)
    setCurrentPage(1)
  }, [location])

  useEffect(() => {
    const lastResidentCut = currentPage * RESIDENTS_PER_PAGE
    const firstResidentCut = lastResidentCut - RESIDENTS_PER_PAGE
    const newResidentsFilter = location?.residents.slice(firstResidentCut, lastResidentCut)
    setResidentsFilter(newResidentsFilter)
  }, [location, currentPage])

  return (
    <div className="App">
      <header >
        <img className='header-img' src="./src/assets/image 3.jpg" alt="" />
      </header>
      <form onSubmit={handleSubmit} className='search-form'>
        <input className='search-bar' id='searchValue' type="text" onChange={handleChangeInput} placeholder='Search Your Dimension' />
        <LocationFilter locationName={locationName} getNewLocation={getNewLocation} /> 
        <button className='search-button' type='submit'>Search</button>
        {
          showError ? <ErrorMessage /> : ''
        }
      </form>
      <LocationInfo location={location} />
      <ResidentList residentsFilter={residentsFilter} />
      <ul className='list-pages'>
        {
          getAllPages().map(page => (
            <li
            className={currentPage === page ? 'currentPage' : ''} 
            onClick={() => setCurrentPage(page)} 
            key={page}
            >{page}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
