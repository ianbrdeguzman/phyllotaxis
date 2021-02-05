//Reference from http://algorithmicbotany.org/papers/abop/abop-ch4.pdf

// HTML DOM elements
const canvas = document.querySelector('canvas');
const inputs = document.querySelectorAll('input');
const select = document.getElementById('select');
const buttons = document.querySelectorAll('button')

// variable for creating flower
let orderingNumber = 0;
let scalingParameter = 10;
let radius = 1;
let flowerType = 2.3998277;
let strokeColor = '#000000';
let fillColor = '#000000';
let stop = false;

// create 2d canvas
const ctx = canvas.getContext('2d');

// animate function
const animate = () => { 
    drawFlower();
    
    // if stop is true stop animation
    if(stop) return;

    // recurrsion loop
    requestAnimationFrame(animate);
};

// draw flower function
const drawFlower = () => {
    // 137.5 degrees (Golden Ratio / Fibonacci Angle) = 2.3998277 radians
    // 137.3 degrees = 2.3963371 radians
    // 137.6 degrees = 2.4015731 radians
    let divergenceAngle = orderingNumber * flowerType; 
    let flowerRadius = scalingParameter * Math.sqrt(orderingNumber);
    let x = flowerRadius * Math.sin(divergenceAngle) + canvas.width / 2;
    let y = flowerRadius * Math.cos(divergenceAngle) + canvas.height / 2;

    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // assign true value to stop animation
    if (x + (radius * 2) > canvas.width || y + (radius * 2) > canvas.height) {
        stop = true;
    }

    orderingNumber++;
}

// download function
const download = () => {
	const imgURL = canvas.toDataURL('image/png');
	const a = document.createElement('a');
	document.body.appendChild(a);
	a.href = imgURL;
	a.download = 'flower.png';
	a.click();
	document.body.removeChild(a);
};

// print function
const print = () => {
    const imgURL = canvas.toDataURL('image/png');
	const myCanvas = `
				<html>
				<head>
				    <title>My Canvas</title>
				</head>
				<body>
				    <img src="${imgURL}">
				</body>
				</html>
			    `
	const win = window.open();

	win.document.write(myCanvas);
	win.document.addEventListener('load', () => {
	win.focus();
	win.print();
	win.document.close();
	win.close();  
	}, true);
}

// input event listeners
inputs.forEach( (input) => {
    input.addEventListener('input', (e) => {
        if (e.target.id === 'radius') {
            radius = e.target.value;
        }

        if (e.target.id === 'color-stroke') {
            strokeColor = e.target.value;
        }

        if (e.target.id === 'color-fill') {
            fillColor = e.target.value;
        }
    })
})

// select option event listener
select.addEventListener('change', (e) => {
    flowerType = select.value;
    console.log(flowerType);
})

// button event listeners
buttons.forEach( (button) => {
    button.addEventListener('click', (e) => {
        if (e.target.id === 'play') {
            animate();
            button.remove();
        }

        if (e.target.id === 'download') {
            download();
        }

        if (e.target.id === 'print') {
            print();
        }

        if (e.target.id === 'refresh') {
            location.reload();
        }
    })
})

// resize canvas function
const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

window.addEventListener('resize', () => {
    resizeCanvas();
    location.reload();
})
resizeCanvas();