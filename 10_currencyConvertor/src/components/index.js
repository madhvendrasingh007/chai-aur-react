// Central export file for components
// This file acts as a barrel export, allowing clean imports from a single location
// Instead of: import InputBox from './components/InputBox'
// We can use: import { InputBox } from './components'

import InputBox from './InputBox'

// Export InputBox component for use throughout the application
// Using named exports allows for easy addition of more components in the future
export {InputBox}