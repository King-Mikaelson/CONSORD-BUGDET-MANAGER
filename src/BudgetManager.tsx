import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ToastContainer } from "react-toastify";
import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import ViewSingleBudget from './pages/ViewSingleBudget';
import ViewBudgetList from './pages/ViewBudgetList';



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
        <Routes>
          <Route path="/view" element={<Layout/>}>
          <Route path="/view/budget"  element={ <ViewBudgetList items={data} />} />
          <Route
            path="/view/budget/:id"
            element={
              <ViewSingleBudget
                items={data}
              />
            }
          />
          </Route>
        </Routes>
      </div>
    );
}

export default BudgetManager;
