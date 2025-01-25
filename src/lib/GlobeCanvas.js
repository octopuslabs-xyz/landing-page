// ts-ignore
class Dot {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = '#f79800ff'

        this.xProject = 0;
        this.yProject = 0;
        this.sizeProjection = 0;
    }

    // this.dots[i].draw(sineRotation, cosineRotation, this.ctx, this.DOT_RADIUS, this.GLOBE_CENTER_Z, this.FIELD_OF_VIEW, this.PROJECTION_CENTER_X, this.PROJECTION_CENTER_Y);

    // Project the 3D coordinates onto 2D canvas space
    project(sin, cos, GLOBE_CENTER_Z, FIELD_OF_VIEW, PROJECTION_CENTER_X, PROJECTION_CENTER_Y) {
        const rotX = cos * this.x + sin * (this.z - GLOBE_CENTER_Z);
        const rotZ = -sin * this.x + cos * (this.z - GLOBE_CENTER_Z) + GLOBE_CENTER_Z;
        this.sizeProjection = FIELD_OF_VIEW / (FIELD_OF_VIEW - rotZ);
        this.xProject = (rotX * this.sizeProjection) + PROJECTION_CENTER_X;
        this.yProject = (this.y * this.sizeProjection) + PROJECTION_CENTER_Y;
    }

    // Draw the dot on the canvas
    draw(sin, cos, ctx, DOT_RADIUS, GLOBE_CENTER_Z, FIELD_OF_VIEW, PROJECTION_CENTER_X, PROJECTION_CENTER_Y) {
        // Now, pass sin, cos, and other necessary parameters to project
        this.project(sin, cos, GLOBE_CENTER_Z, FIELD_OF_VIEW, PROJECTION_CENTER_X, PROJECTION_CENTER_Y);

        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.xProject, this.yProject, DOT_RADIUS * this.sizeProjection, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

export default class GlobeCanvas {
    constructor(canvas, DOTS_AMOUNT = 3000, DOT_RADIUS = 2) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.DOTS_AMOUNT = DOTS_AMOUNT;
        this.DOT_RADIUS = DOT_RADIUS;
        this.dots = [];
        this.rotation = 0;
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;

        this.adjustCanvas();

        // Globe-related constants
        this.onResize()

        // Resize handling
        addEventListener('resize', this.onResize.bind(this));
        this.resizeTimeout = null;

        this.createDots();
        requestAnimationFrame(this.render.bind(this));
    }

    // Adjust canvas size and scaling
    adjustCanvas() {
        this.canvas.width = window.innerWidth; // Ensure full screen width
        this.canvas.height = window.innerHeight; // Ensure full screen height

        if (window.devicePixelRatio > 1) {
            this.canvas.width = window.innerWidth * 2;
            this.canvas.height = window.innerHeight * 2;
            this.ctx.scale(2, 2);
        }
    }

    // Create the dots for the globe
    createDots() {
        this.dots.length = 0; // Empty the array
        for (let i = 0; i < this.DOTS_AMOUNT; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos((Math.random() * 2) - 1);

            const x = this.GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
            const y = this.GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
            const z = (this.GLOBE_RADIUS * Math.cos(phi)) + this.GLOBE_CENTER_Z;

            this.dots.push(new Dot(x, y, z));
        }
    }

    // Render the scene
    render(a) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.rotation = a * 0.0004; // Adjust this value if necessary

        const sineRotation = Math.sin(this.rotation);
        const cosineRotation = Math.cos(this.rotation);

        // Debugging log for the rendering process
        // console.log('Rendering frame...');
        for (let i = 0; i < this.dots.length; i++) {
            // Now passing sin, cos, and projection details to the draw method
            this.dots[i].draw(sineRotation, cosineRotation, this.ctx, this.DOT_RADIUS, this.GLOBE_CENTER_Z, this.FIELD_OF_VIEW, this.PROJECTION_CENTER_X, this.PROJECTION_CENTER_Y);
        }

        requestAnimationFrame(this.render.bind(this));
    }

    // Resize handler
    afterResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.GLOBE_RADIUS = this.width * 0.3;
        this.GLOBE_CENTER_Z = -this.GLOBE_RADIUS;
        this.PROJECTION_CENTER_X = this.width / 2;
        this.PROJECTION_CENTER_Y = this.height / 2;
        this.FIELD_OF_VIEW = this.width * 0.8;

        this.adjustCanvas();
        this.createDots();
    }

    // Debounced resize event listener
    onResize() {
        this.resizeTimeout = window.clearTimeout(this.resizeTimeout);
        this.resizeTimeout = window.setTimeout(this.afterResize.bind(this), 500);
    }
}
