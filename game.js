(function(window,undefined){
	var that;
	function Game(map){
		this.food = new Food(map);
		this.snake = new Snake(map,this.food);
		this.map = map;
	}
	Game.prototype.start = function(){
		this.food.render(this.map);
		this.snake.render(this.map);
		that = this;
		bindKey();
	}
	function bindKey(e){
		document.addEventListener('keydown',function(e){
			switch(e.keyCode){
				case 37:that.snake.direction = 'left';break;
				case 38:that.snake.direction = 'up';break;
				case 39:that.snake.direction = 'right';break;
				case 40:that.snake.direction = 'down';break;
			}
		},false)
	}
	window.Game = Game;
})(window,undefined)
 let map = document.getElementById('map');
 let game = new Game(map);
 game.start();