declare global {
  interface Window {
    env: {
      BACKEND_URL: string;
      AUTH_URL: string;
      // Add more properties if needed
    };
  }
}

export {};
