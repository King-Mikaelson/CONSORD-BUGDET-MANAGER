import React, { useEffect, useRef, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { IoCalendarClearOutline } from "react-icons/io5";
import { AiOutlineClockCircle, AiOutlinePlus } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


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

type Props = {
  items: Budget[];
};

function ViewSingleBudget({
  items,
}: Props) {
  const { id } = useParams();
  const item = items?.find((item: any) => item.id === Number(id));


//  functions to calculate and display key metrics 
//  a function that reduces the amount of eact item in the items array and returns a single value;total
  const total = item?.items.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue.amount,
    0
  );

  // A function that finds the difference between the total Budgeted Amount and the Total Amount Expense from each item
  const outstandingBalance = () => {
    const value = item?.totalBudgetAmount! - total;
    return value;
  };



  useEffect(() => {
    outstandingBalance();
  }, [items]);

  if (!items) {
    return (
      // Loading Spinner
      <div className="flex justify-center h-screen items-center">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="flex  px-6  lg:px-14 flex-col ">
        <div className=" text-base md:text-xl text-center flex items-center xl:w-[50%] md:w-[76%] md:mx-auto md:my-0">
          <p>Name: {item?.name}</p>
          <button
            className="md:flex gap-2  px-5 bg-[#3F5BF6] items-center rounded-lg h-fit py-3 justify-between hidden w-fit ml-auto"
          >
            <AiOutlinePlus className="text-white" />
            <p className="text-white font-workSans font-semibold text-sm">
              Add New Item
            </p>
          </button>
        </div>
        <section className="py-2 text-xl md:flex flex-col items-start md:w-[76%] xl:w-[50%] md:mx-auto md:my-0">
          <div className="md:flex justify-between w-full gap-y-2 pb-2 ">
            <p className="text-base md:text-xl">Total Budget Amount: ₦{item?.totalBudgetAmount}</p>
            <p className="text-base md:text-xl">Status: {item?.status}</p>
          </div>
          <div className="md:flex  justify-between w-full gap-y-2">
            <p className="text-base md:text-xl">Total Expense Amount: ₦{total}</p>
            <p className="text-base md:text-xl">Outstanding Balance: ₦{outstandingBalance()}</p>
          </div>
        </section>
        <section className="flex justify-center items-center  w-full">
          <table className="border-collapse hidden md:block">
            <thead className="w-full text-left">
              <tr>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  Id
                </th>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  Name
                </th>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  Amount
                </th>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  Status
                </th>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  {" "}
                </th>
                <th className="pt-3 pb-3 bg-[#3F5BF6] text-white border solid border-[#ddd] p-8">
                  {" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {item?.items.map((item: any, index: number) => (
                <tr key={item?.id}>
                  <td className="border solid border-[#ddd] p-8">
                    <p>{item?.id}</p>
                  </td>
                  <td className="border solid border-[#ddd] p-8">
                    <p>{item?.name}</p>
                  </td>

                  <td className="border solid border-[#ddd] p-8">
                    <p>₦ {item?.amount}</p>
                  </td>

                  <td className="border solid border-[#ddd] p-8">
                    <p>{item?.status}</p>
                  </td>

                  <td className="border solid border-[#ddd] p-8 cursor-pointer">
                    <button
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border solid border-[#ddd] p-8 cursor-pointer">
                    <button
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className=" md:hidden w-full flex justify-between  py-4   flex-col gap-10 ">
          {item?.items.map((item, index) => (
                <div key={item?.id} className="flex flex-col bg-[#F9FAFB] border-[#EAECF0] solid border-b">
                  <div className="border solid border-[#ddd] p-8 flex justify-between w-full">
                    <h2 className="text-lg font-medium">Id</h2>
                    <p className="text-base">{item?.id}</p>
                  </div>

                  <div className="border solid border-[#ddd] p-8 flex justify-between w-full">
                    <h2 className="text-lg font-medium">Name</h2>
                    <p>{item?.name}</p>
                  </div>

                  <div className="border solid border-[#ddd] p-8 flex justify-between w-full">
                    <h2 className="text-lg font-medium">   Total Amount</h2>
                    <p>₦{item?.amount}</p>
                  </div>

                  <div className="border solid border-[#ddd] p-8 flex justify-between w-full">
                    <h2 className="text-lg font-medium"> Status</h2>
                    <p>{item?.status}</p>
                  </div>

                  <div className="border solid border-[#ddd] p-4 flex justify-center">
                    <Link to={`/view/budget/${item.id}`} className="px-5 py-5 bg-[#3F5BF6] items-center rounded-lg text-white">
                      <button>View full details</button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </section>
    </>
  );
}

export default ViewSingleBudget;
