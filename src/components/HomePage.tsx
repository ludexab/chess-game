import QR from "./images/QR.png";
import RKP from "./images/RKP.png";
import RBP from "./images/RBP.png";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { useContext } from "react";
import { ChessinoContext } from "../App";

export const HomePage = () => {
  let navigate = useNavigate();
  const { category, setCategory } = useContext(ChessinoContext);
  return (
    <>
      <div className="text-yellow-800 bg-fixed bg-no-repeat bg-cover bg-gradient-to-b from-gray-500 via-orange-500 to-yellow-600 justify-center items-center min-h-screen p-10 gap-5">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-orange-200 justify-center content-center rounded-lg items-center">
            <h1 className="text-center sm:text-xl pb-3 p-2">
              Play chess and earn money!
            </h1>
            <h1 className="text-center sm:text-xl pb-3 p-2">
              Same chess, different rules.
            </h1>
          </div>
          <div className="bg-red-200 justify-center content-center rounded-lg items-center mt-2">
            <h1 className="text-center sm:text-xl pt-1 pb-3 p-2">
              Please select a category to begin
            </h1>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-self-center gap-5 mt-8 text-center drop-shadow-lg rounded-md p-2 pt-5">
            <div className="rounded-xl grid grid-cols-1 text-center bg-orange-300 justify-self-center flex flex-w-1 h-60 hover:rounded-full">
              <button
                onClick={() => {
                  setCategory("QR");
                  navigate("/chess");
                }}
              >
                <span className=" font-bold text-2xl">
                  <img
                    src={QR}
                    className="w-48 h-48 hover:w-52 hover:h-52"
                    alt="chess"
                  />
                  QR
                </span>
              </button>
            </div>
            <div className="rounded-xl grid grid-cols-1 text-center bg-red-300 justify-self-center flex flex-w-1 h-60 hover:rounded-full">
              <button
                onClick={() => {
                  setCategory("RK3P");
                  navigate("/chess");
                }}
              >
                <span className="font-bold text-2xl">
                  <img
                    src={RKP}
                    className="w-48 h-48 hover:w-52 hover:h-52"
                    alt="whot"
                  />
                  RK3P
                </span>
              </button>
            </div>
            <div className="rounded-xl grid grid-cols-1 text-center bg-gray-300 justify-self-center flex flex-w-1 h-60 hover:rounded-full">
              <button
                onClick={() => {
                  setCategory("RB3P");
                  navigate("/chess");
                }}
              >
                <span className="font-bold text-2xl">
                  <img
                    src={RBP}
                    className="w-48 h-48 hover:w-52 hover:h-52"
                    alt="ludo"
                  />
                  RB3P
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
