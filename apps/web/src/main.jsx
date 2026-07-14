import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';

// Task 1: Global fetch wrapper to fix error logging
const originalFetch = window.fetch;
window.fetch = async function(...args) {
  const url = args[0];
  try {
    return await originalFetch.apply(this, args);
  } catch (err) {
    console.error(`Fetch error from ${url}:`, err);
    throw err;
  }
};

// Task 2: console.error interceptor with fallback for string arguments
const originalConsoleError = console.error;
console.error = function(...args) {
  let errorString = '';
  let filePath = '';

  // 1. Loop through all arguments
  for (const arg of args) {
    // 2. Check if arg is an Error instance
    if (arg instanceof Error) {
      if (!errorString) {
        errorString = arg.message;
      }
      // Extract stack and message
      if (arg.stack) {
        // 4. Extract filePath from the error stack if available
        const match = arg.stack.match(/at\s+(.*:\d+:\d+)/);
        if (match && match[1]) {
          filePath = match[1];
        }
      }
    } 
    // 3. Check if arg is a string AND errorString is not yet set
    else if (typeof arg === 'string' && !errorString) {
      errorString = arg;
    }
  }

  // 5. Build the final errorString with format
  if (filePath && errorString) {
    errorString = `${errorString} at ${filePath}`;
  }

  // Replace the first string argument with our enriched error string to preserve context
  if (errorString && typeof args[0] === 'string') {
    args[0] = errorString;
  } else if (errorString && args.length === 0) {
    args.push(errorString);
  }

  originalConsoleError.apply(console, args);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);