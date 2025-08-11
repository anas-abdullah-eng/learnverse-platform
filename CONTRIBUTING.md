# Contributing to LearnVerse

First off, thank you for considering contributing to LearnVerse! It's people like you that make LearnVerse such a great tool for English learners worldwide.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Process

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Setting Up Your Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/anas-abdullah-eng/learnverse-platform.git
   cd learnverse-platform
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your feature:
   ```bash
   git checkout -b feature/amazing-feature
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Coding Standards

- Use meaningful variable and function names
- Write clear, concise comments
- Follow the existing code style
- Use TypeScript types where applicable
- Ensure your code is accessible (WCAG guidelines)
- Write responsive CSS using Tailwind CSS utilities

### Component Guidelines

- Create reusable components when possible
- Use React hooks for state management
- Implement proper error boundaries
- Include loading states for async operations
- Follow the existing file structure

### Testing

- Write unit tests for new components
- Test user interactions and edge cases
- Ensure accessibility compliance
- Test on different screen sizes

### Commit Messages

Use clear and meaningful commit messages:

```
feat: add online testing system
fix: resolve navigation issue on mobile
docs: update API documentation
style: improve button hover states
refactor: optimize vocabulary hooks
test: add tests for dictionary component
```

## Project Structure

```
src/
├── api/                 # API client and endpoints
├── Components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── Pages/              # Page components
├── assets/             # Static assets
└── utils/              # Utility functions
```

## Style Guide

### React Components

```jsx
import React, { useState, useEffect } from 'react';
import { SomeIcon } from '@heroicons/react/24/outline';

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Effect logic here
  }, []);

  const handleClick = () => {
    // Handler logic here
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-dark dark:text-light mb-4">
        Title
      </h2>
      <button
        onClick={handleClick}
        className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Click Me
      </button>
    </div>
  );
};

export default MyComponent;
```

### CSS Classes

Use Tailwind CSS utilities and follow the existing patterns:

- Use semantic color names: `text-primary`, `bg-secondary`
- Include dark mode variants: `dark:bg-slate-800`
- Use consistent spacing: `p-4`, `mb-6`, `space-y-4`
- Add hover states: `hover:bg-primary/90`
- Include transitions: `transition-colors`

## Questions?

Don't hesitate to ask questions! You can:

1. Open an issue with the "question" label
2. Join our community discussions
3. Contact the maintainers directly

Thank you for contributing to LearnVerse! 🎓
