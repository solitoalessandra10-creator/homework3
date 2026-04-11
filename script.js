let x = 1000;
let valori = [x];
let sequenza = [];
let interval = null;
let chart;

// Inizializzazione
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnGenera").onclick = generaPasso;
    document.getElementById("btnAuto").onclick = autoRun;
    document.getElementById("btnStop").onclick = stopRun;
    document.getElementById("btnReset").onclick = reset;
    disegna(); // Disegna il punto iniziale
});

function generaPasso() {
    const inputPassi = document.getElementById("numPassi");
    let nPassi = parseInt(inputPassi.value) || 1;

    const txtSequenza = document.getElementById("sequenza");
    const txtValori = document.getElementById("valori");

    for (let k = 0; k < nPassi; k++) {
        let salto = Math.random() < 0.5 ? -1 : 1;
        sequenza.push(salto);

        x = x + salto;
        valori.push(x);

        txtSequenza.value += (salto > 0 ? "+" + salto : salto) + "\n";
        txtValori.value += x + "\n";
    }

    // Auto-scroll delle textarea
    txtSequenza.scrollTop = txtSequenza.scrollHeight;
    txtValori.scrollTop = txtValori.scrollHeight;

    disegna();
}

function autoRun() {
    if (interval) return;
    document.getElementById("btnAuto").classList.add("active");
    interval = setInterval(generaPasso, 300);
}

function stopRun() {
    clearInterval(interval);
    interval = null;
    document.getElementById("btnAuto").classList.remove("active");
}

function reset() {
    stopRun();
    x = 1000;
    valori = [x];
    sequenza = [];
    document.getElementById("sequenza").value = "";
    document.getElementById("valori").value = "";
    disegna();
}

function disegna() {
    const ctx = document.getElementById("grafico").getContext("2d");

    if (chart) chart.destroy();

    const labels = valori.map((_, i) => i);

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Prezzo Asset',
                data: valori,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: true,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false, // Disattivata per rendere l'Auto Run fluido
            scales: {
                x: { title: { display: true, text: 'Passo' } },
                y: { title: { display: true, text: 'Valore' } }
            }
        }
    });
}
