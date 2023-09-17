import { useState, createContext, useMemo } from "react";

import { Routes, Route, Form } from "react-router-dom";
import Forms from "./Components/Forms";
import Preview from "./../src/Components/Pre/Preview";
export const QuoteContext = createContext(null);
import History from "./Components/History";
function App() {
  const [percent, setPercent] = useState(0);
  const [data, setData] = useState({
    to: "",
    gst: "IGST",
    warranty: "",
    products: {
      items: [],
    },
  });
  const [fakedata, setFakedata] = useState({
    to: "",
    gst: "IGST",
    warranty: "",
    products: {
      items: [],
    },
  });

  const contextValue = useMemo(
    () => ({
      data,
      percent,
      setPercent,
      setData,
      fakedata,
      setFakedata,
    }),
    [data, percent, fakedata]
  );
  return (
    <QuoteContext.Provider value={contextValue}>
      {" "}
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </QuoteContext.Provider>
  );
}

export default App;
