import React from "react";
import { useContext, useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import { Button, Card } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { db } from "./../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  startAt,
  onSnapshot,
  getDoc,
  getDocs,
  deleteDoc,
  Timestamp,
  doc,
} from "firebase/firestore";

import { QuoteContext } from "../App";

const History = () => {
  const QuoteRef = collection(db, "karthik");
  const [quotation, setQuotation] = useState([]);
  const [search, setSearch] = useState("");
  const [beel, setBeel] = useState(true);
  const details = useContext(QuoteContext);

  const searchHandler = (e) => {
    e.preventDefault();
    const q = query(
      QuoteRef,
      where("to", ">=", search),
      orderBy("to"),
      startAt(search)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedData = [];
      snapshot.forEach((doc) => {
        const docData = doc.data();
        fetchedData.push(docData);
      });
      setQuotation(fetchedData);
      return unsubscribe;
    });
  };

  useEffect(() => {
    getQuote();
    // console.log(quotation);
    if (quotation) {
      quotation.sort((a, b) => b.created - a.created);
    }
  }, []);

  const getQuote = async () => {
    const data = await getDocs(QuoteRef);
    setQuotation(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <div className="px-4 py-4">
      <div className="flex gap-2">
        <TextField
          id="outlined-basic"
          size="small"
          label="Search"
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="w-[100%]"
          variant="outlined"
        />
        <Button variant="contained" onClick={searchHandler}>
          Search
        </Button>
      </div>
      {quotation.length === 0 ? (
        <>Loading...</>
      ) : (
        quotation.map((ell) => {
          {
            /* console.log(ell.created.toDate().getFullYear()); */
          }
          const date = `${ell.created.toDate().getDate()}/${ell.created
            .toDate()
            .getMonth()}/${ell.created.toDate().getFullYear()}`;
          return (
            <Card key={ell.id} className="mt-2 bg-red-200">
              <CardContent>
                {" "}
                <b>To: </b> {ell.to} <br />
                <b>created:</b> {date}
                {/* <br /> <b>Products: </b> {ell.prodcuts.items[0].name} */}
              </CardContent>
              <CardActions className="-mt-5">
                <Link to="/">
                  <Button
                    onClick={() => {
                      details.setData(ell);
                    }}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    deleteDoc(doc(db, "karthik", ell.id));
                    setBeel((prev) => !prev);
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default History;
