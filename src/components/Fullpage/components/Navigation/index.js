import React from "react";
import PropTypes from "prop-types";

import styles from "./style.module.scss";

function Navigation({
  navigation,
  isVertical,
  handlePrev,
  handleNext,
  renderPrevButton,
  renderNextButton
}) {
  const arrowLeft = () => {
    return <div className={styles.arrowLeft}>{"<"}</div>;
  };

  const arrowRight = () => {
    return <div className={styles.arrowRight}>{">"}</div>;
  };

  if (!navigation) {
    return null;
  }

  if (isVertical) {
    return null;
  }

  return (
    <div className={styles.navigation}>
      <div className={styles.navPrev}>
        <div onClick={handlePrev}>
          {renderPrevButton ? renderPrevButton() : arrowLeft()}
        </div>
      </div>
      <div className={styles.navNext}>
        <div onClick={handleNext}>
          {renderNextButton ? renderNextButton() : arrowRight()}
        </div>
      </div>
    </div>
  );
}

Navigation.prototype = {
  navigation: PropTypes.bool,
  isVertical: PropTypes.bool,
  renderPrevButton: PropTypes.func,
  renderNextButton: PropTypes.func
};

Navigation.defaultProps = {
  navigation: false,
  isVertical: true
};

export default Navigation;
