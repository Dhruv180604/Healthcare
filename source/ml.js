// ml.js

document.getElementById("analysisForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const symptoms = document.getElementById("symptoms").value;

  try {
    const response = await fetch("http://localhost:5001/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ age, gender, symptoms }),
    });

    const data = await response.json();
    document.getElementById("result").innerText = `🧠 Prediction: ${data.result}`;
  } catch (error) {
    console.error("Error analyzing data:", error);
    document.getElementById("result").innerText = "❌ Failed to analyze health data.";
  }
});
