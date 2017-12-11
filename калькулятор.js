//знак числа
//якщо істина - знак ПЛЮС
var sign = true;
var operand1 = null,//операнди для операцій
	operand2 = null;
var localAct = null;//локальна операція
//наявність точки
//якщо істина - точка є
var haveDot = false;
var wasShowing = false;

//натискання на будь які елементи
document.onclick = function(e)
{
	e = e || event;
	var target = e.target || e.srcElement;
	switch (target.id)
	{
		case "num0":
			writeNumToLocalExpression(0);
			break;
		case "num1":
			writeNumToLocalExpression(1);
			break;
		case "num2":
			writeNumToLocalExpression(2);
			break;
		case "num3":
			writeNumToLocalExpression(3);
			break;
		case "num4":
			writeNumToLocalExpression(4);
			break;
		case "num5":
			writeNumToLocalExpression(5);
			break;
		case "num6":
			writeNumToLocalExpression(6);
			break;
		case "num7":
			writeNumToLocalExpression(7);
			break;
		case "num8":
			writeNumToLocalExpression(8);
			break;
		case "num9":
			writeNumToLocalExpression(9);
			break;
		case "sign":
			writeNumToLocalExpression(-1);
			break;
		case "dot":
			writeNumToLocalExpression(-2);
			break;
		case "CE":
			deleteLastNum();
			break;
		case "C":
			stopAllOperations();
			break;
		case "bcksp":
			deleteLastSymb();
			break;
		case "addition":
			addition();
			break;
		case "subtraction":
			subtraction();
			break;
		case "multiplication":
			multiplication();
			break;
		case "division":
			division();
			break;
		case "percent":
			percent();
			break;
		case "sqrt":
			sqrt();
			break;
		case "sqr":
			sqr();
			break;
		case "fraction":
			fraction();
			break;
		case "equally":
			equally(true);
			break;
	}
}

//процент
function percent()
{
	if (operand1 !== null && operand2 === null)
	{
		operand2 = createOperand();
		operand2 = (operand1 * operand2) / 100;
		document.getElementById("localExpression").innerHTML = operand2.toString();
		equally(true);
	}
}

//корiнь
function sqrt()
{
	if (operand1 === null && operand2 === null)
		{
			//створюємо операнд
			operand1 = createOperand();
			if (operand1 >= 0)
			{
				operand1 = Math.sqrt(operand1);
				document.getElementById("localExpression").innerHTML = operand1.toString();
				document.getElementById("globalExpression").innerHTML = "";
			}
		}
		else
			if (operand1 !== null && operand2 === null)
			{
				//створюємо операнд
				operand2 = createOperand();
				if (operand2 >= 0)
				{
					operand2 = Math.sqrt(operand2);
					document.getElementById("localExpression").innerHTML = operand2.toString();
					
					if (localAct !== null)
					{
						equally(true);
					}
				}
				
			}
			else
				if (operand1 !== null && operand2 !== null)
				{
					if (operand2 >= 0)
					{
						document.getElementById("globalExpression").innerHTML = "";
						//создаем операнд
						operand1 = createOperand();
						operand1 = Math.sqrt(operand1);
						document.getElementById("localExpression").innerHTML = operand1.toString();
						deleteAllVariable();
					}
				}
}

//квадрат
function sqr()
{
	if (operand1 === null && operand2 === null)
	{
		//создаем операнд
		operand1 = createOperand();
		operand1 *= operand1;
		document.getElementById("localExpression").innerHTML = operand1.toString();
	}
	else
		if (operand1 !== null && operand2 === null)
		{
			//создаем операнд
			operand2 = createOperand();
			operand2 *= operand2;
			document.getElementById("localExpression").innerHTML = operand2.toString();
			if (localAct !== null)
			{
				equally(true);
			}
		}
		else
			if (operand1 !== null && operand2 !== null)
			{
				document.getElementById("globalExpression").innerHTML = "";
				//создаем операнд
				operand1 = createOperand();
				operand1 *= operand1;
				document.getElementById("localExpression").innerHTML = operand1.toString();
				deleteAllVariable();
			}
}

//1/x
function fraction()
{
	if (operand1 === null && operand2 === null)
		{
			///створюємо операнд
			operand1 = createOperand();
			if (operand1 !== 0)
			{
				operand1 = 1 / operand1;
				document.getElementById("localExpression").innerHTML = operand1.toString();
			}
		}
		else
			if (operand1 !== null && operand2 === null)
			{
				//створюємо операнд
				operand2 = createOperand();
				if (operand2 !== 0)
				{
					operand2 =  1 / operand2;
					document.getElementById("localExpression").innerHTML = operand2.toString();
					
					if (localAct !== null)
					{
						equally(true);
					}
				}
				
			}
			else
				if (operand1 !== null && operand2 !== null)
				{
					if (operand2 !== 0)
					{
						document.getElementById("globalExpression").innerHTML = "";
						//створюємо операнд
						operand1 = createOperand();
						operand1 = 1 / operand1;
						document.getElementById("localExpression").innerHTML = operand1.toString();
						deleteAllVariable();
					}
				}
}

//ділення
function division()
{
	//початковий вид(коли ще нічого не робимо)
	if (localAct === null)
	{
		//створюємо перший операнд
		operand1 = createOperand();
	}
	else
		equally(false);

	writeActShowExpression("division");
}

//множення
function multiplication()
{
	if (localAct === null)
	{
		operand1 = createOperand();
	}
	else
		equally(false);

	writeActShowExpression("multiplication");
}

//віднімання
function subtraction()
{
	if (localAct === null)
	{
		operand1 = createOperand();
	}
	else
		equally(false);

	writeActShowExpression("subtraction");
}

//додавання
function addition()
{
	if (localAct === null)
	{
		operand1 = createOperand();
	}
	else
		equally(false);

	writeActShowExpression("addition");
}

//дії з операндами
function writeActShowExpression(act)
{
	haveDot = false;
	localAct = act;
	var str;
	switch (act)
	{
		case "addition":
			str = "+";
			break;
		case "subtraction":
			str = "-";
			break;
		case "multiplication":
			str = "&times";
			break;
		case "division":
			str = "/";
			break;
		default:
			str = "";
			break;
	}
	
	document.getElementById("globalExpression").innerHTML = operand1.toString() + str;
	document.getElementById("localExpression").innerHTML = "0";
}

//кнопка дорівнює
//функція для проміжкових операцій
function equally(deleteVariable)
{
	var divisionByZero = false;
	//створюємо другий операнд
	operand2 = createOperand();
	//виводимо нього в глобальний вираз
	document.getElementById("globalExpression").innerHTML += operand2.toString();
	//обчтслення відносно локальної дії
	switch (localAct)
	{
		case "addition":
			operand1 = operand1 + operand2;
			break;
		case "subtraction":
			operand1 = operand1 - operand2;
			break;
		case "multiplication":
			operand1 = operand1 * operand2;
			break;
		case "division":
			if (operand2 !== 0)
			{
				operand1 = operand1 / operand2;
				writeResultToLocalExpression();
			}
			else
			{
				document.getElementById("globalExpression").innerHTML = "";
				document.getElementById("globalExpression").innerHTML = "Division by zero";
				divisionByZero = true;
				deleteVariable = true;
			}
			break;
	}
	//перевіряємо число на його знак
	if (operand1 < 0)
	{
		sign = false;
	}
	//если не делим на ноль
	if (!divisionByZero)
	{
		//виводимо результат
		writeResultToLocalExpression();
	}
	//за вхідним параметром видаляємо змінні
	if (deleteVariable)
	{
		deleteAllVariable();
	}
}

//функція видалення всіх змінних
function deleteAllVariable()
{
	//в даному випадку під видаленням є присвоєння значення null
	operand1 = null;
	operand2 = null;
	localAct = null;
	haveDot = false;
	sign = false;
}

//вивід результату
function writeResultToLocalExpression()
{
	//виводимо результат, який зберігається в першому операнді
	document.getElementById("localExpression").innerHTML = operand1.toString();
	wasShowing = true;
}

//функція створення операнду з вхідного рядка
//повертає значення Number
function createOperand(operand)
{
	return Number(document.getElementById("localExpression").innerHTML);
}


//функціонал кнопки "C"
function stopAllOperations()
{
	//видаляємо всі змінні
	deleteAllVariable();
	//нові значення для продовження роботи
	document.getElementById("localExpression").innerHTML = "0";
	document.getElementById("globalExpression").innerHTML = "";
}

//функціонал кнопки "bcksp"
function deleteLastSymb()
{
	var str = String(document.getElementById("localExpression").innerHTML);
	//перевіряємо чи єщось на видалення
	//якщо немає виводимо нуль
	if (str.length === 0 || str.length === 1)
		document.getElementById("localExpression").innerHTML = "0";
	else
		//інакше видаляємо останнє число
		document.getElementById("localExpression").innerHTML = str.substring(0, str.length - 1);
}

//відображення числа користувачу
function writeNumToLocalExpression(num)
{
	if (wasShowing)
	{
		wasShowing = false;
		document.getElementById("localExpression").innerHTML = "0";
		document.getElementById("globalExpression").innerHTML = "";
	}
	//перевірка довжини числа (16 символів)
	if (checkLengthLocalExpression(document.getElementById("localExpression").innerHTML))
	{
		//якщо нажимаємо тільки нуль, при цьому перед цим в рядку також був нуль
		if ((num === 0 || num === -1) && document.getElementById("localExpression").innerHTML === "0")
			document.getElementById("localExpression").innerHTML = 0;
		else
			//якщо виводимо будь яке перше число і не крапку і не знак
			if (num !== -2 && num !== -1 && document.getElementById("localExpression").innerHTML === "0")
				document.getElementById("localExpression").innerHTML = num;
			else
				//при нажатті крапки
				//до цього число не мало крапки
				if (num === -2 && !haveDot)
				{
					document.getElementById("localExpression").innerHTML += ".";
					haveDot ^= true;
				}
				else
					//якщо виводимо будь чку цифру
					if (num !== -1 && num !== -2)
						document.getElementById("localExpression").innerHTML += num;
	}
	//змінюємо знак числа
	if (num === -1 && document.getElementById("localExpression").innerHTML !== "0")
	{
		//якщо число додатнє
		if (sign)
		{
			//змінюємо знак
			sign ^= true;
			//виводимо з мінусом спереду
			document.getElementById("localExpression").innerHTML = (sign ? "" : "-") + 
				document.getElementById("localExpression").innerHTML;
		}
		else
		//якщо число від*ємне
		{
			sign ^= true;
			//виводимо з мінусом спереду
			document.getElementById("localExpression").innerHTML = 
				document.getElementById("localExpression").innerHTML.replace("-", "");
		}
	}
}

//перевіряємо довжину числа
function checkLengthLocalExpression(expression)
{
	//довжина числа повинна бути 16 символів
	//1234567890123456
	//0,1234567890123456
	//1,123456789012345
	
	//якщо не дорівнює -1, то крапка є в рядку
	//інакше немає
	var haveDot = expression.indexOf(".") !== -1 ? true : false;
	expression = expression.replace("-", "");
	//якщо є точка
	if (haveDot)
    {
		//якщо число вигляду 0,1234567890123456
		if (expression[0] === "0" && expression[1] === "." && expression.length - 2 < 16)
			return true;
		//якщо число вигляду 1,123456789012345
		else
			if (expression.length - 1 < 16)
				return true;
			else
				return false;
	}
	else
		//якщо точки немає
		if (expression.length < 16)
			return true;
		else
			return false;
}