import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ToastContainer } from "react-toastify";



type BudgetItem = {
  id: number;
  name: string;
  status: string;
  amount?: number;
};

type Budget = {
  id: number;
  name: string;
  status: string;
  totalBudgetAmount: number;
  items: BudgetItem[];
};

function BudgetManager() {
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const saved = JSON.parse(localStorage.getItem("items")!);
  const [data, setData] = useState<Budget[] | []>([])

    // Save item to local Storage on state  chnage
    useEffect(() => {
      localStorage.setItem("items", JSON.stringify(data));
    }, [data]);
  
    const url = "https://json-server-data-consord.onrender.com/api/data";
  
    useEffect(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Error fetching users data");
          }
          return res.json();
        })
        .then((data) => {
          if (!(saved && saved.length > 0)) {
            setData(data);
          } else {
            setData(saved);
          }
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, []);
  
  return (
    <div className="BudgetManager">
      <ToastContainer/>
      <header className="App-header bg-red-500">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default BudgetManager;
