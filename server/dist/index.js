"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const localServer = process.env.LOCAL_SERVER;
const prodServer = process.env.PROD_SERVER;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const allowedOrigins = [localServer, prodServer];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.get("/api/test", (req, res) => {
    try {
        res.send("OK");
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error.message);
    }
});
app.get("/api/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://dummyjson.com/products", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = yield response.json();
        res.status(response.status).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "fetching failed.", message: error.message });
    }
}));
app.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });
        const data = yield response.json();
        const token = data.accessToken || data.token;
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.status(response.status).json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Login failed.", message: error.message });
    }
}));
app.get("/api/auth/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken;
    try {
        const response = yield fetch("https://dummyjson.com/auth/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = yield response.json();
        console.log("sdfdsf", data);
        res.status(response.status).json(data);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Failed to fetch profile", message: error.message });
    }
}));
app.listen(8000, () => console.log("Server running!"));
