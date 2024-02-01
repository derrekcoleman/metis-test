"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { Address, AddressInput, IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const [receiver, setReceiver] = useState("");
  const [newGreeting, setNewGreeting] = useState("");
  const [amount, setAmount] = useState<bigint>(BigInt(0));

  const { data: greeting } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "greeting",
  });

  const { writeAsync: setGreeting } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setGreeting",
    args: [newGreeting],
  });

  return (
    <>
      <div className="flex flex-col items-center p-8 gap-4">
        <div className="flex gap-4 items-center">
          <Address address={"0xF512c18f06F6CF729d1e633D1cD1511D49eaE5A0"} />
          <AddressInput onChange={setReceiver} value={receiver} placeholder="Enter address" />
        </div>
        <div className="text-2xl font-bold mt-8">Greeting: {greeting}</div>
        <div className="flex gap-4 items-center">
          <label htmlFor="amount" className="text-gray-700">
            Value (wei)
          </label>
          <IntegerInput
            value={amount}
            onChange={updatedAmount => {
              setAmount(BigInt(updatedAmount));
            }}
            placeholder="value (wei)"
          />
        </div>
        <div className="flex gap-4">
          <input
            className="border border-black p-2 text- rounded-full pl-4 text-accent"
            value={newGreeting}
            onChange={e => setNewGreeting(e.target.value)}
            placeholder="New greeting"
          />
          <button onClick={() => setGreeting()} className="btn btn-primary">
            Set Greeting
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
