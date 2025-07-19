// Browser compatibility utilities
export const checkBrowserSupport = () => {
  const issues = [];
  
  // Check for basic ES6 support
  if (!window.Promise) {
    issues.push('Promise support required');
  }
  
  // Check for fetch API
  if (!window.fetch) {
    issues.push('Fetch API support required');
  }
  
  // Check for localStorage
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
  } catch (e) {
    issues.push('LocalStorage access required');
  }
  
  // Check for modern CSS support
  const testEl = document.createElement('div');
  testEl.style.display = 'grid';
  if (!testEl.style.display) {
    issues.push('CSS Grid support recommended');
  }
  
  return {
    supported: issues.length === 0,
    issues
  };
};

export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  let version = 'Unknown';
  
  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    browser = 'Chrome';
    version = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
  } else if (ua.includes('Firefox')) {
    browser = 'Firefox';
    version = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    browser = 'Safari';
    version = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
  } else if (ua.includes('Edg')) {
    browser = 'Edge';
    version = ua.match(/Edg\/(\d+)/)?.[1] || 'Unknown';
  } else if (ua.includes('brave')) {
    browser = 'Brave';
    version = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
  }
  
  return { browser, version, userAgent: ua };
};

export const initBrowserCompatibility = () => {
  const support = checkBrowserSupport();
  const browserInfo = getBrowserInfo();
  
  console.log('Browser Info:', browserInfo);
  console.log('Browser Support:', support);
  
  if (!support.supported) {
    console.warn('Browser compatibility issues detected:', support.issues);
  }
  
  // Add browser class to body for CSS targeting
  document.body.classList.add(`browser-${browserInfo.browser.toLowerCase()}`);
  
  return { support, browserInfo };
};