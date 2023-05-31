//Field eventlistener
const field = document.querySelectorAll(".grid-item")

field.forEach(field => 
    field.addEventListener("click", (e) => {
        console.log(e.target.getAttribute("data-index"))
        e.target.textContent = "X"
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


})()

const gameController = (() => {

})()