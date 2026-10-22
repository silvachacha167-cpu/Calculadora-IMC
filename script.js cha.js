function calcularIMC() {
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const resultArea = document.getElementById("result-area");

  resultArea.className = "";
  resultArea.style.display = "block";

  // VALIDAÇÃO EXIGIDA
  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    resultArea.className = "status-erro";
    resultArea.innerHTML = `
            <p><i class="fa-solid fa-triangle-exclamation"></i> Por favor, insira valores válidos e maiores que zero.</p>
        `;
    return;
  }

  // FORMULA
  const imc = peso / (altura * altura);
  const imcFormatado = imc.toFixed(2);

  // MÉTICAS COMPLEMENTARES
  const pesoMinIdeal = (18.5 * (altura * altura)).toFixed(1);
  const pesoMaxIdeal = (24.9 * (altura * altura)).toFixed(1);
  const aguaRecomendada = (peso * 0.035).toFixed(1);

  let classificacao = "";
  let classeEstilo = "";
  let percentualBarra = 0;

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
    classeEstilo = "status-magreza";
    percentualBarra = Math.min((imc / 18.5) * 25, 25);
  } else if (imc >= 18.5 && imc <= 24.9) {
    classificacao = "Peso normal";
    classeEstilo = "status-normal";
    percentualBarra = 25 + ((imc - 18.5) / (24.9 - 18.5)) * 25;
  } else if (imc >= 25.0 && imc <= 29.9) {
    classificacao = "Sobrepeso";
    classeEstilo = "status-sobrepeso";
    percentualBarra = 50 + ((imc - 25.0) / (29.9 - 25.0)) * 25;
  } else {
    classificacao = "Obesidade";
    classeEstilo = "status-obesidade";
    percentualBarra = Math.min(75 + ((imc - 30.0) / 10) * 25, 100);
  }

  resultArea.className = classeEstilo;
  resultArea.innerHTML = `
        <div class="res-header">Diagnóstico Nutricional</div>
        <div class="res-number">${imcFormatado}</div>
        <div class="res-status">${classificacao}</div>
        <div class="gauge-track">
            <div class="gauge-fill" style="width: ${percentualBarra}%;"></div>
        </div>
        <div class="extra-metrics">
            <div class="metric-item">
                <span>Peso Ideal</span>
                <strong>${pesoMinIdeal} - ${pesoMaxIdeal} kg</strong>
            </div>
            <div class="metric-item">
                <span>Meta de Água</span>
                <strong>${aguaRecomendada} L / dia</strong>
            </div>
        </div>
    `;
}
