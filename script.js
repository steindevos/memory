//put colors in array as string
let colors = ['aliceblue', 'aqua', 'blueviolet', 'bisque', 'navy', 'magenta', 'chartreuse', 'orange']; 
let pictures = []; 


//on mouseclick memorygame
function removeOpacity() {
    clickedNodes[0].style.opacity = '0'; 
    clickedNodes[1].style.opacity = '0'; 
}

function clearClickedNodesArray() {
    clickedNodes.length = 0; 
}

function clearClickedColorArray() {
    clickedColors.length = 0; 
}

function instructions(instructionHere) {
    document.getElementById('instructions').innerHTML = instructionHere; 
}

let clickedColors = []; 
let clickedNodes = []; 
let foundColors = []; 


function onClickColor(pictureNode) {
    pictureNode.onclick = function() {
        let color = pictureNode.style.backgroundColor;  
        
        if (clickedColors.length === 0 && foundColors.indexOf(color) === -1) {
            pictureNode.style.opacity = '1'; 
            clickedColors.push(color); 
            clickedNodes.push(pictureNode);
            instructions('Select another picture'); 
        } else if (clickedColors.length === 1 && clickedNodes.length === 1 && pictureNode.style.opacity !== '1') {
            pictureNode.style.opacity = '1';
            clickedColors.push(color); 
            clickedNodes.push(pictureNode); 
            if (clickedColors[0] === clickedColors[1]) {
                instructions('Nice!') 
                foundColors.push(color); 
                clickedColors.length = 0; 
                clickedNodes.length = 0; 
                console.log(foundColors);
                if (foundColors.length === colors.length) {
                    instructions('Congratulations!');
                    stopTimer();
                    document.getElementById('scores').innerHTML = `${player}: ${seconds} seconds`;
                } else {
                    console.log('huh?')
                }    
            } else {
                instructions('Too bad, try again');
                setTimeout(removeOpacity, 1499);
                setTimeout(clearClickedNodesArray, 1500);
                setTimeout(clearClickedColorArray, 1500);
            }
        } else {
            console.log('what happened?');
        }
    }
}

// Start button that asks player name as input
let timerId; 
let player; 
let seconds; 


function startGame(displayBox) {
    //set timer to zero
    document.getElementById('timer').innerHTML = '0'; 

    
    
    player = prompt("Please enter your name");
    
//create pairs of pictures objects and put in pictures array 
for(let i = 0; i < 8; i++) {
    let pic1 = {'version': 1, 'color': colors[i]};
    let pic2 = {'version': 2, 'color': colors[i]}; 
    pictures.push(pic1, pic2); 
}
 

// randomize pictures array
function shuffle(array) {
    let counter = array.length; 
    
    while(counter>0) {
        let index = Math.floor(Math.random()*counter); 
        counter--; 
        let temp = array[counter];
        array[counter] = array[index]; 
        array[index] = temp; 
    }
    return array; 
}
shuffle(pictures); 


//loop over randomized pictures array and add to HTML and add css class 
for(let i=0; i < pictures.length; i++) {
    let color = pictures[i].color;  
    let node = document.createElement('div');
    let pictureNode = document.getElementById('game').appendChild(node);  
    pictureNode.style.backgroundColor = color; 
    pictureNode.classList.add("pictures");
    onClickColor(pictureNode); 
} 
    
    gameTimer('timer');
}


function gameTimer(timer) {
    let timerBox = document.getElementById(timer); 
    seconds = timerBox.innerHTML; 
    
    if (seconds == 0) {
        seconds++; 
        timerBox.innerHTML = seconds; 
    } else {
        seconds++; 
        timerBox.innerHTML = seconds; 
    }
    
    timerId = setTimeout(function() {gameTimer(timer)}, 1000);
}

function stopTimer() {
    clearInterval(timerId); 
}




