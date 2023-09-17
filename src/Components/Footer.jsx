import React from "react";
import sign from "./../assets/sign.png";
import { useContext } from "react";
import { QuoteContext } from "../App";
const Footer = () => {
  const details = useContext(QuoteContext);
  return (
    <div className="text-[12px] mt-4 flex justify-between">
      <div className="text-[12px] mt-1 w-[503px]">
        T&C*
        <br />
        <ol type="1">
          <li>
            1. 50% Advance, Material dumping 30%, on completion of work 20%
          </li>
          <li>2. Goods once sold will not be taken back</li>
          <li>3. Warranty: {details.data.warranty}</li>
        </ol>
      </div>
      <div className="mr-2 text-center flex flex-col justify-center items-center">
        <div>Karthik Creatives</div>
        <img className="w-[100px] h-[100px] object-cover" src={sign} />
        <div>Authorised Signature</div>
      </div>
    </div>
  );
};

export default Footer;
