import React, { useRef } from "react";
import "./App.css";
import { Fullpage, FullpageItem } from "@/components/Fullpage";

function App() {
  const commonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const ref = useRef();

  return (
    <div className="App">
      <Fullpage ref={ref} direction="horizontal">
        <FullpageItem style={{ ...commonStyle, backgroundColor: "#f90" }}>
          Page1
          <button onClick={() => ref.current.slideNext()}>next</button>
        </FullpageItem>
        <FullpageItem style={{ ...commonStyle, backgroundColor: "#f69" }}>
          Page2
        </FullpageItem>
        <FullpageItem style={{ ...commonStyle, backgroundColor: "#f63" }}>
          Page3
        </FullpageItem>
        <FullpageItem style={{ ...commonStyle, backgroundColor: "#b72" }}>
          Page4
        </FullpageItem>
      </Fullpage>
    </div>
  );
}

export default App;
