import React, { useContext } from "react";
import { QuoteContext } from "../App";

const QuoteHead = () => {
  const details = useContext(QuoteContext);
  const date = new Date();
  const day = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  return (
    <div className="w-[100%]">
      <div className="text-center text-xl"> QUOTATION</div>
      <div className="flex flex-row justify-between  text-[14px]">
        <div className="w-[600px]">
          <div className="h-[120px]">
            To,
            <br /> {details.data.to}
          </div>
          <div>GSTIN: 36OXBPS3311C1ZK </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>Date: {day}</div>
          <div className="border-[0.1rem] w-[200px] mt-2 rounded-md bg-red-100 px-1 border-black">
            BANK DETAILS:<br></br> Name : Karthik Creatives <br></br>
            A/C.No : <b>50200069640531</b> <br></br>IFSC : HDFC0007531 <br />{" "}
            HDFC Nacharam
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteHead;
