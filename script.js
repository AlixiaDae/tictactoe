//Field eventlistener
const field = document.querySelectorAll(".grid-item")

field.forEach(field => 
    field.addEventListener("click", (e) => {
        console.log(e.target.dataset.index)
})) 


const Player = (sign) => {
    let _sign = sign
    const getSign = () => _sign

    return {
        getSign
    }
}

const gameBoard = (() => {
    const _board = new Array(9)

    const setField = (index, sign) => {
        if(index > _board.length) return
        _board[index] = sign
    }

    const getField = (index) => {
        if(index > _board.length) return
        return _board[index]
    }

    const reset = () => {
        for(let i = 0; i < _board.length; i++) {
            _board[i] = ""
        }
    }

    return {
        setField,
        getField,
        reset
    }
})()

const displayController = (() => {
    const _gridField = document.querySelectorAll(".grid-item")
    const _resetButton = document.getElementById("reset")

    _gridField.forEach(field => {
        field.addEventListener("click", (e) => {
            if(gameController.getIsOver() || field.textContent !== "") return
            gameController.playRound(parseInt(e.target.dataset.index))
            updateBoard()
        })
    })

    _resetButton.addEventListener("click", () => {
        gameBoard.reset()
        updateBoard()
        gameController.reset()
    })

    const updateBoard = () => {
        for(let i = 0; i < _gridField.length; i++) {
            _gridField[i].textContent = gameBoard.getField(i)
        }
    }

})()

const gameController = (() => {
    const playerX = Player("X")
    const playerO = Player("O")
    let _round = 1
    let _isOver = false

    const getCurrentPlayer = () => {
        return _round % 2 === 1 ? playerX.getSign() : playerO.getSign()
    }

    const playRound = (fieldindex) => {
        gameBoard.setField(fieldindex, getCurrentPlayer())
        if(_checkWinner(fieldindex)) {
            _isOver = true
            console.log(`Winner is ${getCurrentPlayer()}`)
            return
        }
        if(_round === 9) {
            _isOver = true
            return
        }
        _round++
    }

    const _checkWinner = (fieldindex) => {
        const win = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [2,4,6]
        ]

        return win
        .filter(combination => combination.includes(fieldindex))
        .some(possibleCombination => possibleCombination.every(
            index => gameBoard.getField(index) === getCurrentPlayer()
            )
        )
    }

    const getIsOver = () => {
        return _isOver
    }

    const reset = () => {
        _round = 1
        _isOver = false
    }

    return {
        playRound,
        reset,
        getIsOver
    }
})()