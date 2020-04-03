import React from "react";
import "./App.css";
import { Fullpage, FullpageItem } from "@/components/Fullpage";

function App() {
  const commonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  return (
    <div className="App">
      <Fullpage>
        <FullpageItem style={{ ...commonStyle, backgroundColor: "#f90" }}>
          Page1
        </FullpageItem>
        <FullpageItem style={{ ...commonStyle, backgroundColor: "#f09" }}>
          Page2
        </FullpageItem>
        <FullpageItem style={{ ...commonStyle, backgroundColor: "#f03" }}>
          Page3
        </FullpageItem>
        <FullpageItem style={{ ...commonStyle, backgroundColor: "#b22" }}>
          Page4
        </FullpageItem>
      </Fullpage>
    </div>
  );
}

export default App;
