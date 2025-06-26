// Importing the AnotherChai component from chai.jsx file
import AnotherChai from "./chai"

// Defining the main App component
function App() {
  return (
    <>
      {/* Main heading of the app */}
      <header>
        <h1>🚀 Welcome to ChaiVerse!</h1>
        <p>Your one-stop hub for learning React with a sip of chai ☕</p>
      </header>

      {/* Section introducing the React app */}
      <section>
        <h2>✨ Getting Started</h2>
        <p>Edit <code>src/App.jsx</code> and save to see live updates with Vite!</p>
      </section>

      {/* Including the AnotherChai component here */}
      <section>
        <h2>🌿 Featured Component</h2>
        <AnotherChai />
      </section>

      {/* Footer for basic contact/info */}
      <footer>
        <p>Made with ❤️ using React and Vite.</p>
      </footer>
    </>
  )
}

// Exporting the App component so it can be used in main.jsx
export default App
