import { createContext, useState, useContext } from 'react'

const CountryContext = createContext()

export const useCountry = () => {
  const context = useContext(CountryContext)
  if (!context) {
    throw new Error('useCountry must be used within CountryProvider')
  }
  return context
}

export const CountryProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState('IN')

  const countries = {
    IN: { 
      name: 'India', 
      currency: 'INR', 
      symbol: '₹', 
      rate: 1 
    },
    US: { 
      name: 'USA', 
      currency: 'USD', 
      symbol: '$', 
      rate: 0.012 
    },
    GB: { 
      name: 'UK', 
      currency: 'GBP', 
      symbol: '£', 
      rate: 0.0095 
    }
  }

  const convertPrice = (basePrice) => {
    const rate = countries[selectedCountry].rate
    return (basePrice * rate).toFixed(2)
  }

  const getCurrentCountry = () => countries[selectedCountry]

  return (
    <CountryContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        countries,
        convertPrice,
        getCurrentCountry
      }}
    >
      {children}
    </CountryContext.Provider>
  )
}