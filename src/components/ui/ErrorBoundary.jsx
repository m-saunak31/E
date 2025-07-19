import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="text-6xl mb-6">😵</div>
              <h1 className="text-2xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300' }}>
                Oops! Something went wrong
              </h1>
              <p className="text-gray-400 mb-6 font-light" style={{ fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>
                We're sorry for the inconvenience. Please try refreshing the page.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-[#d4af37] hover:bg-[#e6c14d] text-black py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                >
                  Refresh Page
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full border border-gray-700 hover:border-[#d4af37] text-gray-300 hover:text-[#d4af37] py-3 px-6 rounded-lg font-medium transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: '500' }}
                >
                  Go Home
                </button>
              </div>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="text-red-400 cursor-pointer mb-2">Error Details (Dev Mode)</summary>
                  <pre className="text-xs text-red-300 bg-red-900/20 p-3 rounded overflow-auto max-h-40">
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;