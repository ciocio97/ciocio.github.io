"use client";

import { useEffect, useState } from "react";

const pages = [
  {
    id: 1,
    title: "First Page",
    bg: "bg-gradient-to-r from-blue-400 to-indigo-500",
    component: <div>First Page</div>,
  },
  {
    id: 2,
    title: "Second Page",
    bg: "bg-gradient-to-r from-orange-400 to-pink-500",
    component: <div>Second Page</div>,
  },
  {
    id: 3,
    title: "Third Page",
    bg: "bg-gradient-to-r from-green-400 to-teal-500",
    component: <div>Third Page</div>,
  },
  {
    id: 4,
    title: "Fourth Page",
    bg: "bg-gradient-to-r from-purple-600 to-pink-700",
    component: <div>Fourth Page</div>,
  },
];

const ScrollTest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);

  // 🔹 마우스 휠 이벤트 핸들링
  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling) return;
      setIsScrolling(true);
      if (e.deltaY > 0 && currentPage < pages.length) {
        setCurrentPage((prev) => prev + 1);
      } else if (e.deltaY < 0 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
      setTimeout(() => setIsScrolling(false), 800);
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentPage, isScrolling]);
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-700"
        style={{ transform: `translateY(-${(currentPage - 1) * 100}vh)` }}
      >
        {pages.map((page) => (
          <div
            key={page.id}
            className={`h-screen flex justify-center items-center text-white text-4xl font-bold ${page.bg}`}
          >
            {page.component}
          </div>
        ))}
      </div>

      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {pages.map((page) => (
          <button
            key={page.id}
            className={`w-4 h-4 rounded-full border ${currentPage === page.id ? "bg-white border-white scale-125" : "border-gray-400"}`}
            onClick={() => setCurrentPage(page.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollTest;
