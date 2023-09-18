import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import storage from "./../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { QuoteContext } from "./../App";

const Body = () => {
  const [imageurl, setImageurl] = useState({});
  const details = useContext(QuoteContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log(details.data);
    details.data.products.items.map((ell) => {
      console.log(typeof ell.Qty);
      setTotal((prev) => prev + parseInt(ell.Qty) * parseInt(ell.unitPrice));
    });
  }, []);

  return (
    <div className="w-full min-h-[530px] mt-4">
      <table className="text-[14px]  w-[100%]">
        <tr>
          <th className="border-[0.1rem] border-black w-10">S.no</th>
          <th className="border-[0.1rem] border-black w-[250px]">Item</th>
          <th className="border-[0.1rem] border-black w-[350px]">
            Description
          </th>
          <th className="border-[0.1rem] border-black  w-[50px]">Qty</th>
          <th className="border-[0.1rem] border-black  w-[100px]">
            Unit Price
          </th>
          <th className="border-[0.1rem] border-black w-[160px]">
            Total Price
          </th>
        </tr>
        {details.data.products.items.map((ell) => (
          <tr
            key={details.data.products.items.indexOf(ell)}
            className="text-center"
          >
            <td className="border-[0.1rem] border-black">
              {details.data.products.items.indexOf(ell) + 1}
            </td>
            <td className="  border-[0.1rem] border-black ">
              {ell.name} <br />
              <img className="w-[220px] pb-1 px-5" src={ell.images} />
            </td>
            <td className="text-left pl-2 border-[0.1rem] border-black">
              {ell.description}
            </td>
            <td className="border-[0.1rem] border-black">{ell.Qty}</td>
            <td className="border-[0.1rem] border-black">{ell.unitPrice}</td>
            <td className="border-[0.1rem] border-black">
              {ell.Qty * ell.unitPrice}
            </td>
          </tr>
        ))}
      </table>
      <div className="flex w-[100%] flex-row gap-5 justify-end text-[14px] px-2">
        <div className="text-right ">
          <div>
            <b>Sub Total:</b>
          </div>
          {details.data.gst === "CGST & SGST" && (
            <div>
              <div>
                {" "}
                <b>CGST(9%):</b>
              </div>
              <div>
                {" "}
                <b>SGST(9%):</b>
              </div>
            </div>
          )}
          {details.data.gst === "IGST" && (
            <div>
              {" "}
              <b>IGST(18%):</b>
            </div>
          )}

          <hr className="border-black" />
          <div>
            <b>Grand Total:</b>
          </div>
        </div>
        <div>
          <div>Rs.{total.toFixed(2)}/-</div>
          {details.data.gst === "CGST & SGST" && (
            <div>
              <div>Rs.{(total * 0.09).toFixed(2)}/-</div>
              <div>Rs.{(total * 0.09).toFixed(2)}/-</div>
            </div>
          )}
          {details.data.gst === "IGST" && (
            <div>Rs.{(total * 0.18).toFixed(2)}/-</div>
          )}

          <hr className="border-black" />
          <div>Rs.{(total * 1.18).toFixed(2)}/-</div>
        </div>
      </div>
    </div>
  );
};

export default Body;
