import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";

export default function navbar() {
  const [scrollDirection, setScrollDirection] = useState(true); // Default: scroll ke atas
  const targetRef = useRef(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;

      if (currentPosition > (handleScroll.prevPosition || 0)) {
        setScrollDirection(false); // Scroll ke bawah
      } else {
        setScrollDirection(true); // Scroll ke atas
      }

      handleScroll.prevPosition = currentPosition;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`h-16 flex items-center w-full fixed bg-slate-50 z-50 backdrop-blur-sm bg-opacity-30 ${
        scrollDirection ? "block" : "hidden"
      }`}
    >
      <div className="flex w-[40%] ml-auto justify-around items-center text-white">
        <Link
          activeClass="active"
          className="cursor-pointer"
          to="home"
          spy={true}
          smooth={true}
          duration={1000}
        >
          Home
        </Link>
        <Link
          activeClass="active"
          className="cursor-pointer"
          to="about"
          spy={true}
          smooth={true}
          duration={1000}
        >
          About
        </Link>
        <Link
          activeClass="active"
          className="cursor-pointer"
          to="skill"
          spy={true}
          smooth={true}
          duration={1000}
        >
          Skill
        </Link>
        <Link
          activeClass="active"
          className="cursor-pointer"
          to="qualification"
          spy={true}
          smooth={true}
          duration={1000}
        >
          Qualification
        </Link>
        <Link
          activeClass="active"
          className="cursor-pointer"
          to="project"
          spy={true}
          smooth={true}
          duration={1000}
        >
          Project
        </Link>
        <Link
          activeClass="active"
          className="cursor-pointer"
          to="contact"
          spy={true}
          smooth={true}
          duration={1000}
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
