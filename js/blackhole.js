// Configuração do Canvas
const canvas = document.getElementById("bhCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variáveis do buraco negro
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const blackHoleRadius = 120;

// Função para desenhar o horizonte de eventos (centro do buraco negro)
function drawEventHorizon() {
    const gradient = ctx.createRadialGradient(centerX, centerY, blackHoleRadius / 2, centerX, centerY, blackHoleRadius);
    gradient.addColorStop(0, "black");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.8)");
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2);
    ctx.fill();
}

// Função para desenhar o disco de acreção
function drawAccretionDisk() {
    const innerRadius = blackHoleRadius + 20;
    const outerRadius = blackHoleRadius + 100;

    const gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius);
    gradient.addColorStop(0, "rgba(255, 200, 100, 1)");
    gradient.addColorStop(0.5, "rgba(255, 150, 50, 0.7)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.arc(centerX, centerY, innerRadius, Math.PI * 2, 0, true);
    ctx.fill();
}

// Função para simular partículas orbitando
let particles = [];
function createParticles() {
    for (let i = 0; i < 500; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 200 + blackHoleRadius + 50;
        particles.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            angle,
            speed: Math.random() * 0.02 + 0.01,
        });
    }
}

function updateParticles() {
    particles.forEach((particle) => {
        particle.angle += particle.speed;
        const distance = Math.sqrt((particle.x - centerX) ** 2 + (particle.y - centerY) ** 2);
        particle.x = centerX + Math.cos(particle.angle) * distance;
        particle.y = centerY + Math.sin(particle.angle) * distance;

        // Desenha as partículas
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
    });
}

// Animação principal
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fundo do espaço
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawAccretionDisk();
    drawEventHorizon();
    updateParticles();

    requestAnimationFrame(animate);
}

// Inicializa a simulação
createParticles();
animate();
