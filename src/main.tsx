import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";

// Error Boundary Component
import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            background: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)",
            color: "#f0f6fc",
            fontFamily: "Inter, sans-serif",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "4rem",
              marginBottom: "1rem",
              opacity: 0.5,
            }}
          >
            😵
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
              color: "#bb86fc",
            }}
          >
            Oops! Something went wrong
          </h1>
          <p
            style={{
              fontSize: "1rem",
              opacity: 0.7,
              marginBottom: "2rem",
              maxWidth: "400px",
            }}
          >
            The app encountered an unexpected error. Try refreshing the page or
            contact support if the problem persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "linear-gradient(135deg, #bb86fc 0%, #8b5fdb 100%)",
              border: "none",
              borderRadius: "12px",
              padding: "12px 24px",
              color: "white",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(187, 134, 252, 0.3)",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(187, 134, 252, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(187, 134, 252, 0.3)";
            }}
          >
            🔄 Refresh App
          </button>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details
              style={{
                marginTop: "2rem",
                padding: "1rem",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                fontSize: "0.8rem",
                maxWidth: "500px",
                textAlign: "left",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: 600 }}>
                Error Details (Development)
              </summary>
              <pre
                style={{
                  marginTop: "1rem",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Performance logging (simplified)
const logPerformance = () => {
  if (process.env.NODE_ENV === "production") {
    // Simple performance logging
    window.addEventListener("load", () => {
      const perfData = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;
      console.log(
        "App Load Time:",
        perfData.loadEventEnd - perfData.fetchStart,
        "ms",
      );
    });
  }
};

// Initialize app
const initializeApp = () => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Failed to find the root element");
  }

  const root = createRoot(rootElement);

  // Show app loaded state
  const showAppLoaded = () => {
    document.body.classList.add("app-loaded");
  };

  // Render app with error boundary and performance monitoring
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );

  // Performance logging in production
  logPerformance();

  // Remove loading screen once React has rendered
  requestAnimationFrame(() => {
    showAppLoaded();
  });

  // Handle offline/online status
  const handleOnline = () => {
    console.log("App is online");
  };

  const handleOffline = () => {
    console.log("App is offline");
  };

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  // Cleanup function
  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
};

// Initialize the app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}

// Hot module replacement for development
if (import.meta.hot) {
  import.meta.hot.accept();
}
