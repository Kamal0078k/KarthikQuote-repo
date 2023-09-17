import React, { useContext, useEffect, useRef, useState } from "react";
import Head from "../Head";
import "./../../index.css";
import { Button } from "@mui/material";
import QuoteHead from "../QuoteHead";
import Body from "../Body";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import { QuoteContext } from "../../App";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import storage, { db } from "./../../firebase";
import { collection, addDoc, Timestamp, doc } from "firebase/firestore";
// import { url } from "inspector";
// import { url } from "inspector";

const Preview = () => {
  const QuotationRef = collection(db, "karthik");
  const contentRef = useRef(null);
  const [somek, setSomek] = useState("");
  const details = useContext(QuoteContext);

  const printHandle = async () => {
    try {
      addDoc(QuotationRef, {
        ...details.data,
        created: Timestamp.now(),
      });
    } catch (err) {
      console.log(err);
    }
    window.print();
  };
  return (
    <div className="w-screen" ref={contentRef}>
      <div className="w-[99.7%]">
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
