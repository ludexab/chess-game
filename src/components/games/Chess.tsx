import { useEffect, useContext } from "react";
import { Chess, Square } from "chess.js";
import ChessBoard from "chessboardjsx";
import { ChessinoContext } from "../../App";
import { gameDocRef } from "../firebase";
import { onSnapshot, getDoc, updateDoc } from "firebase/firestore";

const chess = new Chess();
let capturedWhitePieces: string[] = [];
let capturedBlackPieces: string[] = [];

export const ChessPage = () => {
  const {
    walletConnected,
    connectWallet,
    staked,
    stakeGame,
    stakeAmount,
    chessStarted,
    setChessStarted,
    playerColor,
    setPlayerColor,
    fen,
    setFen,
    winner,
    setWin,
    setWinner,
    setStakeAmount,
    setStaked,
    setWinBal,
    winBal,
  } = useContext(ChessinoContext);

  useEffect(() => {
    const initGame = async () => {
      const getInitGame: string = (await getDoc(gameDocRef)).data()?.fen;
      if (getInitGame) {
        setFen(getInitGame);
        chess.load(fen);
      } else {
        setFen("start");
        chess.load(fen);
      }
    };
    initGame();
  }, []);

  const handlePlay = () => {
    let playAs = document.getElementById("play-as") as HTMLSelectElement;
    setPlayerColor(playAs.value);
    setChessStarted(!chessStarted);
  };

  const onDrop = async ({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: Square;
    targetSquare: Square;
  }) => {
    let move = chess.move({
      from: sourceSquare,
      to: targetSquare,
    });
    if (move === null) {
      return;
    }
    if (playerColor[0] === move.color) {
      if (chess.game_over()) {
        if (chess?.in_draw()) {
          console.log("game over, draw");
        } else if (chess?.in_checkmate()) {
          console.log("game over, checkmate");
        } else if (chess?.in_stalemate()) {
          console.log("game over stalemate");
        } else if (chess?.in_threefold_repetition()) {
          console.log("game over 3 fold repetition");
        }
        if (move?.color == "w") {
          setWinner("White");
          setWin(true);
          redeemWin();
        } else {
          setWinner("Black");
        }
      }
      if (move.captured) {
        if (move.color == "w") {
          capturedBlackPieces.push(move.captured.toUpperCase());
        } else {
          capturedWhitePieces.push(move.captured.toUpperCase());
        }
      }
      await updateDoc(gameDocRef, { fen: chess?.fen() });
      setFen(chess.fen());
      chess.load(chess.fen());
      console.log(chess.turn());
    } else {
      chess.undo();
    }
  };

  onSnapshot(gameDocRef, (snapshot) => {
    const newFen = snapshot.data()!.fen;
    setFen(newFen);
    chess.load(newFen);
  });

  const redeemWin = async () => {
    await resetChess();
    setStaked(false);
    setChessStarted(false);
    setWinBal((Number(winBal) + Number(stakeAmount) * 5).toString());
    setStakeAmount("0");
    window.alert("Congratulations! You just won the game!!");
  };

  const resetChess = async () => {
    chess.clear();
    chess.reset();
    await updateDoc(gameDocRef, { fen: "start" });
  };

  const quitGame = async () => {
    await resetChess();
    setWin(false);
    setStakeAmount("0");
    setStaked(false);
    setChessStarted(false);
    window.alert("You have quited the game.");
  };

  return (
    <div className="flex flex-col bg-fixed bg-no-repeat bg-cover bg-gradient-to-b from-gray-500 via-orange-500 to-yellow-600 w-full min-h-screen p-3 justify-center text-white">
      <div className="flex flex-col items-center mb-3">
        {walletConnected ? (
          staked ? (
            chessStarted ? (
              <>
                <div className="flex justify-center items-center">
                  <button
                    className="bg-red-500 rounded-lg p-2 text-white font-bold mr-3"
                    onClick={quitGame}
                  >
                    <h1>QUIT</h1>
                  </button>
                  <button
                    disabled
                    className="border-[3px] border-black bg-green-500 rounded-lg p-2 text-white font-bold"
                  >
                    Stake: ${stakeAmount}
                  </button>
                </div>
                <>
                  <div>
                    <h1>captured White Pieces:</h1>
                    <p className="flex justify-center font-bold">
                      {capturedWhitePieces}
                    </p>
                  </div>
                  <div className="flex w-full justify-center ">
                    <ChessBoard
                      width={300}
                      orientation={playerColor === "black" ? "black" : "white"}
                      position={fen}
                      onDrop={onDrop}
                    />
                  </div>
                  <div>
                    <h1>capturedBlackPieces:</h1>
                    <p className="flex justify-center text-black font-bold">
                      {capturedBlackPieces}
                    </p>
                  </div>
                </>
              </>
            ) : (
              <div className="flex gap-3 justify-center items-center">
                <label>Play As:</label>
                <select name="plas-as" id="play-as" className="text-black">
                  <option value="white">White</option>
                  <option value="black">Black</option>
                </select>
                {/* <input
                  placeholder="play as"
                  id="playAs"
                  className="w-32 text-black"
                  onChange={(e) => {
                    let play = "";
                    play += e.target.value;
                    setPlayerColor(play);
                  }}
                /> */}
                <button
                  className="bg-green-500 rounded-lg p-2 font-bold text-5xl"
                  onClick={handlePlay}
                >
                  PLAY
                </button>
              </div>
            )
          ) : (
            <>
              <div className="bg-red-200 justify-center content-center rounded-lg items-center mt-2 mb-5">
                <h1 className="text-center text-yellow-800 sm:text-xl pt-1 pb-3 p-2">
                  Please make a stake to play
                </h1>
              </div>
              <div>
                <form>
                  <input
                    id="stake"
                    type="number"
                    placeholder="USDT"
                    className="pl-2 pr-2 rounded-md bg-gray-500"
                  />
                  <button
                    className="bg-yellow-500 rounded-lg ml-2 p-2 font-semibold"
                    onClick={stakeGame}
                  >
                    Stake
                  </button>
                </form>
              </div>
            </>
          )
        ) : (
          <div className="justify-center items-center text-center flex flex-col w-48 ">
            <h3>please connect wallet to start</h3>
            <button
              className="bg-yellow-500 rounded-lg p-2 font-semibold border-[0.5px] border-yellow-800"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center mb-3">
        {chess && chess?.game_over() ? (
          <div className="flex flex-col items-center mb-3">
            <h1 className="font-bold">Game Over, {`${winner} wins!`}</h1>
            <button
              onClick={resetChess}
              className="bg-yellow-500 w-32 rounded-lg ml-3"
            >
              Try Again
            </button>
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};
