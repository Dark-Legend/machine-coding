import React, { useEffect, useRef, useState } from "react";

const LIMIT = 10;

async function fetchProducts(skip: number) {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

const InfiniteScroll: React.FC = () => {
  const [itemList, setItemList] = useState([]);
  const containerRef = useRef(null);
  const sentinelRef = useRef(null);
  const skipRef = useRef(0);

  const fetchData = async () => {
    const data = await fetchProducts(skipRef.current);
    const productData = data.products;
    setItemList((prev) => {
      return [...prev, ...productData];
    });

    skipRef.current += LIMIT;
  };

  useEffect(() => {
    const container = containerRef.current;
    const sentinel = sentinelRef.current;
    if (!container || !sentinel) return;

    const observer = new IntersectionObserver( // Initial setup of intersection observer
      (entries) => {
        const entry = entries[0];
        console.log(entries);

        if (entry.isIntersecting) {
          // checking if the sentinel element is intersecting or not
          fetchData(); // firing fetch API.
        }
      },
      {
        root: container, // add parent container as root
        rootMargin: "200px", // It just add margin around the root which helps the sentinel to trigger visible container much before it actually reaches the visible container.
        threshold: 0, //  It controls how much element must be visible before observer consider it intersecting 0%, 0.25% 0.50% etc.
      },
    );

    observer.observe(sentinel); // Observing the sentinel element
    return () => observer.disconnect(); // disconnects the observer on unmounting.
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "400px",
        width: "400px",
        overflowY: "auto",
        backgroundColor: "white",
      }}
    >
      {itemList?.length > 0 &&
        itemList?.map((item) => <div key={item?.id}>{item?.title}</div>)}

      <div ref={sentinelRef}></div>
    </div>
  );
};

export default InfiniteScroll;
