# 🪝 React Hooks - Complete Beginner's Guide

Welcome to the comprehensive guide for React Hooks! This README will take you from beginner to confident with React's powerful Hook system.

## 📚 Table of Contents
- [What are Hooks?](#what-are-hooks)
- [Built-in Hooks](#built-in-hooks)
- [Advanced Hooks](#advanced-hooks)
- [Rules of Hooks](#rules-of-hooks)
- [Best Practices](#best-practices)

---

## What are Hooks?

Hooks are special functions that let you "hook into" React features from functional components. They allow you to use state and other React features without writing class components.

**Key Points:**
- Hooks start with the word "use" (useState, useEffect, etc.)
- They can only be used in functional components
- They make your code more reusable and easier to test

---

## 🔧 Built-in Hooks

### useState - Managing Component State

**What it does:** Lets you add state to functional components with a getter and setter function.

**Basic Syntax:**
```javascript
const [state, setState] = useState(initialValue);
```

**Example:**
```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

**When to use:** When you need to store and update simple values like numbers, strings, or booleans.

---

### useEffect - Performing Side Effects

**What it does:** Handles side effects like API calls, subscriptions, or DOM manipulation. It's like combining `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` from class components.

**Basic Syntax:**
```javascript
useEffect(() => {
  // Side effect code here
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```

**Example:**
```javascript
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts or userId changes
    fetchUser(userId).then(setUser);
    
    // Cleanup function (runs when component unmounts)
    return () => {
      console.log('Cleaning up...');
    };
  }, [userId]); // Dependency array

  return <div>{user ? user.name : 'Loading...'}</div>;
}
```

**When to use:** For API calls, setting up subscriptions, manually changing DOM, or any code that affects things outside your component.

---

### useContext - Consuming React Context

**What it does:** Lets you consume context values without wrapping your component in a Consumer component. Helps avoid "prop drilling" (passing props through many levels).

**Example:**
```javascript
import React, { useContext, createContext } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// Consumer component
function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={`toolbar-${theme}`}>Toolbar</div>;
}
```

**When to use:** When you need to share data (like themes, user info, or settings) across many components without passing props down manually.

---

### useReducer - Managing Complex State Logic

**What it does:** An alternative to useState for managing complex state logic. It uses a reducer function (similar to Redux) to determine how state should change.

**Basic Syntax:**
```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

**Example:**
```javascript
import React, { useReducer } from 'react';

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', text });
  };

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}>
            Toggle
          </button>
        </div>
      ))}
    </div>
  );
}
```

**When to use:** When you have complex state logic with multiple sub-values or when the next state depends on the previous one.

---

### useMemo - Memoizing Expensive Calculations

**What it does:** Caches the result of expensive calculations and only recalculates when dependencies change. Helps optimize performance.

**Example:**
```javascript
import React, { useState, useMemo } from 'react';

function ExpensiveComponent({ items }) {
  const [filter, setFilter] = useState('');

  // This expensive calculation only runs when items or filter change
  const filteredItems = useMemo(() => {
    console.log('Filtering items...'); // This won't run on every render
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  return (
    <div>
      <input 
        value={filter} 
        onChange={e => setFilter(e.target.value)} 
        placeholder="Filter items..."
      />
      {filteredItems.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}
```

**When to use:** When you have expensive calculations that don't need to run on every render.

---

### useCallback - Memoizing Functions

**What it does:** Returns a memoized version of a function that only changes when dependencies change. Prevents unnecessary re-renders of child components.

**Example:**
```javascript
import React, { useState, useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Without useCallback, this function would be recreated on every render
  const handleClick = useCallback(() => {
    console.log('Button clicked!');
  }, []); // Empty dependency array means function never changes

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </div>
  );
}

function Child({ onClick }) {
  console.log('Child rendered'); // This won't log on every parent render
  return <button onClick={onClick}>Child Button</button>;
}
```

**When to use:** When passing functions as props to child components to prevent unnecessary re-renders.

---

### useRef - Accessing DOM Elements

**What it does:** Returns a mutable ref object that persists across renders. Commonly used to access DOM elements directly or store mutable values.

**Example:**
```javascript
import React, { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);
  const countRef = useRef(0);

  useEffect(() => {
    // Focus the input when component mounts
    inputRef.current.focus();
  }, []);

  const handleClick = () => {
    countRef.current += 1;
    console.log('Clicked', countRef.current, 'times');
    // Note: changing countRef.current doesn't trigger re-render
  };

  return (
    <div>
      <input ref={inputRef} placeholder="This will be focused" />
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
```

**When to use:** To access DOM elements directly, store mutable values that don't trigger re-renders, or focus management.

---

### useLayoutEffect - Synchronous Side Effects

**What it does:** Similar to useEffect, but fires synchronously after all DOM mutations. Use for DOM measurements or when you need to update the DOM before the browser paints.

**Example:**
```javascript
import React, { useLayoutEffect, useRef, useState } from 'react';

function MeasureComponent() {
  const divRef = useRef();
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    // This runs synchronously after DOM mutations
    const rect = divRef.current.getBoundingClientRect();
    setHeight(rect.height);
  });

  return (
    <div>
      <div ref={divRef} style={{ padding: '20px', background: 'lightblue' }}>
        Content to measure
      </div>
      <p>Height: {height}px</p>
    </div>
  );
}
```

**When to use:** When you need to read DOM properties and make changes before the browser paints.

---

## 🚀 Advanced Hooks

### useImperativeHandle - Customizing Exposed Values

**What it does:** Customizes the instance value that is exposed to parent components when using `ref`. Used with `forwardRef`.

**Example:**
```javascript
import React, { useImperativeHandle, forwardRef, useRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    getValue: () => {
      return inputRef.current.value;
    }
  }));

  return <input ref={inputRef} {...props} />;
});

function Parent() {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
    console.log('Value:', inputRef.current.getValue());
  };

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleClick}>Focus and Get Value</button>
    </div>
  );
}
```

**When to use:** Rarely needed. Only when building reusable component libraries and you need to expose specific methods to parent components.

---

### useDebugValue - DevTools Labels

**What it does:** Displays a label for custom hooks in React DevTools.

**Example:**
```javascript
import React, { useState, useDebugValue } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  // This will show in React DevTools
  useDebugValue(count > 10 ? 'High' : 'Low');

  return [count, setCount];
}

function Counter() {
  const [count, setCount] = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

**When to use:** Only in custom hooks when debugging, to make DevTools more informative.

---

### Custom Hooks - Creating Reusable Logic

**What they are:** Functions that start with "use" and can call other hooks. They let you extract component logic into reusable functions.

**Example:**
```javascript
import React, { useState, useEffect } from 'react';

// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Using the custom hook
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>Hello, {user.name}!</div>;
}
```

**When to create:** When you have stateful logic that you want to reuse across multiple components.

---

## ⚠️ Rules of Hooks

### Hook Rules - The Golden Rules

**Rule 1: Only call hooks at the top level**
```javascript
// ✅ Good
function MyComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // ❌ Bad - inside condition
  if (count > 10) {
    const [error, setError] = useState(null); // This breaks the rules!
  }
}
```

**Rule 2: Only call hooks from React functions**
```javascript
// ✅ Good - from React component
function MyComponent() {
  const [count, setCount] = useState(0);
}

// ✅ Good - from custom hook
function useCounter() {
  const [count, setCount] = useState(0);
}

// ❌ Bad - from regular function
function regularFunction() {
  const [count, setCount] = useState(0); // This won't work!
}
```

### ESLint Plugin - Enforcing Hook Rules

Install and configure the ESLint plugin to automatically catch hook rule violations:

```bash
npm install eslint-plugin-react-hooks --save-dev
```

**ESLint Configuration:**
```json
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### Hook Dependencies - Understanding Dependency Arrays

**What are dependencies?** Values that your hook depends on. When these change, the hook should re-run.

**Common patterns:**

```javascript
// No dependency array - runs after every render
useEffect(() => {
  console.log('Runs every render');
});

// Empty dependency array - runs once after mount
useEffect(() => {
  console.log('Runs once');
}, []);

// With dependencies - runs when dependencies change
useEffect(() => {
  fetchUserData(userId);
}, [userId]);

// Multiple dependencies
useEffect(() => {
  if (isVisible && data) {
    updateChart(data);
  }
}, [isVisible, data]);
```

**Dependency Rules:**
- Include ALL values from component scope that are used inside the effect
- ESLint will help you identify missing dependencies
- Use `useCallback` and `useMemo` to stabilize dependencies when needed

---

## 🎯 Best Practices

### 1. Start with useState and useEffect
These are the most commonly used hooks. Master them first!

### 2. Extract Custom Hooks
When you find yourself repeating similar stateful logic, extract it into a custom hook.

### 3. Use the ESLint Plugin
It will save you from many common mistakes and bugs.

### 4. Keep Effects Focused
Each useEffect should handle one concern. Multiple small effects are better than one large effect.

### 5. Optimize When Needed
Don't use `useMemo` and `useCallback` everywhere. Use them when you have actual performance problems.

### 6. Name Custom Hooks Clearly
Use descriptive names that start with "use": `useApi`, `useLocalStorage`, `useWindowSize`.

---

## 🎉 Congratulations!

You now have a comprehensive understanding of React Hooks! Start with the basic hooks, practice with small projects, and gradually incorporate the more advanced patterns as you build more complex applications.

Remember: Hooks make your code more readable, reusable, and easier to test. They're one of the best features of modern React!

---

## 📚 Additional Resources

- [Official React Hooks Documentation](https://react.dev/reference/react)
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [ESLint Plugin for React Hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

Happy coding! 🚀