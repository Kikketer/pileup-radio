function init () {
    radio.setGroup(1)
    PileUp.init()
PileUp.onMovePlayer(updatePlayerLocation)
player1 = sprites.create(assets.image`Character`, SpriteKind.Player)
    player1.setPosition(65, 48)
}
let player1: Sprite = null
function updatePlayerLocation(players: GameState['players']) {
    player1.setPosition(players.player1.loc[0], players.player1.loc[1])
}
init()
