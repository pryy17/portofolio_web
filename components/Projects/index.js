/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Slider from "react-slick";
import { data } from "../../data/skills";
import { projects } from "../../data/project";

export default function TabsProject({ sliderSettings }) {
  console.log(projects);
  const [selectedId, setSelectedId] = useState(null);
  let showProject = projects.filter((item) => item.id == selectedId);

  return (
    <div className="w-full justify-center mt-10 h-full z-40">
      <div className="w-full align-center gap-5 grid px-20 skew-y-3">
        {projects?.map((item) => (
          <motion.div
            layoutId={item.id}
            onClick={() => setSelectedId(item.id)}
            key={item.id}
            className="  focus:animate-bounce shadow-lg w-full h-36 text-white grid place-content-center cursor-pointer rounded-lg bg-blend-multiply bg-gray-600 bg-center bg-cover bg-opacity-70 hover:bg-blend-lighten hover:animate-bounce "
            style={{ backgroundImage: `url(/assets/${item.img})` }}
          >
            <strong className=" text-5xl text-yellow-200 hover:text-orange-500">
              {item.name}
            </strong>
          </motion.div>
        ))}
      </div>

      <div className=" w-full h-fit absolute grid place-content-center top-0 ">
        <AnimatePresence>
          {selectedId &&
            showProject.map((item) => (
              <motion.div
                key={item.id}
                layoutId={selectedId}
                className=" p-10 w-[85vw] md:h-[85vh] h-fit text-white text-center bg-blue-500 relative shadow-xl rounded-lg"
              >
                <motion.button
                  onClick={() => setSelectedId(null)}
                  className="absolute right-6 top-3 text-xl"
                >
                  <strong>X</strong>
                </motion.button>
                <div className="grid md:grid-cols-12 grid-cols-1">
                  <div className="w-full h-full md:col-span-8">
                    <div className=" h-fit max-h-[20em] rounded-lg">
                      <img
                        src={`/assets/${item.img}`}
                        className="object-bottom w-full h-full"
                      />
                    </div>
                    <div className=" w-full h-fit md:mt-[9em]">
                      <Slider {...sliderSettings}>
                        {item.stack.map((item, index) => (
                          <div key={index}>
                            <div className=" w-28 h-28">
                              <img src={item.image} />
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                  <div className="w-full md:col-span-4 px-5">
                    <h1 className="text-center text-black text-2xl font-bold">
                      {item.name}
                    </h1>
                    <p className=" mt-4 text-justify">{item.desc}</p>
                    <div className="flex items-center content-center py-5">
                      <a href={item.link} target="_blank" rel="noreferrer">
                        <button className="bg-yellow-300 rounded-md px-8 mr-auto cursor-pointer text-black font-bold hover:animate-bounce hover:bg-orange-400 hover:text-white">
                          VISIT
                        </button>
                      </a>
                      <div className="ml-5">
                        <a target="_blank" href={item.github} rel="noreferrer">
                          {" "}
                          <img
                            className="w-10 h-10 cursor-pointer"
                            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
