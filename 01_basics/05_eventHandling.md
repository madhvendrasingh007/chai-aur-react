# 🎯 React Event Handling - Complete Beginner's Guide

Master the art of handling user interactions in React! This guide will teach you everything about events, from basic clicks to complex data passing between components.

## 📚 Table of Contents
- [What is Event Handling?](#what-is-event-handling)
- [SyntheticEvents](#syntheticevents)
- [Event Handlers](#event-handlers)
- [Event Binding in Class Components](#event-binding-in-class-components)
- [Passing Data Between Components](#passing-data-between-components)
- [Common Event Types](#common-event-types)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🤔 What is Event Handling?

**Event Handling** is how your React app responds to user interactions like clicks, typing, hovering, and form submissions.

### 🌟 Real-World Analogy
Think of event handling like a doorbell system:
- **User Action** = Pressing the doorbell button
- **Event** = The doorbell ringing
- **Event Handler** = You answering the door

```jsx
// Simple example
function Button() {
  const handleClick = () => {
    alert('Button was clicked!');
  };

  return <button onClick={handleClick}>Click me!</button>;
}
```

---

## ⚡ SyntheticEvents

### 🔍 What are SyntheticEvents?

**SyntheticEvents** are React's wrapper around native browser events. They provide a consistent interface across all browsers.

### 🌐 Why SyntheticEvents Matter

| **Problem** | **Solution** |
|-------------|--------------|
| Different browsers handle events differently | SyntheticEvents provide consistency |
| Some browsers don't support certain events | React fills in the gaps |
| Native events can be complex | SyntheticEvents are simplified |

### 📋 SyntheticEvent vs Native Event

```jsx
function EventExample() {
  const handleClick = (event) => {
    // This is a SyntheticEvent, not a native event
    console.log('Event type:', event.type); // 'click'
    console.log('Target element:', event.target); // <button>
    console.log('Is SyntheticEvent?', event.nativeEvent); // Access native event
    
    // Prevent default behavior
    event.preventDefault();
    
    // Stop event bubbling
    event.stopPropagation();
  };

  return <button onClick={handleClick}>Click to see event details</button>;
}
```

### ✨ SyntheticEvent Properties

```jsx
function EventProperties() {
  const handleEvent = (e) => {
    console.log('Common SyntheticEvent properties:');
    console.log('type:', e.type);           // Event type (click, change, etc.)
    console.log('target:', e.target);       // Element that triggered the event
    console.log('currentTarget:', e.currentTarget); // Element event is attached to
    console.log('timeStamp:', e.timeStamp); // When event occurred
  };

  return (
    <div onClick={handleEvent}>
      <button>Click me</button>
      <input onChange={handleEvent} placeholder="Type here" />
    </div>
  );
}
```

### 🔄 Event Pooling (Important Note)

In older versions of React (before v17), SyntheticEvents were pooled for performance:

```jsx
// In React 16 and below - DON'T DO THIS
function OldEventHandling() {
  const handleClick = (event) => {
    setTimeout(() => {
      console.log(event.type); // Would be null due to pooling
    }, 1000);
  };

  // Solution was to call event.persist()
  const handleClickCorrect = (event) => {
    event.persist(); // Removes event from pool
    setTimeout(() => {
      console.log(event.type); // Now works
    }, 1000);
  };
}

// In React 17+ - Event pooling is removed, so this works fine
function ModernEventHandling() {
  const handleClick = (event) => {
    setTimeout(() => {
      console.log(event.type); // Works perfectly!
    }, 1000);
  };
}
```

---

## 🎮 Event Handlers

### 📝 What are Event Handlers?

**Event Handlers** are functions that execute when specific events occur. They're your app's way of responding to user actions.

### 🔧 Basic Event Handler Patterns

#### 1. **Inline Event Handlers**
```jsx
function InlineHandlers() {
  return (
    <div>
      {/* Simple inline handler */}
      <button onClick={() => alert('Hello!')}>
        Say Hello
      </button>

      {/* Inline with logic */}
      <button onClick={() => {
        console.log('Button clicked');
        alert('Multiple actions!');
      }}>
        Multiple Actions
      </button>
    </div>
  );
}
```

#### 2. **Function Declaration Handlers**
```jsx
function DeclarationHandlers() {
  // Handler defined as regular function
  function handleSubmit() {
    console.log('Form submitted!');
  }

  // Handler with parameters
  function handleDelete(id) {
    console.log(`Deleting item ${id}`);
  }

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={() => handleDelete(123)}>Delete Item</button>
    </div>
  );
}
```

#### 3. **Arrow Function Handlers**
```jsx
function ArrowHandlers() {
  // Arrow function handler
  const handleLogin = () => {
    console.log('User logging in...');
  };

  // Arrow function with event parameter
  const handleInputChange = (event) => {
    console.log('Input value:', event.target.value);
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <input onChange={handleInputChange} placeholder="Type here" />
    </div>
  );
}
```

### 🎯 Common Event Handler Examples

```jsx
import React, { useState } from 'react';

function CommonEventHandlers() {
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);

  // Click handler
  const handleButtonClick = () => {
    setCount(count + 1);
  };

  // Input change handler
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  // Form submit handler
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    alert(`Message: ${message}, Count: ${count}`);
  };

  // Mouse enter handler
  const handleMouseEnter = () => {
    console.log('Mouse entered the div!');
  };

  // Key press handler
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      alert('Enter key pressed!');
    }
  };

  return (
    <div>
      <h2>Common Event Handlers</h2>
      
      {/* Click event */}
      <button onClick={handleButtonClick}>
        Clicked {count} times
      </button>

      {/* Form with submit event */}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
        />
        <button type="submit">Submit</button>
      </form>

      {/* Mouse events */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => console.log('Mouse left!')}
        style={{ 
          padding: '20px', 
          backgroundColor: '#f0f0f0',
          margin: '10px 0'
        }}
      >
        Hover over me!
      </div>
    </div>
  );
}
```

---

## 🔗 Event Binding in Class Components

### 🤔 Why is Event Binding Necessary?

In class components, event handlers lose their `this` context. You need to bind them to access component methods and state.

### ❌ Common Binding Problems

```jsx
class ProblematicComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleClick() {
    // ERROR: 'this' is undefined!
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

### ✅ Solution 1: Constructor Binding

```jsx
class ConstructorBinding extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    
    // Bind the method to 'this'
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

### ✅ Solution 2: Arrow Function Methods (Recommended)

```jsx
class ArrowFunctionBinding extends React.Component {
  state = { count: 0 };

  // Arrow function automatically binds 'this'
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

### ✅ Solution 3: Inline Arrow Functions

```jsx
class InlineBinding extends React.Component {
  state = { count: 0 };

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <button onClick={() => this.handleClick()}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

### 📊 Binding Methods Comparison

| Method | Performance | Readability | Best For |
|--------|-------------|-------------|----------|
| Constructor Binding | ⭐⭐⭐ | ⭐⭐ | Many event handlers |
| Arrow Function Methods | ⭐⭐⭐ | ⭐⭐⭐ | **Recommended** |
| Inline Arrow Functions | ⭐ | ⭐⭐⭐ | Simple handlers |

### 🎯 Complete Class Component Example

```jsx
class CompleteEventExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: 'Hello from class component!'
    };

    // Constructor binding for comparison
    this.handleReset = this.handleReset.bind(this);
  }

  // Arrow function method (recommended)
  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    alert(`Name: ${this.state.name}, Email: ${this.state.email}`);
  }

  // Constructor bound method
  handleReset() {
    this.setState({
      name: '',
      email: ''
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <input
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={this.handleReset}>
            Reset
          </button>
        </form>
      </div>
    );
  }
}
```

---

## 🔄 Passing Data Between Components

### 🎯 Child to Parent Communication

One of the most important patterns in React is passing data from child components back to their parents using callback functions.

### 🏗️ Basic Parent-Child Data Flow

```jsx
// Parent Component
function ParentComponent() {
  const [message, setMessage] = useState('');

  // Callback function to receive data from child
  const handleDataFromChild = (data) => {
    setMessage(data);
    console.log('Received from child:', data);
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <p>Message from child: {message}</p>
      
      {/* Pass callback to child */}
      <ChildComponent onDataSend={handleDataFromChild} />
    </div>
  );
}

// Child Component
function ChildComponent({ onDataSend }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendData = () => {
    // Call parent's callback with data
    onDataSend(inputValue);
    setInputValue(''); // Clear input
  };

  return (
    <div>
      <h3>Child Component</h3>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type a message"
      />
      <button onClick={handleSendData}>Send to Parent</button>
    </div>
  );
}
```

### 🎮 Real-World Example: Todo List

```jsx
import React, { useState } from 'react';

// Parent: Todo List Manager
function TodoApp() {
  const [todos, setTodos] = useState([]);

  // Callback to add new todo
  const handleAddTodo = (todoText) => {
    const newTodo = {
      id: Date.now(),
      text: todoText,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  // Callback to delete todo
  const handleDeleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  // Callback to toggle todo completion
  const handleToggleTodo = (todoId) => {
    setTodos(todos.map(todo =>
      todo.id === todoId 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  return (
    <div>
      <h1>My Todo List</h1>
      
      {/* Child component for adding todos */}
      <TodoForm onAddTodo={handleAddTodo} />
      
      {/* Child components for displaying todos */}
      <div>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
          />
        ))}
      </div>
    </div>
  );
}

// Child: Todo Form
function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

// Child: Todo Item
function TodoItem({ todo, onDelete, onToggle }) {
  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleToggle = () => {
    onToggle(todo.id);
  };

  return (
    <div style={{ 
      padding: '10px', 
      border: '1px solid #ccc', 
      margin: '5px 0',
      textDecoration: todo.completed ? 'line-through' : 'none'
    }}>
      <span onClick={handleToggle} style={{ cursor: 'pointer' }}>
        {todo.completed ? '✅' : '⭕'} {todo.text}
      </span>
      <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
        Delete
      </button>
    </div>
  );
}
```

### 🔄 Advanced Data Passing Patterns

#### 1. **Passing Multiple Data Types**

```jsx
function AdvancedParent() {
  const [userInfo, setUserInfo] = useState({});

  const handleUserUpdate = (userData) => {
    setUserInfo(prevInfo => ({
      ...prevInfo,
      ...userData
    }));
  };

  return (
    <div>
      <h2>User Info: {JSON.stringify(userInfo)}</h2>
      <UserForm onUserUpdate={handleUserUpdate} />
    </div>
  );
}

function UserForm({ onUserUpdate }) {
  const handleNameSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onUserUpdate({
      name: formData.get('name'),
      timestamp: new Date().toISOString()
    });
  };

  const handleAgeSubmit = (age) => {
    onUserUpdate({ age: parseInt(age) });
  };

  return (
    <div>
      <form onSubmit={handleNameSubmit}>
        <input name="name" placeholder="Enter name" />
        <button type="submit">Update Name</button>
      </form>
      
      <input
        type="number"
        onChange={(e) => handleAgeSubmit(e.target.value)}
        placeholder="Enter age"
      />
    </div>
  );
}
```

#### 2. **Event with Additional Data**

```jsx
function ListManager() {
  const [items, setItems] = useState(['Apple', 'Banana', 'Cherry']);

  const handleItemAction = (action, itemIndex, additionalData) => {
    switch(action) {
      case 'delete':
        setItems(items.filter((_, index) => index !== itemIndex));
        break;
      case 'edit':
        const newItems = [...items];
        newItems[itemIndex] = additionalData.newValue;
        setItems(newItems);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  return (
    <div>
      <h2>Item List Manager</h2>
      {items.map((item, index) => (
        <ListItem
          key={index}
          item={item}
          index={index}
          onAction={handleItemAction}
        />
      ))}
    </div>
  );
}

function ListItem({ item, index, onAction }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item);

  const handleDelete = () => {
    onAction('delete', index);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onAction('edit', index, { newValue: editValue });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(item);
    setIsEditing(false);
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', margin: '5px' }}>
      {isEditing ? (
        <div>
          <input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <span>{item}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
```

---

## 🎪 Common Event Types

### 📋 Essential Events Reference

```jsx
function AllEventTypes() {
  // Mouse Events
  const handleMouseEvents = (eventType) => {
    console.log(`Mouse event: ${eventType}`);
  };

  // Keyboard Events
  const handleKeyDown = (event) => {
    console.log(`Key pressed: ${event.key}`);
    if (event.key === 'Escape') {
      console.log('Escape pressed!');
    }
  };

  // Form Events
  const handleFormEvents = (event, eventType) => {
    console.log(`Form event: ${eventType}`, event.target.value);
  };

  // Focus Events
  const handleFocusEvents = (eventType) => {
    console.log(`Focus event: ${eventType}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Common Event Types</h2>

      {/* Mouse Events */}
      <div
        onClick={() => handleMouseEvents('click')}
        onDoubleClick={() => handleMouseEvents('doubleClick')}
        onMouseDown={() => handleMouseEvents('mouseDown')}
        onMouseUp={() => handleMouseEvents('mouseUp')}
        onMouseEnter={() => handleMouseEvents('mouseEnter')}
        onMouseLeave={() => handleMouseEvents('mouseLeave')}
        onMouseMove={() => handleMouseEvents('mouseMove')}
        style={{
          padding: '20px',
          backgroundColor: '#e3f2fd',
          margin: '10px 0',
          cursor: 'pointer'
        }}
      >
        🖱️ Mouse Events Area (Check console)
      </div>

      {/* Keyboard Events */}
      <input
        onKeyDown={handleKeyDown}
        onKeyUp={(e) => console.log(`Key released: ${e.key}`)}
        onKeyPress={(e) => console.log(`Key pressed (legacy): ${e.key}`)}
        placeholder="⌨️ Type here for keyboard events"
        style={{ padding: '10px', margin: '10px 0', display: 'block' }}
      />

      {/* Form Events */}
      <div>
        <input
          onChange={(e) => handleFormEvents(e, 'change')}
          onInput={(e) => handleFormEvents(e, 'input')}
          onFocus={() => handleFocusEvents('focus')}
          onBlur={() => handleFocusEvents('blur')}
          placeholder="📝 Form events input"
          style={{ padding: '10px', margin: '5px' }}
        />

        <select onChange={(e) => handleFormEvents(e, 'select change')}>
          <option value="">Choose option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      </div>

      {/* Touch Events (for mobile) */}
      <div
        onTouchStart={() => console.log('Touch started')}
        onTouchEnd={() => console.log('Touch ended')}
        onTouchMove={() => console.log('Touch moving')}
        style={{
          padding: '20px',
          backgroundColor: '#f3e5f5',
          margin: '10px 0',
          touchAction: 'none'
        }}
      >
        📱 Touch Events Area (mobile)
      </div>
    </div>
  );
}
```

### 📊 Event Types Quick Reference

| Category | Events | Common Use Cases |
|----------|--------|------------------|
| **Mouse** | `onClick`, `onDoubleClick`, `onMouseEnter`, `onMouseLeave` | Buttons, hover effects, drag & drop |
| **Keyboard** | `onKeyDown`, `onKeyUp`, `onKeyPress` | Shortcuts, form validation, games |
| **Form** | `onChange`, `onSubmit`, `onInput`, `onSelect` | Form handling, real-time validation |
| **Focus** | `onFocus`, `onBlur` | Input highlighting, save-on-blur |
| **Touch** | `onTouchStart`, `onTouchEnd`, `onTouchMove` | Mobile interactions, gestures |

---

## ✅ Best Practices

### 🎯 Performance Best Practices

#### 1. **Avoid Inline Functions in Render**

```jsx
// ❌ Bad - Creates new function on every render
function BadExample({ items }) {
  return (
    <div>
      {items.map(item => (
        <button onClick={() => handleClick(item.id)}>
          {item.name}
        </button>
      ))}
    </div>
  );
}

// ✅ Good - Stable function reference
function GoodExample({ items }) {
  const handleClick = useCallback((id) => {
    // Handle click logic
  }, []);

  return (
    <div>
      {items.map(item => (
        <button onClick={() => handleClick(item.id)}>
          {item.name}
        </button>
      ))}
    </div>
  );
}
```

#### 2. **Use Event Delegation for Lists**

```jsx
// ✅ Event delegation - single event listener
function EfficientList({ items, onItemClick }) {
  const handleListClick = (event) => {
    const itemId = event.target.dataset.itemId;
    if (itemId) {
      onItemClick(itemId);
    }
  };

  return (
    <ul onClick={handleListClick}>
      {items.map(item => (
        <li key={item.id} data-item-id={item.id}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

### 🛡️ Security Best Practices

#### 1. **Sanitize User Input**

```jsx
function SecureForm() {
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    // Basic sanitization
    const sanitized = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    setUserInput(sanitized);
  };

  return (
    <input
      value={userInput}
      onChange={handleInputChange}
      placeholder="Enter safe content"
    />
  );
}
```

#### 2. **Prevent Default Carefully**

```jsx
function SecureLink() {
  const handleLinkClick = (event) => {
    // Only prevent default for internal navigation
    if (event.target.hostname === window.location.hostname) {
      event.preventDefault();
      // Handle internal navigation
    }
    // Let external links work normally
  };

  return (
    <a href="https://example.com" onClick={handleLinkClick}>
      Safe Link Handling
    </a>
  );
}
```

### 📝 Code Organization Best Practices

```jsx
// ✅ Well-organized component
function WellOrganizedComponent() {
  // 1. State declarations
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Event handlers (grouped logically)
  const handleDataLoad = async () => {
    setLoading(true);
    try {
      const result = await fetchData();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDataClear = () => {
    setData([]);
    setError(null);
  };

  // 3. Helper functions
  const isDataEmpty = () => data.length === 0;

  // 4. Render
  return (
    <div>
      {/* UI implementation */}
    </div>
  );
}
```

---

## 🐛 Troubleshooting

### ❌ Common Problems and Solutions

#### 1. **Event Handler Not Firing**

```jsx
// ❌ Problem
<button onClick={handleClick()}>Click me</button>

// ✅ Solution
<button onClick={handleClick}>Click me</button>
// or
<button onClick={() => handleClick()}>Click me</button>
```

#### 2. **'this' is undefined in Class Components**

```jsx
// ❌ Problem
class MyComponent extends React.Component {
  handleClick() {
    this.setState({ clicked: true }); // Error: 'this' is undefined
  }
  
  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}

// ✅ Solution
class MyComponent extends React.Component {
  handleClick = () => {
    this.setState({ clicked: true }); // Works!
  }
  
  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}
```

#### 3. **Event Object Becomes Null**

```jsx
// ❌ Problem (React 16 and below)
const handleClick = (event) => {
  setTimeout(() => {
    console.log(event.type); // null due to event pooling
  }, 1000);
};

// ✅ Solution (React 16 and below)
const handleClick = (event) => {
  event.persist(); // Remove from pool
  setTimeout(() => {
    console.log(event.type); // Works!
  }, 1000);
};

// ✅ Modern Solution (React 17+)
const handleClick = (event) => {
  setTimeout(() => {
    console.log(event.type); // Works automatically!
  }, 1000);
};
```

#### 4. **Form Not Submitting**

```jsx
// ❌ Problem - Missing event.preventDefault()
const handleSubmit = (event) => {
  // Page reloads, losing state
  console.log('Form submitted');
};

// ✅ Solution
const handleSubmit = (event) => {
  event.preventDefault(); // Prevent page reload
  console.log('Form submitted');
};
```

### 🔍 Debugging Tips

```jsx
function DebuggingExample() {
  const handleClick = (event) => {
    // Debugging techniques
    console.log('Event triggered');
    console.log('Event type:', event.type);
    console.log('Target element:', event.target);
    console.log('Current target:', event.currentTarget);
    console.log('Event object:', event);
    
    // Check if handler is called
    debugger; // Pauses execution in browser dev tools
  };

  return <button onClick={handleClick}>Debug Me</button>;
}