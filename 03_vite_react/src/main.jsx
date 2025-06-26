// Importing StrictMode from React to help with highlighting potential problems
import { StrictMode } from 'react'

// Importing createRoot from react-dom/client to attach our React app to the DOM
import { createRoot } from 'react-dom/client'

// Importing the main App component
import App from './App.jsx'

// Importing the additional component for reuse
import AnotherChai from './chai.jsx'

// Finding the root element in the HTML and rendering the App component inside it
createRoot(document.getElementById('root')).render(
  // Wrapping App in <StrictMode> to help with debugging and highlighting issues in development
  <StrictMode>
    <App /> {/* Rendering the App component */}
  </StrictMode>,
)
