# React.js State & Lifecycle - Beginner's Guide 🚀

Welcome to the complete guide on React.js State and Lifecycle! This README will take you through the essential concepts that every React developer needs to understand.

## 📋 Table of Contents
- [State](#-state)
- [useState Hook](#-usestate-hook)
- [Component Lifecycle](#-component-lifecycle)
- [useEffect Hook](#-useeffect-hook)
- [Conditional Rendering](#-conditional-rendering)
- [Lists & Keys](#-lists--keys)

---

## 🎯 State

**What is State?**
State is like a component's memory - it holds data that can change over time and affects what the component displays. Think of it as variables that React watches and updates the UI when they change.

**Key Points:**
- State is private to each component
- When state changes, React re-renders the component
- State should never be modified directly
- State updates are asynchronous

**Real-world analogy:** Think of state like the current temperature on a thermostat. The temperature (state) can change, and when it does, the display (UI) updates to show the new value.

---

## 🎪 useState Hook

**What is useState?**
`useState` is a React Hook that lets you add state to functional components. It's the most commonly used hook and the foundation of interactive React components.

**Syntax:**
```javascript
const [stateName, setStateName] = useState(initialValue);
```

**Basic Example:**
```javascript
import React, { useState } from 'react';

function Counter() {
  // Declare state variable 'count' with initial value 0
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

**Multiple State Variables:**
```javascript
function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input 
        type="text" 
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        type="email" 
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="number" 
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
      />
    </form>
  );
}
```

**Important Rules:**
- Always use the setter function to update state
- State updates trigger re-renders
- State updates may be batched for performance

---

## 🔄 Component Lifecycle

**What is Component Lifecycle?**
Component lifecycle refers to the different phases a React component goes through from creation to destruction. Understanding this helps you know when to perform certain actions.

**The Three Main Phases:**

### 1. **Mounting** 🏗️
When the component is being created and inserted into the DOM for the first time.

### 2. **Updating** 🔄
When the component's props or state change, causing it to re-render.

### 3. **Unmounting** 🗑️
When the component is being removed from the DOM.

**Visual Representation:**
```
Birth → Life → Death
  ↓       ↓       ↓
Mount → Update → Unmount
```

**Class Component Lifecycle Methods (for reference):**
- `componentDidMount()` - After first render
- `componentDidUpdate()` - After re-render
- `componentWillUnmount()` - Before removal

---

## ⚡ useEffect Hook

**What is useEffect?**
`useEffect` is a Hook that lets you perform side effects in functional components. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined.

**Basic Syntax:**
```javascript
useEffect(() => {
  // Side effect code here
}, [dependencies]);
```

**Example 1: Basic Effect**
```javascript
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function (like componentWillUnmount)
    return () => clearInterval(interval);
  }, []); // Empty dependency array means run once on mount

  return <div>Timer: {seconds} seconds</div>;
}
```

**Example 2: Effect with Dependencies**
```javascript
function UserData({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This runs when userId changes
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [userId]); // Runs when userId changes

  return user ? <div>Hello, {user.name}!</div> : <div>Loading...</div>;
}
```

**Different useEffect Patterns:**

```javascript
// 1. Runs after every render
useEffect(() => {
  console.log('After every render');
});

// 2. Runs only once (on mount)
useEffect(() => {
  console.log('Only on mount');
}, []);

// 3. Runs when specific values change
useEffect(() => {
  console.log('When count changes');
}, [count]);

// 4. Cleanup function
useEffect(() => {
  const subscription = subscribeToSomething();
  
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

---

## 🎭 Conditional Rendering

**What is Conditional Rendering?**
Conditional rendering means showing different content based on certain conditions. It's like having an "if-else" statement in your JSX.

**Method 1: If-Else Statements**
```javascript
function Greeting({ user }) {
  if (user) {
    return <h1>Hello, {user.name}!</h1>;
  } else {
    return <h1>Please sign in.</h1>;
  }
}
```

**Method 2: Ternary Operator** (Most Common)
```javascript
function LoginButton({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <button>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
}
```

**Method 3: Logical AND (&&)**
```javascript
function Notifications({ messages }) {
  return (
    <div>
      <h1>Welcome!</h1>
      {messages.length > 0 && (
        <h2>You have {messages.length} unread messages.</h2>
      )}
    </div>
  );
}
```

**Complex Conditional Example:**
```javascript
function UserDashboard({ user, isLoading, error }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {user.isAdmin && <button>Admin Panel</button>}
      {user.notifications.length > 0 && (
        <div>You have new notifications!</div>
      )}
    </div>
  );
}
```

---

## 📝 Lists & Keys

**What are Lists in React?**
Lists allow you to render multiple similar elements from an array of data. Keys help React identify which items have changed, been added, or removed.

**Basic List Rendering:**
```javascript
function FruitList() {
  const fruits = ['Apple', 'Banana', 'Orange', 'Mango'];

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}
```

**Better Example with Unique IDs:**
```javascript
function TodoList() {
  const todos = [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Get a job', completed: true }
  ];

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} style={{
          textDecoration: todo.completed ? 'line-through' : 'none'
        }}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

**Interactive List with State:**
```javascript
function ShoppingCart() {
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', price: 999, quantity: 1 },
    { id: 2, name: 'Mouse', price: 25, quantity: 2 }
  ]);

  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <span>{item.name} - ${item.price}</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                min="1"
              />
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

**Key Rules for Keys:**
- Keys must be unique among siblings
- Use stable, predictable, and unique keys
- Avoid using array indices as keys when possible
- Keys help React optimize re-rendering

**Why Keys Matter:**
```javascript
// ❌ Bad - Using index as key
{items.map((item, index) => 
  <div key={index}>{item.name}</div>
)}

// ✅ Good - Using unique ID as key
{items.map(item => 
  <div key={item.id}>{item.name}</div>
)}
```

---

## 🎯 Putting It All Together

Here's a complete example that combines all the concepts:

```javascript
import React, { useState, useEffect } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to load tasks on component mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTasks([
        { id: 1, text: 'Learn React Hooks', completed: false },
        { id: 2, text: 'Build a todo app', completed: true }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Add new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false
      }]);
      setNewTask('');
    }
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  // Conditional rendering for loading state
  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div>
      <h1>Task Manager</h1>
      
      {/* Add new task */}
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Filter buttons */}
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      {/* Task list with conditional rendering */}
      {filteredTasks.length === 0 ? (
        <p>No tasks found!</p>
      ) : (
        <ul>
          {filteredTasks.map(task => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span style={{
                textDecoration: task.completed ? 'line-through' : 'none'
              }}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Statistics */}
      <div>
        <p>Total: {tasks.length}</p>
        <p>Completed: {tasks.filter(t => t.completed).length}</p>
        <p>Remaining: {tasks.filter(t => !t.completed).length}</p>
      </div>
    </div>
  );
}

export default TaskManager;
```

---

## 🎓 Quick Tips for Beginners

1. **Start Small**: Begin with simple state like counters and text inputs
2. **One Concept at a Time**: Master useState before moving to useEffect
3. **Practice Conditional Rendering**: It's used everywhere in React apps
4. **Always Use Keys**: Even if it seems to work without them
5. **Think in Components**: Break down complex UIs into smaller pieces
6. **Read Error Messages**: React has helpful error messages
7. **Use React Developer Tools**: Browser extension for debugging

---

## 📚 Next Steps

After mastering these concepts, you should explore:
- Custom Hooks
- Context API
- useReducer Hook
- Performance optimization (useMemo, useCallback)
- Error Boundaries
- React Router for navigation

---

## 🎉 Congratulations!

You now understand the fundamental concepts of React state and lifecycle! These concepts form the foundation of most React applications. Keep practicing by building small projects and gradually increasing complexity.

Remember: React is all about managing state and rendering UI based on that state. Everything else builds upon these core concepts!

---

*Happy coding! 🚀*