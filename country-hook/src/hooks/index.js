import { useState, useEffect} from 'react'
import axios from 'axios'

const urlEndpoint = 'https://studies.cs.helsinki.fi/restcountries/api/name'
export const useCountry = (name) => {

    const [country, setCountry] = useState(null)

    useEffect(() => {
        axios.get(`${urlEndpoint}/${name}`)
            .then(response => {
                setCountry({found: true, data: response.data})
            })
            .catch(error => {
                setCountry({found: false})
            })
    }, [name])
  

  return country
}