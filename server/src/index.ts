import express from "express";
import cors from "cors";
import cookiePasrser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookiePasrser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/api/test", (req, res) => {
  try {
    res.send("OK");
  } catch (error: any) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    // Get cookie from dummyjson (not real but simulate if needed)
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      res.setHeader("Set-Cookie", setCookie); // Forward cookie
    }

    res.status(response.status).json(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Login failed.", message: error.message });
  }
});

app.get("/auth/me", async (req, res) => {
  const token = req.cookies.accessToken;
  try {
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error: any) {
    res.status(401).json(error.message);
  }
});

app.listen(8000, () => console.log("Server running!"));
