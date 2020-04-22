function extend(t,i){for(var n in i)t[n]=i[n];return t}function modulo(t,i){return(t%i+i)%i}function normalizeAngle(t){return modulo(t,2*Math.PI)}function getDegrees(t){return t*(180/Math.PI)}function line(t,i,n){t.beginPath(),t.moveTo(i.x,i.y),t.lineTo(n.x,n.y),t.stroke(),t.closePath()}function Vector(t,i){this.x=t||0,this.y=i||0}function Particle(t,i){this.position=new Vector(t,i),this.previousPosition=new Vector(t,i)}function circle(t,i,n,o){t.beginPath(),t.arc(i,n,o,0,2*Math.PI),t.fill(),t.closePath()}function StickConstraint(t,i,n){if(this.particleA=t,this.particleB=i,n)this.distance=n;else{var o=Vector.subtract(t.position,i.position);this.distance=o.magnitude}this.distanceSqrd=this.distance*this.distance}function PinConstraint(t,i){this.particle=t,this.position=i}function ChainLinkConstraint(t,i,n,o){this.particleA=t,this.particleB=i,this.distance=n,this.distanceSqrd=n*n,this.shiftEase=void 0===o?.85:o}function line(t,i,n){t.beginPath(),t.moveTo(i.x,i.y),t.lineTo(n.x,n.y),t.stroke(),t.closePath()}function LinkConstraint(t,i,n){this.particleA=t,this.particleB=i,this.distance=n,this.distanceSqrd=n*n}function line(t,i,n){t.beginPath(),t.moveTo(i.x,i.y),t.lineTo(n.x,n.y),t.stroke(),t.closePath()}function Ribbon(t){extend(this,t),this.particles=[],this.constraints=[];var i=this.controlPoint.x+this.width/2,n=this.leftParticles=this.createParticles(i);i=this.controlPoint.x-this.width/2;var o=this.rightParticles=this.createParticles(i),e=new StickConstraint(n[0],o[0],this.width);this.constraints.push(e),this.controlParticle=new Particle(this.controlPoint.x,this.controlPoint.y);var s=new PinConstraint(this.controlParticle,this.controlPoint);this.constraints.push(s);var r=new LinkConstraint(this.controlParticle,n[0],this.width/2),a=new LinkConstraint(this.controlParticle,o[0],this.width/2);this.constraints.push(r),this.constraints.push(a);for(var c=1,h=n.length;c<h;c++){var p=new LinkConstraint(n[c],o[c],this.width);this.constraints.push(p)}}Vector.prototype.set=function(t){this.x=t.x,this.y=t.y},Vector.prototype.setCoords=function(t,i){this.x=t,this.y=i},Vector.prototype.add=function(t){this.x+=t.x,this.y+=t.y},Vector.prototype.subtract=function(t){this.x-=t.x,this.y-=t.y},Vector.prototype.scale=function(t){this.x*=t,this.y*=t},Vector.prototype.multiply=function(t){this.x*=t.x,this.y*=t.y},Object.defineProperty(Vector.prototype,"magnitude",{get:function(){return Math.sqrt(this.x*this.x+this.y*this.y)}}),Vector.prototype.equals=function(t){return this.x==t.x&&this.y==t.y},Vector.prototype.zero=function(){this.x=0,this.y=0},Vector.prototype.block=function(t){this.x=Math.floor(this.x/t),this.y=Math.floor(this.y/t)},Object.defineProperty(Vector.prototype,"angle",{get:function(){return normalizeAngle(Math.atan2(this.y,this.x))}}),Vector.subtract=function(t,i){return new Vector(t.x-i.x,t.y-i.y)},Vector.add=function(t,i){return new Vector(t.x+i.x,t.y+i.y)},Vector.copy=function(t){return new Vector(t.x,t.y)},Vector.isSame=function(t,i){return t.x==i.x&&t.y==i.y},Vector.getDistance=function(t,i){var n=t.x-i.x,o=t.y-i.y;return Math.sqrt(n*n+o*o)},Vector.addDistance=function(t,i,n){return new Vector(t.x+Math.cos(n)*i,t.y+Math.sin(n)*i)},Particle.prototype.update=function(t,i){var n=Vector.subtract(this.position,this.previousPosition);n.scale(t),this.previousPosition=Vector.copy(this.position),this.position.add(n),this.position.add(i)},Particle.prototype.render=function(t){t.fillStyle="hsla(0, 0%, 10%, 0.5)",circle(t,this.position.x,this.position.y,4)},StickConstraint.prototype.update=function(){var t=Vector.subtract(this.particleA.position,this.particleB.position),i=t.magnitude,n=(this.distance-i)/i*.5;t.scale(n),this.particleA.position.add(t),this.particleB.position.subtract(t)},StickConstraint.prototype.render=function(t){t.strokeStyle="hsla(200, 100%, 50%, 0.5)",t.lineWidth=2,line(t,this.particleA.position,this.particleB.position)},PinConstraint.prototype.update=function(){this.particle.position=Vector.copy(this.position)},PinConstraint.prototype.render=function(){},ChainLinkConstraint.prototype.update=function(){var t=Vector.subtract(this.particleA.position,this.particleB.position);if(!(t.x*t.x+t.y*t.y<=this.distanceSqrd)){var i=Vector.addDistance(this.particleA.position,this.distance,t.angle+Math.PI),n=Vector.subtract(i,this.particleB.position);n.scale(this.shiftEase),this.particleB.previousPosition.add(n),this.particleB.position.set(i)}},ChainLinkConstraint.prototype.render=function(t){t.strokeStyle="hsla(200, 100%, 50%, 0.5)",t.lineWidth=2,line(t,this.particleA.position,this.particleB.position)},LinkConstraint.prototype.update=function(){var t=Vector.subtract(this.particleA.position,this.particleB.position);if(!(t.x*t.x+t.y*t.y<=this.distanceSqrd)){var i=t.magnitude,n=(this.distance-i)/i*.5;t.scale(n),this.particleA.position.add(t),this.particleB.position.subtract(t)}},LinkConstraint.prototype.render=function(t){t.strokeStyle="hsla(200, 100%, 50%, 0.5)",t.lineWidth=2,line(t,this.particleA.position,this.particleB.position)},Ribbon.prototype.createParticles=function(t){for(var i=[],n=0;n<this.sections;n++){var o=new Particle(t,this.controlPoint.y+this.sectionLength*n);if(i.push(o),this.particles.push(o),n>0){var e=new ChainLinkConstraint(i[n-1],o,this.sectionLength,this.chainLinkShiftEase);this.constraints.push(e)}}return i},Ribbon.prototype.update=function(){var t,i;for(t=0,i=this.particles.length;t<i;t++)this.particles[t].update(this.friction,this.gravity);for(t=0,i=this.constraints.length;t<i;t++)this.constraints[t].update();for(t=0,i=this.constraints.length;t<i;t++)this.constraints[t].update()},Ribbon.prototype.render=function(t){var i;t.fillStyle="#77181A",t.strokeStyle="#77181A";for(var n=0,o=this.leftParticles.length-1;n<o;n++){t.beginPath();var e=this.leftParticles[n];t.moveTo(e.position.x,e.position.y),i=this.rightParticles[n],t.lineTo(i.position.x,i.position.y),i=this.rightParticles[n+1],t.lineTo(i.position.x,i.position.y),i=this.leftParticles[n+1],t.lineTo(i.position.x,i.position.y),t.lineTo(e.position.x,e.position.y),t.stroke(),t.fill(),t.closePath()}};var canvas=document.querySelector("canvas"),ctx=canvas.getContext("2d"),w=canvas.width=window.innerWidth-0,h=canvas.height=window.innerHeight-0;canvas.addEventListener("mousemove",onMousedown,!1);var rect=canvas.getBoundingClientRect();canvasOffsetLeft=rect.left,canvasOffsetTop=rect.top;var canvasOffsetLeft,canvasOffsetTop,friction=.75,gravity=new Vector(0,.4),movementStrength=.9,springStrength=.5,follicles=[],pins=[],ribbon=new Ribbon({controlPoint:new Vector(130,180),sections:60,width:40,sectionLength:10,friction:.92,gravity:new Vector(0,.2),chainLinkShiftEase:.9}),didMouseDown=!1,rotateAngle=0,rotateSpeed=.06,rotateLength=h/3;function update(){(ribbon.update(),didMouseDown)||(rotateAngle+=rotateSpeed,move(w/2+Math.cos(1.3*rotateAngle)*h/4,h/2+Math.sin(rotateAngle)*h/4))}function render(){ctx.clearRect(0,0,w,h),ribbon.render(ctx)}function animate(){update(),render(),requestAnimationFrame(animate)}function onMousedown(t){t.preventDefault(),moveDragPoint(t),didMouseDown=!0,window.addEventListener("mousemove",moveDragPoint,!1),window.addEventListener("mouseup",onMouseup,!1)}function moveDragPoint(t){move(parseInt(t.pageX-canvasOffsetLeft,10),parseInt(t.pageY-canvasOffsetTop,10))}function move(t,i){ribbon.controlPoint.setCoords(t,i)}function onMouseup(){window.removeEventListener("mousemove",moveDragPoint,!1),window.removeEventListener("mouseup",onMouseup,!1)}animate();