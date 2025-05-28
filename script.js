// Global değişkenler
let animationFrames = {};
let simulations = {};

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimation();
    initButterflyEffect();
    initBifurcationDiagram();
    initAttractorVisualization();
    initFractalVisualization();
    initLorenzSystem();
    initFeedbackDiagram();
    initAlternativeHistory();
    initSpreadSimulation();
    initEconomicChaos();
    initScrollEffects();
    initNavigation();
});

// Hero section animasyonu
function initHeroAnimation() {
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    const particleCount = 100;
    
    // Parçacık sınıfı
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.5;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Sınırları kontrol et
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Kaotik hareket ekle
            this.vx += (Math.random() - 0.5) * 0.1;
            this.vy += (Math.random() - 0.5) * 0.1;
            
            // Hız sınırla
            const maxSpeed = 2;
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > maxSpeed) {
                this.vx = (this.vx / speed) * maxSpeed;
                this.vy = (this.vy / speed) * maxSpeed;
            }
        }
        
        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Parçacıkları oluştur
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Bağlantı çizgileri
    function drawConnections() {
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const distance = Math.sqrt(
                    Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
                );
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
    }
    
    // Animasyon döngüsü
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });
        
        drawConnections();
        
        animationFrames.hero = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Pencere boyutu değiştiğinde
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Kelebek etkisi görselleştirmesi
function initButterflyEffect() {
    const canvas = document.getElementById('butterflyCanvas');
    const ctx = canvas.getContext('2d');
    
    let t = 0;
    const paths = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1'];
    
    // Üç farklı başlangıç noktası (çok yakın)
    for (let i = 0; i < 3; i++) {
        paths.push({
            x: 150 + i * 0.001,
            y: 100,
            trail: [],
            color: colors[i]
        });
    }
    
    function lorenzDerivative(x, y, z, sigma = 10, rho = 28, beta = 8/3) {
        return {
            dx: sigma * (y - x),
            dy: x * (rho - z) - y,
            dz: x * y - beta * z
        };
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        paths.forEach(path => {
            // Lorenz sistemi hesapla
            const dt = 0.01;
            const deriv = lorenzDerivative(
                (path.x - 150) / 10,
                (path.y - 100) / 10,
                t / 100
            );
            
            path.x += deriv.dx * dt * 50;
            path.y += deriv.dy * dt * 50;
            
            // Trail ekle
            path.trail.push({ x: path.x, y: path.y });
            if (path.trail.length > 100) path.trail.shift();
            
            // Çiz
            ctx.strokeStyle = path.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            path.trail.forEach((point, i) => {
                if (i === 0) ctx.moveTo(point.x, point.y);
                else ctx.lineTo(point.x, point.y);
            });
            ctx.stroke();
        });
        
        t += 0.1;
        animationFrames.butterfly = requestAnimationFrame(animate);
    }
    
    animate();
}

// Çatallanma diyagramı
function initBifurcationDiagram() {
    const canvas = document.getElementById('bifurcationCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Lojistik harita çatallanması
    const iterations = 200;
    const lastIterations = 50;
    
    for (let r = 2.5; r <= 4; r += 0.005) {
        let x = 0.5;
        
        // Sistemi stabilize et
        for (let i = 0; i < iterations - lastIterations; i++) {
            x = r * x * (1 - x);
        }
        
        // Son değerleri çiz
        for (let i = 0; i < lastIterations; i++) {
            x = r * x * (1 - x);
            const px = (r - 2.5) / 1.5 * canvas.width;
            const py = (1 - x) * canvas.height;
            
            ctx.fillStyle = `rgba(69, 183, 209, 0.5)`;
            ctx.fillRect(px, py, 1, 1);
        }
    }
    
    // Eksenler
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 10);
    ctx.lineTo(canvas.width, canvas.height - 10);
    ctx.stroke();
    
    ctx.font = '10px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('2.5', 5, canvas.height - 15);
    ctx.fillText('4.0', canvas.width - 20, canvas.height - 15);
    ctx.fillText('r parametresi', canvas.width / 2 - 30, canvas.height - 2);
}

// Garip çekici görselleştirmesi
function initAttractorVisualization() {
    const canvas = document.getElementById('attractorCanvas');
    const ctx = canvas.getContext('2d');
    
    let x = 0.1, y = 0, z = 0;
    let t = 0;
    
    // Rössler çekici parametreleri
    const a = 0.2, b = 0.2, c = 5.7;
    
    function animate() {
        ctx.fillStyle = 'rgba(51, 51, 51, 0.02)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < 100; i++) {
            const dt = 0.01;
            const dx = -y - z;
            const dy = x + a * y;
            const dz = b + z * (x - c);
            
            x += dx * dt;
            y += dy * dt;
            z += dz * dt;
            
            // Projeksiyon ve ölçekleme
            const px = canvas.width / 2 + x * 10;
            const py = canvas.height / 2 + y * 10;
            
            // Renk z değerine göre
            const hue = (z + 20) * 6;
            ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
            ctx.fillRect(px, py, 1, 1);
        }
        
        t += 0.1;
        animationFrames.attractor = requestAnimationFrame(animate);
    }
    
    animate();
}

// Fraktal görselleştirme
function initFractalVisualization() {
    const canvas = document.getElementById('fractalCanvas');
    const ctx = canvas.getContext('2d');
    
    // Sierpinski üçgeni - kaos oyunu yöntemi
    const vertices = [
        { x: canvas.width / 2, y: 10 },
        { x: 10, y: canvas.height - 10 },
        { x: canvas.width - 10, y: canvas.height - 10 }
    ];
    
    let current = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
    };
    
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    function drawIteration() {
        for (let i = 0; i < 100; i++) {
            const vertex = vertices[Math.floor(Math.random() * 3)];
            current.x = (current.x + vertex.x) / 2;
            current.y = (current.y + vertex.y) / 2;
            
            ctx.fillStyle = `rgba(255, 107, 107, 0.5)`;
            ctx.fillRect(current.x, current.y, 1, 1);
        }
        
        animationFrames.fractal = requestAnimationFrame(drawIteration);
    }
    
    drawIteration();
}

// Lorenz sistemi interaktif simülasyonu (2D Canvas versiyonu)
function initLorenzSystem() {
    const canvas = document.getElementById('lorenzCanvas');
    const ctx = canvas.getContext('2d');
    
    // Lorenz sistemi parametreleri
    let sigma = 10;
    let rho = 28;
    let beta = 8/3;
    
    // Sistem değişkenleri
    let x = 0.1, y = 0, z = 0;
    const trail = [];
    const maxTrailLength = 5000;
    
    // Görünüm parametreleri
    let rotation = 0;
    let scale = 8;
    
    // Canvas ortala
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    function project3D(x, y, z) {
        // Basit 3D projeksiyon
        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);
        
        // Y ekseni etrafında döndür
        const x2 = x * cosR - z * sinR;
        const z2 = x * sinR + z * cosR;
        
        // 2D'ye projeksiyon
        const perspective = 200 / (200 + z2);
        const px = centerX + x2 * scale * perspective;
        const py = centerY - y * scale * perspective;
        
        return { x: px, y: py, depth: z2 };
    }
    
    function updateLorenz() {
        const dt = 0.01;
        
        // Lorenz denklemleri
        const dx = sigma * (y - x);
        const dy = x * (rho - z) - y;
        const dz = x * y - beta * z;
        
        x += dx * dt;
        y += dy * dt;
        z += dz * dt;
        
        // Trail'e ekle
        trail.push({ x, y, z });
        if (trail.length > maxTrailLength) {
            trail.shift();
        }
    }
    
    function draw() {
        // Arka planı temizle
        ctx.fillStyle = 'rgba(51, 51, 51, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Trail'i çiz
        ctx.strokeStyle = '#45b7d1';
        ctx.lineWidth = 1;
        
        for (let i = 1; i < trail.length; i++) {
            const p1 = project3D(trail[i-1].x, trail[i-1].y, trail[i-1].z);
            const p2 = project3D(trail[i].x, trail[i].y, trail[i].z);
            
            // Derinliğe göre renk
            const hue = (i / trail.length) * 360;
            const lightness = 50 + (p2.depth + 30) * 0.5;
            ctx.strokeStyle = `hsl(${hue}, 70%, ${lightness}%)`;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }
        
        // Rotasyonu güncelle
        rotation += 0.005;
    }
    
    // Kontroller
    document.getElementById('sigma').addEventListener('input', (e) => {
        sigma = parseFloat(e.target.value);
        document.getElementById('sigmaValue').textContent = sigma.toFixed(1);
    });
    
    document.getElementById('rho').addEventListener('input', (e) => {
        rho = parseFloat(e.target.value);
        document.getElementById('rhoValue').textContent = rho.toFixed(1);
    });
    
    document.getElementById('beta').addEventListener('input', (e) => {
        beta = parseFloat(e.target.value);
        document.getElementById('betaValue').textContent = beta.toFixed(3);
    });
    
    document.getElementById('resetLorenz').addEventListener('click', () => {
        x = 0.1;
        y = 0;
        z = 0;
        trail.length = 0;
    });
    
    // Animasyon döngüsü
    function animate() {
        updateLorenz();
        draw();
        animationFrames.lorenz = requestAnimationFrame(animate);
    }
    
    // Canvas arka planını başlat
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    animate();
}

// Geri besleme diyagramı
function initFeedbackDiagram() {
    const canvas = document.getElementById('feedbackCanvas');
    const ctx = canvas.getContext('2d');
    
    const nodes = [
        { name: 'Keşif', x: 200, y: 50, vx: 0, vy: 0 },
        { name: 'Kaynak Çıkarımı', x: 350, y: 150, vx: 0, vy: 0 },
        { name: 'Zenginleşme', x: 200, y: 250, vx: 0, vy: 0 },
        { name: 'Yeni Keşifler', x: 50, y: 150, vx: 0, vy: 0 }
    ];
    
    const connections = [
        { from: 0, to: 1, strength: 0 },
        { from: 1, to: 2, strength: 0 },
        { from: 2, to: 3, strength: 0 },
        { from: 3, to: 0, strength: 0 }
    ];
    
    function animate() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Bağlantı kuvvetlerini güncelle
        connections.forEach(conn => {
            conn.strength = Math.sin(Date.now() * 0.001 + conn.from) * 0.5 + 0.5;
        });
        
        // Bağlantıları çiz
        ctx.strokeStyle = '#45b7d1';
        connections.forEach(conn => {
            const from = nodes[conn.from];
            const to = nodes[conn.to];
            
            ctx.lineWidth = conn.strength * 3 + 1;
            ctx.globalAlpha = conn.strength;
            
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            
            // Eğri çiz
            const cp1x = from.x + (to.x - from.x) * 0.5;
            const cp1y = from.y - 50;
            const cp2x = to.x - (to.x - from.x) * 0.5;
            const cp2y = to.y - 50;
            
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, to.x, to.y);
            ctx.stroke();
            
            // Ok başı
            const angle = Math.atan2(to.y - from.y, to.x - from.x);
            ctx.save();
            ctx.translate(to.x, to.y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(-10, -5);
            ctx.lineTo(0, 0);
            ctx.lineTo(-10, 5);
            ctx.stroke();
            ctx.restore();
        });
        
        ctx.globalAlpha = 1;
        
        // Düğümleri çiz
        nodes.forEach((node, i) => {
            // Düğüm hareketi
            node.vx += (Math.random() - 0.5) * 0.5;
            node.vy += (Math.random() - 0.5) * 0.5;
            node.vx *= 0.9;
            node.vy *= 0.9;
            
            node.x += node.vx;
            node.y += node.vy;
            
            // Sınırlar
            if (node.x < 50) node.x = 50;
            if (node.x > canvas.width - 50) node.x = canvas.width - 50;
            if (node.y < 30) node.y = 30;
            if (node.y > canvas.height - 30) node.y = canvas.height - 30;
            
            // Düğümü çiz
            ctx.fillStyle = '#ff6b6b';
            ctx.beginPath();
            ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#fff';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.name, node.x, node.y);
        });
        
        animationFrames.feedback = requestAnimationFrame(animate);
    }
    
    animate();
}

// Alternatif tarih simülatörü
function initAlternativeHistory() {
    const canvas = document.getElementById('altHistoryCanvas');
    const ctx = canvas.getContext('2d');
    const resultsDiv = document.getElementById('simulationResults');
    
    let scenarios = [];
    
    document.getElementById('runSimulation').addEventListener('click', () => {
        const tech = parseInt(document.getElementById('techLevel').value);
        const disease = parseInt(document.getElementById('diseaseResistance').value);
        const military = parseInt(document.getElementById('militaryPower').value);
        const cultural = parseInt(document.getElementById('culturalAdaptation').value);
        
        // Yeni senaryo oluştur
        const scenario = simulateAlternativeHistory(tech, disease, military, cultural);
        scenarios.push(scenario);
        
        // Görselleştir
        visualizeScenarios();
        
        // Sonuçları göster
        displayResults(scenario);
    });
    
    function simulateAlternativeHistory(tech, disease, military, cultural) {
        const baseYear = 1492;
        const timeline = [];
        
        // Başlangıç koşullarına göre olayları simüle et
        let colonizationSpeed = tech * 0.1 + military * 0.05;
        let nativeResistance = disease * 0.15 + cultural * 0.1;
        let culturalExchange = cultural * 0.2 - military * 0.05;
        
        // Zaman çizgisi oluştur
        for (let year = baseYear; year <= 1800; year += 10) {
            const progress = (year - baseYear) / 300;
            
            // Kaotik faktörler ekle
            const chaos = Math.sin(year * 0.1) * Math.random() * 0.2;
            
            const colonization = Math.min(1, colonizationSpeed * progress + chaos);
            const resistance = Math.max(0, nativeResistance * (1 - progress) + chaos);
            const exchange = culturalExchange * Math.sin(progress * Math.PI) + chaos;
            
            timeline.push({
                year: year,
                colonization: colonization,
                resistance: resistance,
                culturalExchange: exchange,
                population: calculatePopulation(colonization, resistance, disease)
            });
        }
        
        return {
            parameters: { tech, disease, military, cultural },
            timeline: timeline,
            outcome: determineOutcome(timeline)
        };
    }
    
    function calculatePopulation(colonization, resistance, diseaseResistance) {
        const nativePopulation = 50000000; // Tahminî başlangıç
        const diseaseMortality = 0.9 - (diseaseResistance * 0.08);
        
        return {
            native: nativePopulation * (1 - colonization * diseaseMortality),
            european: nativePopulation * colonization * 0.1
        };
    }
    
    function determineOutcome(timeline) {
        const finalState = timeline[timeline.length - 1];
        
        if (finalState.colonization > 0.8) {
            return "Tam Avrupa egemenliği";
        } else if (finalState.resistance > 0.5) {
            return "Yerli direniş başarılı";
        } else if (finalState.culturalExchange > 0.3) {
            return "Hibrit kültür oluşumu";
        } else {
            return "Parçalı kontrol";
        }
    }
    
    function visualizeScenarios() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Eksenler
        ctx.strokeStyle = '#333';
        ctx.beginPath();
        ctx.moveTo(50, canvas.height - 50);
        ctx.lineTo(canvas.width - 20, canvas.height - 50);
        ctx.moveTo(50, 20);
        ctx.lineTo(50, canvas.height - 50);
        ctx.stroke();
        
        // Senaryoları çiz
        scenarios.forEach((scenario, index) => {
            const hue = (index * 60) % 360;
            
            // Kolonizasyon
            ctx.strokeStyle = `hsl(${hue}, 70%, 50%)`;
            ctx.beginPath();
            scenario.timeline.forEach((point, i) => {
                const x = 50 + (i / scenario.timeline.length) * (canvas.width - 70);
                const y = canvas.height - 50 - point.colonization * (canvas.height - 100);
                
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
            
            // Direnç
            ctx.strokeStyle = `hsl(${hue}, 70%, 30%)`;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            scenario.timeline.forEach((point, i) => {
                const x = 50 + (i / scenario.timeline.length) * (canvas.width - 70);
                const y = canvas.height - 50 - point.resistance * (canvas.height - 100);
                
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
            ctx.setLineDash([]);
        });
        
        // Etiketler
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.fillText('1492', 50, canvas.height - 35);
        ctx.fillText('1800', canvas.width - 40, canvas.height - 35);
        ctx.save();
        ctx.translate(20, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('İlerleme', 0, 0);
        ctx.restore();
    }
    
    function displayResults(scenario) {
        resultsDiv.innerHTML = `
            <h4>Simülasyon Sonucu: ${scenario.outcome}</h4>
            <p>Parametreler: Teknoloji ${scenario.parameters.tech}, 
               Hastalık Direnci ${scenario.parameters.disease}, 
               Askeri Güç ${scenario.parameters.military}, 
               Kültürel Adaptasyon ${scenario.parameters.cultural}</p>
            <p>Final Nüfus: Yerli ${Math.round(scenario.timeline[scenario.timeline.length-1].population.native).toLocaleString()}, 
               Avrupalı ${Math.round(scenario.timeline[scenario.timeline.length-1].population.european).toLocaleString()}</p>
        `;
    }
}

// Yayılma dinamiği simülasyonu
function initSpreadSimulation() {
    const canvas = document.getElementById('spreadCanvas');
    const ctx = canvas.getContext('2d');
    
    const width = 800;
    const height = 600;
    const cellSize = 4;
    const cols = width / cellSize;
    const rows = height / cellSize;
    
    let grid = [];
    let nextGrid = [];
    let isRunning = false;
    let spreadRate = 1;
    let resistanceFactor = 0.5;
    
    // Grid'i başlat
    function initGrid() {
        grid = [];
        nextGrid = [];
        
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            nextGrid[i] = [];
            for (let j = 0; j < cols; j++) {
                grid[i][j] = 0; // 0: boş, 1: yerli, 2: Avrupalı etki
                nextGrid[i][j] = 0;
                
                // Başlangıç yerleşimi
                if (Math.random() < 0.3) {
                    grid[i][j] = 1; // Yerli nüfus
                }
            }
        }
        
        // Başlangıç noktaları (Avrupalı etki)
        grid[Math.floor(rows/2)][10] = 2; // Doğu kıyısı
        grid[Math.floor(rows/3)][10] = 2;
        grid[Math.floor(2*rows/3)][10] = 2;
    }
    
    // Yayılma kuralları
    function updateGrid() {
        for (let i = 1; i < rows - 1; i++) {
            for (let j = 1; j < cols - 1; j++) {
                const current = grid[i][j];
                let europeanNeighbors = 0;
                let nativeNeighbors = 0;
                
                // Komşuları say
                for (let di = -1; di <= 1; di++) {
                    for (let dj = -1; dj <= 1; dj++) {
                        if (di === 0 && dj === 0) continue;
                        
                        const neighbor = grid[i + di][j + dj];
                        if (neighbor === 2) europeanNeighbors++;
                        else if (neighbor === 1) nativeNeighbors++;
                    }
                }
                
                // Kuralları uygula
                if (current === 0) {
                    // Boş alan
                    if (europeanNeighbors > 0 && Math.random() < spreadRate * 0.1) {
                        nextGrid[i][j] = 2;
                    }
                } else if (current === 1) {
                    // Yerli nüfus
                    if (europeanNeighbors > 2 && Math.random() > resistanceFactor) {
                        nextGrid[i][j] = 2;
                    } else {
                        nextGrid[i][j] = 1;
                    }
                } else if (current === 2) {
                    // Avrupalı etki
                    nextGrid[i][j] = 2;
                    
                    // Kaotik faktörler - hastalık, çatışma, vb.
                    if (Math.random() < 0.01) {
                        nextGrid[i][j] = 0;
                    }
                }
            }
        }
        
        // Grid'leri değiştir
        [grid, nextGrid] = [nextGrid, grid];
    }
    
    // Görselleştirme
    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const value = grid[i][j];
                
                if (value === 1) {
                    ctx.fillStyle = '#4ecdc4'; // Yerli - turkuaz
                } else if (value === 2) {
                    ctx.fillStyle = '#ff6b6b'; // Avrupalı - kırmızı
                } else {
                    ctx.fillStyle = '#f0f0f0'; // Boş - açık gri
                }
                
                ctx.fillRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
            }
        }
        
        // İstatistikler
        let nativeCount = 0;
        let europeanCount = 0;
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j] === 1) nativeCount++;
                else if (grid[i][j] === 2) europeanCount++;
            }
        }
        
        // İstatistik çubuğu
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, height - 40, width, 40);
        
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.fillText(`Yerli Nüfus: ${nativeCount}`, 10, height - 20);
        ctx.fillText(`Avrupalı Etki: ${europeanCount}`, 150, height - 20);
        ctx.fillText(`Toplam Hücre: ${rows * cols}`, 300, height - 20);
    }
    
    // Animasyon döngüsü
    function animate() {
        if (isRunning) {
            updateGrid();
            drawGrid();
        }
        
        animationFrames.spread = requestAnimationFrame(animate);
    }
    
    // Kontroller
    document.getElementById('spreadRate').addEventListener('input', (e) => {
        spreadRate = parseFloat(e.target.value);
    });
    
    document.getElementById('resistanceFactor').addEventListener('input', (e) => {
        resistanceFactor = parseFloat(e.target.value);
    });
    
    document.getElementById('startSpread').addEventListener('click', () => {
        isRunning = true;
    });
    
    document.getElementById('pauseSpread').addEventListener('click', () => {
        isRunning = false;
    });
    
    document.getElementById('resetSpread').addEventListener('click', () => {
        isRunning = false;
        initGrid();
        drawGrid();
    });
    
    // Başlat
    initGrid();
    drawGrid();
    animate();
}

// Ekonomik kaos modeli
function initEconomicChaos() {
    const canvas = document.getElementById('economicChaosCanvas');
    const ctx = canvas.getContext('2d');
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Ekonomik değişkenler
    let time = 0;
    let goldSupply = 1000;
    let priceLevel = 100;
    let tradeBalance = 0;
    let economicActivity = 1;
    
    // Zaman serileri
    const goldHistory = [];
    const priceHistory = [];
    const tradeHistory = [];
    
    const maxHistory = 200;
    
    function updateEconomy() {
        time++;
        
        // Altın akışı (Amerika'dan)
        const goldInflow = 50 * Math.sin(time * 0.05) + 30 + Math.random() * 20;
        goldSupply += goldInflow;
        
        // Enflasyon - altın miktarına bağlı
        const inflationPressure = goldSupply / 1000;
        const inflation = inflationPressure * 0.02 + (Math.random() - 0.5) * 0.01;
        priceLevel *= (1 + inflation);
        
        // Ticaret dengesi - kaotik davranış
        const tradeNoise = Math.sin(time * 0.1) * Math.cos(time * 0.07) * 50;
        tradeBalance = -goldInflow * 0.5 + economicActivity * 20 + tradeNoise;
        
        // Ekonomik aktivite - geri besleme döngüsü
        economicActivity = economicActivity * 0.98 + (goldSupply / 10000) + (Math.random() - 0.5) * 0.1;
        economicActivity = Math.max(0.1, Math.min(2, economicActivity));
        
        // Tarihe ekle
        goldHistory.push(goldSupply);
        priceHistory.push(priceLevel);
        tradeHistory.push(tradeBalance);
        
        // Maksimum uzunluğu koru
        if (goldHistory.length > maxHistory) goldHistory.shift();
        if (priceHistory.length > maxHistory) priceHistory.shift();
        if (tradeHistory.length > maxHistory) tradeHistory.shift();
        
        // İstatistikleri güncelle
        document.getElementById('inflationRate').textContent = (inflation * 100).toFixed(2) + '%';
        document.getElementById('goldReserve').textContent = Math.round(goldSupply);
        document.getElementById('tradeBalance').textContent = tradeBalance > 0 ? '+' + Math.round(tradeBalance) : Math.round(tradeBalance);
    }
    
    function drawChart() {
        ctx.clearRect(0, 0, width, height);
        
        // Arka plan
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, width, height);
        
        // Grid çizgileri
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= 10; i++) {
            const y = (height / 10) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Veri çizgileri
        const datasets = [
            { data: goldHistory, color: '#ffd700', label: 'Altın Rezervi', scale: 0.1 },
            { data: priceHistory, color: '#ff6b6b', label: 'Fiyat Seviyesi', scale: 1 },
            { data: tradeHistory, color: '#4ecdc4', label: 'Ticaret Dengesi', scale: 1, offset: height/2 }
        ];
        
        datasets.forEach(dataset => {
            if (dataset.data.length < 2) return;
            
            ctx.strokeStyle = dataset.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            dataset.data.forEach((value, i) => {
                const x = (i / maxHistory) * width;
                const y = height - (value * dataset.scale + (dataset.offset || 0));
                
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            
            ctx.stroke();
        });
        
        // Etiketler
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.fillText('Zaman →', width - 50, height - 10);
        
        // Lejant
        const legendY = 20;
        datasets.forEach((dataset, i) => {
            ctx.fillStyle = dataset.color;
            ctx.fillRect(10, legendY + i * 20, 15, 15);
            ctx.fillStyle = '#333';
            ctx.fillText(dataset.label, 30, legendY + i * 20 + 12);
        });
        
        // Kaos göstergesi
        const chaosLevel = Math.abs(tradeHistory[tradeHistory.length - 1] - tradeHistory[tradeHistory.length - 2] || 0);
        ctx.fillStyle = chaosLevel > 30 ? '#ff6b6b' : '#4ecdc4';
        ctx.fillRect(width - 100, 20, 80, 30);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.fillText('Kaos: ' + (chaosLevel > 30 ? 'Yüksek' : 'Düşük'), width - 95, 40);
    }
    
    function animate() {
        updateEconomy();
        drawChart();
        
        animationFrames.economic = requestAnimationFrame(animate);
    }
    
    animate();
}

// Scroll efektleri
function initScrollEffects() {
    const sections = document.querySelectorAll('.content-section');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Animasyonları ekle
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
    timelineItems.forEach(item => observer.observe(item));
    
    // Parallax efekti
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroCanvas = document.getElementById('heroCanvas');
        
        if (heroCanvas) {
            heroCanvas.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Navigasyon
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Aktif bölüm vurgulama
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });
}

// Temizleme fonksiyonu
window.addEventListener('beforeunload', () => {
    // Tüm animasyonları durdur
    Object.values(animationFrames).forEach(frame => {
        if (frame) cancelAnimationFrame(frame);
    });
});