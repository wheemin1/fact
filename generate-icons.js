const fs = require('fs');
const { createCanvas } = require('canvas');

function generateIcon(size, filename) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // 배경 그라디언트
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#EAB308');
    gradient.addColorStop(0.5, '#8B5CF6');
    gradient.addColorStop(1, '#EC4899');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // 텍스트 "FF"
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.3}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('FF', size/2, size/2);
    
    // 작은 원 장식
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(size * 0.8, size * 0.2, size * 0.08, 0, 2 * Math.PI);
    ctx.fill();
    
    // PNG로 저장
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`public/${filename}`, buffer);
    console.log(`Generated ${filename} (${size}x${size})`);
}

// 아이콘 생성
try {
    generateIcon(192, 'icon-192.png');
    generateIcon(512, 'icon-512.png');
    console.log('Icons generated successfully!');
} catch (error) {
    console.error('Error generating icons:', error.message);
    console.log('Canvas package might not be installed. Using fallback method...');
    
    // fallback: SVG 기반 간단한 아이콘 생성
    const svg192 = `<svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#EAB308;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#8B5CF6;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#EC4899;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="192" height="192" fill="url(#grad)"/>
        <text x="96" y="96" font-family="Arial" font-size="58" font-weight="bold" text-anchor="middle" dy="0.35em" fill="white">FF</text>
        <circle cx="154" cy="38" r="15" fill="rgba(255,255,255,0.7)"/>
    </svg>`;
    
    const svg512 = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#EAB308;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#8B5CF6;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#EC4899;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="512" height="512" fill="url(#grad)"/>
        <text x="256" y="256" font-family="Arial" font-size="154" font-weight="bold" text-anchor="middle" dy="0.35em" fill="white">FF</text>
        <circle cx="410" cy="102" r="41" fill="rgba(255,255,255,0.7)"/>
    </svg>`;
    
    fs.writeFileSync('public/icon-192.svg', svg192);
    fs.writeFileSync('public/icon-512.svg', svg512);
    console.log('SVG icons generated as fallback!');
}
