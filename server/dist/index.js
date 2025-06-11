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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://vite-re-dummy.vercel.app"],
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
        // Get cookie from dummyjson (not real but simulate if needed)
        const setCookie = response.headers.get("set-cookie");
        if (setCookie) {
            res.setHeader("Set-Cookie", setCookie); // Forward cookie
        }
        res.status(response.status).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed.", message: error.message });
    }
}));
app.get("/auth/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.accessToken;
    try {
        const response = yield fetch("https://dummyjson.com/auth/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = yield response.json();
        res.status(response.status).json(data);
    }
    catch (error) {
        res.status(401).json(error.message);
    }
}));
app.listen(8000, () => console.log("Server running!"));
