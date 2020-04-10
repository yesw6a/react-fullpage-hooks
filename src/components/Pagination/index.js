import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./style.module.scss";

function Pagination({
  pagination,
  paginationType,
  isVertical,
  pageCount,
  currentPage,
  handleChangePage
}) {
  if (!pagination) {
    return null;
  }

  const renderIndicator = () => {
    const profile = {
      dot: renderDot,
      number: renderNum
    };

    return profile[paginationType]() || profile["dot"]();
  };

  // 圆点指示器
  const renderDot = () => {
    const DOT_STYLE = isVertical ? { margin: "5px 0 " } : { margin: "0 5px" };
    return Array(pageCount)
      .fill("")
      .map((item, index) => (
        <div
          key={index}
          style={DOT_STYLE}
          className={classNames(
            styles.paginationDot,
            currentPage === index ? styles.paginationDotActive : ""
          )}
          onClick={() => handleChangePage(index)}
        ></div>
      ));
  };

  // 数字指示器
  const renderNum = () => {
    const textArr = [currentPage + 1, "/", pageCount];
    const NUM_STYLE = isVertical ? { margin: "5px 0 " } : { margin: "0 5px" };
    return textArr.map((item, index) => (
      <div key={index} style={NUM_STYLE} className={styles.paginationNum}>
        {item}
      </div>
    ));
  };

  return (
    <div
      className={
        isVertical ? styles.paginationVertical : styles.paginationHorizontal
      }
    >
      {renderIndicator()}
    </div>
  );
}

Pagination.prototype = {
  pagination: PropTypes.bool,
  paginationType: PropTypes.string,
  isVertical: PropTypes.bool
};

Pagination.defaultProps = {
  pagination: true,
  paginationType: "dot",
  isVertical: true
};

export default Pagination;
