
let axeBtn = "<button onClick = 'createButtons()'>" + "Рубить" + "</button>";
let spellBtn = document.querySelector('.spells');

let board = document.querySelector('.board');
let isRunning = false;
let haveAxe = false;
let rulesBlock = document.querySelector(".rules");
let closeRulesBtn = "<button onClick = 'closeRules()'>Закрыть</button>"
function showRules() {
rulesBlock.innerHTML = "Moves - максимальное количество ваших запасов" +
     '<br></br>' +
     "Если наступить на отрицательные поля, то запасы уменьшаются и наоборот" +
     '<br></br>' +
     "Ваша задача дойти до финиша, сохранив хотябы 1 запас" +
     '<br></br>' +
     "🐸 - главный персонаж" + '<br></br>' +
     '🌳 🗿  - препятствия, через них нельзя пройти <br></br>' +
     '💎 - валюта (пока не испульзуется) <br></br>' +
     '🏁 - финиш <br></br>' +
     '🪓 - позволяет срубить одно дерево <br></br>' +
     '🔑 - убирает 🚪, через дверь без ключа пройти нельзя <br></br>' +
     '🌌 - телепортирует на другой портал <br></br>' +
     '🥗 - добавляет три единицы запасов <br></br>';
rulesBlock.innerHTML += closeRulesBtn;
}

function closeRules() {
    rulesBlock.innerHTML = "<button onclick='showRules()'>Правила игры</button>";
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}


let moveText = document.querySelector('.moves');
let gemsText = document.querySelector('.gems');
let startMoves = 3;
let countGems = 0;
let emoji = ['🏁', '🌳', '💎', '🗿', '🐸'];
let gameBoards = [
    [
     ['🏁',-2,-4,-3,'💎'],
     ['🌳',-3,1,3,-1],
     ['🌳',1,'🌳','🗿',-2],
     ['🌳',2,'🌳','🌳',2],
     ['💎',-1,-2,3,'🐸']],

     [['💎',-2,-4,-3,'💎'],
     ['🌳',-3,1,3,-1],
     ['🌳',1,'🌳','🗿',-2],
     ['🌳',2,'🌳','🌳',2],
     ['🏁',-1,-2,'🐸',3]],

     [['💎',-2,-4,-3,'🐸'],
     ['🌳',-3,1,3,-1],
     ['🌳',1,'🌳','🗿',-2],
     ['🌳',2,'🌳','🌳',2],
     ['🏁',-1,-2,3,'💎']],

     [['🏁',-2,-4,-3,'💎'],
     ['🌳',-3,1,3,-1],
     ['🌳','🐸','🌳','🗿',-2],
     ['🌳',1,'🌳','🌳',2],
     ['💎',-1,-2,3,2]],

     [['💎',-2,-4,-3,'💎'],
     ['🌳',-3,1,'🪓','🐸'],
     ['🌳',1, 1,'🗿',-2],
     ['🌳',2,'🌳','🌳',2],
     ['🏁',-1,-2,-1,3]],

     [['💎',-2,-4,-3,'💎'],
     ['🌳',-3,1,3,1],
     ['🌳','🐸', 1,'🗿',-2],
     ['🌳',2,'🌳','🌳',2],
     ['🏁',-1,-2,-1,3]],

     [['💎',-2,-4,-3,'🔑'],
     ['🌳',-2,1,3,1],
     ['🌳','🐸', 1,'🗿',-2],
     ['🌳',2,'🌳','🌳',2],
     ['🏁','🚪',-2,-1,3]],

     [['💎',-2,-4,-3,'🐸'],
     ['🌳',-2,1,3,1],
     ['🌳','🌳', 1,'🗿',-2],
     ['🌳',2,'🌳','🌳','🔑'],
     ['🏁','🚪',-2,-1,3]],

     [['🏁','🚪',-6,-3,'🐸'],
     [1,'🌳',1,3,1],
     [-4,'🌳', 1,'🗿',-1],
     [-3,2,'🌳','🌳','🔑'],
     [3,2,-2,-1,3]],

    [['💎',-2,-1,-1,'🌌'],
     ['🌳',-3,1,4,'🐸'],
     ['🌳',1, 1,'🗿',-2],
     ['🌳',2,'🌳','🌳',2],
     ['🏁','🌌',-2,-1,3]],

    [['🐸',0,'🔑',-2, '💎'],
     [-2,1,'🌳','🌳','🌳'],
     [-1,'🚪','🌌',1,'🏁'],
     [1,'🌳','🌳','🌳','🌳'],
     [1,-2,'💎','💎','🌌']],

    [['🐸',0,'🥗','🌳', '💎'],
     [-1,'🌳','🌳','🌳','🌌'],
     [-1,'🌳','🏁','🌳','🪓'],
     [1, '🌳','🌳','🌳','🌳'],
     [-1,2,'💎','💎','🌌']],

    [['🐸','🥗','🥗','🥗', '🥗'],
     ['🥗','🥗','🥗','🥗','🥗'],
     ['🥗','🥗','🥗','🥗','🥗'],
     ['🥗', '🥗','🥗','🗿','🗿'],
     ['🥗','🥗','🥗',-42,'🏁']],

    ]

let jabX;
let jabY;


let gameID = Math.floor(Math.random() * (gameBoards.length)+1);
getJaba();
function generateGame() {
    for (let i = 0; i < gameBoards[gameID-1].length; i++) {
        let row = document.createElement("tr");
        row.className = "row" + i;
        for (let j = 0; j < gameBoards[gameID-1][i].length; j++) {
            let cell = document.createElement("td");
            cell.className = "kletka";
            let card = document.createTextNode(gameBoards[gameID-1][i][j]);
            cell.appendChild(card);
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    board.setAttribute("border", "2");
    //console.log(gameID);
}

function makeTurn() {
    document.addEventListener('keydown', function(event) {

  if (event.code == 'KeyW') {
    getJaba();
    if (checkUpPortal() === true) {
                        gameBoards[gameID-1][jabY+1][jabX] = 0;
                        let temp = gameBoards[gameID-1][jabY][jabX];
                        gameBoards[gameID-1][jabY][jabX] = -1;
                        gameBoards[gameID-1][getPortalY()][getPortalX()] = temp;
                        jabX=getPortalX();
                        jabY=getPortalY();
                        render();
                        loseGame();
                    }
    else if (jabY >= 0 && jabY<5 && checkUpItem()) {
        startMoves += gameBoards[gameID-1][jabY-1][jabX];
        let temp = gameBoards[gameID-1][jabY][jabX];
        if (gameBoards[gameID-1][jabY-1][jabX] > 0)
            gameBoards[gameID-1][jabY][jabX] = gameBoards[gameID-1][jabY-1][jabX]*(-1);
        else
            gameBoards[gameID-1][jabY][jabX] = gameBoards[gameID-1][jabY-1][jabX];
        gameBoards[gameID-1][jabY-1][jabX] = temp;
        render();
        jabY-=1;
//console.log(startMoves + "=moves");
        moveText.innerHTML = "Moves : " + startMoves;
        loseGame();
    }
  }

  if (event.code == 'KeyS') {
    getJaba();
    if (checkDownPortal() === true) {
                    gameBoards[gameID-1][jabY-1][jabX] = 0;
                    let temp = gameBoards[gameID-1][jabY][jabX];
                    gameBoards[gameID-1][jabY][jabX] = -1;
                    gameBoards[gameID-1][getPortalY()][getPortalX()] = temp;
                    jabX=getPortalX();
                    jabY=getPortalY();
                    render();
                    loseGame();
                }
    else if (jabY >= 0 && jabY<5 && checkDownItem()) {
        startMoves += gameBoards[gameID-1][jabY+1][jabX];
        let temp = gameBoards[gameID-1][jabY][jabX];
        if (gameBoards[gameID-1][jabY+1][jabX] > 0)
            gameBoards[gameID-1][jabY][jabX] = gameBoards[gameID-1][jabY+1][jabX]*(-1);
        else
           gameBoards[gameID-1][jabY][jabX] = gameBoards[gameID-1][jabY+1][jabX] 
        gameBoards[gameID-1][jabY+1][jabX] = temp;
        render();
        //.log(startMoves + "=moves");
        moveText.innerHTML = "Moves : " + startMoves;
        jabY+=1;
        //.log(gameBoards);
        loseGame();
    }
  }

  if (event.code == 'KeyA') {
        getJaba();
        if (checkLeftPortal() === true) {
                gameBoards[gameID-1][jabY][jabX-1] = 0;
                let temp = gameBoards[gameID-1][jabY][jabX];
                gameBoards[gameID-1][jabY][jabX] = -1;
                gameBoards[gameID-1][getPortalY()][getPortalX()] = temp;
                jabX=getPortalX();
                jabY=getPortalY();
                render();
                loseGame();
            }
    else if (jabX > 0 && jabX <=4 && checkLeftItem()) {
        startMoves += gameBoards[gameID-1][jabY][jabX-1];
        let temp = gameBoards[gameID-1][jabY][jabX];
        if (gameBoards[gameID-1][jabY][jabX-1] > 0)
            gameBoards[gameID-1][jabY][jabX] = gameBoards[gameID-1][jabY][jabX-1]*(-1);
        else
            gameBoards[gameID-1][jabY][jabX] = gameBoards[gameID-1][jabY][jabX-1];
        gameBoards[gameID-1][jabY][jabX-1] = temp;
        render();
        jabX-=1;
        //.log(startMoves + "=moves");
        moveText.innerHTML = "Moves : " + startMoves;
        loseGame();
    }
  }

  if (event.code == 'KeyD') {
    getJaba();
    if (checkRightPortal() === true) {
        gameBoards[gameID-1][jabY][jabX+1] = 0;
        let temp = gameBoards[gameID-1][jabY][jabX];
        gameBoards[gameID-1][jabY][jabX] = -1;
        gameBoards[gameID-1][getPortalY()][getPortalX()] = temp;
        jabX=getPortalX();
        jabY=getPortalY();
        render();
        loseGame();
    }
    else if (jabX >= 0 && jabX <4 && checkRightItem()) {
        startMoves += gameBoards[gameID-1][jabY][jabX+1];
        let temp = gameBoards[gameID-1][jabY][jabX];
        if (gameBoards[gameID-1][jabY][jabX+1] > 0)
            gameBoards[gameID-1][jabY][jabX] = gameBoards[gameID-1][jabY][jabX+1]*(-1);
        else 
            gameBoards[gameID-1][jabY][jabX] = gameBoards[gameID-1][jabY][jabX+1];
        gameBoards[gameID-1][jabY][jabX+1] = temp;
        render();
        jabX+=1;
        //.log(startMoves + "=moves");
        moveText.innerHTML = "Moves : " + startMoves;
        loseGame();
    }
  }
});
}

function getJaba() {
    for (let i = 0; i < gameBoards[gameID-1].length; i++)
        for (let j = 0; j < gameBoards[gameID-1][i].length; j++)
            if (gameBoards[gameID-1][i][j] === '🐸') {
                jabX = j;
                jabY = i;
                return;
            }
}

function render() {
    board.innerHTML = '';
    generateGame();
}

function checkLeftItem() {
    if (gameBoards[gameID-1][jabY][jabX-1] === '🌳' || gameBoards[gameID-1][jabY][jabX-1] === '🗿' ||
        gameBoards[gameID-1][jabY][jabX-1] === '🚪')
        return false;
    else if (gameBoards[gameID-1][jabY][jabX-1] === '🏁')
        winGame();
    else if (gameBoards[gameID-1][jabY][jabX-1] === '💎') {
        countGems++;
        gemsText.innerHTML = "Gems : " + countGems;
        gameBoards[gameID-1][jabY][jabX-1] = -1;
    }
    else if (gameBoards[gameID-1][jabY][jabX-1] === '🔑') {
        gameBoards[gameID-1][jabY][jabX-1] = 0;
        gameBoards[gameID-1][getDoorY()][getDoorX()] = 0;
    }
    else if (gameBoards[gameID-1][jabY][jabX-1] === '🪓') {
        gameBoards[gameID-1][jabY][jabX-1] = 0;
        haveAxe = true;
        spellBtn.innerHTML += axeBtn;
    }
    else if (gameBoards[gameID-1][jabY][jabX-1] === '🥗') {
            gameBoards[gameID-1][jabY][jabX-1] = -1;
            startMoves+=3;
            moveText.innerHTML = startMoves;
    }
    return true;
}
function checkRightItem() {
    if (gameBoards[gameID-1][jabY][jabX+1] === '🌳' || gameBoards[gameID-1][jabY][jabX+1] === '🗿' ||
        gameBoards[gameID-1][jabY][jabX+1] === '🚪')
        return false;
    else if (gameBoards[gameID-1][jabY][jabX+1] === '🏁')
        winGame();
    else if (gameBoards[gameID-1][jabY][jabX+1] === '💎') {
        countGems++;
        gemsText.innerHTML = "Gems : " + countGems;
        gameBoards[gameID-1][jabY][jabX+1] = -1;
    }
    else if (gameBoards[gameID-1][jabY][jabX+1] === '🔑') {
        gameBoards[gameID-1][jabY][jabX+1] = 0;
        gameBoards[gameID-1][getDoorY()][getDoorX()] = 0;
    }
    else if (gameBoards[gameID-1][jabY][jabX+1] === '🪓') {
            gameBoards[gameID-1][jabY][jabX+1] = 0;
            haveAxe = true;
            spellBtn.innerHTML += axeBtn;
    }
    else if (gameBoards[gameID-1][jabY][jabX+1] === '🥗') {
            gameBoards[gameID-1][jabY][jabX+1] = -1;
            startMoves+=3;
            moveText.innerHTML = startMoves;
        }
    return true;
}
function checkUpItem() {
    if (gameBoards[gameID-1][jabY-1][jabX] === '🌳' || gameBoards[gameID-1][jabY-1][jabX] === '🗿' ||
        gameBoards[gameID-1][jabY-1][jabX] === '🚪')
        return false;
    else if (gameBoards[gameID-1][jabY-1][jabX] === '🏁')
        winGame();
    else if (gameBoards[gameID-1][jabY-1][jabX] === '💎') {
        countGems++;
        gemsText.innerHTML = "Gems : " + countGems;
        gameBoards[gameID-1][jabY-1][jabX] = -1;
    }
    else if (gameBoards[gameID-1][jabY-1][jabX] === '🔑') {
        gameBoards[gameID-1][jabY-1][jabX] = 0;
        gameBoards[gameID-1][getDoorY()][getDoorX()] = 0;
    }
    else if (gameBoards[gameID-1][jabY-1][jabX] === '🪓') {
            gameBoards[gameID-1][jaby-1][jabX] = 0;
            haveAxe = true;
            spellBtn.innerHTML += axeBtn;
    }
    else if (gameBoards[gameID-1][jabY-1][jabX] === '🥗') {
            gameBoards[gameID-1][jabY-1][jabX] = -1;
            startMoves+=3;
            moveText.innerHTML = startMoves;
        }
    return true;
}
function checkDownItem() {
    if (gameBoards[gameID-1][jabY+1][jabX] === '🌳' || gameBoards[gameID-1][jabY+1][jabX] === '🗿'||
        gameBoards[gameID-1][jabY+1][jabX] === '🚪')
        return false;
    else if (gameBoards[gameID-1][jabY+1][jabX] === '🏁')
        winGame();
    else if (gameBoards[gameID-1][jabY+1][jabX] === '💎') {
        countGems++;
        gemsText.innerHTML = "Gems : " + countGems;
        gameBoards[gameID-1][jabY+1][jabX] = -1;
    }
    else if (gameBoards[gameID-1][jabY+1][jabX] === '🔑') {
        gameBoards[gameID-1][jabY+1][jabX] = 0;
        gameBoards[gameID-1][getDoorY()][getDoorX()] = 0;
    }
    else if (gameBoards[gameID-1][jabY+1][jabX] === '🪓') {
                gameBoards[gameID-1][jabY+1][jabX] = 0;
                haveAxe = true;
                spellBtn.innerHTML += axeBtn;
    }
    else if (gameBoards[gameID-1][jabY+1][jabX] === '🥗') {
        gameBoards[gameID-1][jabY+1][jabX] = -1;
        startMoves+=3;
        moveText.innerHTML = startMoves;
    }
    return true;
}

function checkRightPortal() {
    if (gameBoards[gameID-1][jabY][jabX+1] === '🌌') {
        gameBoards[gameID-1][jabY][jabX+1] = 0;
        return true;
    }
}

function checkLeftPortal() {
    if (gameBoards[gameID-1][jabY][jabX-1] === '🌌') {
        gameBoards[gameID-1][jabY][jabX-1] = 0;
        return true;
    }
}

function checkUpPortal() {
    if (gameBoards[gameID-1][jabY-1][jabX] === '🌌') {
        gameBoards[gameID-1][jabY-1][jabX] = 0;
        return true;
    }
}

function checkDownPortal() {
    if (gameBoards[gameID-1][jabY+1][jabX] === '🌌') {
        gameBoards[gameID-1][jabY+1][jabX] = 0;
        return true;
    }
}

function winGame() {
    alert("УРА ПОБЕДА!!!");
    location.reload(true);
}

function startGame() {
    if (isRunning == false) {
        isRunning = true;
        moveText.innerHTML = "Moves : " + startMoves;
        makeTurn(); 
    }
}

function loseGame() {
    if (startMoves <= 0) {
            alert("Вы проиграли");
            location.reload(true);
            isRunning = false;
        }
}

function reGenerateLevel() {
    startMoves = 3;
    moveText.innerHTML = "Moves : " + startMoves;
    gems = 0;
    gemsText.innerHTML = "Gems : " + gems; 
    gameID = Math.floor(Math.random() * (gameBoards.length)+1);
    render();
}

function getDoorX() {
    for (let i = 0; i < gameBoards[gameID-1].length; i++)
        for (let j = 0; j < gameBoards[gameID-1][i].length; j++)
            if (gameBoards[gameID-1][i][j] === '🚪')
                return j;
}

function getDoorY() {
    for (let i = 0; i < gameBoards[gameID-1].length; i++)
        for (let j = 0; j < gameBoards[gameID-1][i].length; j++)
            if (gameBoards[gameID-1][i][j] === '🚪')
                return i;
}

function getPortalY() {
    for (let i = 0; i < gameBoards[gameID-1].length; i++)
        for (let j = 0; j < gameBoards[gameID-1][i].length; j++)
            if (gameBoards[gameID-1][i][j] === '🌌')
                return i;
}

function getPortalX() {
    for (let i = 0; i < gameBoards[gameID-1].length; i++)
        for (let j = 0; j < gameBoards[gameID-1][i].length; j++)
            if (gameBoards[gameID-1][i][j] === '🌌')
                return j;
}

let breakLeft = "<button onClick = 'slayLeftTree()'>СЛЕВА</button>"
let breakRight = "<button onClick = 'slayRightTree()'>СПРАВА</button><br></br>"
let breakUp = "<button onClick = 'slayUpTree()'>СВЕРХУ</button>"
let breakDown = "<button onClick = 'slayDownTree()'>СНИЗУ</button>"

function createButtons() {
    spellBtn.innerHTML = '';
    spellBtn.innerHTML += breakLeft;
    spellBtn.innerHTML += breakRight;
    spellBtn.innerHTML += breakUp;
    spellBtn.innerHTML += breakDown;
}

function slayUpTree() {
    if (gameBoards[gameID-1][jabY-1][jabX] === '🌳') {
        gameBoards[gameID-1][jabY-1][jabX] = 0;
        haveAxe = false;
        spellBtn.innerHTML = '';
        render();
    }
    else alert("Это не дерево");
}
function slayDownTree() {
    if (gameBoards[gameID-1][jabY+1][jabX] === '🌳') {
        gameBoards[gameID-1][jabY+1][jabX] = 0;
        haveAxe = false;
        spellBtn.innerHTML = '';
        render();
   }
   else alert("Это не дерево");
}
function slayLeftTree() {
    if (gameBoards[gameID-1][jabY][jabX-1] === '🌳') {
        gameBoards[gameID-1][jabY][jabX-1] = 0;
        haveAxe = false;
        spellBtn.innerHTML = '';
        render();
    }
    else alert("Это не дерево");
}
function slayRightTree() {
    if (gameBoards[gameID-1][jabY][jabX+1] === '🌳') {
        gameBoards[gameID-1][jabY][jabX+1] = 0;
        haveAxe = false;
        spellBtn.innerHTML = '';
        render();
    }
    else alert("Это не дерево");
}
