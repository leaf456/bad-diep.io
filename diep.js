var canvas
var ctx
var camera = [0, 0]
var bullets = {bullets: []}
var player = {posx: 0, posy: 0, velx: 0, vely: 0, accx: 0, accy: 0, bulletcooldown: 0, mousedown: false, mousex: 0,
mousey: 0, level: 1, levelxp: 0, levelxpadd: 0, xp: 0, levelxpthreshhold: 4, levelmaxxp: 23536, health: 50, maxhealth: 50,
downhealth: 0}
var shapes = {cooldown: 50, shapes: [], cansimulate: false}
var canvassize = {x: 640, y: 360}
var levelthreshold = [4, 9, 15, 22, 38, 35, 44, 54, 64, 75, 87, 101, 113, 132, 151, 171, 192, 215, 241, 269, 299, 333, 368, 407, 450,
496, 546, 600, 659, 723, 791, 839, 889, 942, 999, 1059, 1123, 1190, 1261, 1337, 1417, 1502, 1593, 1687, 0]
function lines() {
	for (let i = 0; i < Math.ceil(canvassize.x / 23) + 1; i++) {
		ctx.fillRect((i * 23) - (player.posx % 23), 0, 1, canvassize.y)
	}
	for (let i = 0; i < Math.ceil(canvassize.y / 23) + 1; i++) {
		ctx.fillRect(0, (i * 23) - (player.posy % 23), canvassize.x, 1)
	}
}
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
	if (w < 2 * r) r = w / 2;
	if (h < 2 * r) r = h / 2;
	this.beginPath();
	this.moveTo(x+r, y);
	this.arcTo(x+w, y,   x+w, y+h, r);
	this.arcTo(x+w, y+h, x,   y+h, r);
	this.arcTo(x,   y+h, x,   y,   r);
	this.arcTo(x,   y,   x+w, y,   r);
	this.closePath();
	return this;
}
function healthbar(x, y, w, health, maxhealth) {
	let oldlinewidth = ctx.lineWidth
	ctx.beginPath();
	ctx.fillStyle = "#555555"
	ctx.lineWidth = 1
	ctx.strokeStyle = "#686868"
	ctx.roundRect(x, y, w, 6, 4).fill()
	
	ctx.fillStyle = "#85E37D"
	ctx.lineWidth = 0
	ctx.roundRect(x + 1, y + 1, (health / maxhealth) * (w - 2), 4, 4).fill()
	ctx.stroke()
	ctx.lineWidth = oldlinewidth
}
shapes.render = function() {
	for (let i in shapes.shapes) {
		if (shapes.shapes[i].posx + 50 > camera[0] && shapes.shapes[i].posx < camera[0] + canvassize.x) {
			if (shapes.shapes[i].posy + 65 > camera[1] && shapes.shapes[i].posy < camera[1] + canvassize.y) {
				if (shapes.shapes[i].shape == "tri") {
					ctx.beginPath();
					ctx.fillStyle = "#FC7677"
					ctx.strokeStyle = "#BD5859"
					let parone = rotatearoundpoint(0, 36, shapes.shapes[i].rotation, 18, 18)
					let partwo = rotatearoundpoint(18, 0, shapes.shapes[i].rotation, 18, 18)
					let parthree = rotatearoundpoint(36, 36, shapes.shapes[i].rotation, 18, 18)
					ctx.moveTo(parone[0] - camera[0] + shapes.shapes[i].posx, parone[1] - camera[1] + shapes.shapes[i].posy);
					ctx.lineTo(partwo[0] - camera[0] + shapes.shapes[i].posx, partwo[1] - camera[1] + shapes.shapes[i].posy);
					ctx.lineTo(parthree[0] - camera[0] + shapes.shapes[i].posx, parthree[1] - camera[1] + shapes.shapes[i].posy);
					ctx.lineTo(parone[0] - camera[0] + shapes.shapes[i].posx, parone[1] - camera[1] + shapes.shapes[i].posy);
					ctx.fill();
					ctx.stroke()
				}
				if (shapes.shapes[i].shape == "square") {
					ctx.beginPath();
					ctx.fillStyle = "#FFE869"
					ctx.strokeStyle = "#BFAE4E"
					let parone = rotatearoundpoint(0, 36, shapes.shapes[i].rotation, 18, 18)
					let partwo = rotatearoundpoint(0, 0, shapes.shapes[i].rotation, 18, 18)
					let parthree = rotatearoundpoint(36, 0, shapes.shapes[i].rotation, 18, 18)
					let parfour = rotatearoundpoint(36, 36, shapes.shapes[i].rotation, 18, 18)
					ctx.moveTo(parone[0] - camera[0] + shapes.shapes[i].posx, parone[1] - camera[1] + shapes.shapes[i].posy);
					ctx.lineTo(partwo[0] - camera[0] + shapes.shapes[i].posx, partwo[1] - camera[1] + shapes.shapes[i].posy);
					ctx.lineTo(parthree[0] - camera[0] + shapes.shapes[i].posx, parthree[1] - camera[1] + shapes.shapes[i].posy);
					ctx.lineTo(parfour[0] - camera[0] + shapes.shapes[i].posx, parfour[1] - camera[1] + shapes.shapes[i].posy);
					ctx.lineTo(parone[0] - camera[0] + shapes.shapes[i].posx, parone[1] - camera[1] + shapes.shapes[i].posy);
					ctx.fill();
					ctx.stroke()
				}
				if (shapes.shapes[i].shape == "pentagon") {
					ctx.beginPath()
					ctx.fillStyle = "#768DFC"
					ctx.strokeStyle = "#5869BD"
					let parone = rotatearoundpoint(25, 0, shapes.shapes[i].rotation, 25, 25)
					let partwo = rotatearoundpoint(0, 20, shapes.shapes[i].rotation, 25, 25)
					let parthree = rotatearoundpoint(10, 50, shapes.shapes[i].rotation, 25, 25)
					let parfour = rotatearoundpoint(40, 50, shapes.shapes[i].rotation, 25, 25)
					let parfive = rotatearoundpoint(50, 20, shapes.shapes[i].rotation, 25, 25)
					ctx.moveTo(parone[0] - camera[0] + shapes.shapes[i].posx, parone[1] - camera[1] + shapes.shapes[i].posy)
					ctx.lineTo(partwo[0] - camera[0] + shapes.shapes[i].posx, partwo[1] - camera[1] + shapes.shapes[i].posy)
					ctx.lineTo(parthree[0] - camera[0] + shapes.shapes[i].posx, parthree[1] - camera[1] + shapes.shapes[i].posy)
					ctx.lineTo(parfour[0] - camera[0] + shapes.shapes[i].posx, parfour[1] - camera[1] + shapes.shapes[i].posy)
					ctx.lineTo(parfive[0] - camera[0] + shapes.shapes[i].posx, parfive[1] - camera[1] + shapes.shapes[i].posy)
					ctx.lineTo(parone[0] - camera[0] + shapes.shapes[i].posx, parone[1] - camera[1] + shapes.shapes[i].posy)
					ctx.fill()
					ctx.stroke()
				}
				if (shapes.shapes[i].life != shapes.shapes[i].originallife) {
					let pars = [45, 36]
					if (shapes.shapes[i].shape == "pentagon") {
						pars[0] = 60
						pars[1] = 50
					}
					healthbar(shapes.shapes[i].posx - camera[0], shapes.shapes[i].posy - camera[1] + pars[0], pars[1], shapes.shapes[i].life, shapes.shapes[i].originallife)
				}
			}
		}
	}
}
shapes.addrandom = function() {
	let ran = Math.random() * 10
	let shape = "tri"
	let li = 2
	if (ran < 2) {
		shape = "tri"
		li = 5
	} else {
		if (ran < 8) {
			shape = "square"
			li = 2
		} else {
			if (ran < 10) {
				shape = "pentagon"
				li = 20
			}
		}
	}
	shapes.add((Math.random() * 10000) - 5000, (Math.random() * 10000) - 5000, shape, (Math.random() * 0.5) - 0.25, (Math.random() * 0.5) - 0.25, li)
}
player.addxp = function(amount) {
	player.levelxpadd += amount
}
shapes.physics = function() {
	for (let i in shapes.shapes) {
		if ((shapes.shapes[i].posx + 55 > camera[0] && shapes.shapes[i].posx < camera[0] + canvassize.x) || shapes.cansimulate) {
			if ((shapes.shapes[i].posy + 55 > camera[1] && shapes.shapes[i].posy - 5 < camera[1] + canvassize.y) || shapes.cansimulate) {
				shapes.shapes[i].posx += shapes.shapes[i].velx / 2
				shapes.shapes[i].posy += shapes.shapes[i].vely / 2
				shapes.shapes[i].velx += ((Math.random() * 0.01) - 0.005)
				shapes.shapes[i].velx = Math.min(shapes.shapes[i].velx + 0.25, 0.5) - 0.25
				shapes.shapes[i].vely += ((Math.random() * 0.01) - 0.005)
				shapes.shapes[i].vely = Math.min(shapes.shapes[i].vely + 0.25, 0.5) - 0.25
				shapes.shapes[i].posx += shapes.shapes[i].accx
				shapes.shapes[i].posy += shapes.shapes[i].accy
				shapes.shapes[i].accx /= 1.1
				shapes.shapes[i].accy /= 1.1
				shapes.shapes[i].rotation += shapes.shapes[i].rotvel
				shapes.shapes[i].rotvel += ((Math.random() * 0.01) - 0.005)
				shapes.shapes[i].rotvel = Math.min(shapes.shapes[i].rotvel + 0.25, 0.5) - 0.25
				let col = shapes.checkcollisions(shapes.shapes[i].posx, shapes.shapes[i].posy, 36, 36, i)
				if (col[0]) {
					shapes.shapes[i].accx = shapes.shapes[col[1]].velx * 15
					shapes.shapes[i].accy = shapes.shapes[col[1]].accx * 15
					shapes.shapes[col[1]].accx = shapes.shapes[i].velx * 15
					shapes.shapes[col[1]].accy = shapes.shapes[i].vely * 15
				}
				if (shapes.shapes[i].downtime != 0) {
					shapes.shapes[i].life -= 0.5
					shapes.shapes[i].downtime -= 1
					if (shapes.shapes[i].life < 1) {
						let pointstoadd = 10
						if (shapes.shapes[i].shape == "square") {pointstoadd = 10}
						if (shapes.shapes[i].shape == "tri") {pointstoadd = 25}
						if (shapes.shapes[i].shape == "pentagon") {pointstoadd = 130}
						player.addxp(pointstoadd)
						shapes.shapes.splice(i, 1)
					}
				}
			}
		}
	}
}
shapes.tick = function() {
	if (shapes.cooldown != 0) {
		shapes.cooldown -= 1
	} else {
		shapes.addrandom()
		shapes.cooldown = 200
	}
	shapes.physics()
}
shapes.add = function(x, y, s, vx, vy, l) {
	shapes.shapes.push({posx: x, posy: y, velx: vx, vely: vy, shape: s, life: l, originallife: l, downtime: 0, accx: 0, accy: 0, rotation: Math.random() * 361, rotvel: Math.random() * 0.2})
}
bullets.add = function(x, y, vx, vy) {
	bullets.bullets.push({posx: x, posy: y, velx: vx, vely: vy, life: 150})
}
bullets.render = function() {
	for (let i in bullets.bullets) {
		ctx.beginPath()
		
		ctx.fillStyle = "#00B2E1"
		ctx.strokeStyle = "#0085A8"
		ctx.arc(bullets.bullets[i].posx - camera[0], bullets.bullets[i].posy - camera[1], 10, 0, Math.PI * 2);
		ctx.fill();
		
		ctx.stroke()
	}
}
function aabb(a1, a2, a3, a4, b1, b2, b3, b4) {
	if (a1 < b1 + b3 && a1 + a3 > b1 && a2 < b2 + b4 && a4 + a2 > b2) {
		return true
	} else {
		return false
	}
}

shapes.checkcollisions = function(x, y, w, h, id) {
	var hascollision = false
	var collisionid = -1
	for (let i in shapes.shapes) {
		let size = 36
		if (shapes.shapes[i].shape == "pentagon") {size = 50}
		if (aabb(x, y, w, h, shapes.shapes[i].posx, shapes.shapes[i].posy, size, size)) {
			if (id != null) {
				if (i != id) {
					hascollision = true
					collisionid = i
				}
			} else {
				hascollision = true
				collisionid = i
			}
			
		}
	}
	return [hascollision, collisionid]
}
bullets.physics = function() {
	for (let i in bullets.bullets) {
		bullets.bullets[i].posx += bullets.bullets[i].velx
		bullets.bullets[i].posy += bullets.bullets[i].vely
		var col = shapes.checkcollisions(bullets.bullets[i].posx, bullets.bullets[i].posy, 20, 20)
		if (col[0]) {
			shapes.shapes[col[1]].downtime = 2
			shapes.shapes[col[1]].accx = bullets.bullets[i].velx / 5
			shapes.shapes[col[1]].accy = bullets.bullets[i].vely / 5
			bullets.bullets[i].life -= 300
		}
		bullets.bullets[i].life -= 1
	}
	for (let i in bullets.bullets) {
		if (bullets.bullets[i].life < 1) {
			bullets.bullets.splice(i, 1)
		}
	}
}
player.death = function() {
	player.health = 50
	player.level = 1
	player.posx = 0
	player.posy = 0
	player.levelxpadd = 0
	player.levelxp = 0
}
function rotrect(x, y, w, h, a, ox, oy) {
	let parzero = rotatearoundpoint(x, y, a, ox, oy)
	ctx.moveTo(parzero[0], parzero[1])
	let parone = rotatearoundpoint(x + w, y, a, ox, oy)
	ctx.lineTo(parone[0], parone[1])
	let partwo = rotatearoundpoint(x + w, y + h, a, ox, oy)
	ctx.lineTo(partwo[0], partwo[1])
	let parthree = rotatearoundpoint(x, y + h, a, ox, oy)
	ctx.lineTo(parthree[0], parthree[1])
	ctx.lineTo(parzero[0], parzero[1])
	ctx.fill()
	ctx.stroke()
	ctx.beginPath()
}
function render() {
	camera[0] = player.posx - canvassize.x / 2
	camera[1] = player.posy - canvassize.y / 2
	ctx.clearRect(0, 0, canvassize.x, canvassize.y)
	
	ctx.beginPath()
	ctx.lineWidth = 3
	
	ctx.fillStyle = "#D8D8D8"
	ctx.fillRect(0, 0, canvassize.x, canvassize.y)
	ctx.fillStyle = "#C6C6C6"
	lines()
	ctx.stroke()
	bullets.render()
	ctx.beginPath()
	ctx.fillStyle = "#9F9F9F"
	ctx.strokeStyle = "#6D6D6D"
	let cannonpars = [player.posx - camera[0], player.posy - camera[1], 22, 30]
	let angle = tpangle(canvassize.x / 2, canvassize.y / 2, player.mousex, player.mousey)
	rotrect(cannonpars[0] - cannonpars[2] / 2, cannonpars[1] - cannonpars[3] * 1.6, cannonpars[2], cannonpars[3], angle + 90, canvassize.x / 2, canvassize.y / 2)
	ctx.fillStyle = "#00B2E1"
	ctx.strokeStyle = "#0085A8"
	ctx.arc(player.posx - camera[0], player.posy - camera[1], 25, 0, Math.PI * 2);
	ctx.fill();
	//level information
	ctx.stroke()
	shapes.render()
	ctx.beginPath()
	ctx.fillStyle = "#000000"
	ctx.font = "40px Ubuntu"
	ctx.fillText("Developer", (canvassize.x / 2) - 105, canvassize.y - 70)
	ctx.lineWidth = 1
	ctx.fillStyle = "#000000AA"
	ctx.strokeStyle = "#000000AA"
	ctx.roundRect((canvassize.x / 2) - (286 / 2), canvassize.y - 32, 286, 16, 17).fill()
	ctx.fillStyle = "#E1D482"
	ctx.roundRect((canvassize.x / 2) - (286 / 2) + 2, canvassize.y - 30, Math.min(Math.max((player.levelxp / player.levelxpthreshhold) * 282, 15), 284), 12, 17).fill()
	ctx.fillStyle = "#FFFFFF"
	ctx.font = "12px Ubuntu"
	ctx.lineWidth = 1
	ctx.fillText("Lvl " + player.level + " Tank", (canvassize.x / 2) - 28, canvassize.y - 20)
	ctx.fillStyle = "#000000AA"
	ctx.strokeStyle = "#000000AA"
	ctx.roundRect((canvassize.x / 2) - (220 / 2), canvassize.y - 48, 220, 14, 17).fill()
	ctx.fillStyle = "#6CF0A3"
	ctx.roundRect((canvassize.x / 2) - (220 / 2) + 1, canvassize.y - 46, Math.max((player.xp / player.levelmaxxp) * 218, 15), 10, 17).fill()
	ctx.fillStyle = "#FFFFFF"
	ctx.fillText("Score: " + Math.floor(player.xp), (canvassize.x / 2) - 25, canvassize.y - 38)
	
	ctx.stroke()
	if (player.health != player.maxhealth) {
		healthbar(canvassize.x / 2 - 25, canvassize.y / 2 + 40, 50, player.health, player.maxhealth)
	}
}
function distance(x, y) { return Math.sqrt(x * x + y * y)}
function tpangle(x1, y1, x2, y2) {
	var dx = x2 - x1
	var dy = y2 - y1
	var ang = Math.atan2(dy, dx) * 180 / Math.PI;
	return ang
}
function rotatearoundpoint(x, y, angle, ox, oy) {
	let a = angle * (Math.PI / 180)
	let newx = (x - ox) * Math.cos(a) - (y - oy) * Math.sin(a)
	let newy = (x - ox) * Math.sin(a) + (y - oy) * Math.cos(a)
	return [newx + ox, newy + oy]
}
function physics() {
	var col = shapes.checkcollisions(player.posx - 25, player.posy - 25, 50, 50)
	if (col[0]) {
		shapes.shapes[col[1]].downtime = 4
		shapes.shapes[col[1]].accx = (player.velx * 2) + (0 - shapes.shapes[col[1]].velx * 5)
		shapes.shapes[col[1]].accy = (player.vely * 2) + (0 - shapes.shapes[col[1]].vely * 5)
		player.accx /= 2
		player.accy /= 2
		let damage = 0
		if (shapes.shapes[col[1]].shape == "square") {
			damage = (50 / 16) / 2
		}
		if (shapes.shapes[col[1]].shape == "tri") {
			damage = (50 / 8) / 5
		}
		if (shapes.shapes[col[1]].shape == "pentagon") {
			damage = 2.5
		}
		player.downhealth += damage
	}
	if (keyjs.keysdown.includes("a")) {
		player.accx -= 0.08
	}
	if (keyjs.keysdown.includes("d")) {
		player.accx += 0.08
	}
	if (keyjs.keysdown.includes("w")) {
		player.accy -= 0.08
	}
	if (keyjs.keysdown.includes("s")) {
		player.accy += 0.08
	}
	player.posx += player.velx
	player.posy += player.vely
	player.velx += player.accx
	player.vely += player.accy
	player.velx /= 1.4
	player.vely /= 1.4
	player.accx /= 1.05
	player.accy /= 1.05
	if (player.bulletcooldown != 0) {
		player.bulletcooldown -= 1
	} else {
		if (keyjs.keysdown.includes(" ") || player.mousedown) {
			let dist = distance(player.mousex - canvassize.x / 2, player.mousey - canvassize.y / 2)
			let speed = 6.2
			bullets.add(player.posx, player.posy, ((player.mousex - canvassize.x / 2) / dist) * speed, ((player.mousey - canvassize.y / 2) / dist) * speed)
			player.bulletcooldown = 40
		}
	}
}
function tick() {
	physics()
	render()
	shapes.tick()
	bullets.physics()
	if (keyjs.keysdown.includes(";")) {
		player.addxp(levelthreshold[player.level - 1] / 5)
	}
	if (player.levelxpadd != 0) {
		player.levelxp += player.levelxpadd / 8
		player.xp += player.levelxpadd / 8
		player.levelxpadd -= player.levelxpadd / 8
		//console.log(levelthreshold[player.level - 1])
		if (player.xp > player.levelmaxxp) {
			player.xp = player.levelmaxxp
		}
		if (player.level == 45) {
			player.levelxp = player.levelxpthreshhold
		}
		if (player.levelxp > player.levelxpthreshhold) {
				if (levelthreshold[player.level - 1] != null) {
					player.levelxpthreshhold = levelthreshold[player.level - 1]
				}
				player.level += 1
				player.levelxp = player.levelxpthreshhold - player.levelxp
		}
	}
	if (player.downhealth != 0) {
		player.health -= player.downhealth / 8
		player.downhealth -= player.downhealth / 8
		if (player.health <= 0) {
			player.downhealth = 0
			player.death()
		}
	}
	if (player.health < 50) {
		player.health += 0.005
	}
	if (window.innerWidth != canvassize.x || window.innerHeight != canvassize.y) {
		canvassize.x = window.innerWidth
		canvassize.y = window.innerHeight
		canvas.width = canvassize.x
		canvas.height = canvassize.y
	}
	window.requestAnimationFrame(tick)
}
function start() {
	canvas = document.getElementById("Canvas")
	ctx = canvas.getContext('2d');
	for (let i = 0; i < 1500; i++) {
		shapes.addrandom()
	}
	shapes.cansimulate = true
	shapes.physics()
	shapes.cansimulate = false
	tick()
}
window.addEventListener("mousedown", function(e) {
	player.mousedown = true
})
window.addEventListener("mouseup", function(e) {
	player.mousedown = false
})
window.addEventListener("mousemove", function(e) {
	player.mousex = e.clientX
	player.mousey = e.clientY
})
