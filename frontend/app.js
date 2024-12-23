document.getElementById("fraud-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const features = document
    .getElementById("features")
    .value.split(",")
    .map(Number);

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const result = await response.json();
    const resultElement = document.getElementById("result");

    if (result.fraud) {
      resultElement.innerText = `Fraud Detected! Probability: ${result.probability}`;
      resultElement.style.color = "red";
    } else {
      resultElement.innerText = `No Fraud Detected. Probability: ${result.probability}`;
      resultElement.style.color = "green";
    }
    
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerText =
      "An error occurred. Check console for details.";
  }
});

function copyText(button) {
  const textToCopy = button.previousElementSibling.textContent;
  navigator.clipboard.writeText(textToCopy);
}
