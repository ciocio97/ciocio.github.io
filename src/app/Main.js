"use client";

import "./main.css";
import { useState, useEffect, useCallback, useRef } from "react";
import styled, { css } from "styled-components";
import ProjectNavigation from "./components/projectNavigation";
const NoiseCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.15;
`;

const CubeButton = styled.div`
  position: relative;
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
  z-index: 1;
  span {
    position: absolute;
    color: rgba(28, 28, 28, 1);
    /* color: rgba(255, 255, 255, 1); */
    font-size: 2rem;
    font-weight: 300;
    background: rgb(255, 255, 255, 0.6);
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
    border-radius: 30px;
    border: 1px solid rgba(87, 87, 87, 0.5);
    margin: 0;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;

    &:nth-child(1) {
      opacity: 0.01;
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

    &:nth-child(2) {
      -webkit-transform: rotateX(0deg);
      -moz-transform: rotateX(0deg);
      transform: rotateX(0deg);
      -webkit-transform-origin: 50% 50% -100px;
      -moz-transform-origin: 50% 50% -100px;
      transform-origin: 50% 50% -100px;
    }

    /* &.project {
      ${(props) =>
      props.$selectedProjectId === 1 &&
      css`
        left: -200px;
        transition-property: all;
        transition-duration: 1s;
        transition-timing-function: ease-in-out;
        transition-delay: 0s;
        transition: all 1s ease-in-out 0s;
      `};

      ${(props) =>
      props.$selectedProjectId === 2 &&
      css`
        left: -480px;
        transition: all 1s ease-in-out 0s;
      `};

      ${(props) =>
      props.$selectedProjectId === 3 &&
      css`
        left: -760px;
        transition: all 1s ease-in-out 0s;
      `};

      ${(props) =>
      props.$selectedProjectId === 4 &&
      css`
        left: -1040px;
        transition: all 1s ease-in-out 0s;
      `};
    } */
  }

  &:hover span:nth-child(1) {
    opacity: 1;
    background: rgba(255, 255, 255, 0.7);
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

const ProjectIcon = styled.div`
  position: fixed;
  top: ${props => props.$top === 0 ? 1500 : props.$top}px;
  left: 80px;
`;

const pages = [
  {
    id: 1,
    title: "First Page",
    component: <div>First Page</div>,
  },
  {
    id: 2,
    title: "Second Page",
    component: <div>Second Page</div>,
  },
  {
    id: 3,
    title: "Third Page",
    component: <div>Third Page</div>,
  },
];

// 컴포넌트 외부로 이동
const WORDS = ["Develop", "Design"];

const NoiseEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current;
    if (!canvas) return;

    let ctx = canvas.getContext("2d");
    let wWidth = window.innerWidth;
    let wHeight = window.innerHeight;
    let noiseData = [];
    let frame = 0;
    let loopTimeout;

    const createNoise = () => {
      const idata = ctx.createImageData(wWidth, wHeight);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        const grayscale = Math.random() < 0.5 ? 0xff7f7f7f : 0xffffffff;
        buffer32[i] = grayscale;
      }

      noiseData.push(idata);
    };

    const paintNoise = () => {
      if (frame === 9) {
        frame = 0;
      } else {
        frame++;
      }
      ctx.putImageData(noiseData[frame], 0, 0);
    };

    const loop = () => {
      paintNoise(frame);
      loopTimeout = window.setTimeout(() => {
        window.requestAnimationFrame(loop);
      }, 1000 / 25);
    };

    const setup = () => {
      wWidth = window.innerWidth;
      wHeight = window.innerHeight;
      canvas.width = wWidth;
      canvas.height = wHeight;

      for (let i = 0; i < 10; i++) {
        createNoise();
      }

      loop();
    };

    let resizeThrottle;
    const reset = () => {
      window.addEventListener(
        "resize",
        () => {
          window.clearTimeout(resizeThrottle);
          resizeThrottle = window.setTimeout(() => {
            window.clearTimeout(loopTimeout);
            setup();
          }, 200);
        },
        false,
      );
    };

    setup();
    reset();

    return () => {
      window.clearTimeout(loopTimeout);
    };
  }, []);

  return <NoiseCanvas ref={canvasRef} />;
};

const Main = () => {
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const [text, setText] = useState("Develop");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  // const [projects, setProjects] = useState([
  //   { id: 1, isSelected: false },
  //   { id: 2, isSelected: false },
  //   { id: 3, isSelected: false },
  //   { id: 4, isSelected: false },
  // ]);

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

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight);
    }
  }, [containerRef]);

  return (
    <div className="h-screen w-screen overflow-hidden relative" ref={containerRef}>
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-700 z-1"
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
        <div className={`relative h-screen flex justify-center items-center`}>
          <div className="absolute flex items-start gap-20">
            <CubeButton
              $selectedProjectId={selectedProjectId}
              onClick={() => setSelectedProjectId(1)}
            >
              <span>Urbanbase</span>
              <span className={selectedProjectId === 1 ? "project" : ""}>
                <img
                  src="/images/logo_ub.png"
                  alt="logo_ub"
                  width={100}
                  height={100}
                />
              </span>
            </CubeButton>
            <CubeButton
              $selectedProjectId={selectedProjectId}
              onClick={() => setSelectedProjectId(2)}
            >
              <span>Life Secretary</span>
              <span className={selectedProjectId === 2 ? "project" : ""}>
                <img
                  src="/images/logo_ls.png"
                  alt="logo_ls"
                  width={90}
                  height={90}
                />
              </span>
            </CubeButton>
            <CubeButton
              $selectedProjectId={selectedProjectId}
              onClick={() => setSelectedProjectId(3)}
            >
              <span>Ref Mate</span>
              <span className={selectedProjectId === 3 ? "project" : ""}>
                <img
                  src="/images/logo_rm.png"
                  alt="logo_rm"
                  width={80}
                  height={80}
                />
              </span>
            </CubeButton>
          </div>
          {/* 1 */}
          <div
            className={`absolute top-0 transition-transform duration-500 ${selectedProjectId === 1 ? (currentPage === 2 ? "" : "translate-x-[100vw]") : "translate-x-[100vw]"} z-1`}
          >
            <div className="relative h-screen w-screen">
              <ProjectIcon $top={Math.round((containerHeight / 3) * 1.1)}>
                <img
                  src="/images/logo_ub.png"
                  alt="logo_ub"
                  width={100}
                  height={100}
                />
              </ProjectIcon>
              <div
                className={`absolute h-screen w-[calc(100vw-250px)] top-0 right-0 border border-l-white/70 bg-white/95 z-2`}
              >
                hello
              </div>
            </div>
          </div>
          {/* 2 */}
          <div
            className={`absolute h-screen w-screen top-0 transition-transform duration-500 ${selectedProjectId === 2 ? (currentPage === 2 ? "" : "translate-x-[100vw]") : "translate-x-[100vw]"} z-1`}
          >
            <div className="relative h-screen w-screen">
              <ProjectIcon $top={Math.round((containerHeight / 3) * 1.1)}>
                <img
                  src="/images/logo_ls.png"
                  alt="logo_ls"
                  width={90}
                  height={90}
                />
              </ProjectIcon>
              <div
                className={`absolute h-screen w-[calc(100vw-250px)] top-0 right-0 border border-l-white/70 bg-white/95 z-2`}
              >
                hello
              </div>
            </div>
          </div>
          {/* 3 */}
          <div
            className={`absolute h-screen w-screen top-0 transition-transform duration-500 ${selectedProjectId === 3 ? (currentPage === 2 ? "" : "translate-x-[100vw]") : "translate-x-[100vw]"} z-1`}
          >
            <div className="relative h-screen w-screen">
              <ProjectIcon $top={Math.round((containerHeight / 3) * 1.1)}>
                <img
                    src="/images/logo_rm.png"
                    alt="logo_rm"
                    width={80}
                    height={80}
                  />
              </ProjectIcon>
              <div
                className={`absolute h-screen w-[calc(100vw-250px)] top-0 right-0 border-2 border border-l-white/70 bg-white/95 z-2`}
              >
                hello
              </div>
            </div>
          </div>
        </div>
        <div
          className={`h-screen flex justify-center items-center text-white text-4xl font-bold`}
        ></div>
        <div
          className={`h-screen flex justify-center items-center text-white text-4xl font-bold`}
        ></div>
      </div>
      <div
        className={`absolute left-14 top-8 flex gap-4 z-1 transition-transform duration-500 ${selectedProjectId && currentPage === 2 ? "translate-x-[5px]" : "-translate-x-[250px]"}`}
      >
        <ProjectNavigation
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
        />
      </div>

      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-1">
        {pages.map((page) => (
          <button
            key={page.id}
            className={`w-3 h-3 rounded-full border ${currentPage === page.id ? "bg-white border-white scale-125" : "bg-white/70 border-gray"} cursor-pointer`}
            onClick={() => setCurrentPage(page.id)}
          />
        ))}
      </div>
      <NoiseEffect />
    </div>
  );
};

export default Main;
