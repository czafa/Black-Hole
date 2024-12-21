// Configuração do Canvas
const canvas = document.getElementById("bhCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variáveis
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const blackHoleRadius = 120;

// Função para desenhar o horizonte de eventos
function drawEventHorizon() {
    const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        blackHoleRadius / 2,
        centerX,
        centerY,
        blackHoleRadius
    );
    gradient.addColorStop(0, "black");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.9)");
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2);
    ctx.fill();
}

// Função para desenhar o disco de acreção com faixas giratórias
function drawAccretionDisk() {
    const innerRadius = blackHoleRadius + 30;
    const outerRadius = blackHoleRadius + 200;

    // Desenha faixas giratórias
    for (let i = 0; i < 5; i++) {
        const angleOffset = Math.PI * (i / 5);
        ctx.beginPath();
        ctx.ellipse(
            centerX,
            centerY,
            outerRadius,
            outerRadius / 4,
            angleOffset,
            0,
            Math.PI * 2
        );
        ctx.strokeStyle = `rgba(255, ${200 - i * 40}, ${100 - i * 20}, 0.6)`;
        ctx.lineWidth = 2 + i;
        ctx.stroke();
    }

    // Gradiente para preencher o disco
    const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        innerRadius,
        centerX,
        centerY,
        outerRadius
    );
    gradient.addColorStop(0, "rgba(255, 200, 100, 0.4)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, outerRadius, outerRadius / 4, 0, 0, Math.PI * 2);
    ctx.fill();
}

// Função para desenhar as partículas orbitando com rastro
let particles = [];
function createParticles() {
    for (let i = 0; i < 500; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * (200 - blackHoleRadius) + blackHoleRadius + 50;
        particles.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            angle,
            speed: Math.random() * 0.01 + 0.005,
        });
    }
}

function updateParticles() {
    particles.forEach((particle) => {
        // Atualiza o ângulo e posição da partícula
        particle.angle += particle.speed;
        const distance = Math.sqrt((particle.x - centerX) ** 2 + (particle.y - centerY) ** 2);
        particle.x = centerX + Math.cos(particle.angle) * distance;
        particle.y = centerY + Math.sin(particle.angle) * distance;

        // Desenha a partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fill();
    });
}

// Fundo com transição azul
function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#000428");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.9)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Função para desenhar a lente gravitacional
function drawGravitationalLens() {
    const outerLensRadius = blackHoleRadius + 250;
    const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        blackHoleRadius + 10,
        centerX,
        centerY,
        outerLensRadius
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.05)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.02)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerLensRadius, 0, Math.PI * 2);
    ctx.fill();
}

// Animação principal
function animate() {
    // Fundo translúcido para criar rastros
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    drawGravitationalLens();
    drawAccretionDisk();
    drawEventHorizon();
    updateParticles();

    requestAnimationFrame(animate);
}

// Inicializa a simulação
createParticles();
animate();
