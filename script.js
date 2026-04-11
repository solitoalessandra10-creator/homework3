let x = 1000;
let valori = [x];
let sequenza = [];
let interval = null;

function generaPasso() {
    let nPassi = parseInt(document.getElementById("numPassi").value) || 1;

    for (let k = 0; k < nPassi; k++) {
        let salto = Math.random() < 0.5 ? -1 : 1;
        sequenza.push(salto);

        x = x + salto;
        valori.push(x);

        document.getElementById("sequenza").value += salto + "\n";
        document.getElementById("valori").value += x + "\n";
    }

    disegna();
}

function autoRun() {
    if (interval) return;
    interval = setInterval(generaPasso, 500);
}

function stopRun() {
    clearInterval(interval);
    interval = null;
}

function reset() {
    clearInterval(interval);
    interval = null;

    x = 1000;
    valori = [x];
    sequenza = [];

    document.getElementById("sequenza").value = "";
    document.getElementById("valori").value = "";

    disegna();
}

let chart;

function disegna() {
    const ctx = document.getElementById("grafico").getContext("2d");

    if (chart) chart.destroy();

    const labels = valori.map((_, i) => i);

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Random Walk',
                data: valori,
                borderColor: 'green',
                borderWidth: 2,
                pointRadius: 0,
                fill: false,
                tension: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Passo'
                    },
                    grid: { display: true }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valore'
                    },
                    grid: { display: true }
                }
            }
        }
    });
}
