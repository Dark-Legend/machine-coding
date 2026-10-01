import React, { useRef, useState } from "react";

const items = Array.from({ length: 101 }, (_, index) => index);
const CONTAINER_HEIGHT = 500;
const ITEM_HEIGHT = 50;
const OVERSCAN = 5;

const Virtualization: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0); // current scroll position
  const containerRef = useRef(null);
  const totalHeight = items?.length * ITEM_HEIGHT; // Calculate total height to apply to content div
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN,
  ); // Calculating which first element should be mounted also extra elements to mount to make the virtualization smooth
  const visibleElements = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT); // To get what are the number of visible elements are there
  const endIndex = Math.min(
    items.length,
    startIndex + visibleElements + OVERSCAN,
  ); // Caculate the index of the last visible element that needs to be mounted + the extra number of elements to be mounted for smoothing the virtualization.
  const visibleItems = items.slice(startIndex, endIndex);
  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };
  console.log(scrollTop);
  return (
    <div
      className="viewport"
      onScroll={handleScroll}
      ref={containerRef}
      style={{
        height: CONTAINER_HEIGHT,
        overflowY: "auto",
        backgroundColor: "white ",
      }}
    >
      <div
        className="content"
        style={{ height: `${totalHeight}px`, position: "relative" }}
      >
        {visibleItems?.map((item, index) => {
          const actualIndex = startIndex + index; // Original index of the item
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                top: actualIndex * ITEM_HEIGHT,
                color: "text",
                display: "flex",
                justifyContent: "center",
              }} // Calculating the position of the element to position it correctly.
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Virtualization;
