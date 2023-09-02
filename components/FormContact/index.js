import React from "react";

export default function FormEmail() {
  return (
    <div className=" h-fit w-full bg-blue-700 flex justify-center relative overflow-hidden">
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <div className=" w-[60%] h-fit md:h-[30em] my-[5em] md:grid-cols-12 grid rounded-lg z-10">
        <div className="md:col-span-5 py-7 px-5 text-white bg-blue-900 rounded-md">
          <h1 className="text-2xl font-bold mb-4">GET IN TOUCH</h1>
          <p className="text-sm">
            lorem ipsun color kinti laso maji bun teko sima kuji st aisd kompi
            tolei kacu kimak
          </p>
          <div className="my-10">
            <p>+6285719457264</p>
            <p>priandy170501@gmail.com</p>
          </div>
          <p className="mt-20">
            JL.H.JAIRY NO.1G RT.01/RW.02 RAWA BUAYA,CENGKARENG,JAKBAR
          </p>
          <p className="underline mt-36">view job opening</p>
        </div>

        <div className="md:col-span-7 bg-blue-600 py-7 px-5 rounded-md">
          <h1 className="text-2xl font-bold mb-4 text-yellow-300">
            ENTER DETAILS
          </h1>
          <form>
            <div className=" grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white">Full Name</label> <br />
                <input className="rounded-md h-8 px-1" type="text" />
              </div>

              <div>
                <label className="text-xs text-white">Email</label> <br />
                <input className="rounded-md h-8 px-1" type="text" />
              </div>
              <div>
                <label className="text-xs text-white">Phone</label> <br />
                <input className="rounded-md h-8 px-1" type="text" />
              </div>
            </div>

            <div className=" mt-10 w-full">
              <textarea className=" w-full min-h-[10em] rounded-md px-2 py-1" />
            </div>
            <div>
              <button className="bg-white px-3 rounded-md py-2 font-bold ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
