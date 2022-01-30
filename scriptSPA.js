const mySPA = (function() {
    
  /* ------- begin view -------- */
  function ModuleView() {
    let myModuleContainer = null;
    let menu = null;
    let contentContainer = null;

    const MainComponent = {
      id: "main",
      render: (className = "container") => {
        return `
        <div class="app" id="app">
        <h1 class="mainPageText">JuniorJump</h1>
          <div class="links">
            <div class="linksButton">
              <a href="#play">Play</a>
            </div>
            <div class="linksButton">
              <a href="#records">Records</a>
            </div>
            <div  class="linksButton">
              <a href="#about">About</a>
            </div>
          </div>
        </div>
        `;
      }
    };

    const PlayComponent = {
      id: "play",
      render: (className = "container") => {
        return `
        <div id="playerPersonage" class="playerPersonage"></div>
        <div class="scoreArea" id="scoreArea"></div>
        <div class = "moveButtonArea">
          <button class = "moveButton buttonLeft" id = "moveLeft"><</button>
          <button class = "moveButton buttonRight">></button>
        </div>

        <div class="overlay" id="loginOverlay"></div>
        <div class="modalWindow loginWindow" id="loginWindow">
                <div class="modalTextContent loginTextContent" id="loginTextContent">
                  <p>ENTER YOUR NICKNAME:</p>
                </div>
                <div class="modalTextContent" id="modalTextContent">
                    <form class="formContent" name="publish">
                      <input data-length="15" type="text" name="message" id = "inputArea" placeholder="TeamLead_666"/>
                        <p class = "warningMessage"></p>
                      <input type="submit" id = "submitButton" value="Submit"/>
                    </form>
                </div>
                <div class="modalTextContent">
                  <div class="inputBackButton backFromSubmit">
                    <a href="#main">Back</a>
                  </div>
                </div>
        </div>
        `;
      }
    };

    const AboutComponent = {
      id: "about",
      render: (className = "container") => {
        return `
        <div class="app" id="app">
        <h1 class="aboutPageText">About this game:</h1>
        <div class="userInfo">
          <img src="image/standart_cuted.png" class="userImage"></img>
          <div class="userDescription">
              It's you, junior web developer. Jump up the career ladder to become more experienced and earn as much money as possible. If you fall, you lose and you have to start all over again. Use the right and left arrows on your keyboard to control your character.
            </div>
        </div>
        <div class="clientInfo">
          <img src="image/client.png" class="clientImage"></img>
          <div class="clientDescription">
            This is an enraged client who is dissatisfied with the work you have done. If he gets you, then it will not end well for you. Avoid it.
          </div>
        </div>
        <div class="teamleadInfo">
          <img src="image/teamLead.png" class="teamleadImage"></img>
          <div class="teamleadDescription">
            This is a Team Lead. He checks how the juniors work. If there are errors in your code, it would be better for you to fix them before the code review.
          </div>
        </div>
        <div class="deadlineleadInfo">
          <img src="image/blackHole1.png" class="dealineImage"></img>
          <div class="deadlineDescription">
              Ooooh you know what it is, just avoid it.
          </div>
        </div>
        <div class="linksButton">
          <a href="#main">Back</a>
        </div>
        </div>
        `;
      }
    };

    const RecordsComponent = {
      id: "records",
      render: (className = "container") => {
        return `
        <div class="app" id="app">
        <h1 class="aboutPageText recordPageText">Records</h1>
        <table class = "recordsTable" border="1">
        <thead>
          <tr>
          <th>Place</th>
          <th>Nickname</th>
          <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td class = "nicknameCells"></td><td class = "scoreCells"></td></tr>
          <tr><td>2</td><td class = "nicknameCells"></td><td class = "scoreCells"></td></tr>
          <tr><td>3</td><td class = "nicknameCells"></td><td class = "scoreCells"></td></tr>
          <tr><td>4</td><td class = "nicknameCells"></td><td class = "scoreCells"></td></tr>
          <tr><td>5</td><td class = "nicknameCells"></td><td class = "scoreCells"></td></tr>
          <tr><td>6</td><td class = "nicknameCells"></td><td class = "scoreCells"></td></tr>
          <tr><td>7</td><td class = "nicknameCells"></td><td class = "scoreCells"></td></tr>
          <tr><td>8</td><td class = "nicknameCells"></td><td class = "scoreCells"></td></tr>
          <tr><td>9</td><td class = "nicknameCells"></td><td class = "scoreCells"></td></tr>
          <tr><td>10</td><td class = "nicknameCells"></td><td class = "scoreCells"></td></tr>
        </tbody>
        </table>
        <div class="linksButton">
          <a href="#main">Back</a>
        </div>
        </div>
        `;
      }
    };

    const router = {
      main: MainComponent,
      play: PlayComponent,
      about: AboutComponent,
      records: RecordsComponent,
      default: MainComponent,
    };

    this.init = function(container) {
      myModuleContainer = container;
    }

    this.renderContent = function(hashPageName) {
      let routeName = "default";
      if (hashPageName.length > 0) {
        routeName = hashPageName;
      }
      myModuleContainer.innerHTML = router[routeName].render(`${routeName}-page`);
      if (hashPageName == "play"){
        playGame.startPlaying();
      }
      
    }
    this.goBackToMenu = function(event){
      let confirmation = confirm("Are you sure about that!?\nYou will lose all your money!");
      if(confirmation){
        event.preventDefault();
        event.returnValue = "";
      }
    }
    this.errorHandler = function (jqXHR,statusStr,errorStr) {
      alert(statusStr+' '+errorStr);
    }

    this.showRecords = function (recordsArr) {
      let recordsArray = recordsArr;
      let nicknameCells = myModuleContainer.querySelectorAll('.nicknameCells');
      let scoreCells = myModuleContainer.querySelectorAll('.scoreCells');
      for(let i = 0; i < recordsArray.length; i++) {
        nicknameCells[i].innerHTML = recordsArray[i][0];
        scoreCells[i].innerHTML = `${recordsArray[i][1]}$`;
      }
    }
  };
  /* -------- end view --------- */
  /* ------- begin model ------- */
  function ModuleModel () {
      let myModuleView = null;
      const stringName = 'KOZLOV_JUNIORJUMP_FD2PROJECT';
      const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
      let resultArray = null;
      // const that = this;
      this.init = function(view) {
        myModuleView = view;
      }

      this.readRecords = function(){
        $.ajax(
          {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : this.recordsPrepareToShow, error : myModuleView.errorHandler
          }
        );
      }
      this.recordsPrepareToShow = function(recordsString){
        resultArray = JSON.parse(recordsString.result);
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
        myModuleView.showRecords(resultArray);
      }
      this.updateState = function(hashPageName) {
        if (hashPageName === 'records'){
          this.readRecords();
        }
        myModuleView.renderContent(hashPageName);
      }
      
  }

  /* -------- end model -------- */
  /* ----- begin controller ---- */
  function ModuleController () {
      let myModuleContainer = null;
      let myModuleModel = null;

      this.init = function(container, model) {
        myModuleContainer = container;
        myModuleModel = model;

        // вешаем слушателя на событие hashchange
        window.addEventListener("hashchange", this.updateState);
        this.updateState(); //первая отрисовка
      }

      this.updateState = function() {
        const hashPageName = location.hash.slice(1).toLowerCase();
        myModuleModel.updateState(hashPageName);
      }
  };
  /* ------ end controller ----- */

  return {
      init: function(container) {
        // this.main(container);

        const view = new ModuleView();
        const model = new ModuleModel();
        const controller = new ModuleController();

        //связываем части модуля
        view.init(document.getElementById(container));
        model.init(view);
        controller.init(document.getElementById(container), model);
      },

      // main: function(container) {
      //   //предварительно что то можно сделать
      //   console.log(`Иницилизируем SPA для контейнера "${container}"`);
      // },
  };

}());
/* ------ end app module ----- */

/*** --- init module --- ***/
document.addEventListener("DOMContentLoaded", mySPA.init("main")); // инициализируем модуль как только DOM готов.