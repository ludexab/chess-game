import { GiWallet } from "react-icons/gi";
import { MdAccountCircle, MdRefresh } from "react-icons/md";
import { FaChess } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ChessinoContext } from "../App";
import { shortAddress } from "../utils/shortAddr";
const Header = () => {
  let navigate = useNavigate();
  const { walletConnected, account, connectWallet, usdBal, setAccountBalance } =
    useContext(ChessinoContext);

  return (
    <header className="bg-yellow-800 w-full p-5 shadow-xl mr-0 grid grid-cols-2">
      <div className=" mt-2">
        <button onClick={() => navigate("/")}>
          <FaChess className="w-10 h-10 text-white ml-4" />
          <h1 className="text-2xl text-white font-bold float-left">Chessino</h1>
        </button>
      </div>
      <div className="justify-self-right items-right text-white mt-2">
        {walletConnected && (
          <div className="grid grid-cols-1 float-right">
            <button onClick={() => navigate("/profile")}>
              <MdAccountCircle className="hover:text-green-400 w-8 h-8 ml-7 mb-2" />
            </button>
            <h6 className="text-sm">{shortAddress(account)}</h6>
            <div className="flex justify-end justify-around">
              <h6 className="text-sm">{`Bal: ${usdBal}`}</h6>{" "}
              <button
                className="float-right rounded-full"
                onClick={setAccountBalance}
              >
                <MdRefresh className="text-green-500 hover:text-green-800 w-4 h-4 float-right" />
              </button>
            </div>
          </div>
        )}
        {!walletConnected && (
          <div className="grid grid-cols-1 text-white float-right">
            <button onClick={connectWallet}>
              <span className="font-bold">
                <GiWallet className="w-10 h-10 mr-9 float-right" />
                <h6>Connect Wallet</h6>
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
