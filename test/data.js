var fakes = function(){
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
  return {fakePlayers:fakePlayers}
}()
