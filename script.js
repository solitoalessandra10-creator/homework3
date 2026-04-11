let x = 0; // Partiamo da 0 come nell'immagine
let valori = [x];
let sequenza = [];
let chart;

function generaPasso() {
    // Reset preventivo per nuova generazione pulita
    reset();

    let nPassi = parseInt(document.getElementById("numPassi").value) || 1000;
    let seqString = "";
    let valString = "0\n";

    for (let k = 0; k < nPassi; k++) {
        let salto = Math.random() < 0.5 ? -1 : 1;
        sequenza.push(salto);
        x = x + salto;
        valori.push(x);

        seqString += salto + (k % 10 === 9 ? "\n" : " ");
        valString += x + "\n";
    }

    document.getElementById("sequenza").value = seqString;
    document.getElementById("valori").value = valString;

    disegna();
}

function reset() {
    x = 0;
    valori = [0];
    sequenza = [];
    document.getElementById("sequenza").value = "";
    document.getElementById("valori").value = "";
    if (chart) chart.destroy();
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
                label: 'Random Walk scalata',
                data: valori,
                borderColor: '#4CAF50',
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top' }
            },
            scales: {
                x: {
                    grid: { display: true, color: '#f0f0f0' },
                    ticks: { maxTicksLimit: 10 } // Evita sovrapposizioni
                },
                y: {
                    grid: { display: true, color: '#f0f0f0' }
                }
            }
        }
    });
}

// Inizializza un grafico vuoto all'avvio
window.onload = disegna;
