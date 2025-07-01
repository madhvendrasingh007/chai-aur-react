import { useState, useEffect } from 'react' // Import React hooks for state management and side effects
import './App.css' // Import CSS styles (can be removed if using only Tailwind)
import {InputBox} from './components' // Import custom InputBox component from components barrel export
import useCurrencyInfo from './hooks/useCurrencyInfo' // Import custom hook for fetching real-time currency data

function App() {
  // State for storing the amount to convert (user input)
  // Default to 1 instead of 0 for better UX - shows immediate conversion result
  const [amount, setAmount] = useState(1) 
  
  // State for source currency (what we're converting from)
  // USD is chosen as default since it's the most commonly used base currency
  const [from, setFrom] = useState("usd") 
  
  // State for target currency (what we're converting to)  
  // INR is chosen as default to demonstrate international conversion
  const [to, setTo] = useState("inr") 
  
  // State for storing the converted amount result
  // This will be automatically calculated and displayed in the output field
  const [convertedAmount, setConvertedAmount] = useState(0) 

  // Fetch currency exchange rates for the 'from' currency using custom hook
  // This returns an object with all available exchange rates for the base currency
  const currencyInfo = useCurrencyInfo(from) 

  // Extract available currency options from the fetched data
  // Object.keys() converts the rates object into an array of currency codes
  // Example: ['inr', 'eur', 'gbp', 'jpy', ...] for easy dropdown population
  const options = Object.keys(currencyInfo) 

  // Function to swap 'from' and 'to' currencies for quick reverse conversion
  // This provides a convenient way to flip the conversion direction
  const swap = () => {
    setFrom(to) // Set source currency to current target currency
    setTo(from) // Set target currency to current source currency
    setConvertedAmount(amount) // Move current input amount to result field
    setAmount(convertedAmount) // Move current result to input field
  }
  
  // Function to manually trigger conversion calculation
  // Although auto-conversion is implemented, this provides explicit conversion button
  const convert = () => {
    // Calculate converted amount: input amount × exchange rate for target currency
    setConvertedAmount(amount * currencyInfo[to]) 
  }

  // Auto-convert whenever amount, currency rates, or target currency changes
  // This provides real-time conversion without requiring manual button clicks
  useEffect(() => {
    // Check if exchange rate exists for target currency (prevents undefined errors)
    if (currencyInfo[to]) { 
      // Automatically calculate and update conversion result
      setConvertedAmount(amount * currencyInfo[to]) 
    }
  }, [amount, currencyInfo, to]) // Dependencies: re-run when these values change

  return (
    // Main container with full viewport height and enhanced dark gradient background
    // Uses modern gradient combinations for visual appeal and depth
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated background elements for visual interest */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content wrapper with max width for mobile responsiveness */}
      <div className="w-full max-w-lg relative z-10">
        
        {/* Header section with enhanced typography and visual hierarchy */}
        <div className="text-center mb-10">
          {/* Main title with gradient text effect */}
          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3 tracking-tight">
            Currency Converter
          </h1>
          {/* Subtitle with improved styling and contrast */}
          <p className="text-slate-400 text-lg font-medium">Convert currencies with real-time exchange rates</p>
          {/* Status indicator for API connection */}
          <div className="flex items-center justify-center mt-3 gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-slate-500 text-sm">Live rates</span>
          </div>
        </div>

        {/* Main converter card with enhanced glassmorphism effect and better shadows */}
        <div className="bg-slate-800/40 backdrop-blur-2xl rounded-3xl p-8 border border-slate-600/30 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">
          
          {/* From Currency Input with improved spacing */}
          <div className="mb-6">
            <InputBox
              label="From" // Label identifying this as the input/source field
              amount={amount} // Current amount value from state
              currencyOptions={options} // Available currency options from API
              onCurrencyChange={(currency) => setFrom(currency)} // Update source currency when user selects different option
              selectCurrency={from} // Currently selected source currency
              onAmountChange={(amount) => setAmount(amount)} // Update amount when user types new value
            />
          </div>

          {/* Swap button positioned between input boxes with enhanced visual design */}
          <div className="flex justify-center my-8">
            <button
              type="button"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white p-4 rounded-2xl border-4 border-slate-800 transition-all duration-300 group shadow-lg hover:shadow-cyan-500/25 transform hover:scale-110 active:scale-95"
              onClick={swap} // Execute currency swap when clicked
            >
              {/* Enhanced swap icon with rotation animation and better visual feedback */}
              <svg className="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* To Currency Input (result display) with clear visual distinction */}
          <div className="mb-8">
            <InputBox
              label="To" // Label identifying this as the output/result field
              amount={convertedAmount} // Calculated converted amount from state
              currencyOptions={options} // Available currency options from API
              onCurrencyChange={(currency) => setTo(currency)} // Update target currency when user selects different option
              selectCurrency={to} // Currently selected target currency
              amountDisable // Disable amount input since this field shows calculated results only
            />
          </div>

          {/* Manual convert button with enhanced gradient and interaction effects */}
          <button 
            onClick={convert} // Trigger manual conversion calculation
            className="w-full bg-gradient-to-r from-cyan-600 via-purple-600 to-indigo-600 hover:from-cyan-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-5 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl text-lg tracking-wide"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>

          {/* Exchange rate information display with improved formatting and visual appeal */}
          {currencyInfo[to] && ( // Only display when exchange rate data is available from API
            <div className="mt-6 text-center">
              {/* Rate information card with subtle background and better typography */}
              <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/20">
                <p className="text-slate-300 text-base font-medium">
                  <span className="text-cyan-400 font-bold">1 {from.toUpperCase()}</span>
                  <span className="mx-2 text-slate-500">=</span>
                  <span className="text-purple-400 font-bold">{currencyInfo[to].toFixed(4)} {to.toUpperCase()}</span>
                </p>
                <p className="text-slate-500 text-sm mt-1">Current exchange rate</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with additional information */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            Powered by free currency API • Real-time rates
          </p>
        </div>
      </div>
    </div>
  );
}

// Export App component as default export for use as main application entry point
export default App