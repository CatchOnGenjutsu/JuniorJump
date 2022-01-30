  let playGame = {
  startPlaying: function(){
    /* ------- begin view -------- */
    function PlayerView(){
      let personage = null;
      let playgroundContainer = null;
      let scoreArea = null;
      const jumpSound = new Audio('sounds/jupmFinal.mp3');
      const slap = new Audio('sounds/slap.mp3');
      const falling = new Audio('sounds/falling.mp3');
      const knock = new Audio('sounds/knock.mp3')

      this.init = function(container) { // View initialization
        playgroundContainer = container;
        personage = playgroundContainer.querySelector(".playerPersonage");
        scoreArea = playgroundContainer.querySelector(".scoreArea");
      }
      this.showPlayground = function(score, playerPersonageX, playerPersonageY){
        personage.style.left = playerPersonageX + "px";
        personage.style.top = playerPersonageY + "px";
        scoreArea.innerHTML = `${score}$`;
      }
      this.showFirstBoard = function (boardX, boardY){
        let board = document.createElement('div');
        board.classList.add('board');
        playgroundContainer.append(board);
        board.style.left = boardX + "px";
        board.style.top = boardY + "px";
      }
      this.createBoards = function (boardX, boardY){
        let board = document.createElement('div');
        board.classList.add('board');
        playgroundContainer.append(board);
        board.style.left = boardX + "px";
        board.style.top = boardY + "px";
      }
      this.personageMoveTop = function(personageY){
        personage.style.top = personageY + "px";
        
      }
      this.jumpTop = function(){
        jumpSound.pause();
        jumpSound.currentTime = 0;
        jumpSound.play();
      }
      this.personageMoveBot = function(personageY){
        if(personageY > playgroundContainer.offsetTop + playgroundContainer.offsetHeight){
          personage.style.display = "none";
        }
        personage.style.top = personageY + "px";
        if(personageY > playgroundContainer.offsetTop + playgroundContainer.offsetHeight){
          knock.play();
          this.createModalWindow();
        }
      }
      this.createModalWindow = function(){ // create a modal window at the end of the game
        const overlay = document.createElement('div');
        overlay.id = "overlay";
        overlay.classList.add('overlay');
        playgroundContainer.append(overlay);

        const modalWindow = document.createElement('div');
        modalWindow.id = "modalWindow";
        modalWindow.classList.add('modalWindow');
        playgroundContainer.append(modalWindow);
        modalWindow.style.top = playgroundContainer.offsetTop + playgroundContainer.offsetHeight/2 - modalWindow.offsetHeight/2 + "px";
        modalWindow.style.left = playgroundContainer.offsetLeft + playgroundContainer.offsetWidth/2 - modalWindow.offsetWidth/2 + "px";
        
        const modalTextContent = document.createElement('div');
        modalTextContent.id = "modalTextContent";
        modalTextContent.classList.add('modalTextContent');
        modalWindow.append(modalTextContent);
        const textContent = document.createElement('p');
        textContent.innerText = "Game over! You earned:".toUpperCase();
        modalTextContent.append(textContent);

        const modalScoreContent = document.createElement('div');
        modalScoreContent.id = "modalScoreContent";
        modalScoreContent.classList.add('modalTextContent');
        modalWindow.append(modalScoreContent);
        let scoreText = document.createElement('h1');
        scoreText = scoreArea.innerText;
        modalScoreContent.append(scoreText);

        const modalButtonContent = document.createElement('div');
        modalButtonContent.id = "modalButtonContent";
        modalButtonContent.classList.add('modalButtonContent');
        modalWindow.append(modalButtonContent);

        const modalButtonBack = document.createElement('div');
        modalButtonBack.id = "backButton";
        modalButtonBack.classList.add('modalButton');
        modalButtonContent.append(modalButtonBack);

        const backToMenuLink = document.createElement('a');
        backToMenuLink.innerText = "BACK\nTO MENU";
        backToMenuLink.id = "backToMenuLink";
        backToMenuLink.setAttribute("href", "#main");
        backToMenuLink.classList.add('modalButton');
        modalButtonBack.append(backToMenuLink);

        const modalButtonPlay = document.createElement('div');
        modalButtonPlay.id = "playButton";
        modalButtonPlay.classList.add('modalButton');
        modalButtonContent.append(modalButtonPlay);

        const playAgainLink = document.createElement('a');
        playAgainLink.innerText = "PLAY\nAGAIN";
        playAgainLink.id = "playAgainLink";
        playAgainLink.setAttribute("href", "#play");
        
        playAgainLink.classList.add('modalButton');
        modalButtonPlay.append(playAgainLink);
        playAgainLink.addEventListener('click', function playAgain(){
          location.hash = "#main";
          location.hash = "#play";
        });
      }
      this.movingLeftSide = function(playerPersonageX){
        personage.classList.add("jumpLeft");
        personage.style.left = playerPersonageX + "px";
      }
      this.movingRightSide = function(playerPersonageX){
        personage.classList.add("jumpRight");
        personage.style.left = playerPersonageX + "px";
      }
      this.stopMovingSide = function(){
        personage.classList.remove("jumpLeft");
        personage.classList.remove("jumpRight");
      }
      this.deleteBoards = function(){
        let boards = Array.from(playgroundContainer.getElementsByClassName("board"));
        for(let elem of boards){
          elem.remove();
        }
      }
      this.moveBoardsBottom = function(x, y) {
        let board = document.createElement('div'); 
        board.classList.add('board');
        playgroundContainer.append(board);
        board.style.left = x + "px";
        board.style.top = y + "px"; 
      }
      this.updateScore = function(score){
        scoreArea.innerHTML = `${score}$`;
      }
      this.createNewBoardOnMove = function(x, y){
        let board = document.createElement('div');
        board.classList.add('board');
        playgroundContainer.append(board);
        board.style.left = x + "px";
        board.style.top = y + "px";
      }
      this.createClient = function(x, y){
        let client = document.createElement('div');
        client.id = 'client';
        let classRandom = Math.round(Math.random());
        if (classRandom == 1){
          client.classList.remove('teamLead');
          client.classList.add('client');
        } else if (classRandom == 0) {
          client.classList.remove('client');
          client.classList.add('teamLead');
        }
        playgroundContainer.append(client);
        client.style.left = x + "px";
        client.style.top = y + "px";
      }
      this.clientMoveBottom = function(x, y){
        let client = document.getElementById('client');
        let clientClass = null;
        clientClass = client.getAttribute('class'); 
        client.remove();
        let newClient = document.createElement('div');
        newClient.id = 'client';
        newClient.classList.add(clientClass);
        playgroundContainer.append(newClient);
        newClient.style.left = x + "px";
        newClient.style.top = y + "px";
      }
      this.clientMovingSides = function(x, y){
        let client = document.getElementById('client');
        let clientClass = null;
        clientClass = client.getAttribute('class'); 
        client.remove();
        let newClient = document.createElement('div');
        newClient.id = 'client';
        newClient.classList.add(clientClass);
        playgroundContainer.append(newClient);
        newClient.style.left = x + "px";
        newClient.style.top = y + "px";
      }
      this.clientRemoving = function(){
        let client = document.getElementById('client');
        client.remove();
      }
      this.createDeadline = function(x, y){
        let deadline = document.createElement('div');
        deadline.id = 'deadline';
        deadline.classList.add('deadline');
        playgroundContainer.append(deadline);
        deadline.style.left = x + "px";
        deadline.style.top = y + "px";
      }
      this.deadlineMoveBottom = function(x, y){
        let deadline = document.getElementById('deadline');
        deadline.remove();
        let newDeadline = document.createElement('div');
        newDeadline.id = 'deadline';
        newDeadline.classList.add('deadline');
        playgroundContainer.append(newDeadline);
        newDeadline.style.left = x + "px";
        newDeadline.style.top = y + "px";
      }
      this.deadlineRemoving = function(){
        let deadline = document.getElementById('deadline');
        deadline.remove();
      }
      this.doSlap = function(){
        slap.play();
      }
      this.showFalling = function(y){
        falling.play();
        personage.style.top = y + "px";
        if (y + personage.offsetHeight/2 >= playgroundContainer.offsetTop + playgroundContainer.offsetHeight){
          personage.style.display = "none";
        }
        if(y >= playgroundContainer.offsetTop + playgroundContainer.offsetHeight){
          knock.play();
        }
      }
      this.valueCheck = function(loginInputValue){
        if(!loginInputValue){
          playgroundContainer.querySelector(".warningMessage").innerText = "Come on! Write something!";
        } else if( loginInputValue.length > playgroundContainer.querySelector("#inputArea").dataset.length){
          playgroundContainer.querySelector(".warningMessage").innerText = "Too much! Max 15 symbols";
        } else{
          playgroundContainer.querySelector(".warningMessage").innerText = "";
        }
      }
      this.closeNicknameWindow = function(){
        playgroundContainer.querySelector("#loginOverlay").remove();
        playgroundContainer.querySelector("#loginWindow").remove();
      }
    }
    /* -------- end view --------- */

    /* ------- begin model ------- */
    function PlayerModel(){
      const stringName = 'KOZLOV_JUNIORJUMP_FD2PROJECT';
      const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
      let updatePassword = null; // password 
      let viewContainer = null; // View 
      let nickName = null; // Nickname
      let currentResult = []; // result of a game
      let resultArray = []; // results table
      let recordsReadCounter = null; // result record counter

      let isGameProcess = null; // game progress flag

      const boardsArray = []; // array of boards coordinates
      let score = 0;
      let xMin = null; // minimum X to create boards
      let xMax = null; // maximum X to create boards
      let boardWidth = null;
      let boardHeight = null;
      let cleanTableHeight = null;
      let playerPersonageY = null;
      let playerPersonageX = null;
      let firstComplexityInterval = null; // difficulty level variable

      let startMoveSpeedTop = null; 
      let maxDistance = null; // maximum jump distance
      let minDistance = null; // minimum jump distance
      // let movespeedTop = null;
      let gravity = 0.9; // gravity coefficient
      let counterTop = 15; // counter to jump up

      let moveBottomSpeed = null; // downward speed
      let playgroundHeight = null
      let personageHeight = null;
      let personageWidth = null;

      let speedX = null; // character speed along x-axis
      let leftEdge = null; // left edge of playtable
      let rightEdge = null; // right edge of playtable

      let boardsMoveLength = null; // boards travel distance
      let bottomEdgeOfField = null; // bottom edge of playtable
      const boardMoveSpeed = 1; // boards speed

      let clientСoordinates = []; // client coordinates array
      let playtableOffTop = null; // playtable offsetTop
      let playtableOffWidth = null; // playtable offsetWidth
      let playtableOffHeight = null; // playtable offsetHeight
      let clientSpeed = 1; // client speed along x-axis coordinates array
      let deadlineCoordinates = [];  // deadline coordinates array
      const boardsMovespeed = 2; // downward speed of the boards
      
      const verticalMoveSpeedTimer = 20; // timer for setTimeout functions
      const that = this;
      this.init = function (view) { // PlayerModel init method 
        viewContainer = view;
      }
      this.valueCheck = function(loginInputValue){ // Value validation
        viewContainer.valueCheck(loginInputValue);
      }
      this.saveNickname = function(loginInputValue){ // Save Nickname value in model
        if(loginInputValue){
          nickName = loginInputValue;
          viewContainer.closeNicknameWindow();
        } else{
          viewContainer.valueCheck(loginInputValue);
        }
      }
      this.reloadInit = function() { // Adding listeners for state change
        if (isGameProcess){
          window.addEventListener("beforeunload", this.reloading);
          window.addEventListener("hashchange", this.goBackToMenu);
        } else{
          window.removeEventListener("beforeunload", this.reloading);
          window.removeEventListener("hashchange", this.goBackToMenu);
        }
      }
      this.goBackToMenu = function(){ // onhashchange actions
        isGameProcess = false;
        that.reloadInit()
      }
      this.reloading = function(event){ // beforeunload actions
        event.preventDefault();
        event.returnValue = "";
      }
      this.getRandomArbitrary = function (min, max) { // Function for obtaining a random number in a given interval
        return Math.floor(Math.random() * (max - min) + min);
      }
      /* V------- Creating a play area, saving the necessary data  -------V */
      this.createPlayground = function(playerPersonageStartX, playerPersonageStartY, bottomLine, offTop, offWidth, offHeight, minX, maxX, boardWidthIncoming, boardHeightIncoming, moveBottomSpeedIncoming) {
        isGameProcess = true;
        this.reloadInit();
        recordsReadCounter = 0;
        bottomEdgeOfField = bottomLine;
        playerPersonageX = playerPersonageStartX;
        playerPersonageY = playerPersonageStartY;
        playtableOffTop = offTop;
        playtableOffWidth = offWidth;
        playtableOffHeight = offHeight;
        cleanTableHeightStart = offHeight;
        xMin = minX;
        xMax = maxX;
        boardWidth = boardWidthIncoming;
        boardHeight = boardHeightIncoming;
        moveBottomSpeed = moveBottomSpeedIncoming;
        viewContainer.showPlayground(score, playerPersonageX, playerPersonageY);
      }
      /* ^------- Creating a play area, saving the necessary data -------^ */
      this.createFirstBoard = function (minYForCreateFirstBoard, maxYForCreateFirstBoard){  /* V------- Creating the first board  -------V */
        let boardX = this.getRandomArbitrary(xMin, xMax);
        let boardY = this.getRandomArbitrary(minYForCreateFirstBoard, maxYForCreateFirstBoard);
        let boardCoordinates = [];
        boardCoordinates.push(Math.floor(boardY));
        boardCoordinates.push(Math.floor(boardY + boardHeight));
        boardCoordinates.push(Math.floor(boardX));
        boardCoordinates.push(Math.floor(boardX + boardWidth));
        boardsArray.push(boardCoordinates);
        cleanTableHeight = Math.round(boardY - boardHeight);
        viewContainer.showFirstBoard(boardX, boardY);
      } /* ^------- Creating the first board -------^ */
      this.createBoards = function (firstComplexityIntervalIncoming){ /* V------- Creating the boards array  -------V */
        firstComplexityInterval = firstComplexityIntervalIncoming;
        let boardX = this.getRandomArbitrary(xMin, xMax);
        let boardY = this.getRandomArbitrary((cleanTableHeight - firstComplexityInterval), cleanTableHeight);
        let boardСoordinates = [];
        boardСoordinates.push(Math.floor(boardY));
        boardСoordinates.push(Math.floor(boardY + boardHeight));
        boardСoordinates.push(Math.floor(boardX));
        boardСoordinates.push(Math.floor(boardX + boardWidth));
        boardsArray.push(boardСoordinates);
        cleanTableHeight = Math.round(boardY - boardHeight);
        viewContainer.createBoards(boardX, boardY);
        if (cleanTableHeight > firstComplexityInterval){
          this.createBoards(firstComplexityInterval);
        }
      } /* ^------- Creating the boards array -------^ */
      /* V------- Receiving and saving data necessary for moving  -------V */
      this.startMoveInit = function(personageOffTopStart, maxDist, minDist, startMoveSpeed, playgroundHeightMax, bottomSpeed, personageOffHeight, personageOffWidth, horizontalSpeed, leftEdgeIncoming, rightEdgeIncoming){
        playerPersonageY = personageOffTopStart;
        maxDistance = maxDist;
        minDistance = minDist;
        startMoveSpeedTop = startMoveSpeed;
        playgroundHeight = playgroundHeightMax;
        moveBottomSpeed = bottomSpeed;
        personageHeight = personageOffHeight;
        personageWidth = personageOffWidth;
        speedX = horizontalSpeed;
        leftEdge = leftEdgeIncoming;
        rightEdge = rightEdgeIncoming;
      } /* ^------- Receiving and saving data necessary for moving -------^ */
      this.personageMoveTop = function(){
        if(isGameProcess){
          if (!that.bumpCheck()){
            if (playerPersonageY >= maxDistance && startMoveSpeedTop > 0) {
              playerPersonageY -= startMoveSpeedTop;
              viewContainer.personageMoveTop(playerPersonageY);
              startMoveSpeedTop = Math.floor(startMoveSpeedTop*gravity);
              setTimeout(that.personageMoveTop, verticalMoveSpeedTimer);
            } else if (startMoveSpeedTop <= 0 && playerPersonageY >= maxDistance && counterTop != 0){
              counterTop -= 1;
              setTimeout(that.personageMoveTop, verticalMoveSpeedTimer);
            } else if (playerPersonageY <= maxDistance && counterTop != 0){
              counterTop -= 1;
              let startMoveSpeedTop = 0;
              setTimeout(that.personageMoveTop, verticalMoveSpeedTimer);
            } 
            else if(counterTop == 0) {
              setTimeout(that.personageMoveBot, verticalMoveSpeedTimer);
            }
          }
        }
      }
      this.personageMoveBot = function(){
        if (!that.bumpCheck()){
          if (playerPersonageY <= playgroundHeight) {
          playerPersonageY += moveBottomSpeed;
          moveBottomSpeed = moveBottomSpeed*1.05;
          let i = 0;
          let direction = null;
            do{
                if ((playerPersonageY + personageHeight > boardsArray[i][0]) && (playerPersonageY + personageHeight < boardsArray[i][1]) && (playerPersonageX + personageWidth/2 > boardsArray[i][2]) && (playerPersonageX + personageWidth/2 < boardsArray[i][3])){ // проверка попадания на доску
                  direction = 0;
                  let diff = minDistance - boardsArray[i][0];
                  if (boardsArray[i][0] < minDistance){
                    setTimeout(that.moveBoards(diff), verticalMoveSpeedTimer);
                  }
                }
              i++;
            } while (i < boardsArray.length) 
            if (direction == 0) {
              startMoveSpeedTop = personageHeight/2;
              counterTop = 15;
              moveBottomSpeed = personageHeight/32;
              setTimeout(that.personageMoveTop, verticalMoveSpeedTimer);
              viewContainer.jumpTop();
            } else {
              viewContainer.personageMoveBot(playerPersonageY);
              setTimeout(that.personageMoveBot, verticalMoveSpeedTimer);
            }
          }
          if (playerPersonageY >= playgroundHeight){
            window.removeEventListener("beforeunload", that.reloading);
            window.removeEventListener("hashchange", that.backToMenu);
          }
          if (playerPersonageY >= playgroundHeight){
            that.lockGetReady();
            isGameProcess = false;
            that.reloadInit();
          }
        }
      }
      this.movingLeftSide = function(){
        playerPersonageX -= speedX;
        if (playerPersonageX < leftEdge - personageWidth/2) {
          playerPersonageX = rightEdge - personageWidth;
        };
        viewContainer.movingLeftSide(playerPersonageX);
      }
      this.movingRightSide = function(){
        if (playerPersonageX < rightEdge - personageWidth/2) {
          playerPersonageX += speedX;
        } else {
          playerPersonageX = leftEdge;
        }
        viewContainer.movingRightSide(playerPersonageX);
      }
      this.stopMovingSide = function(){
        viewContainer.stopMovingSide();
      }
      this.moveBoards = function(x){
        boardsMoveLength = Math.round(x);
        this.moveBoardsTimer();
      }
      this.moveBoardsTimer = function(){
        viewContainer.deleteBoards(playerPersonageX);
        that.clientMoveBottom();
        that.deadlineMoveBottom();
        boardsArray.forEach(function(item) { // board movement
          if (item[0] < bottomEdgeOfField - (item[1] - item[0])){ 
            item[0] += boardsMovespeed; 
            item[1] += boardsMovespeed; 
            let boardX = item[2];
            let boardY = item[0];
            viewContainer.moveBoardsBottom(boardX, boardY);
          }
          if (item[0] >= bottomEdgeOfField - (item[1] - item[0])) { // removing old boards from the array
            boardsArray.shift();
          }
        }) 
        boardsMoveLength -= 2; 
        score += 1;
        if (score > 1 && score % 750 === 0){
          that.createDeadline();
        }
        if (score > 1 && score % 1000 === 0){
          that.createClient();
        }
        viewContainer.updateScore(score);
        if (score < 5000){ //first level of difficulty
          if (boardsArray[boardsArray.length-1][0] >= firstComplexityInterval-personageHeight*2) {
            that.createNewBoardCoordinates(that.getRandomArbitrary(boardsArray[boardsArray.length-1][0] - firstComplexityInterval, boardsArray[boardsArray.length-1][0]-boardHeight));
          }
        }
        if (score >= 5000 && score < 10000){ //second level of difficulty
          if (boardsArray[boardsArray.length-1][0] >= firstComplexityInterval-personageHeight*2) {
            that.createNewBoardCoordinates(boardsArray[boardsArray.length-1][0] - firstComplexityInterval);
          }
        }
        if (score >= 10000){
          if (boardsArray[boardsArray.length-1][0] >= firstComplexityInterval) { //third level of difficulty
            that.createNewBoardCoordinates(boardsArray[boardsArray.length-1][0] - firstComplexityInterval*1.7);
          }
        }
        if (boardsMoveLength > 0){
          setTimeout(that.moveBoardsTimer, boardMoveSpeed);
        }
      }
      this.createNewBoardCoordinates = function(yBoard){
        let boardX = that.getRandomArbitrary(leftEdge, rightEdge - boardWidth*1.5);
        let boardY = yBoard;
        viewContainer.createNewBoardOnMove(boardX, boardY)
        let boardСoordinates = [];
        boardСoordinates.push(boardY);
        boardСoordinates.push(boardY + boardHeight);
        boardСoordinates.push(boardX);
        boardСoordinates.push(boardX + boardWidth);
        boardsArray.push(boardСoordinates);
      }
      this.createClient = function(){
        let clientX = Math.round(that.getRandomArbitrary(leftEdge + playtableOffWidth*0.2, leftEdge + playtableOffWidth - personageWidth*2));
        let clientY = Math.round(playtableOffTop - personageHeight*1.5);
        viewContainer.createClient(clientX, clientY);
        clientСoordinates.push(clientY);
        clientСoordinates.push(Math.round(clientY + personageHeight));
        clientСoordinates.push(clientX);
        clientСoordinates.push(Math.round(clientX + personageWidth));
        
      }
      this.clientMoveBottom = function(){
        if (clientСoordinates[0] || clientСoordinates[0] >= 0){
          if (clientСoordinates[0] < playtableOffTop + playtableOffHeight - personageHeight/2){
          clientСoordinates[0] += boardsMovespeed;
          clientСoordinates[1] += boardsMovespeed;
          let newClientX = clientСoordinates[2];
          let newClientY = clientСoordinates[0];
          viewContainer.clientMoveBottom(newClientX, newClientY);
        } else if (clientСoordinates[0] >= playtableOffTop + playtableOffHeight - personageHeight/2){
          viewContainer.clientRemoving();
          clientСoordinates = [];
        }
        }
      }
      this.clientMovingSides = function(){
        if (playerPersonageY < bottomEdgeOfField){
          if(clientСoordinates[3] > leftEdge + playtableOffWidth*0.9){
            clientSpeed = -clientSpeed;
          }
          if ((clientСoordinates[0] || clientСoordinates[0] >= 0) &&
          clientСoordinates[0] <= playtableOffTop + playtableOffHeight - personageHeight/2) { 
            clientСoordinates[2] += clientSpeed;
            clientСoordinates[3] += clientSpeed;
            let newClientX = clientСoordinates[2];
            let newClientY = clientСoordinates[0];
            viewContainer.clientMovingSides(newClientX, newClientY);
          }
          if (clientСoordinates[2] < leftEdge + playtableOffWidth*0.1) {
            clientSpeed = -clientSpeed;
          }
          setTimeout(that.clientMovingSides, 2);
        }
      }
      this.createDeadline = function(){
        let deadlineX = Math.round(that.getRandomArbitrary(leftEdge + playtableOffWidth*0.2, leftEdge + playtableOffWidth - personageWidth*2));
        let deadlineY = Math.round(playtableOffTop - personageHeight*1.5);
        viewContainer.createDeadline(deadlineX, deadlineY);
        deadlineCoordinates.push(deadlineY);
        deadlineCoordinates.push(Math.round(deadlineY + personageHeight));
        deadlineCoordinates.push(deadlineX);
        deadlineCoordinates.push(Math.round(deadlineX + personageWidth));
        
      }
      this.deadlineMoveBottom = function(){
        if (deadlineCoordinates[0] || deadlineCoordinates[0] >= 0){
          if (deadlineCoordinates[0] < playtableOffTop + playtableOffHeight - personageHeight/2){
          deadlineCoordinates[0] += boardsMovespeed;
          deadlineCoordinates[1] += boardsMovespeed;
          let newDeadlineX = deadlineCoordinates[2];
          let newDeadlineY = deadlineCoordinates[0];
          viewContainer.deadlineMoveBottom(newDeadlineX, newDeadlineY);
        } else if (deadlineCoordinates[0] >= playtableOffTop + playtableOffHeight - personageHeight/2){
          viewContainer.deadlineRemoving();
          deadlineCoordinates = [];
        }
        }
      }
      this.bumpCheck = function() {
        if(((playerPersonageY + personageHeight > clientСoordinates[0]) && (playerPersonageY + personageHeight < clientСoordinates[1]) && (playerPersonageX + personageWidth > clientСoordinates[2]) && (playerPersonageX + personageWidth < clientСoordinates[3])) || ((playerPersonageY + personageHeight > clientСoordinates[0]) && (playerPersonageY + personageHeight < clientСoordinates[1]) && (playerPersonageX > clientСoordinates[2]) && (playerPersonageX < clientСoordinates[3])) || ((playerPersonageY > clientСoordinates[0]) && (playerPersonageY < clientСoordinates[1]) && (playerPersonageX + personageWidth > clientСoordinates[2]) && (playerPersonageX + personageWidth < clientСoordinates[3])) || ((playerPersonageY > clientСoordinates[0]) && (playerPersonageY < clientСoordinates[1]) && (playerPersonageX > clientСoordinates[2]) && (playerPersonageX < clientСoordinates[3]))){
          viewContainer.doSlap();
          that.lockGetReady();
          isGameProcess = false;
          that.reloadInit();
          setTimeout(that.actionOnLoss, 1500);
          setTimeout(viewContainer.createModalWindow, 1700);;
          return true;
        }
        if(((playerPersonageY + personageHeight > deadlineCoordinates[0]) && (playerPersonageY + personageHeight < deadlineCoordinates[1]) && (playerPersonageX + personageWidth > deadlineCoordinates[2]) && (playerPersonageX + personageWidth < deadlineCoordinates[3])) || ((playerPersonageY + personageHeight > deadlineCoordinates[0]) && (playerPersonageY + personageHeight < deadlineCoordinates[1]) && (playerPersonageX > deadlineCoordinates[2]) && (playerPersonageX < deadlineCoordinates[3])) || ((playerPersonageY > deadlineCoordinates[0]) && (playerPersonageY < deadlineCoordinates[1]) && (playerPersonageX + personageWidth > deadlineCoordinates[2]) && (playerPersonageX + personageWidth < deadlineCoordinates[3])) || ((playerPersonageY > deadlineCoordinates[0]) && (playerPersonageY < deadlineCoordinates[1]) && (playerPersonageX > deadlineCoordinates[2]) && (playerPersonageX < deadlineCoordinates[3]))){
          viewContainer.doSlap();
          that.lockGetReady();
          isGameProcess = false;
          that.reloadInit();
          setTimeout(that.actionOnLoss, 1500);
          setTimeout(viewContainer.createModalWindow, 1700);;
          return true;
        }
      }
      this.actionOnLoss = function() {
        if (playerPersonageY <= playtableOffTop + playtableOffHeight) {
        playerPersonageY += moveBottomSpeed;
        viewContainer.showFalling(playerPersonageY);
        moveBottomSpeed = moveBottomSpeed*1.05;
        setTimeout(that.actionOnLoss, verticalMoveSpeedTimer);
        }
      }
    /* V------- Save records using AJAX -------V */
      this.lockGetReady = function () {
        if (recordsReadCounter < 1){
          updatePassword=Math.random();
            $.ajax( {
              url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
              data : { f : 'LOCKGET', n : stringName, p : updatePassword },
              success : this.recordsPrepareUpdate, error : that.errorHandler
            }
          );
          recordsReadCounter += 1;
        }
      }
      this.recordsPrepareUpdate = function(recordsString){
        currentResult.push(nickName);
        currentResult.push(score);
        resultArray = JSON.parse(recordsString.result);
        resultArray.push(currentResult);

        resultArray.sort(function(a, b){
          if (a[1] > b[1]) {
            return -1;
          }
          if (a[1] < b[1]) {
            return 1;
          }
        })
        if(resultArray.length > 10){
          resultArray.length = 10;
        }
        that.updateData();
      }
      this.updateData = function () {
        $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'UPDATE', n : stringName, v : JSON.stringify(resultArray), p : updatePassword },
            success : that.updateReady, error : that.errorHandler
          }
        );
      }
      this.errorHandler = function (statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
      }
      this.updateReady = function (result) {
        if (result.error!=undefined )
          alert(result.error);
      }
    /* ^------- Save records using AJAX -------^ */
    }
    /* -------- end model -------- */

    /* ----- begin controller ---- */
    function PlayerController(){
      const that = this;
      let mainContainer = null;
      let personage = null;
      let personageModel = null;
      let pressedKeys = null;
    
      this.init = function (container, personageContainer, model) { // PlayerController init method
        mainContainer = container;
        personage = personageContainer;
        personageModel = model;
        /* ------ Add event listener to buttons ----- */
        const inputForm = mainContainer.querySelector('.formContent');
        inputForm.addEventListener("input", this.valueCheck);

        const submitButton = mainContainer.querySelector('#submitButton');
        submitButton.addEventListener("click", this.submitNickname);
        
        const moveLeftButton = mainContainer.querySelector(".buttonLeft");
        moveLeftButton.addEventListener("mousedown", this.moveLeftTimer);

        const moveRightButton = mainContainer.querySelector(".buttonRight");
        moveRightButton.addEventListener("mousedown", this.moveRightTimer);
        /* ------ Add event listener to buttons ----- */
        
        this.createPlayground();
        this.createFirstBoard();
        this.createBoards();

        /* ------ Creating a store of pressed buttons ----- */
        function PressedKeysRegistry() { 
          this.counter = this.counter.bind(this);
        }

        PressedKeysRegistry.prototype = {
          constructor: PressedKeysRegistry,
          start: function() {
            addEventListener("keydown", this.counter);
            addEventListener("keyup", this.counter);
          },
          counter: function(event) {
            if(event.type === "keydown") {
              if(this[event.code]) return;
              this[event.code] = true;
            } else if(event.type === "keyup") {
              delete this[event.code];
            }
          }
        };
        pressedKeys = new PressedKeysRegistry(); 
        /* ------ Creating a store of pressed buttons ----- */
      }
      this.createPlayground = function() { // Creating a play area
        personageModel.createPlayground((mainContainer.offsetLeft + mainContainer.offsetWidth/2 - personage.offsetWidth/2), (mainContainer.offsetTop + mainContainer.offsetHeight - personage.offsetHeight*2), mainContainer.offsetTop + mainContainer.offsetHeight, mainContainer.offsetTop, mainContainer.offsetWidth, mainContainer.offsetHeight, mainContainer.offsetLeft, mainContainer.offsetLeft + mainContainer.offsetWidth - mainContainer.offsetWidth/7*1.5, mainContainer.offsetWidth/7, mainContainer.offsetHeight/72, personage.offsetHeight/32);
      }
      this.createFirstBoard = function(){ // Creating the first board
        personageModel.createFirstBoard((mainContainer.offsetTop + mainContainer.offsetHeight - personage.offsetHeight*2) + personage.offsetHeight + mainContainer.offsetHeight/72, mainContainer.offsetTop + mainContainer.offsetHeight - mainContainer.offsetHeight/72);
      }
      this.createBoards = function(){ // Creating the boards array
        personageModel.createBoards((mainContainer.offsetTop + mainContainer.offsetHeight - personage.offsetHeight*2) - (mainContainer.offsetTop + mainContainer.offsetHeight*0.75));
      }
      this.loop = function() { // Checking the store of the pressed buttons for moving
        if("ArrowLeft" in pressedKeys){
          that.movingLeftSide();
        }
        if("ArrowRight" in pressedKeys){
          that.movingRightSide();
        }
        document.addEventListener("keyup", (e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            that.stopMovingSide()
          }
        });
        setTimeout(that.loop, 2);
      };
      this.valueCheck = function(event){ // Input validation
        event.preventDefault();
        let loginInputValue = mainContainer.querySelector('#inputArea').value;
        personageModel.valueCheck(loginInputValue);
        
      }
      this.submitNickname = function(event){ // Submit validation
        event.preventDefault();
        let loginInputValue = mainContainer.querySelector('#inputArea').value;
        if(loginInputValue && loginInputValue.length <= mainContainer.querySelector('#inputArea').dataset.length){
          personageModel.saveNickname(loginInputValue);
          setTimeout(that.personageMoveTop, 1000);
        }
      }
      this.personageMoveTop = function(){ // Player personage moving top
        pressedKeys.start(); 
        that.loop();
        personageModel.clientMovingSides();
        personageModel.startMoveInit(personage.offsetTop, mainContainer.offsetTop + mainContainer.offsetHeight*0.6, mainContainer.offsetTop + mainContainer.offsetHeight*0.9, personage.offsetHeight/2, mainContainer.offsetTop + mainContainer.offsetHeight, personage.offsetHeight/32, personage.offsetHeight, personage.offsetWidth, mainContainer.offsetWidth/300, mainContainer.offsetLeft, mainContainer.offsetLeft + mainContainer.offsetWidth);
        personageModel.personageMoveTop();
      }
      this.moveLeftTimer = function(){ // Player personage moving left(for mobile)
        personageModel.movingLeftSide();
        setTimeout(that.moveLeftTimer, 2);
      }
      this.moveRightTimer = function(){ // Player personage moving right(for mobile)
        personageModel.movingRightSide();
        setTimeout(that.moveRightTimer, 2);
      }
      this.movingLeftSide = function(){ // Player personage moving left
        personageModel.movingLeftSide();
      }
      this.movingRightSide = function(){ // Player personage moving right
        personageModel.movingRightSide();
      }
      this.stopMovingSide = function(){ // Player personage stop moving(clear moving class)
        personageModel.stopMovingSide();
      }
    }
    /* ------ end controller ----- */

    //global init
    const myPlayerModel = new PlayerModel();
    const myPlayerView = new PlayerView();
    const myPlayerController = new PlayerController();

    //call init methods
    const container = document.querySelector("#main");
    const personageContainer = document.querySelector("#playerPersonage");
  
    myPlayerView.init(container);
    myPlayerModel.init(myPlayerView);
    myPlayerController.init(container, personageContainer, myPlayerModel);
    
  }
}
