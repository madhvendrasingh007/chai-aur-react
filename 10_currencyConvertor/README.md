# 💱 Currency Converter

<div align="center">

![Currency Converter](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A modern, real-time currency converter built with React and styled with Tailwind CSS**

*Convert between 170+ currencies with live exchange rates*

</div>

---

## 🌟 Features

- ✨ **Real-time Exchange Rates** - Always up-to-date currency data
- 🔄 **Quick Currency Swap** - One-click to reverse conversion
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Beautiful glassmorphism design with dark theme
- ⚡ **Auto-conversion** - Results update instantly as you type
- 🌍 **170+ Currencies** - Support for all major world currencies
- 🚀 **Fast & Lightweight** - Optimized performance

---

## 📁 Project Architecture

```
currency-converter/
├── src/
│   ├── components/
│   │   ├── index.js          # Component exports barrel file
│   │   └── InputBox.jsx      # Reusable input component
│   ├── hooks/
│   │   └── useCurrencyInfo.js # Custom hook for API calls
│   ├── App.jsx               # Main application component
│   ├── App.css               # Global styles (optional)
│   └── main.jsx              # Application entry point
└── README.md
```

### 🏗️ Architecture Overview

This project follows a **component-based architecture** with **custom hooks** for data fetching:

1. **App.jsx** - Main component that manages global state
2. **InputBox.jsx** - Reusable component for currency input/output
3. **useCurrencyInfo.js** - Custom hook that handles API calls
4. **index.js** - Barrel export for cleaner imports

---

## 🧠 Core Concepts Explained

### 🎯 What is State Management?

In React, **state** is like the "memory" of your component. It stores data that can change over time.

```javascript
const [amount, setAmount] = useState(1);
```

**Breaking this down:**
- `amount` - **Variable** that holds the current value
- `setAmount` - **Function** that updates the value
- `useState(1)` - **React Hook** that creates state with initial value of 1

**Why we use these specific states:**

```javascript
const [amount, setAmount] = useState(1);      // 💰 Money amount to convert
const [from, setFrom] = useState("usd");      // 🏦 Source currency (what we're converting FROM)
const [to, setTo] = useState("inr");          // 🎯 Target currency (what we're converting TO)
const [convertedAmount, setConvertedAmount] = useState(0); // 📊 Result of conversion
```

**Why these defaults?**
- `amount: 1` - Shows immediate conversion result (better than 0)
- `from: "usd"` - USD is most common base currency globally
- `to: "inr"` - Demonstrates international conversion (USD → INR)

---

## 📚 Detailed Code Explanation

### 1️⃣ **Custom Hook: useCurrencyInfo.js**

```javascript
function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  
  useEffect(() => {
    fetch(`https://api-url/${currency.toLowerCase()}.json`)
      .then((res) => res.json())
      .then((res) => setData(res[currency.toLowerCase()] || {}))
      .catch(err => {
        console.error('Error:', err);
        setData({});
      });
  }, [currency]);
  
  return data;
}
```

**What's happening here?**

| Element | Type | Purpose |
|---------|------|---------|
| `useCurrencyInfo` | **Custom Hook** | Reusable logic for fetching currency data |
| `currency` | **Parameter** | The base currency (e.g., "usd") |
| `data` | **State Variable** | Stores the fetched exchange rates |
| `setData` | **State Setter Function** | Updates the data state |
| `useEffect` | **React Hook** | Runs code when component mounts or currency changes |
| `fetch()` | **Web API** | Makes HTTP request to currency API |
| `.then()` | **Promise Method** | Handles successful API response |
| `.catch()` | **Promise Method** | Handles API errors |
| `[currency]` | **Dependency Array** | Tells useEffect when to re-run |

**Why use a custom hook?**
- ♻️ **Reusability** - Can be used in multiple components
- 🧹 **Clean Code** - Separates API logic from UI logic
- 🐛 **Easier Testing** - Isolated logic is easier to test

### 2️⃣ **Main Component: App.jsx**

```javascript
function App() {
  // STATE MANAGEMENT
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // DATA FETCHING
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  // FUNCTIONS
  const swap = () => { /* swap currencies */ };
  const convert = () => { /* manual conversion */ };

  // AUTO-CONVERSION
  useEffect(() => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  }, [amount, currencyInfo, to]);

  return (/* JSX UI */);
}
```

**Key Elements Breakdown:**

| Element | Type | What it does |
|---------|------|--------------|
| `useState()` | **React Hook** | Creates state variables |
| `useCurrencyInfo(from)` | **Custom Hook Call** | Fetches rates for 'from' currency |
| `Object.keys()` | **JavaScript Method** | Converts object to array of keys |
| `swap()` | **Function** | Switches from/to currencies |
| `convert()` | **Function** | Manually triggers conversion |
| `useEffect()` | **React Hook** | Auto-converts when values change |

### 3️⃣ **Input Component: InputBox.jsx**

```javascript
function InputBox({
  label,              // PROP: Text label ("From" or "To")
  amount,             // PROP: Current amount value
  onAmountChange,     // PROP: Function to handle amount changes
  onCurrencyChange,   // PROP: Function to handle currency changes
  currencyOptions,    // PROP: Array of available currencies
  selectCurrency,     // PROP: Currently selected currency
  amountDisable,      // PROP: Whether to disable amount input
}) {
  const amountInputId = useId(); // HOOK: Generates unique ID

  return (
    <div>
      <label htmlFor={amountInputId}>{label}</label>
      <input
        id={amountInputId}
        type="number"
        value={amount}
        onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        disabled={amountDisable}
      />
      <select
        value={selectCurrency}
        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
      >
        {currencyOptions.map((currency) => (
          <option key={currency} value={currency}>
            {currency.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
```

**Props Explanation:**

| Prop | Type | Coming From | Purpose |
|------|------|-------------|---------|
| `label` | **String** | Parent component | Display text ("From"/"To") |
| `amount` | **Number** | Parent state | Current amount value |
| `onAmountChange` | **Function** | Parent component | Updates parent's amount state |
| `onCurrencyChange` | **Function** | Parent component | Updates parent's currency state |
| `currencyOptions` | **Array** | API data | List of available currencies |
| `selectCurrency` | **String** | Parent state | Currently selected currency |
| `amountDisable` | **Boolean** | Parent component | Disables input for result field |

---

## 🔄 Data Flow Diagram

```
1. User types amount in InputBox
         ↓
2. onAmountChange() called
         ↓
3. setAmount() updates state
         ↓
4. useEffect() detects change
         ↓
5. Auto-conversion triggered
         ↓
6. setConvertedAmount() updates result
         ↓
7. UI re-renders with new values
```

---

## 🎨 Why This Architecture?

### ✅ **Advantages:**

1. **🔄 Reusability** - InputBox used for both input and output
2. **🧹 Separation of Concerns** - API logic separate from UI
3. **⚡ Performance** - Only re-fetches when currency changes
4. **🐛 Maintainability** - Easy to modify individual parts
5. **📱 Responsive** - Auto-conversion provides instant feedback

### 🏗️ **Design Patterns Used:**

- **Custom Hooks** - For reusable stateful logic
- **Controlled Components** - All inputs controlled by React state
- **Props Drilling** - Passing data from parent to child
- **Conditional Rendering** - Show elements only when data exists

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd currency-converter

# Install dependencies
npm install

# Start development server
npm run dev
```

### 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "tailwindcss": "^3.3.0"
}
```

---

## 🔧 How It Works

### **Step-by-Step Process:**

1. **🏁 App Starts** - Default values loaded (1 USD → INR)
2. **📡 API Call** - useCurrencyInfo fetches USD rates
3. **🎨 UI Renders** - InputBoxes show with currency options
4. **👤 User Input** - User types amount or changes currency
5. **🔄 State Update** - React updates relevant state
6. **⚡ Auto-Convert** - useEffect triggers calculation
7. **📊 Display Result** - UI shows converted amount

### **Key React Concepts:**

| Concept | Purpose | Example |
|---------|---------|---------|
| **State** | Store changing data | `useState(1)` |
| **Props** | Pass data to children | `<InputBox amount={amount} />` |
| **Hooks** | Add functionality | `useEffect()`, `useState()` |
| **Components** | Reusable UI pieces | `<InputBox />` |
| **Events** | Handle user actions | `onChange`, `onClick` |

---

## 🎯 Learning Outcomes

After studying this project, you'll understand:

- ✅ **React State Management** - How to store and update data
- ✅ **Custom Hooks** - Creating reusable stateful logic
- ✅ **API Integration** - Fetching and handling external data
- ✅ **Component Communication** - Props and state flow
- ✅ **Event Handling** - Responding to user interactions
- ✅ **Conditional Rendering** - Showing content based on state
- ✅ **Modern CSS** - Tailwind and glassmorphism design

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Currency API** by Fawaz Ahmed (Free, no API key required)
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework

---

<div align="center">

**Made with ❤️ and React**

*Happy Coding! 🚀*

</div>