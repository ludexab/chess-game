import { useContext } from "react";
import { ChessinoContext } from "../../App";

export const Withdraw = () => {
  const { withdraw, walletConnected, connectWallet } =
    useContext(ChessinoContext);
  return walletConnected ? (
    <div className="flex bg-fixed bg-no-repeat bg-cover bg-gradient-to-b from-gray-500 via-orange-500 to-yellow-600 w-full min-h-screen p-3 justify-center text-yellow-800">
      <form className="mt-10 flex flex-col  w-[500px] p-10 items-center rounded-lg">
        <input
          id="deposit"
          type="number"
          placeholder="AMOUNT"
          className="p-2 border-yellow-800 border-[0.1px] rounded-lg mb-4"
        />
        <button
          onClick={withdraw}
          className="w-46 bg-red-300 border-[0.1px] hover:border-blue-500 border-yellow-800 rounded-lg justify-self-center text-2xl font-bold p-2 mb-4"
        >
          WITHDRAW
        </button>
        {false && (
          <div className="bg-orange-200 p-3 rounded-lg">
            <h1>Pending Withdraws</h1>
            <li>1</li>
            <li>3</li>
            <li>2</li>
            <li>4</li>
          </div>
        )}
      </form>
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
