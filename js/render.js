//function to make a fake player array
var fakePlayers = function(num){
  var players = []
  for (var i=1; i<=num; i++){
    var player={};
    player.name = 'player'+i;
    player.score = 8+i;
    player.bid = 50%i;
    players.push(player);
  }
  return players
}

//Function that takes an array of players and renders li element for their attributes and also inputs
var renderPlayers = function(players, roundNum, dealerNum){
  var oldPlayerScores = document.querySelector('#playerScores')
  var newPlayerScores = document.createElement('ul')
  newPlayerScores.setAttribute('class', 'playerScores');
  newPlayerScores.setAttribute('id', 'playerScores');

  players.forEach(function(player, index){
    //create li element for player
    var liEl = document.createElement('li');

    //set class depending on dealer
    index==dealerNum ?
      liEl.setAttribute('class','player__dealer'):
      liEl.setAttribute('class','player')

    //create name el
    var name = document.createElement('h2')
    name.innerText = player.name;
    name.setAttribute('id','playername')
    name.setAttribute('class','playername')

    //create score el
    var score = document.createElement('h2')
    score.innerText = 'Score: '+player.score;
    score.setAttribute('id','playerscore')
    score.setAttribute('class','playerscore')

    //create bid el
    var bid = document.createElement('h2')
    bid.innerText = 'Current Bid: '+player.bid;
    bid.setAttribute('id','playerbid')
    bid.setAttribute('class','playerbid')

    //Bid input
    var bid_input = document.createElement('label');
    bid_input.innerText = "Bid: ";
    bid_input.setAttribute('id','bid_input')
    bid_input.setAttribute('class','bid_input')
    bid_input.setAttribute('for','bid')

    //Bid drop down
    var bid_select = document.createElement('select');
    bid_select.setAttribute('id', 'bid')
    bid_select.setAttribute('name','select')

    //Loop through round number to create correct drop down list
    for (var rnds=0; rnds<=roundNum; rnds++){
      var optionsNode = document.createElement('option');
      optionsNode.value = rnds;
      optionsNode.innerText = rnds;
      bid_select.appendChild(optionsNode)
    }

    bid_input.appendChild(bid_select);

    //Tricks input
    var tricks_input = document.createElement('label');
    tricks_input.innerText = "Tricks Won: ";
    tricks_input.setAttribute('id','tricks_input')
    tricks_input.setAttribute('class','tricks_input')
    tricks_input.setAttribute('for','tricks')
    tricks_input.style.display = 'none';

    //clone bid dropdown, change attribute
    var tricks_select = bid_select.cloneNode(true)
    tricks_select.setAttribute('id', 'tricks')
    tricks_input.appendChild(tricks_select);

    //append everything
    liEl.appendChild(name)
    liEl.appendChild(score)
    liEl.appendChild(bid)
    liEl.appendChild(bid_input)
    liEl.appendChild(tricks_input);

    newPlayerScores.appendChild(liEl);
  })
  document.body.replaceChild(newPlayerScores, oldPlayerScores)
}

//Listener for player submit, to create a player array and render to the Dom
var createPlayers = function(round, dealerIndex, down){
  return function(event){
    event.preventDefault();

    //get the inputs
    var playernames = document.querySelectorAll('#playerName')

    //create empty, array populate with player objects
    var players = []
    playernames.forEach(function(playerName){
      var player={};
      player.name = playerName.value
      player.score = 0;
      player.bid = 'n/a';
      players.push(player);
    })

    //render those players
    renderPlayers(players,round,dealerIndex);
    this.style.display='none'
    bidbtn.style.display = 'block'

    //pass the players object to the submit listeners
    bidbtn.addEventListener('click', bidListener(players, round, dealerIndex, down));
    trickbtn.addEventListener('click', trickListener(players, round, dealerIndex, down));

  }
}

//For when the bid submit button is pressed
var bidListener = function(playerArray, roundNum, dealerIndex, down){
  return function(event){
    var bids = document.querySelectorAll('#bid');
    var playerBids = document.querySelectorAll('#playerbid')

    playerArray.forEach(function(player, i){
      player.bid = bids[i].value;
    })

    renderPlayers(playerArray, roundNum, dealerIndex)
    //change globals
    if (down && roundNum === 1){
      down = false;
    } else if (down) {
      roundNum -= 1;
    } else {
      roundNum +=1
    }

    var bidinputs = document.querySelectorAll('#bid_input')
    var tricksinputs = document.querySelectorAll('#tricks_input')
    //make things visible or not
    bidinputs.forEach(function(input, i){
      input.style.display = 'none'
      tricksinputs[i].style.display = 'block'
    })
    this.style.display = 'none'
    trickbtn.style.display = 'block'
  }
}

//For when the trick submit button is pressed
var trickListener = function(playerArray, roundNum, dealerIndex, down){
  return function(event){
    var tricks = document.querySelectorAll('#tricks');
    var playerBids = document.querySelectorAll('#playerbid')
    var playerScores = document.querySelectorAll('#playerscore')

    playerArray.forEach(function(player, i){
      var increase = Number(tricks[i].value);
      if (player.bid === tricks[i].value){
        increase +=10
      }
      player.score += increase;
      player.bid = 'n/a'
    })

    //change globals
    if (down && roundNum === 1){
      down = false;
    } else if (down) {
      roundNum -= 1;
    } else {
      roundNum +=1
    }

    console.log('trick roundnum', roundNum);
    renderPlayers(playerArray, roundNum, dealerIndex)

    //make things visible and invisible
    var bidinputs = document.querySelectorAll('#bid_input')
    var tricksinputs = document.querySelectorAll('#tricks_input')
    bidinputs.forEach(function(input, i){
      input.style.display = 'block'
      tricksinputs[i].style.display = 'none'
    })
    this.style.display = 'none'
    bidbtn.style.display = 'block'

  }
}

var numSelect = document.querySelector('#NumPlayers')
var roundSelect = document.querySelector('#NumRounds')
var roundDiv = document.querySelector('#roundSetup')
var playerForm = document.getElementById('players');
var bidbtn = document.querySelector('#submit_bid')
var trickbtn = document.querySelector('#submit_tricks')
var down = true
var roundNumber = 10
var dealer = 0;

var makeRoundDrop = function(){
  return function(event){
    var playerCount = (numSelect.value);
    var maxRound = Math.floor(52 / playerCount);
    roundSelect.innerHTML='';
    for (var looper=1; looper<=maxRound; looper++){
      var optNode = document.createElement('option');
      optNode.setAttribute('value', looper)
      optNode.innerText = looper;
      roundSelect.appendChild(optNode)
    }
    roundDiv.style.display = 'inline-block';
  }
}
numSelect.addEventListener('change', makeRoundDrop())


playerForm.addEventListener('submit', createPlayers(roundNumber, dealer, down));
//bidListener);
