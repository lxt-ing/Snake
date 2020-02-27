// 蛇对象：蛇节{x,y,color} 蛇身由一个蛇头，两个蛇身 
(function(window,undefined){
	var position = 'absolute';
	var that;
	var elements = [];
	function Snake(map,food,options){
		options = options || {};
		this.direction = options.direction || 'right';
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.body = [
		{x:3,y:3,color:'red'},
		{x:2,y:3,color:'blue'},
		{x:1,y:3,color:'blue'}];
		this.render(map);
		this.runSnake(map,food);
	}
	function remove(){
		for(var i = elements.length-1;i>= 0;i--){
			elements[i].parentNode.removeChild(elements[i]);
			elements.pop();
		}
	};

	Snake.prototype.runSnake = function(map,food){
		that = this;
		var timeId = setInterval(function(){
			var first = that.body[0];
			if(food.x == first.x*that.width && food.y == first.y*that.height){
				that.body.push({
					x:that.body[that.body.length-1].x,
					y:that.body[that.body.length-1].y,
					color:that.body[that.body.length-1].color
				})
				food.render(map);
			}
			for(var i = that.body.length-1;i>0;i--){
				if(first.x == that.body[i].x && first.y == that.body[i].y){
					clearInterval(timeId);
					alert('game over!!!');
				}
			}
			if(first.x<=0 || (first.x+1)*that.width>=map.offsetWidth){
				clearInterval(timeId);
				alert('game over')
			}
			if(first.y<=0 || (first.y+1)*that.height>=map.offsetHeight){
				clearInterval(timeId);
				alert('game over');
			}
			for(var i = that.body.length-1;i>0;i--){
				that.body[i].x = that.body[i-1].x;
				that.body[i].y = that.body[i-1].y;
			}
			switch(that.direction){
				case 'up': first.y -=1;break;
				case 'down':first.y +=1;break;
				case 'right':first.x +=1;break;
				case 'left':first.x -=1;break;
			}
			that.render(map);
		},150)
	}
	Snake.prototype.render = function(map){
		remove();
		for(var i = this.body.length-1;i >= 0 ; i--){
			var div = document.createElement('div');
			elements.push(div);
			map.appendChild(div);
			div.style.position = position;
			div.style.width = this.width +'px';
			div.style.height = this.height +'px';
			div.style.left = this.body[i].x*this.width + 'px';
			div.style.top = this.body[i].y * this.height + 'px';
			div.style.backgroundColor = this.body[i].color;
		}
		

	}
	window.Snake = Snake;
})(window,undefined);
// var map = document.getElementById('map');
// var snake = new Snake(map);
// snake.render(map);