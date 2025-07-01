// Import React hooks: useState to manage local state, useEffect to perform side effects like API calls
import { useEffect, useState } from "react";

// Custom React hook: useCurrencyInfo
// Purpose: Fetches latest currency conversion rates for a given base currency
// This hook encapsulates the API logic and provides clean data to components
function useCurrencyInfo(currency) {
  
  // Declare a state variable 'data' to store fetched currency rates
  // Initially set to an empty object while data is being fetched
  // This prevents undefined errors when components try to access currency rates
  const [data, setData] = useState({});

  // useEffect runs after the component mounts and whenever the 'currency' value changes
  // This ensures we always have fresh exchange rates when the base currency changes
  useEffect(() => {
    
    // Perform a GET request to fetch currency exchange rates for the given 'currency'
    // Uses the Fawaz Ahmed Currency API (free, no key required)
    // API returns rates relative to the base currency (e.g., 1 USD = X other currencies)
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`)
      
      // When response is received, convert it from JSON text to a JavaScript object
      // This transforms the raw HTTP response into usable data
      .then((res) => res.json())
      
      // Once JSON is parsed, extract the relevant currency rates:
      .then((res) => 
        // Extract the rates object for the base currency, e.g. 'usd', 'inr' etc.
        // Example: res['usd'] would give { inr: 83.42, eur: 0.92, gbp: 0.79, ... }
        // The || {} provides a fallback to prevent errors if the API response is invalid
        setData(res[currency.toLowerCase()] || {})
      )

      // If any error occurs during fetch or JSON parsing (network issues, invalid JSON, etc.)
      .catch(err => {
        // Log error message to browser console for debugging purposes
        // This helps developers identify API issues without breaking the user experience
        console.error('Error fetching currency data:', err);
        
        // Reset 'data' to an empty object to prevent stale or broken state
        // This ensures the UI remains functional even when API calls fail
        setData({});
      });
  
  // Dependency array: useEffect runs again only if 'currency' value changes
  // This prevents unnecessary API calls and ensures we fetch new data when needed
  }, [currency]);

  // Return the fetched currency rates object to the component using this hook
  // Components can then access rates like: currencyInfo['inr'] to get USD to INR rate
  return data;
}

// Export this custom hook so it can be imported and used in other components
// This promotes code reusability and separation of concerns
export default useCurrencyInfo;