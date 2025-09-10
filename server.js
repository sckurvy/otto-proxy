import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Otto Proxy</h1><p>Use /proxy?url=TARGET_URL</p>");
});

app.get("/proxy", async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send("Missing URL parameter");

  try {
    const response = await fetch(target);
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send("Error fetching target site: " + err.message);
  }
});
