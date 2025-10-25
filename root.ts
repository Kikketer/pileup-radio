type Player = {
    name: string
    loc: number[]
}
type GameState = {
    players: { [id: string]: Player }
}
enum RadioMessage {
    hi = 38118,
    message1 = 49434
}

let randomNames = [
    "Bob",
    "Bill",
    "Mary",
    "Sue"
]
let isHost = true
let gameState: GameState = { players: { player1: { name: "Bob", loc: [100, 200] } } }

namespace PileUp {
    const onMoveCallbacks: Array<(T: GameState['players']) => void> = []

    export function init() {
        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            const name = randomNames[randint(0, randomNames.length - 1)]
            gameState.players.player1.name = name
            radio.sendString("" + (JSON.stringify(gameState)))
        })
        
        radio.onReceivedString(function (receivedString) {
            gameState = JSON.parse(receivedString)
            callMovePlayers(gameState)
        })
    }

    function callMovePlayers (state: GameState) {
        onMoveCallbacks.map(fn => fn(state.players))
    }

    export function onMovePlayer(callback: (T: GameState['players']) => void) {
        onMoveCallbacks.push(callback)
    }
}
