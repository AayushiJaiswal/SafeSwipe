document.getElementById("fraud-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const time = document.getElementById("time").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  // Dummy encoding for categorical features
  const timeFeature = time === "Morning" ? 6 : time === "Afternoon" ? 14 : 22;
  const typeFeature = type === "Online" ? 1.2 : 0.6;
  const categoryFeature = category === "Grocery" ? 0.9 : category === "Travel" ? 1.5 : 0.8;

  // Construct 30 features
  const features = [
    amount,
    timeFeature,
    typeFeature,
    categoryFeature,
    0.1, -0.2, 0.3, -0.4, 0.5, -0.6,
    0.2, -0.1, 0.4, -0.3, 0.6, -0.5,
    0.3, 0.1, -0.2, 0.2, 0.5, -0.4,
    0.4, -0.2, 0.1, 0.0, 0.1, -0.3,
    0.02,
    amount
  ];

  try {
    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features })
    });

    const data = await res.json();

    if (res.ok) {
      document.getElementById("result").innerHTML = `
        <h3 style="color: ${data.fraud ? 'red' : 'green'}">
          ${data.fraud ? '❌ Fraudulent Transaction' : '✅ Legitimate Transaction'}
        </h3>
        <p>Confidence: ${(data.probability * 100).toFixed(2)}%</p>
      `;
    } else {
      document.getElementById("result").innerHTML = `<p style="color:red">${data.error}</p>`;
    }
  } catch (err) {
    document.getElementById("result").innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
  }
});
