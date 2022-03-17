import React, { useState } from "react";
import { ethers } from "ethers";

const PersonalWalletCard = () => {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [mainBalance, setMainBalance] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const walletConnectionHandler = () => {
    // checks if user even has metamask installed
    // does user have ethereum installed?
    if (window.ethereum) {
      // ethereum found so we assume metamask is installed?
      // no error so ethereum present - now we ask to connect
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((address) => accountChangedHandler(address[0]));
    } else {
      setErrorMessage("Please install Metamask.");
    }
  };

  // will update default account because some users may have more than one account in their Metamask
  const accountChangedHandler = (newAccount) => {
    console.log(newAccount);
    setDefaultAccount(newAccount);
    getMainBalance(newAccount);
  };

  const getMainBalance = (newAccountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [newAccountAddress, "latest"],
      })
      // format big number
      .then((balance) => setMainBalance(ethers.utils.formatEther(balance)));
  };

  // for updating ui state on account change - reloading page method
  const chainChangedHandler = () => {
    window.location.reload();
  };
  window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <main class="mx-24 ">
      <div class="group mt-55 border-2 mx-24 border-rose-600 rounded-2xl hover:border-white hover:bg-red-300 > h2 {text-red-600/50}">
        <div className="cardFragment" class="p-3">
          <h2 class="group-hover:text-blue-600 text-2xl font-semibold group-hover:font-extrabold leading-normal mt-3 mb-2 text-red-600/50">
            A window.ethereum exploration project
          </h2>
        </div>
        <div>
          <div class="p-2">
            <button
              class="bg-rose-600 outline-rose-600 hover:bg-white text-white hover:text-rose-600 active:bg-blue-800 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={walletConnectionHandler}
            >
              Connect Meta
            </button>
          </div>
          <div class="p-2">
            <div>
              <h4 class="text-xl font-normal leading-normal mt-0 mb-2 text-red-800 group-hover:text-yellow-100">
                Address: <br />
                <span class="font-bold text-lg group-hover:text-red-400">
                  {defaultAccount}
                </span>
              </h4>
            </div>
            <div>
              <h4 class="text-xl font-normal leading-normal mt-0 mb-2 text-red-800 group-hover:text-yellow-100">
                Balance:
                <br />
                <span class="font-bold font-mono text-lg group-hover:text-red-400">
                  {" "}
                  {mainBalance}
                </span>
              </h4>
            </div>
          </div>
        </div>

        {errorMessage}
      </div>
    </main>
  );
};

export default PersonalWalletCard;
