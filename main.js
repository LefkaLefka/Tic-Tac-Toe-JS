// сложность игры
// 1 - легко, 2 - сложно, 3 - очень сложно
var complexity;
// размер поля игры
// 3 - 3*3, 5 - 5*5, 7 - 7*7
var fieldSize;
// количество клеток
var numOfCell;
// двумерный массив для ходов
// -1 - здесь нолики, 1 - здесь крестик
var arrayField;
// чей ход
// true - ход юзверя, false - ход компьютера
var ifUserMove;
// количество ходов
var countOfMove;
// не закончена ли игра?
// true - игра закончилась, false - игра еще не закончена
var ifGameOver;

///////////////////////////////////////////////////////////
var elementBlock = document.getElementById("blockElements");

// динамическое создание элементов отображения крестиков и ноликов
function createElementForBlock(numStr)
{
	setDefaultValue();
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
	fieldSize = 3;
	// при загрузке по дефолту устанавливаем:
	// -размер поля 3*3
	createElementForBlock(fieldSize);
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

function setDefaultValue()
{
	// -сложность игры
	complexity = 1;
	// ход пользователя
	ifUserMove = true;
	// игра только началась
	ifGameOver = false;
	// ходов пока нету(игра же только началась)
	countOfMove = 0;
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
	// и игра не закончена
	if (ifUserMove && !ifGameOver)
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
			check();
			computerMove();
		}
	}
}

// ход компьютера
function computerMove()
{
	// если ход компьютера
	// и игра не закончена
	if (!ifUserMove && !ifGameOver)
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
				arrayField[i][j] = -1;
				ifUserMove = true;
				check();
				break;
			}
		}
	}
}

// проверка текущего поля на выиграш или ничью
function check()
{
	// если есть еще куда ходить
	if (countOfMove <= numOfCell)
	{
		// если больше 5 ходов
		if (countOfMove >= 5)
		{
			var horizontal, vertical, 
				// диагональ вида \
				diagonalL, 
				// диагональ вида /
				diagonalR;
			// проверяем на выиграш
			for (var i = 0; i < fieldSize; ++i)
			{
				horizontal = 0;
				vertical = 0;
				diagonalL = 0
				diagonalR = 0;
				for (var j = 0; j < fieldSize; ++j)
				{
					// проверяем горизонтали
					horizontal += arrayField[i][j];
					// проверяем вертикали
					vertical += arrayField[j][i];
					// диагональ направо
					diagonalL += arrayField[j][j];
					// диагональ налево
					diagonalR += arrayField[j][fieldSize - j - 1];
					
				}
				// если в горизонтале насчитали 3 илли -3 возвращаем горизонталь
				// если в горизонтале нет ничего подобного проверяем вертикаль по такому же принципу
				// если ничего не нашли проверяем диагональ \
				// если ничего не нашли проверяем диагональ /
				// в других случаях(нет выигравшего) возврщаем ноль
				var temp = Math.abs(horizontal) === fieldSize ? horizontal : Math.abs(vertical) === fieldSize ? vertical : Math.abs(diagonalL) === fieldSize ? diagonalL : Math.abs(diagonalR) === fieldSize ? diagonalR : 0;
				if (temp != 0)
				{
					// показываем победителя
					// надо как-то перезапустить игру
//////////////////////////////////////////////////////////////////
					console.log(temp === fieldSize ? "cross" : "zero");
					ifGameOver = true;
					break;
				}
			}
		}
		// если все походили(клеток на поле не осталось)
		if (countOfMove === numOfCell && !ifGameOver)
		{
			// заканчиваем игру
			ifGameOver = true;
			console.log("nothing");
			// надо как-то перезапустить игру
//////////////////////////////////////////////////////////////////
		}
	}
}