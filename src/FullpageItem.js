import React from "react";
import classNames from "classnames";

import styles from "./FullpageItem.module.scss";

function FullpageItem({ children, className, style }) {
  return (
    <div className={classNames(styles.itemWrapper, className)} style={style}>
      {children}
    </div>
  );
}

export default FullpageItem;
