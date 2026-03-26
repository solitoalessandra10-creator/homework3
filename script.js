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

function disegna() {
    const canvas = document.getElementById("grafico");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (valori.length < 2) return;

    let min = Math.min(...valori);
    let max = Math.max(...valori);

    let scalaX = canvas.width / (valori.length - 1);
    let scalaY = canvas.height / (max - min + 1);

    ctx.beginPath();

    for (let i = 0; i < valori.length; i++) {
        let px = i * scalaX;
        let py = canvas.height - (valori[i] - min) * scalaY;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }

    ctx.stroke();
}
