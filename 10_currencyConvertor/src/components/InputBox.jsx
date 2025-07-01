import React from 'react'
import { useId } from "react"; // Hook to generate unique IDs for accessibility and form labels

function InputBox({
    label, // Text label for the input field (e.g., "From" or "To")
    amount, // Current amount value displayed in the input
    onAmountChange, // Callback function triggered when user types in amount field
    onCurrencyChange, // Callback function triggered when user selects different currency
    currencyOptions = [], // Array of available currency codes (e.g., ['usd', 'eur', 'inr'])
    selectCurrency = "usd", // Currently selected currency code (default: USD)
    amountDisable = false, // Boolean to disable amount input (used for output/result fields)
    currencyDisable = false, // Boolean to disable currency dropdown (rarely used)
    className = "", // Additional CSS classes for custom styling
}) {
   // Generate unique ID for the amount input field (ensures proper accessibility)
   // This links the label to the input for screen readers and better UX
   const amountInputId = useId()

    return (
        // Main container with enhanced dark theme styling and smooth hover effects
        // Uses backdrop blur for modern glassmorphism effect with improved visual hierarchy
        <div className={`bg-slate-800/95 backdrop-blur-lg p-6 rounded-2xl border border-slate-600/30 hover:border-cyan-400/40 transition-all duration-300 shadow-xl hover:shadow-cyan-500/10 ${className}`}>
            {/* Flex container arranging amount input and currency dropdown horizontally */}
            <div className="flex items-center justify-between gap-6">
                
                {/* Amount input section - takes most of the available space */}
                <div className="flex-1">
                    {/* Label for amount input with improved typography and spacing */}
                    <label htmlFor={amountInputId} className="text-slate-300 text-sm font-semibold mb-3 block tracking-wide uppercase">
                        {label}
                    </label>
                    {/* Amount input field with enhanced styling and better user experience */}
                    <input
                        id={amountInputId} // Links to label for accessibility compliance
                        className="w-full bg-transparent text-white text-2xl font-bold outline-none placeholder-slate-500 border-b-2 border-slate-600/50 focus:border-cyan-400 transition-colors duration-200 pb-2"
                        type="number" // Restricts input to numeric values only
                        placeholder="0.00" // Helpful placeholder showing expected format
                        disabled={amountDisable} // Disables input for read-only result fields
                        value={amount} // Controlled component - value managed by parent state
                        onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))} // Converts string to number and calls parent callback
                        min="0" // Prevents negative numbers for currency conversion
                        step="0.01" // Allows decimal precision for currency amounts
                    />
                </div>
                
                {/* Currency selection section - positioned on the right side */}
                <div className="flex flex-col items-end min-w-[120px]">
                    {/* Label for currency dropdown with consistent styling */}
                    <label className="text-slate-300 text-sm font-semibold mb-3 block tracking-wide uppercase">
                        Currency
                    </label>
                    {/* Currency dropdown with enhanced visual design and interactivity */}
                    <select
                        className="bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-xl px-4 py-3 border border-slate-500/50 cursor-pointer outline-none hover:from-slate-600 hover:to-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 font-medium text-sm shadow-lg"
                        value={selectCurrency} // Controlled component - selection managed by parent state
                        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)} // Calls parent callback when user selects new currency
                        disabled={currencyDisable} // Allows disabling dropdown if needed
                    >
                        {/* Map through available currencies to create dropdown options */}
                        {currencyOptions.map((currency) => (
                            <option key={currency} value={currency} className="bg-slate-800 text-white py-2">
                                {currency.toUpperCase()} {/* Display currency code in uppercase for consistency */}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

// Export component for use in other parts of the application
export default InputBox;