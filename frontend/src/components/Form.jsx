import React, { useState } from "react";
import { formConfig } from "../config/formConfig";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function Form() {
  const initialAnswers = formConfig.reduce((acc, q) => {
    acc[q.id] = "";
    return acc;
  }, {});

  const [answers, setAnswers] = useState(initialAnswers);
  const [loading, setLoading] = useState(false);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    for (const q of formConfig) {
      if (q.required && (!answers[q.id] || answers[q.id].toString().trim() === "")) {
        return { ok: false, message: `${q.label} is required` };
      }
      if (q.type === "text" && q.validate && typeof q.validate === "function") {
        const err = q.validate(answers[q.id]);
        if (err) return { ok: false, message: err };
      }
    }
    return { ok: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (!v.ok) {
      alert(v.message);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers)
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Server returned ${res.status} ${res.statusText} ${text}`);
      }

      const data = await res.json();
      if (data && data.success) {
        alert("Submitted successfully!");
        setAnswers(initialAnswers);
      } else {
        console.warn("Unexpected response:", data);
        alert("Submission returned unexpected response. Check console.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Network error while submitting. Make sure backend is running at " + API_BASE);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Fill the form</h2>
      <form onSubmit={handleSubmit}>
        {formConfig.map((q) => (
          <div className="field" key={q.id}>
            <label>
              {q.label}
              {q.required ? " *" : ""}
            </label>

            {q.type === "text" && (
              <input
                type="text"
                value={answers[q.id]}
                onChange={(e) => handleChange(q.id, e.target.value)}
                placeholder={q.placeholder ?? q.label}
              />
            )}

            {q.type === "select" && (
              <select value={answers[q.id]} onChange={(e) => handleChange(q.id, e.target.value)}>
                <option value="">Select</option>
                {q.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        <div className="actions">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
