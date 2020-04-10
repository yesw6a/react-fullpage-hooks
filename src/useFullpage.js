import React, {
  useState,
  useEffect,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import PropTypes from "prop-types";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
// import throttle from "./lib/throttle";
import debounce from "./lib/debounce";

import styles from "./Fullpage.module.scss";
import Pagination from "./components/Pagination";
import Navigation from "./components/Navigation";

const locationHash = window.location.hash.match(/#(.*?)#|#(.*)/);
const locationRealHash = locationHash
  ? locationHash[1] || locationHash[2]
  : null;

function FullpageComponent(
  {
    children,
    initPage,
    scrollBar,
    duration,
    pageTimeout,
    direction,
    pagination,
    paginationType,
    navigation,
    anchor,
    renderPrevButton,
    renderNextButton,
    responsiveHeight
  },
  ref
) {
  const pageCount = children.length;
  const isVertical = direction === "vertical";
  const pageControllerInit = {
    visibleNavigation: navigation, // 是否显示分页按钮
    visiblePagination: pagination, // 是否显示轮播指示器
    pauseListenScrollWheel: false // 是否监听scroll操作
  };

  const [currentPage, setCurrentPage] = useState(initPage); // 当前页面
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 }); // 页面尺寸
  const [pageController, setPageController] = useState(pageControllerInit);
  const [offset, setOffset] = useState(0);

  const {
    visibleNavigation,
    visiblePagination,
    pauseListenScrollWheel
  } = pageController;

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
    if (width > 0 && height > 0) {
      const _offset = currentPage * (isVertical ? height : width);
      setOffset(_offset);
    }
    // eslint-disable-next-line
  }, [currentPage, dimensions]);

  useEffect(() => {
    const { height } = dimensions;
    if ((scrollBar || height <= responsiveHeight) && isVertical) {
      setOffset(0);
      setPageController(
        Object.assign({}, pageController, {
          visibleNavigation: false,
          visiblePagination: false,
          pauseListenScrollWheel: true
        })
      );
    } else {
      setPageController(
        Object.assign({}, pageController, {
          visibleNavigation: navigation,
          visiblePagination: pagination,
          pauseListenScrollWheel: false
        })
      );
    }
    // eslint-disable-next-line
  }, [dimensions]);

  // 从ref导出可供外部调用的值或方法
  useImperativeHandle(ref, () => ({
    slideNext,
    slidePrev
  }));

  const init = () => {
    if (Array.isArray(anchor)) {
      let _currentPage = currentPage;
      for (const index in anchor) {
        if (anchor[index] === locationRealHash) {
          _currentPage = Number(index);
          break;
        }
      }

      jumpPage(_currentPage);
    }
    getSize();
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
    const viewPortWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const viewPortHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    // 窗口高度是否达到规定阈值
    const thresholdHeight = viewPortHeight <= responsiveHeight;
    let _dimensions = { width: viewPortWidth, height: viewPortHeight };

    if ((scrollBar || thresholdHeight) && isVertical) {
      Object.assign(_dimensions, { width: "100%" });
    }

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

    jumpPage(currentPage + n);
  };

  // 跳转到指定页
  const jumpPage = page => {
    if (Array.isArray(anchor)) {
      window.location.hash = anchor[page];
    }
    setCurrentPage(page);
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

  const FULLPAGE_STYLE = Object.assign(
    {},
    {
      flexDirection: isVertical ? "column" : "row",
      width: isVertical ? dimensions.width : dimensions.width * pageCount,
      height: isVertical ? dimensions.height * pageCount : dimensions.height
    }
  );

  const CONTAINER_STYLE = Object.assign({}, dimensions, {
    overflow: pauseListenScrollWheel ? "" : "hidden"
  });

  return (
    <ReactScrollWheelHandler
      className={styles.container}
      style={CONTAINER_STYLE}
      upHandler={upHandler}
      downHandler={downHandler}
      leftHandler={leftHandler}
      rightHandler={rightHandler}
      timeout={pageTimeout}
      pauseListeners={pauseListenScrollWheel}
    >
      <div
        className={styles.fullpage}
        style={{
          ...FULLPAGE_STYLE,
          display: "flex",
          transform: `translate${isVertical ? "Y" : "X"}(${-offset}px)`,
          transitionDuration: `${duration / 1000}s`
        }}
      >
        {children.map((item, index) => {
          return (
            <div key={index} style={dimensions}>
              {item}
            </div>
          );
        })}
      </div>
      <Pagination
        pagination={visiblePagination}
        paginationType={paginationType}
        isVertical={isVertical}
        pageCount={pageCount}
        currentPage={currentPage}
        handleChangePage={jumpPage}
      />
      <Navigation
        navigation={visibleNavigation}
        isVertical={isVertical}
        handlePrev={slidePrev}
        handleNext={slideNext}
        renderPrevButton={renderPrevButton}
        renderNextButton={renderNextButton}
      />
    </ReactScrollWheelHandler>
  );
}

const useFullpage = forwardRef(FullpageComponent);

useFullpage.prototype = {
  initPage: PropTypes.number,
  scrollBar: PropTypes.bool,
  duration: PropTypes.number,
  pageTimeout: PropTypes.number,
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  pagination: PropTypes.bool,
  paginationType: PropTypes.string,
  navigation: PropTypes.bool,
  anchor: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  renderPrevButton: PropTypes.func,
  renderNextButton: PropTypes.func,
  responsiveHeight: PropTypes.number
};

useFullpage.defaultProps = {
  initPage: 1,
  scrollBar: false,
  duration: 300,
  pageTimeout: 300,
  direction: "vertical",
  responsiveHeight: 0,
  anchor: false
};

export default useFullpage;
