// сложность игры
// 1 - легко, 2 - сложно, 3 - очень сложно
var complexity;
// размер поля игры
// 3 - 3*3, 5 - 5*5, 7 - 7*7
var fieldSize;
// количество клеток
var numOfCell;
// двумерный массив для ходов
var arrayField;
// чей ход
// true - ход юзверя, false - ход компьютера
var ifUserMove;
// количество ходов
var countOfMove = 0;

///////////////////////////////////////////////////////////
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
	numOfCell = fieldSize * fieldSize;
	// создаем массив для игры
	createArrayField(fieldSize);
	// добавляем новые элементы
	var temp
	for (var i = 0; i < numOfCell; ++i)
	{
		var newDivElement = document.createElement("div");
		newDivElement.className = "element";
		temp = Math.floor(i / fieldSize);
		newDivElement.id = temp.toString() + "." + (i - fieldSize * temp).toString();
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
	// ход пользователя
	ifUserMove = true;
//	window.addEventListener("onclick")
}

// клик по элементам
window.onclick = function(e)
{
	e = e || event;
	var target = e.target || e.srcElement;
	// если кликаем по элементам
	if (target.className === "element")
	{
		// предполагаем, что пользователь ходит
		userMove(target.id);
	}	
}

// создаем двумерный массив для просчета хода в будущем
function createArrayField(size)
{
	arrayField = new Array();
	for (var i = 0; i < size; ++i)
	{
		arrayField[i] = new Array();
		for (var j = 0; j < size; ++j)
		{
			arrayField[i][j] = null;
		}
	}
}

// ход пользователя
function userMove(id)
{
	// если ход пользователя
	if (ifUserMove)
	{
		var arrTemp = id.split(".");
		// если в этом месте нет ни нолика ни крестика
		if (arrayField[arrTemp[0]][arrTemp[1]] === null)
		{
			// ходим!!!
			++countOfMove;
			document.getElementById(id).innerHTML = "<span class=\"textElement\">X</span>";	
			// записаваем ход в массив
			arrayField[arrTemp[0]][arrTemp[1]] = 1;
			// следующий ход компьютера
			ifUserMove = false;
			computerMove();
		}
	}
}

// ход компьютера
function computerMove()
{
	// если ход компьютера
	if (!ifUserMove && countOfMove < numOfCell)
	{
		// алгоритм просчета
		// например, рандом
		// локальные переменные для рандома
		var index, i, j;
		// пока не найдем место для нолика
		// точнее пока не походим
		while (!ifUserMove)
		{
			// берем рандомное значение
			index = Math.floor(Math.random() * (numOfCell));
			
			// делаем из него индекс
			i = Math.floor(index / fieldSize);
			j = index - fieldSize * i;
			// "пихаем"
			if (arrayField[i][j] === null)
			{
				// ходим!!!
				++countOfMove;
				document.getElementById(i.toString() + "." + j.toString()).innerHTML = "<span class=\"textElement\">O</span>";
				arrayField[i][j] = 0;
				ifUserMove = true;
				break;
			}
		}
	}
}