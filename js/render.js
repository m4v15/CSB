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

var fplayers = fakePlayers(5);

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

renderPlayers(fplayers,10,3);
