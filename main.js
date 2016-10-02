// сложность игры
// 1 - легко, 2 - сложно, 3 - очень сложно
var complexity;
// размер поля игры
// 3 - 3*3, 5 - 5*5, 7 - 7*7
var fieldSize = 3;

var elementBlock = document.getElementById("blockElements");

// динамическое создание элементов отображения крестиков и ноликов
function createElementForBlock(numStr)
{
	// удалить все что есть в div-е
	while (elementBlock.lastChild)
	{
    	elementBlock.removeChild(elementBlock.lastChild);
  	}
	
	// размер поля
	fieldSize = parseInt(numStr);
	// добавляем новые элементы
	for (var i = 0; i < fieldSize * fieldSize; ++i)
	{
		var newDivElement = document.createElement("div");
		newDivElement.className = "element";
		elementBlock.appendChild(newDivElement);
	}
	
	// размер блока с элементами
	var blockSize = (fieldSize * 75 + 8 + (fieldSize - 1) * 8).toString() + "px";
	// устанавливаем размер блока
	blockElements.style.cssText = "width: " + blockSize + "; height: " + blockSize + ";";
}

window.onload = function()
{
	// при загрузке по дефолту устанавливаем:
	// -размер поля 3*3
	createElementForBlock(3);
	// -сложность игры
	complexity = 1;
}