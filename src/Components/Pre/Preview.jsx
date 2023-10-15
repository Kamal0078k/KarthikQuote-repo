import React, { useContext, useEffect, useRef, useState } from "react";
import Head from "../Head";
import "./../../index.css";
import { Button } from "@mui/material";
import QuoteHead from "../QuoteHead";
import Body from "../Body";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import { QuoteContext } from "../../App";

import { db } from "./../../firebase";
import { collection, addDoc, Timestamp, doc } from "firebase/firestore";
// import { url } from "inspector";
// import { url } from "inspector";

const Preview = () => {
  const QuotationRef = collection(db, "karthik");
  const contentRef = useRef(null);
  const [somek, setSomek] = useState("");
  const details = useContext(QuoteContext);

  const printHandle = async () => {
    console.log(details.data);
    try {
      addDoc(QuotationRef, {
        ...details.data,
        created: Timestamp.now(),
      });
    } catch (err) {
      alert(err);
    }
    window.print();
  };
  return (
    <div className="w-screen relative" id="preview" ref={contentRef}>
      {/* <div className="absolute h-[100px] w-[500px]">
        <img src="/ora.svg" />
      </div> */}
      <div className="absolute w-72 opacity-10 top-[410px] left-[220px] -z-1">
        <img src="/KC.svg" />
      </div>
      <div className="w-[99.7%] -mt-1">
        <Head />
        <QuoteHead />

        <Body />
      </div>
      <hr className="border-black" />
      <div>
        <Footer />
      </div>
      {/* <Link to="/"> */}
      <button onClick={printHandle} className="somek">
        Print as PDF
      </button>
      {/* </Link> */}
    </div>
  );
};

export default Preview;
