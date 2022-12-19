import styles from "./style.css";
import TicTacToe from "../Components/TicTacToe/index";

export default function Home() {
    return (
        <div className={styles.container}>
            <h2>Tic Tac Toe game</h2>
            <main className={styles.main}>
                <TicTacToe />
            </main>
        </div>
    );
}