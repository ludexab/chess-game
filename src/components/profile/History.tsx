import React, { useContext } from "react";
import { ChessinoContext } from "../../App";

export const History = () => {
  const { walletConnected, connectWallet } = useContext(ChessinoContext);
  const getHistory = async () => {
    // API Call
    return true;
  };
  return walletConnected ? (
    <div className="flex bg-fixed bg-no-repeat bg-cover bg-gradient-to-b from-gray-500 via-orange-500 to-yellow-600 w-full min-h-screen p-3 justify-center text-white">
      <div className="mt-10 flex flex-col  w-[500px] p-10 float-left rounded-lg">
        <h1 className="text-2xl font-bold mb-3">Transaction History</h1>
        <li>1 deposit</li>
        <li>3 stakes</li>
        <li>2 wins</li>
        <li>4 withdrawals</li>
      </div>
    </div>
  ) : (
    <div className="flex bg-fixed bg-no-repeat bg-cover bg-gradient-to-b from-gray-500 via-orange-500 to-yellow-600 w-full min-h-screen p-3 justify-center text-white">
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
