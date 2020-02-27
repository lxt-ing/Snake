// 食物 位置 颜色 大小
// 蛇
// 游戏
// 使用(function(){})调用函数，避免命名冲突
// 采用window.变量 = 变量 将变量赋给全局对象，从而在外部引用
'use strict';

window.onload = function(){
// 为了避免命名冲突可以用自调用函数：
 (function(){
 	let position = 'absolute';
	let elements = [];
// 	let map = document.getElementById('map');
// function Food(x,y,size,color){
// 	this.x = x;
// 	this.y = y;
// 	this.size = size;
// 	this.color = color;
// 	this.generate();
// }
// Food.prototype.generate = function(){
// 	let foodbox = document.createElement('div');
// 	console.log(foodbox);
// 	map.appendChild(foodbox);
// 	foodbox.style.position = 'absolute';
// 	foodbox.style.left = this.x+'px';
// 	foodbox.style.top = this.y +'px';
// 	foodbox.style.width = foodbox.style.height = this.size+'px';
// 	foodbox.style.backgroundColor = this.color;
// }
// function rand(min,max,size){
// 	// min:0  max:800-size size:20
// 	return Math.floor(Math.random()*(max-size-min+1)+min)
// }
// let food = new Food(rand(0,800,20),rand(0,600,20),20,'green');
// // 蛇对象
// 	function Snake(x,y,long,color){

// 	}
	function Food(options){
		options = options || {};
		this.x = options.x||0;
		this.y = options.y||0;
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.color = options.color || 'green';
	}
	function remove(){
		for(let i = elements.length-1;i >= 0;i--){
			elements[i].parentNode.removeChild(elements[i]);
			// elements.pop();
			elements.splice(i,1);
		}
	}
	Food.prototype.render = function(map){

		remove();
		this.x = Tools.getRandom(0,(map.offsetWidth/this.width-1))*this.width;
		this.y = Tools.getRandom(0,(map.offsetHeight/this.height-1))*this.height;
		let div = document.createElement('div');
		map.appendChild(div);
		elements.push(div);
		div.style.left = this.x+'px';
		div.style.top = this.y + 'px';
		div.style.position = position;
		div.style.width = this.width+'px';
		div.style.height = this.height +'px';
		div.style.backgroundColor = this.color;
	}
	let Tools={
		getRandom:function(min,max){
			return Math.floor(Math.random()*(max-min+1)+min);
		}
	}
// 形成了局部作用域
// 使用window对象实现外部接口
window.Food = Food;
 })();
 // 蛇
 (function(){
 	let elements = [];
 	let position = 'absolute';
 // 	function remove(){
	// 	for(let i = elements.length-1;i >= 0;i--){
	// 		elements[i].parentNode.removeChild(elements[i]);
	// 		// elements.pop();
	// 		elements.splice(i,1);
	// 	}
	// }
 	function Snake(options){
 		options = options || {};
 		this.width = options.width || 20;
 		this.height = options.height || 20;
 		this.direction = options.direction || 'right';
 		this.body = [
 			{x:3,y:2,color:'red'},
 			{x:2,y:2,color:'blue'},
 			{x:1,y:2,color:'blue'}
 		]
 	}
 	function remove(){
 		for(let i = elements.length-1;i>=0;i--){
 			elements[i].parentNode.removeChild(elements[i]);
 			elements.splice(i,1);
 		}
 	}
 	Snake.prototype.render = function(map){
 		remove()
 		for(let i = 0,len = this.body.length;i < len;i++){
 			var object = this.body[i];
 			var div = document.createElement('div');
 			elements.push(div);
 			map.appendChild(div);
 			div.style.width = this.width +'px';
 			div.style.height = this.height+'px';
 			div.style.position = position;
 			div.style.left = object.x*this.width+'px';
 			div.style.top = object.y*this.height+'px';
 			div.style.backgroundColor = object.color;
 		}
 	}
 	Snake.prototype.move=function(food,map){
 		for(let i =this.body.length - 1;i>0;i--){
 			this.body[i].x = this.body[i-1].x;
 			this.body[i].y = this.body[i-1].y;
 		}
 		let head = this.body[0];
 		switch(this.direction){
 			case 'right':head.x +=1;break;
 			case 'left': head.x -=1;break;
 			case 'top':head.y -=1;break;
 			case 'bottom':head.y +=1;break;
 		}
 		
 		var headX = head.x*this.width ;
 		var headY = head.y*this.height;
 		if(headX === food.x && headY === food.y){
 			console.dir(this);
 			let last = this.body[this.body.length-1];
 			// this.body.push(last);
 			// 该部分可以使用对象的拷贝
 			function extend(parent,child){
 				for(var key in parent){
 					if(child[key]){
 						continue;
 					};
 					child[key] = parent[key];
 				}
 			}
 			var obj = {};
 			extend(last,obj);
 			this.body.push(obj);
 			// this.body.push({
 			// 	x:last.x,
 			// 	y:last.y,
 			// 	color:last.color
 			// });
 			// console.dir(this.body);
 			// console.dir(elements);
 			food.render(map);
 		}

 	}
 	window.Snake = Snake;
 })();
 (function(){
 	var that;
 	function Game(map){
 		this.food = new Food(map);
 		this.snake = new Snake(map);
 		this.map = map;
 	} 
 	Game.prototype.start= function(){
 		// 将食物及蛇渲染到地图上
 		this.food.render(this.map);
 		this.snake.render(this.map);
 		// 控制蛇的移动
 		that = this;
 		runSnake();
 		bindKey();
 	}
 	function bindKey(){
 		document.addEventListener('keydown',function(e){
 			switch(e.keyCode){
 				case 37:that.snake.direction = 'left';break;
 				case 39:that.snake.direction = 'right';break;
 				case 38:that.snake.direction = 'top';break;
 				case 40:that.snake.direction = 'bottom';break;
 			}
 		},false);
 	}
 	function runSnake(){
 		var timeId = setInterval(function(){
 			let headX = that.snake.body[0].x,headY = that.snake.body[0].y;
 			let maxX = that.map.offsetWidth /that.snake.width;
 			let maxY = that.map.offsetHeight/that.snake.height;

 			if(headX <= 0 || headX >= maxX-1){
 				
 				clearInterval(timeId);
 				alert('Game Over!');
 			}
 			if(headY <= 0 || headY >= maxY){
 				alert('Game Over!');
 				clearInterval(timeId);
 			}
 			that.snake.move(that.food,that.map);
 			that.snake.render(that.map);
 		},150);
 	}

 	window.Game = Game;
 })();
 let map = document.getElementById('map');
 let game = new Game(map);
 game.start();
 // setInterval(function(){
 // 	game.snake.render(map);
 // 	game.snake.move();
 // }, 400);
}
