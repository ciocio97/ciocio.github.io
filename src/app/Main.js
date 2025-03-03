"use client";

import "./main.css";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const CubeButton = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1),
    4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  border: none;
  box-shadow: none;
  width: 200px;
  height: 200px;
  -webkit-perspective: 230px;
  perspective: 230px;

  span {
    color: rgba(28, 28, 28, 1);
    background: rgb(255, 255, 255, 0.7);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    position: absolute;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow:
      inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1),
      4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    margin: 0;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
  span:nth-child(1) {
    opacity: 0.1;
    box-shadow:
      -7px -7px 20px 0px #fff9,
      -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002,
      4px 4px 5px 0px #0001;
    -webkit-transform: rotateX(90deg);
    -moz-transform: rotateX(90deg);
    transform: rotateX(90deg);
    -webkit-transform-origin: 50% 50% -100px;
    -moz-transform-origin: 50% 50% -100px;
    transform-origin: 50% 50% -100px;
  }
  span:nth-child(2) {
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    transform: rotateX(0deg);
    -webkit-transform-origin: 50% 50% -100px;
    -moz-transform-origin: 50% 50% -100px;
    transform-origin: 50% 50% -100px;
  }
  &:hover span:nth-child(1) {
    opacity: 1;
    box-shadow:
      inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1),
      4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    -webkit-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    transform: rotateX(0deg);
  }
  &:hover span:nth-child(2) {
    opacity: 0.01;
    -webkit-transform: rotateX(-90deg);
    -moz-transform: rotateX(-90deg);
    transform: rotateX(-90deg);
  }
`;

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

// 컴포넌트 외부로 이동
const WORDS = ["Develop", "Design"];

const Main = () => {
  const [text, setText] = useState("Develop");
  // words 제거하고 WORDS 사용
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);

  const typeText = useCallback(() => {
    const currentWord = WORDS[wordIndex];

    // 단어가 완성되었을 때
    if (!isDeleting && text === currentWord && !isPaused) {
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000); // 2초 대기
      return;
    }

    // 삭제가 완료되었을 때
    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % WORDS.length);
      return;
    }

    // 타이핑 중이거나 삭제 중일 때
    if (!isPaused) {
      const nextText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);
      setText(nextText);
    }
  }, [text, isDeleting, wordIndex, isPaused]);

  useEffect(() => {
    // 초기 애니메이션이 끝난 후 커서와 타이핑 효과 시작
    const cursorTimer = setTimeout(() => setShowCursor(true), 3650);
    return () => clearTimeout(cursorTimer);
  }, []);

  useEffect(() => {
    if (!showCursor || isPaused) return;

    const timer = setTimeout(
      () => {
        typeText();
      },
      isDeleting ? 100 : 200,
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, showCursor, typeText, isPaused]);

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
        <div className="relative h-screen flex justify-center items-center">
          <div className="text-block">
            -<p className="absolute top-0 right-20">Front</p>
            <p className="absolute bottom-0 left-20">end</p>
          </div>
          <div className="text-block">
            -
            <p
              className={`absolute top-0 flex ${showCursor ? "right-10" : "right-21"}`}
            >
              {text}
              {showCursor && <span className="typing-cursor">|</span>}
            </p>
            <p className="absolute bottom-0 left-20">er</p>
          </div>
          <div className="initial-line"></div>
        </div>
        <div
          className={`h-screen flex justify-center items-center text-white text-4xl font-bold`}
        >
          <div className="absolute flex items-start gap-20">
            <CubeButton>
              <span>UB</span>
              <span>
                <img
                  src="/images/logo_ub.png"
                  alt="logo_ub"
                  width={100}
                  height={100}
                />
              </span>
            </CubeButton>
            <CubeButton>
              <span>FN</span>
              <span>
                <img
                  src="images/logo_fn.png"
                  alt="logo_fn"
                  width={95}
                  height={95}
                />
              </span>
            </CubeButton>
            <CubeButton>
              <span>LS</span>
              <span>
                <img
                  src="/images/logo_ls.png"
                  alt="logo_ls"
                  width={90}
                  height={90}
                />
              </span>
            </CubeButton>
            <CubeButton>
              <span>RM</span>
              <span>
                <img
                  src="/images/logo_rm.png"
                  alt="logo_rm"
                  width={80}
                  height={80}
                />
              </span>
            </CubeButton>
          </div>
        </div>
        <div
          className={`h-screen flex justify-center items-center text-white text-4xl font-bold`}
        ></div>
        <div
          className={`h-screen flex justify-center items-center text-white text-4xl font-bold`}
        ></div>
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

export default Main;
