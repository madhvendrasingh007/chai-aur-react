# React Styling Patterns - Essential Guide 🎨

Modern styling patterns for building scalable and maintainable React applications. Master these four essential patterns to create professional UIs.

## Patterns Overview

| Pattern | Purpose | Implementation |
|---------|---------|----------------|
| **CSS-in-JS** | Component-scoped styling | JavaScript-based styles |
| **Responsive Design** | Multi-device layouts | Breakpoints & flexible units |
| **Theme Systems** | Consistent design tokens | Centralized style variables |
| **Dark Mode** | Multiple color schemes | Dynamic theme switching |

---

## CSS-in-JS
*Writing styles directly in JavaScript files*

### Core Concept
CSS-in-JS allows you to write CSS styles as JavaScript objects or template literals, providing dynamic styling capabilities and component-level scoping.

### Implementation Approaches

#### 1. Inline Styles (Basic)
```jsx
const Button = ({ variant, size, children }) => {
  const styles = {
    base: {
      padding: size === 'large' ? '16px 32px' : '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    primary: {
      backgroundColor: '#007bff',
      color: 'white'
    },
    secondary: {
      backgroundColor: '#6c757d',
      color: 'white'
    }
  };

  return (
    <button style={{...styles.base, ...styles[variant]}}>
      {children}
    </button>
  );
};
```

#### 2. Styled Components (Advanced)
```jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: ${props => props.size === 'large' ? '16px 32px' : '12px 24px'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.theme.colors[props.variant]};
  color: white;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
```

#### 3. Emotion CSS Prop
```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Button = ({ variant, size, children }) => (
  <button
    css={css`
      padding: ${size === 'large' ? '16px 32px' : '12px 24px'};
      border: none;
      border-radius: 8px;
      cursor: pointer;
      background-color: ${variant === 'primary' ? '#007bff' : '#6c757d'};
      color: white;
      
      &:hover {
        opacity: 0.9;
      }
    `}
  >
    {children}
  </button>
);
```

**✅ Benefits**: Dynamic styling, component scoping, JavaScript logic integration  
**⚠️ Considerations**: Runtime overhead, learning curve, debugging complexity

---

## Responsive Design
*Creating layouts that work on all device sizes*

### Core Principles
- **Mobile-first approach**: Start with mobile styles, enhance for larger screens
- **Flexible units**: Use relative units (%, em, rem, vw, vh)
- **Breakpoints**: Define consistent screen size thresholds

### Implementation Strategies

#### 1. CSS Media Queries
```jsx
const Card = ({ title, content }) => {
  const cardStyles = {
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    
    // Mobile-first responsive styles
    '@media (min-width: 768px)': {
      padding: '30px',
      margin: '20px'
    },
    '@media (min-width: 1024px)': {
      padding: '40px',
      margin: '20px auto',
      maxWidth: '800px'
    }
  };

  return <div style={cardStyles}>{/* content */}</div>;
};
```

#### 2. Breakpoint System
```jsx
// breakpoints.js
export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px'
};

export const mediaQueries = {
  mobile: `@media (min-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`
};

// Usage with styled-components
const ResponsiveGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  
  ${mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  ${mediaQueries.desktop} {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
`;
```

#### 3. Responsive Hook
```jsx
import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...windowSize,
    isMobile: windowSize.width < 768,
    isTablet: windowSize.width >= 768 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024
  };
};

// Usage
const ResponsiveComponent = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  return (
    <div>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  );
};
```

**✅ Key Practices**: Mobile-first design, flexible grids, scalable images, touch-friendly interfaces  
**📱 Breakpoints**: 320px (mobile), 768px (tablet), 1024px (desktop), 1200px+ (wide)

---

## Theme Systems
*Implementing consistent design tokens across applications*

### Design Token Structure
```jsx
// theme.js
export const theme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',
      600: '#0284c7',
      900: '#0c4a6e'
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      900: '#111827'
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['Fira Code', 'monospace']
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px'
  }
};
```

### Theme Provider Implementation
```jsx
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children, theme }) => (
  <ThemeContext.Provider value={theme}>
    {children}
  </ThemeContext.Provider>
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Usage in components
const Button = ({ variant = 'primary', size = 'md', children }) => {
  const theme = useTheme();
  
  const styles = {
    backgroundColor: theme.colors.primary[500],
    color: 'white',
    padding: `${theme.spacing[size]} ${theme.spacing.lg}`,
    fontSize: theme.typography.fontSize[size],
    borderRadius: theme.borderRadius.md,
    boxShadow: theme.shadows.sm,
    border: 'none',
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily.sans.join(', ')
  };

  return <button style={styles}>{children}</button>;
};
```

### CSS Custom Properties (CSS Variables)
```jsx
// Generate CSS variables from theme
const generateCSSVariables = (theme) => {
  const root = document.documentElement;
  
  // Colors
  Object.entries(theme.colors.primary).forEach(([key, value]) => {
    root.style.setProperty(`--color-primary-${key}`, value);
  });
  
  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });
};

// CSS usage
const buttonStyles = `
  .button {
    background-color: var(--color-primary-500);
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--border-radius-md);
  }
`;
```

**✅ Benefits**: Consistency, maintainability, scalability, easy updates  
**🎯 Best Practices**: Semantic naming, hierarchical structure, documentation

---

## Dark Mode
*Supporting multiple color schemes in applications*

### Implementation Strategy

#### 1. Theme Toggle Hook
```jsx
import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    
    // Update document class for CSS targeting
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (localStorage.getItem('darkMode') === null) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return [isDark, setIsDark];
};
```

#### 2. Dual Theme Configuration
```jsx
// themes.js
const baseTheme = {
  spacing: { /* same for both themes */ },
  typography: { /* same for both themes */ },
  borderRadius: { /* same for both themes */ }
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      elevated: '#ffffff'
    },
    text: {
      primary: '#1a202c',
      secondary: '#4a5568',
      muted: '#718096'
    },
    border: '#e2e8f0',
    primary: {
      500: '#3182ce',
      600: '#2c5aa0'
    }
  }
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    background: {
      primary: '#1a202c',
      secondary: '#2d3748',
      elevated: '#4a5568'
    },
    text: {
      primary: '#f7fafc',
      secondary: '#e2e8f0',
      muted: '#a0aec0'
    },
    border: '#4a5568',
    primary: {
      500: '#63b3ed',
      600: '#4299e1'
    }
  }
};
```

#### 3. Complete Dark Mode Setup
```jsx
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useDarkMode();
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, setIsDark }}>
      <div style={{
        backgroundColor: theme.colors.background.primary,
        color: theme.colors.text.primary,
        minHeight: '100vh',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);
  
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      style={{
        padding: '8px 16px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};
```

#### 4. CSS Variables Approach
```css
/* Global CSS */
:root {
  --color-bg-primary: #ffffff;
  --color-text-primary: #1a202c;
  --color-border: #e2e8f0;
}

[data-theme="dark"] {
  --color-bg-primary: #1a202c;
  --color-text-primary: #f7fafc;
  --color-border: #4a5568;
}

.card {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}
```

```jsx
// JavaScript theme switching
const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
};
```

**✅ Key Features**: System preference detection, localStorage persistence, smooth transitions  
**🌙 Best Practices**: Respect user preferences, provide toggle controls, test contrast ratios

---

## Pattern Integration Example

```jsx
// Complete example combining all patterns
import React from 'react';
import styled from 'styled-components';

// Theme-aware, responsive styled component
const Card = styled.div`
  background-color: ${props => props.theme.colors.background.elevated};
  color: ${props => props.theme.colors.text.primary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.md};
  transition: all 0.3s ease;
  
  /* Responsive design */
  margin: ${props => props.theme.spacing.md};
  
  @media (min-width: 768px) {
    margin: ${props => props.theme.spacing.lg};
    padding: ${props => props.theme.spacing.xl};
  }
  
  @media (min-width: 1024px) {
    max-width: 600px;
    margin: ${props => props.theme.spacing.lg} auto;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const App = () => (
  <ThemeProvider>
    <Card>
      <h2>Responsive, Themed Card</h2>
      <p>This card demonstrates all four styling patterns working together.</p>
      <ThemeToggle />
    </Card>
  </ThemeProvider>
);
```

## Best Practices Summary

1. **CSS-in-JS**: Use for dynamic styles, prefer template literals over objects
2. **Responsive Design**: Start mobile-first, use consistent breakpoints
3. **Theme Systems**: Create semantic design tokens, use provider patterns
4. **Dark Mode**: Respect system preferences, provide smooth transitions

Master these patterns to build modern, accessible, and maintainable React applications! 🚀