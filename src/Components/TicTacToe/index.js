import { useEffect, useState } from "react";
import './TicTacToe.css'
export default function TicTacToe() {
    const [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    const [isCPUNext, setIsCPUNext] = useState(false);
    const [isCPUTurn, setIsCPUTurn] = useState(false);
    const [winner, setWinner] = useState(null);
    const players = {
        CPU: {
            SYM: "O",
            NAME: "CPU",
        },
        HUMAN: {
            SYM: "X",
            NAME: "You",
        },
    };

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    function playFn(arrayIndex, index) {
        if (isCPUNext) return;
        if (winner) return;
        board[arrayIndex][index] = players?.HUMAN?.SYM;
        setBoard((board) => [...board]);
        checkWinner();
        setIsCPUTurn(true)
        setTimeout(() => {
            setIsCPUNext(true);
        }, 500);
    }

    useEffect(() => {
        if (winner) return;
        if (isCPUNext) {
            cPUPlay();
        }
    }, [isCPUNext]);

    function cPUPlay() {
        if (winner) return;
        sleep(1000);
        const cPUMove = getCPUTurn();
        board[cPUMove.arrayIndex][cPUMove.index] = players?.CPU?.SYM;
        setBoard((board) => [...board]);
        checkWinner();
        setIsCPUNext(false);
        setIsCPUTurn(false)
    }

    function getCPUTurn() {
        const emptyIndexes = [];
        board.forEach((row, arrayIndex) => {
            row.forEach((cell, index) => {
                if (cell === "") {
                    emptyIndexes.push({ arrayIndex, index });
                }
            });
        });
        const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
        return emptyIndexes[randomIndex];
    }
    
    function checkWinner() {
        for (let index = 0; index < board.length; index++) {
            const row = board[index];
            if (row.every((cell) => cell === players?.CPU?.SYM)) {
                setWinner(players?.CPU?.NAME);
                return;
            } else if (row.every((cell) => cell === players?.HUMAN?.SYM)) {
                setWinner(players?.HUMAN?.NAME);
                return;
            }
        }
        for (let i = 0; i < 3; i++) {
            const column = board.map((row) => row[i]);
            if (column.every((cell) => cell === players?.CPU?.SYM)) {
                setWinner(players?.CPU?.NAME);
                return;
            } else if (column.every((cell) => cell === players?.HUMAN?.SYM)) {
                setWinner(players?.HUMAN?.NAME);
                return;
            }
        }
        const diagonal1 = [board[0][0], board[1][1], board[2][2]];
        const diagonal2 = [board[0][2], board[1][1], board[2][0]];
        if (diagonal1.every((cell) => cell === players?.CPU?.SYM)) {
            setWinner(players?.CPU?.NAME);
            return;
        } else if (diagonal1.every((cell) => cell === players?.HUMAN?.SYM)) {
            setWinner(players?.HUMAN?.NAME);
            return;
        } else if (diagonal2.every((cell) => cell === players?.CPU?.SYM)) {
            setWinner(players?.CPU?.NAME);
            return;
        } else if (diagonal2.every((cell) => cell === players?.HUMAN?.SYM)) {
            setWinner(players?.HUMAN?.NAME);
            return;
        } else if (board.flat().every((cell) => cell !== "")) {
            setWinner("draw");
            return;
        } else {
            setWinner(null);
            return;
        }
    }

    function displayWinner() {
        if (winner === "draw") {
            return "It's a draw!";
        } else if (winner) {
            return `${winner} won!`;
        }
    }

    function playAgainFn() {
        setBoard([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]);
        setWinner(null);
        setIsCPUNext(false);
    }

    return (
        <>
            {!winner && <div>{isCPUTurn ? <p className="turn">CPU's turn</p> : <p className="turn">Your turn</p>}</div>}
            <div className="container">
                {board.map((item, index) =>
                    <div className="col">
                        {item?.map((currentItem, currentIndex) =>
                            <span onClick={() => playFn(index, currentIndex)} className="cell">
                                {board[index][currentIndex]}
                            </span>
                        )}
                    </div>
                )}
            
            </div>
            <div>
                {winner && <h2>{displayWinner()}</h2>}
                {winner && (
                    <button className="video_game_button" onClick={playAgainFn}>
                        Play Again
                    </button>
                )}
            </div>
        </>
    );
}