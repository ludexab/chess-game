import { GiWallet, GiTwoCoins } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ChessinoContext } from "../../App";

export const ProfilePage = () => {
  const { walletConnected, connectWallet } = useContext(ChessinoContext);
  const navigate = useNavigate();
  return walletConnected ? (
    <div className="flex flex-col bg-fixed bg-no-repeat bg-cover bg-gradient-to-b from-gray-500 via-orange-500 to-yellow-600 w-full min-h-screen p-3 justify-center text-white">
      <div className="ml-5 mr-5">
        <button
          onClick={() => navigate("/deposit")}
          className="flex w-[100%] hover:border-white justify-around pt-2 text-yellow-800 mb-4 bg-gray-300 h-[60px] border-[3px] border-yellow-800 rounded-lg"
        >
          <h1 className="text-3xl font-semibold pb-">Deposit</h1>
          <GiTwoCoins className="w-10 h-10" />
        </button>
        <button
          onClick={() => navigate("/withdraw")}
          className="flex w-[100%] hover:border-white justify-around pt-2  text-yellow-800 mb-4 bg-orange-200 h-[60px] border-[3px] border-yellow-800 rounded-lg"
        >
          <h1 className="text-3xl font-semibold pb-">Withdrawal</h1>
          <GiWallet className="w-10 h-10" />
        </button>
        <button
          onClick={() => navigate("/history")}
          className="flex w-[100%] hover:border-white justify-around pt-2 text-yellow-800 mb-4 bg-red-200 h-[60px] border-[3px] border-yellow-800 rounded-lg"
        >
          <h1 className="text-3xl font-semibold pb-">View History</h1>
          <FaHistory className="w-10 h-10" />
        </button>
      </div>
    </div>
  ) : (
    <div className="flex bg-fixed bg-no-repeat bg-cover bg-gradient-to-b from-gray-500  via-orange-500 to-yellow-600 w-full min-h-screen p-3 justify-center text-white">
      <div className="justify-center items-center text-center flex flex-col w-48 ">
        <h3>please connect wallet to start</h3>
        <button
          className="bg-yellow-500 rounded-lg p-2 font-semibold border-[0.5px] hover:border-white border-yellow-800"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};
