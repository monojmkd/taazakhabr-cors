import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// Define the CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Define the Swiggy API proxy route
app.use(
  "/proxy/inshorts/api",
  createProxyMiddleware({
    target: "https://inshorts.com",
    pathRewrite: {
      "^/proxy/inshorts/api": "/api",
    },
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the TaazaKhabr App</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
