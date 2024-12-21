// Seleciona o elemento canvas
const canvas = document.getElementById('bhCanvas');
const ctx = canvas.getContext('2d');

// Ajusta o tamanho do canvas para a tela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variáveis do buraco negro
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const blackHoleRadius = 100;
let particles = [];

// Criação das partículas
function createParticles() {
    for (let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 2 + 0.5,
            angle: Math.random() * Math.PI * 2,
        });
    }
}

// Atualiza e desenha as partículas
function updateParticles() {
    particles.forEach((particle) => {
        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Gravidade em direção ao buraco negro
        if (distance > blackHoleRadius) {
            particle.x -= (dx / distance) * particle.speed;
            particle.y -= (dy / distance) * particle.speed;
        }

        // Redesenha partículas
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
        ctx.closePath();
    });
}

// Desenha o buraco negro
function drawBlackHole() {
    // Horizonte de eventos (gradiente)
    const gradient = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, blackHoleRadius);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2);
    ctx.fill();
}

// Animação principal
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBlackHole();
    updateParticles();
    requestAnimationFrame(animate);
}

// Inicializa a simulação
createParticles();
animate();
