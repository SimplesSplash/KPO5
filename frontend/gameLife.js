
/*
Ð Ð°Ð·Ð±Ð¸Ð²Ð°ÐµÐ¼ Ð¿Ð¾Ð»Ðµ Ð½Ð° Ð¼Ð°ÑÑÐ¸Ð² 8Ñ…8, Ð¿Ñ€Ð¸ÑÐ²Ð°ÐµÐ²Ð°ÐµÐ¼ ÐºÐ°Ð¶Ð´Ð¾Ð¼Ñƒ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ñƒ Ð¼Ð°ÑÑÐ¸Ð²Ð° 0.
ÐŸÑ€Ð¸ ÐºÐ»Ð¸ÐºÐ¸ Ð½Ð° ÐºÐ»ÐµÑ‚ÐºÑƒ Ð¿Ñ€Ð¸ÑÐ²Ð°ÐµÐ²Ð°ÐµÐ¼ ÑÑ‚Ð¾Ð¼Ñƒ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ñƒ 1, Ð´Ð°Ð»ÐµÐµ Ð·Ð°ÐºÑ€Ð°ÑˆÐ¸Ð²Ð°ÐµÐ¼ ÐµÐ³Ð¾.

*/


//ÐŸÐ¾Ð´ÐºÐ»ÑŽÑ‡Ð°ÐµÐ¼ ÐºÐ°Ð½Ð²Ð°Ñ
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


 canvas.width = 800;
 canvas.height = 504;


var blockSize = 1,
    myColor = "silver",
    predator = "red",
    herbivorous = "green",

    subFieldPosX = 0,
    subFieldPosY = 0,
    subFieldArr = [];

    
    


function getField()
{
	return subFieldArr;
}



//ïðè íàæàòèè íà êäåòêó âûçûâàåòñÿ ìåòîä drawSubField()

canvas.onclick = function(event)
{
        //ïîëó÷àåì êîîðäèíàòû íàæàòèÿ   
	var x = event.offsetX;
	var y = event.offsetY;	
	console.log(x);
	console.log(y);


	x = Math.floor(x/100); //800/100 = 8
	y = Math.floor(y/63); //504/63 = 8



	if(subFieldArr[y][x] == 0){
		subFieldArr[y][x] = 1;
	}
	else if(subFieldArr[y][x] == 1)
	{
	    subFieldArr[y][x] = -1
	}else if (subFieldArr[y][x] == -1)
	{
		subFieldArr[y][x] = 0
	}

	console.log(subFieldArr);
	drawSubField(subFieldArr);
	

}

//ðàçäåëÿì ïîëå íà âîñåìü ÷àñòåé
drawField = function()
{
	var n = 8, m = 8;

	for(var i = 0; i < m; i++)
	{
		subFieldArr[i] = [];
 
	    for(var j = 0; j < m; j++)
	    {
	    	ctx.lineWidth = 1;
			ctx.strokeStyle = myColor;
 			ctx.strokeRect(subFieldPosX, subFieldPosY, 100, 63);      
	    	subFieldPosX += 100;
	    	subFieldArr[i][j] = 0;

	    }	

	    subFieldPosX = 0;
	    subFieldPosY += 63;

	    
	    //document.write(subFieldArr[i][j] + "   ");
	    
	}

}

drawField();


function drawSubField(FieldArr)
{
	//ctx.clearRect(0, 0, 800, 504);

	for(var i = 0; i < 8; i++)
	{ 
	    for(var j = 0; j < 8; j++)
	    {

	    	if(FieldArr[i][j] > 0)
	    	{
	    		ctx.fillStyle  = 'rgb(' + Math.floor(255-39*FieldArr[i][j]) + ',' +
                    '0' + ',0)';
	    		ctx.fillRect(j*100+1, i*63+1, 98, 61);
	    	}
	    	else if(FieldArr[i][j] == 0)
	    	{
	    		ctx.fillStyle  = "white";
	    		ctx.fillRect(j*100+1, i*63+1, 98, 61);
	    	}
			else if(FieldArr[i][j] < 0)
	    	{
	    		ctx.fillStyle  = 'rgb(0,' +
                    Math.floor(255-39*(-FieldArr[i][j])) + ',0)';
	    		
	    	}
                
                ctx.fillRect(j*100+1, i*63+1, 98, 61);

	    }	

	}
}


function randomFill()
{
	var fieldRandom = document.getElementById("input").value, n = 8, m = 8;

	if(fieldRandom > 20 || fieldRandom < 3)
	{
		alert("Ñëó÷àéíîå çàïîëíåíèå íå äîëæíî áûòü áîëüøå 10 èëè ìåíüøå 3");
	}

	for(var i = 0; i < n; i++)
	{
	   for(var j = 0; j < m; j++)
	    {
		subFieldArr[i][j] = 0;
		ctx.fillStyle  = "white";
	    ctx.fillRect(j*100+1, i*63+1, 98, 61);

	    }	
	}
   for(var i = 0; i < fieldRandom; i++)
   {				
   			x = Math.floor(Math.random()*8); 
			y = Math.floor(Math.random()*8); 
            rand = Math.floor(Math.random() * (1 - (-1) + 1)) + (-1);
         


			
	        console.log("x=" + x);
	        console.log("y=" + y);
	    	
	    	if(subFieldArr[x][y] == 0)
	    	{
	    		subFieldArr[x][y] = rand;
	    	}

	    	
	  
		
		
  	}
drawSubField(subFieldArr);		

 }




