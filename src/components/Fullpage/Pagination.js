import React from "react";
// import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./Pagination.module.scss";
function Pagination({
  pagination,
  paginationType,
  isVertical,
  pageCount,
  currentPage,
}) {
  if (!pagination) {
    return null;
  }

  const renderIndicator = () => {
    const profile = {
      dot: renderDot,
    };

    return profile[paginationType]() || profile["dot"]();
  };

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
        ></div>
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

Pagination.defaultProps = {
  pagination: true,
  paginationType: "dot",
  isVertical: true,
};

export default Pagination;
