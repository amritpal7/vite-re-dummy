import express, { Request, Response } from "express";
import cors from "cors";
import cookiePasrser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const localServer = process.env.LOCAL_SERVER;
const prodServer = process.env.PROD_SERVER;

const app = express();
app.use(express.json());

const allowedOrigins = [localServer!, prodServer!];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.get("/api/test", (req: Request, res: Response) => {
  try {
    res.send("OK");
  } catch (error: any) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const response = await fetch("https://dummyjson.com/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "fetching failed.", message: error.message });
  }
});

app.post("/api/login", async (req: Request, res: Response) => {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log("from login route", data);

    const token = data.accessToken || data.token;

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(response.status).json(data);
  } catch (error: any) {
    res.status(500).json({ error: "Login failed.", message: error.message });
  }
});

app.get("/api/auth/me", async (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  try {
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to fetch profile", message: error.message });
  }
});

app.listen(8000, () => console.log("Server running!"));
