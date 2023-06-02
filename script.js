// Factory for player
const Player = (sign) => {
    let _sign = sign
    const getSign = () => _sign

    return {
        getSign
    }
}

//Module for gameboard

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

//Module for DOM elements

const displayController = (() => {
    const _gridField = document.querySelectorAll(".grid-item")
    const _resetButton = document.getElementById("reset")
    const _announcement = document.querySelector(".announcement")

    _gridField.forEach(field => {
        field.addEventListener("click", (e) => {
            if(gameController.getIsOver() || field.textContent !== "") return
            gameController.playRound(parseInt(e.target.dataset.index))
            _updateBoard()
        })
    })

    _resetButton.addEventListener("click", () => {
        gameBoard.reset()
        _updateBoard()
        gameController.reset()
        setAnnouncementText("It is player X's turn.")
    })

    const _updateBoard = () => {
        for(let i = 0; i < _gridField.length; i++) {
            _gridField[i].textContent = gameBoard.getField(i)
        }
    }

    const setAnnouncement = (winner) => {
        if(winner === "Draw") {
            setAnnouncementText("It's a draw!")
        } else {
            _announcement.textContent = ""
            setAnnouncementText(`Player ${winner} wins!`)
        }
    }

    const setAnnouncementText = (text) => {
        _announcement.textContent = text
    }

    return {
        setAnnouncement,
        setAnnouncementText
    }

})()

//Module for game logic

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
            displayController.setAnnouncement(getCurrentPlayer())
            _isOver = true        
            return
        }
        if(_round === 9) {
            displayController.setAnnouncement("Draw")
            _isOver = true
            return
        }
        _round++
        displayController.setAnnouncementText(
            `It is player ${getCurrentPlayer()}'s turn.`
        )
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