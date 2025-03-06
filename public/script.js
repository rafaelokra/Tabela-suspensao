async function getOilQuantity() {
  const model = document.getElementById("motorcycleModel").value.toLowerCase();
  if (!model) {
    document.getElementById("result").textContent =
      "Por favor, insira um modelo";
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/motorcycles/find/${model}`
    );
    const data = await response.json();

    if (response.ok) {
      document.getElementById(
        "result"
      ).textContent = `Quantidade de óleo: ${data.oilQuantity} ml`;
    } else {
      document.getElementById("result").textContent = data.message;
    }
  } catch (error) {
    document.getElementById("result").textContent =
      "Erro ao buscar informações";
  }
}
