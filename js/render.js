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
  var playerScores = document.querySelector('#playerScores')
  players.forEach(function(player, index){
    var liEl = document.createElement('li');
    index==dealerNum ?
      liEl.setAttribute('class','player__dealer'):
      liEl.setAttribute('class','player')
    var name = document.createElement('h2')
    name.innerText = player.name;
    name.setAttribute('id','playername')
    name.setAttribute('class','playername')

    var score = document.createElement('h2')
    score.innerText = 'Score: '+player.score;
    score.setAttribute('id','playerscore')
    score.setAttribute('class','playerscore')

    var bid = document.createElement('h2')
    bid.innerText = 'Current Bid: '+player.bid;
    bid.setAttribute('id','playerbid')
    bid.setAttribute('class','playerbid')

    var bid_input = document.createElement('label');
    bid_input.innerText = "Bid: ";
    bid_input.setAttribute('id','bid_input')
    bid_input.setAttribute('class','bid_input')
    bid_input.setAttribute('for','bid')

    var bid_select = document.createElement('select');
    bid_select.setAttribute('id', 'bid')
    bid_select.setAttribute('name','select')

    for (var rnds=0; rnds<=roundNum; rnds++){
      var optionsNode = document.createElement('option');
      optionsNode.value = rnds;
      optionsNode.innerText = rnds;
      bid_select.appendChild(optionsNode)
    }

    bid_input.appendChild(bid_select);

    var tricks_input = document.createElement('label');
    tricks_input.innerText = "Tricks Won: ";
    tricks_input.setAttribute('id','tricks_input')
    tricks_input.setAttribute('class','tricks_input')
    tricks_input.setAttribute('for','tricks')
    tricks_input.style.display = 'none';

    var tricks_select = bid_select.cloneNode(true)
    tricks_select.setAttribute('id', 'tricks')

    tricks_input.appendChild(tricks_select);

    liEl.appendChild(name)
    liEl.appendChild(score)
    liEl.appendChild(bid)
    liEl.appendChild(bid_input)
    liEl.appendChild(tricks_input);

    playerScores.appendChild(liEl);

  })
}

//Listener for player submit, to create a player array and render to the Dom
var createPlayers = function(round,dealerIndex){
  return function(event){
    event.preventDefault();
    var playernames = document.querySelectorAll('#playerName')
    var players = []
    playernames.forEach(function(playerName){
      var player={};
      player.name = playerName.value
      player.score = 0;
      player.bid = 'n/a';
      players.push(player);
    })
    renderPlayers(players,round,dealerIndex);
    this.style.display='none'
    bidbtn.style.display = 'block'

    bidbtn.addEventListener('click', bidListener(players));
    trickbtn.addEventListener('click', trickListener(players));

  }
}

//For when the bid submit button is pressed
var bidListener = function(playerArray){
  return function(event){
    var bidinputs = document.querySelectorAll('#bid_input')
    var tricksinputs = document.querySelectorAll('#tricks_input')
    var bids = document.querySelectorAll('#bid');
    var playerBids = document.querySelectorAll('#playerbid')

    playerBids.forEach(function(playerBid, i){
      playerBid.innerText = 'Current Bid: '+bids[i].value;
      playerArray[i].bid = bids[i].value;
    })
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
var trickListener = function(playerArray){
  return function(event){
    var bidinputs = document.querySelectorAll('#bid_input')
    var tricksinputs = document.querySelectorAll('#tricks_input')
    var tricks = document.querySelectorAll('#tricks');
    var playerBids = document.querySelectorAll('#playerbid')
    var playerScores = document.querySelectorAll('#playerscore')

    playerArray.forEach(function(player, i){
      var increase = Number(tricks[i].value);
      if (player.bid === tricks[i].value){
        increase +=10
      }
      player.score += increase;
      playerScores[i].innerText = 'Score: '+player.score;
      playerBids[i].innerText = 'Current Bid: n/a'
    })
    //make things visible and invisible
    bidinputs.forEach(function(input, i){
      input.style.display = 'block'
      tricksinputs[i].style.display = 'none'
    })
    this.style.display = 'none'
    bidbtn.style.display = 'block'
  }
}

var playerForm = document.getElementById('players');
var bidbtn = document.querySelector('#submit_bid')
var trickbtn = document.querySelector('#submit_tricks')

playerForm.addEventListener('submit', createPlayers(10,0));
//bidListener);
