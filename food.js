// 食物的属性:颜色：绿色；x坐标，y坐标，宽，高
(function(window,undefined){
	var position = 'absolute';
	var elements = [];
	function getRandom(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	function remove(){
		// 从结尾循环移除食物div，并将elements数组中记载div清除
		for(var i = elements.length-1 ; i >= 0 ; i--){
			elements[i].parentNode.removeChild(elements[i]);
			elements.pop();
		}
	}
	function Food(map,options){
		var options = options || {};
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.color = options.color || 'green';
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.render(map);
	};
	Food.prototype.render=function(map){
		remove();
		var div = document.createElement('div');
		elements.push(div);
		// 将div记录下来，在重新渲染时移除div
		map.appendChild(div);
		this.x = getRandom(0,(map.offsetWidth/this.width)-1)*this.width;
		this.y = getRandom(0,(map.offsetHeight/this.height)-1)*this.height;
		div.style.position = position;
		div.style.left = this.x +'px';
		div.style.top = this.y + 'px';
		div.style.backgroundColor = this.color;
		div.style.width = this.width + 'px';
		div.style.height = this.height + 'px';
	}
	window.Food = Food;
})(window,undefined);
// var map = document.getElementById('map');
// var food = new Food(map);