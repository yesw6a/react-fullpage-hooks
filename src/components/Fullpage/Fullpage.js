import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// import styles from "./index.module.scss";

function Fullpage({ children, initPage }) {
  const pageCount = children.length;

  const [currentPage, setCurrentPage] = useState(0); // 当前页面
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }); // 页面尺寸

  useEffect(() => {
    init();
    window.addEventListener("DOMMouseScroll", mouseScroll, false);
    window.addEventListener("mousewheel", mouseScroll, false);
    return () => {
      window.removeEventListener("DOMMouseScroll", mouseScroll);
      window.removeEventListener("mousewheel", mouseScroll);
    };
  }, []);

  const init = () => {
    const _dimensions = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    setCurrentPage(initPage);
    setDimensions(_dimensions);
  };

  const mouseScroll = () => {
    console.log("mousewheel");
  };

  return <div style={dimensions}>{children}</div>;
}

Fullpage.prototype = {
  initPage: PropTypes.number
};

Fullpage.default = {
  initPage: 0
};

export default Fullpage;
