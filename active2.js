let blocks = [];
let lastScrollY = 0;
let blockWidth = 120; // Width of the blocks
let blockHeight = 30; // Height of the blocks
function setup() {
    createCanvas(windowWidth, windowHeight);
    // Define specific positions and orientations for each block
    const blockData = [
        { x: width * 0.4, y: height * 0.3, orientation: 'vertical'},
        { x: width * 0.37, y: height * 0.35, orientation: 'vertical' },
        { x: width * 0.34, y: height * 0.4, orientation: 'vertical' },
        { x: width * 0.45, y: height * 0.35, orientation: 'horizontal' },
        { x: width * 0.48, y: height * 0.3, orientation: 'horizontal' },
        { x: width * 0.48, y: height * 0.45, orientation: 'horizontal' },
        { x: width * 0.51, y: height * 0.35, orientation: 'horizontal' },
        { x: width * 0.54, y: height * 0.3, orientation: 'horizontal' },
    ];
    for (let i = 0; i < blockData.length; i++) {
        blocks.push({
            x: blockData[i].x,
            y: blockData[i].y,
            dx: 0,
            dy: 0,
            initialX: blockData[i].x,
            initialY: blockData[i].y,
            scrollFactor: random(0.5, 1.5),
            orientation: blockData[i].orientation
        });
    }
}
function draw() {
    clear();
    let currentScrollY = window.scrollY;
    let scrollDelta = currentScrollY - lastScrollY;
    blocks.forEach(block => {
        // Magnetic attraction
        let attractionX = (block.initialX - block.x) * 0.001; // Horizontal attraction
        let attractionY = (block.initialY - block.y) * 0.001; // Vertical attraction
        block.dx += attractionX;
        block.dy += attractionY;
        // Interaction with mouse position
        let distToMouse = dist(mouseX, mouseY, block.x, block.y);
        if (distToMouse < 600) {
            let angle = atan2(mouseY - block.y, mouseX - block.x);
            let forceMagnitude = map(distToMouse, 0, 600, 0.2, 0); // Reduced force magnitude for smoother effect
            let forceX = cos(angle) * forceMagnitude;
            let forceY = sin(angle) * forceMagnitude;
            block.dx += forceX;
            block.dy += forceY;
        }
        // Apply position changes with damping
        block.x += block.dx;
        block.y += block.dy;
        block.dx *= 0.9;
        block.dy *= 0.9;
        // Draw block with original resizing
        fill(0, 10, 10); // Constant color
        let drawWidth = block.orientation === 'horizontal' ? blockHeight : blockWidth;
        let drawHeight = block.orientation === 'horizontal' ? blockWidth : blockHeight;
        rect(block.x, block.y, drawWidth, drawHeight);
    });
    lastScrollY = currentScrollY;
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function mouseWheel(event) {
    let verticalScrollChange = event.deltaY * 0.01;
    let horizontalScrollChange;
    blocks.forEach(block => {
        horizontalScrollChange = random(-4, 4);
        block.dx += horizontalScrollChange * 0.1 * block.scrollFactor;
        block.dy += verticalScrollChange * block.scrollFactor;
    });
}
function mouseClicked() {
    blocks.forEach(block => {
        block.dx += random(-10, 10);
        block.dy += random(-10, 10);
    });
    setTimeout(() => {
        blocks.forEach(block => {
            block.dx = 0;
            block.dy = 0;
        });
    }, 3000); // Change the duration to the desired time in milliseconds
}


