const endPoint =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_URL
    : import.meta.env.VITE_PROD_URL;

export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const res = await fetch(`${endPoint}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "include", // Include cookies (e.g., accessToken) in the request
  });

  if (!res.ok) throw new Error("Invalid credentials.");

  return await res.json();
};

export const getCurrentUser = async (token: string | null) => {
  try {
    const res = await fetch(`${endPoint}/api/auth/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include", // Include cookies (e.g., accessToken) in the request
    });
    if (!res.ok) throw new Error("Error fetching user.");

    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
