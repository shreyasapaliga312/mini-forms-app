import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store (simple for hackathon)
let responses = [];

/**
 * POST /api/submit
 * Body: JSON object with answers (key = question id)
 */
app.post("/api/submit", (req, res) => {
  const answers = req.body || {};
  const record = {
    id: responses.length + 1,
    answers,
    time: new Date().toISOString()
  };
  responses.push(record);
  res.json({ success: true, record });
});

/**
 * GET /api/responses
 * Returns list of saved responses
 */
app.get("/api/responses", (req, res) => {
  res.json(responses);
});

/**
 * (Optional) clear responses - useful while testing
 * DELETE /api/responses
 */
app.delete("/api/responses", (req, res) => {
  responses = [];
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
