import React, { useContext, useRef, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { QuoteContext } from "../App";
import storage from "../firebase";
import Select from "@mui/material/Select";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";
import { MenuItem } from "@mui/material";
import CardActions from "@mui/material/CardActions";

const Form = () => {
  const imageRef = useRef(null);
  const [imageDataUrl, setImageDataUrl] = useState(null);

  // const [file, setFile] = useState(null);
  const [items, setItems] = useState({
    name: "",
    description: "",
    unitPrice: 0,
    Qty: 0,
    images: "",
    imgloc: "",
  });
  const details = useContext(QuoteContext);
  const [fakedata, setFakedata] = useState(true);

  // useEffect(() => {
  //   console.log(details.data);
  // }, [details]);

  // const uploadHandle = () => {
  //   details.data.products.items.forEach((element) => {
  //     const storageRef = ref(storage, `/karthik_creatives/${element.imgloc}`);
  //     const uploadTask = uploadBytesResumable(storageRef, element.imgloc);

  //     uploadTask.on(
  //       "state_changed",

  //       (err) => console.log(err)

  //       // () => {
  //       //   getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //       //     // details.setData({
  //       //     //   ...details.data,
  //       //     //   products :{
  //       //     //     items :
  //       //     //   }
  //       //     // })
  //       //   });
  //       // }
  //     );
  //   });
  // };

  return (
    <div
      className="w-screen pt-10 flex flex-col items-start gap-4 justify-center
  px-4"
    >
      <TextField
        id="outlined-basic"
        label="To"
        size="small"
        value={details.data.to}
        className="w-[100%]"
        variant="outlined"
        onChange={(e) =>
          details.setData({
            ...details.data,
            to: e.target.value,
          })
        }
      />
      <select
        name="GST"
        id="cars"
        className="border-2 border-slate-300"
        onChange={(e) =>
          details.setData({
            ...details.data,
            gst: e.target.value,
          })
        }
      >
        <option value="IGST">IGST</option>
        <option value="CGST & SGST">CGST & SGST</option>
      </select>
      <TextField
        id="outlined-basic"
        label="Warranty"
        size="small"
        value={details.data.warranty}
        className="w-[100%]"
        variant="outlined"
        onChange={(e) =>
          details.setData({
            ...details.data,
            warranty: e.target.value,
          })
        }
      />
      Product Details:
      <TextField
        id="outlined-basic"
        label="Item Name"
        size="small"
        value={items.name}
        className="w-[100%]"
        variant="outlined"
        onChange={(e) =>
          setItems({
            ...items,
            name: e.target.value,
          })
        }
      />
      <input
        type="file"
        ref={imageRef}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          // console.log(file);

          if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
              setItems({
                ...items,
                images: reader.result,
                imgloc: file.name,
              });
            };

            reader.readAsDataURL(file);
          }
        }}
      />
      <TextField
        id="outlined-basic"
        size="small"
        value={items.description}
        label="Description"
        multiline
        className="w-[100%]"
        variant="outlined"
        onChange={(e) =>
          setItems({
            ...items,
            description: e.target.value,
          })
        }
      />
      <TextField
        id="outlined-basic"
        value={items.Qty}
        size="small"
        label="Qty"
        type="number"
        className="w-[100%]"
        variant="outlined"
        onChange={(e) =>
          setItems({
            ...items,
            Qty: e.target.value,
          })
        }
      />
      <TextField
        value={items.unitPrice}
        id="outlined-basic"
        size="small"
        type="number"
        label="Unit Price"
        className="w-[100%]"
        onChange={(e) => {
          // console.log(typeof e.target.value);
          setItems({
            ...items,
            unitPrice: e.target.value,
          });
        }}
        variant="outlined"
      />
      <Button
        variant="contained"
        onClick={() => {
          details.setData({
            ...details.data,
            products: {
              items: [...details.data.products.items, items],
            },
          });

          setItems({
            name: "",
            description: "",
            Qty: 0,
            unitPrice: 0,
            images: "",
            imgloc: "",
          });
          imageRef.current.value = null;
        }}
      >
        Add Product
      </Button>
      {details.data.products.items.map((ell) => (
        <Card
          key={details.data.products.items.indexOf(ell)}
          className="w-[100%]"
        >
          <CardContent>
            <b>Item Name :</b> {ell.name} <br />
            <img className="w-[200px] " src={ell.images} /> <br />
            <b>Description :</b> {ell.description} <br />
            <b>Unit Price :</b> {ell.unitPrice} <br />
            <b>Qty :</b> {ell.Qty} <br />
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                const index = details.data.products.items.indexOf(ell);
                console.log(index);
                // if (index > -1) {
                details.data.products.items.splice(index, 1);
                setFakedata((prev) => !prev);
                //   console.log("deleted");
                // }
              }}
              size="small"
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
      <Link to="/preview">
        <Button variant="contained">Preview</Button>
      </Link>
      <Link to="/history">
        <Button variant="contained">History</Button>
      </Link>
    </div>
  );
};

export default Form;
