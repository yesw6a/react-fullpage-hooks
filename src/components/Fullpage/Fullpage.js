import React, {
  useState,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import PropTypes from "prop-types";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
// import throttle from "@/lib/throttle";
import debounce from "@/lib/debounce";

import styles from "./Fullpage.module.scss";
import Pagination from "./components/Pagination";
import Navigation from "./components/Navigation";

function FullpageComponent(
  {
    children,
    initPage,
    duration,
    pageTimeout,
    direction,
    pagination,
    paginationType,
    navigation,
    renderPrevButton,
    renderNextButton
  },
  ref
) {
  const pageCount = children.length;
  const isVertical = direction === "vertical";

  const [currentPage, setCurrentPage] = useState(0); // 当前页面
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }); // 页面尺寸
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    init();
    window.addEventListener("resize", onResize);
    document.body.addEventListener("touchmove", onTouchMove, {
      passive: false
    });
    return () => {
      window.removeEventListener("resize", onResize);
      document.body.removeEventListener("touchmove", onTouchMove, {
        passive: false
      });
    };
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    const { width, height } = dimensions;
    const _offset = currentPage * (isVertical ? height : width);
    setOffset(_offset);
    // eslint-disable-next-line
  }, [currentPage, dimensions]);

  useImperativeHandle(ref, () => ({
    slideNext,
    slidePrev
  }));

  const init = () => {
    getSize();
    setCurrentPage(initPage);
  };

  const onResize = debounce(() => {
    getSize();
  }, 200);

  // 禁止网页橡皮筋效果
  const onTouchMove = e => {
    e.preventDefault();
  };

  // 获取并设置当前窗口尺寸
  const getSize = () => {
    const _dimensions = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    setDimensions(_dimensions);
  };

  /**
   * 翻页逻辑
   * @param {number} n - 翻页参数，n<0：向前（上）翻n页，n>0：向后（下）翻n页
   */
  const scroll = n => {
    if (n < 0 && currentPage === 0) {
      return false;
    }
    if (n > 0 && currentPage === pageCount - 1) {
      return false;
    }
    setCurrentPage(currentPage + n);
  };

  // 翻到下一页
  const slideNext = () => {
    scroll(1);
  };

  // 翻到上一页
  const slidePrev = () => {
    scroll(-1);
  };

  // 监听向上滚动
  const upHandler = () => {
    if (!isVertical) {
      return false;
    }
    scroll(-1);
  };

  // 监听向下滚动
  const downHandler = () => {
    if (!isVertical) {
      return false;
    }
    scroll(1);
  };

  // 监听向左滚动
  const leftHandler = () => {
    if (isVertical) {
      return false;
    }
    scroll(1);
  };

  // 监听向右滚动
  const rightHandler = () => {
    if (isVertical) {
      return false;
    }
    scroll(-1);
  };

  const fullpageStyle = isVertical
    ? {
        flexDirection: "column",
        width: dimensions.width,
        height: dimensions.height * pageCount
      }
    : {
        flexDirection: "row",
        width: dimensions.width * pageCount,
        height: dimensions.height
      };

  return (
    <ReactScrollWheelHandler
      className={styles.container}
      style={dimensions}
      upHandler={upHandler}
      downHandler={downHandler}
      leftHandler={leftHandler}
      rightHandler={rightHandler}
      timeout={pageTimeout}
    >
      <div
        className={styles.fullpage}
        style={{
          ...fullpageStyle,
          display: "flex",
          transform: `translate${isVertical ? "Y" : "X"}(${-offset}px)`,
          transitionDuration: `${duration / 1000}s`
        }}
      >
        {children.map((item, index) => (
          <div
            key={index}
            style={{ width: dimensions.width, height: dimensions.height }}
          >
            {item}
          </div>
        ))}
      </div>
      <Pagination
        pagination={pagination}
        paginationType={paginationType}
        isVertical={isVertical}
        pageCount={pageCount}
        currentPage={currentPage}
        handleChangePage={setCurrentPage}
      />
      <Navigation
        navigation={navigation}
        isVertical={isVertical}
        handlePrev={slidePrev}
        handleNext={slideNext}
        renderPrevButton={renderPrevButton}
        renderNextButton={renderNextButton}
      />
    </ReactScrollWheelHandler>
  );
}

const Fullpage = forwardRef(FullpageComponent);

Fullpage.prototype = {
  initPage: PropTypes.number,
  duration: PropTypes.number,
  pageTimeout: PropTypes.number,
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  pagination: PropTypes.bool,
  paginationType: PropTypes.string,
  navigation: PropTypes.bool,
  renderPrevButton: PropTypes.func,
  renderNextButton: PropTypes.func
};

Fullpage.defaultProps = {
  initPage: 1,
  duration: 300,
  pageTimeout: 300,
  direction: "vertical"
};

export default Fullpage;
