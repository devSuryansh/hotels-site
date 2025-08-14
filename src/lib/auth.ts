// Utility function to get auth headers for API calls
export function getAuthHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  return {
    "Content-Type": "application/json",
  };
}

// Utility function to make authenticated API calls
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
) {
  const headers = {
    ...getAuthHeaders(),
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("admin_token");
}

// Get user info from token (without verifying - for client-side display only)
export function getUserFromToken(): {
  username: string;
  email: string;
  role: string;
} | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("admin_token");
  if (!token) return null;

  try {
    // Note: This is NOT secure validation, just for display purposes
    // Real validation happens on the server
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      username: payload.username,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}
