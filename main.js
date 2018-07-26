document.addEventListener('DOMContentLoaded', function(event) {
    document.getElementById("start-button").onclick = start;
    function start() {
        const workObj = document.getElementById("work");
        const restObj = document.getElementById("rest");
        
        const work = workObj.value ? workObj.value : 25;
        const rest = restObj.value ? restObj.value : 5;
        
        workObj.remove();
        restObj.remove();
        document.getElementById("start-button").remove();
        
        startTimer(work, rest);
    }
    const timerHTML = ''
    
    function startTimer(work, rest) {
        var timerDiv = document.createElement("div");
        timerDiv.align="center";
        var timer = document.createElement("canvas");
        timer.id = "timer";
        timer.width="300";
        timer.height="300";
        timer.innerHTML = timerHTML;           
        document.body.appendChild(timerDiv);
        timerDiv.appendChild(timer);

        var context = timer.getContext('2d');

        drawTimer(context, 0);
        
        var timeLeft = work*60;
        var working = true;
        setInterval(function() {
            if (timeLeft <= 0) {
                working = !working;
                if (working) {
                    timeLeft = work*60;
                }
                else {
                    timeLeft = rest*60;
                }
            }
            else {
                if (working) {
                    drawTimer(context, 1 - timeLeft/(work*60));
                    timeLeft -= 1;
                    context.font = "50px Arial Bold";
                    context.textAlign = "center";
                    context.fillStyle = "black";
                    context.fillText(timeLeft <= 60 ? timeLeft : Math.ceil(timeLeft / 60), 150, 125);
                }
                else {
                    drawTimer(context, timeLeft/(rest*60), "#2f0");
                    timeLeft -= 1;
                    context.font = "50px Arial Bold";
                    context.textAlign = "center";
                    context.fillStyle = "black";
                    context.fillText(timeLeft <= 60 ? timeLeft : Math.ceil(timeLeft / 60), 150, 125);
                }
            }
        }, 1000);
    }

    function drawTimer(context, percentage, colorFill="#700") {
        context.beginPath();
        context.arc(150, 120, 120, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle="#FFF";
        context.fill();
        context.beginPath();
        context.arc(150, 120, 120, Math.PI/2 - Math.PI*percentage, Math.PI/2 + Math.PI*percentage, false);
        context.closePath();
        context.fillStyle = colorFill;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = colorFill;
        context.stroke();
    }
});