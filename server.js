import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy route
app.get("/proxy", async (req, res) => {
  try {
    const targetUrl = req.query.url;
    if (!targetUrl) {
      return res.status(400).send("Missing ?url=");
    }

    const response = await fetch(targetUrl);
    const contentType = response.headers.get("content-type");
    if (contentType) res.set("content-type", contentType);

    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
