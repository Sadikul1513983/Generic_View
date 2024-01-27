/* eslint-disable no-unused-vars */
import frame from "../assets/frame.png";
import lws from "../assets/lws-logo-en.svg";
import "../styles/output.css";
// import td from "../assets/td.svg";
// import td1 from "../assets/td1.svg";
// import td2 from "../assets/td2.svg";
// import td3 from "../assets/td3.svg";
import { useState } from "react";
import task from "../assets/task.svg";
import { useTasksDispatch } from "../contexts/listOfTasksContexts";
import Table from "./Table";

// eslint-disable-next-line react/prop-types
const Landing = ({ setVisible, setCurrentItem,setIsEdit }) => {
  const dispatch = useTasksDispatch();
  const [search, setSearch] = useState("");

  return (
    <div className="bg-[#191D26] font-[Inter] text-white">
      <nav className="py-6 md:py-8 fixed top-0 w-full !bg-[#191D26] z-50">
        <div className="container mx-auto flex items-center justify-between gap-x-6">
          <a href="/">
            <img className="h-[45px]" src={lws} alt="Lws" />
          </a>
        </div>
      </nav>

      <section className="pb-[114px] pt-20 md:mt-[100px]">
        <div className="container lg:px-20">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div className="flex justify-center md:order-2">
              <img className="max-md:w-full" src={frame} alt="frame" />
            </div>
            <div>
              <h1 className="mb-1.5 text-[56px] font-bold leading-none text-[#F5BF42] lg:text-[73px]">
                Tasker
              </h1>
              <p className="text-lg my-2 opacity-60">
                Effortlessly Organize, Prioritize, and Conquer Tasks with Tasker
                - Your Personal Productivity Ally for Seamless Goal Achievement
                and Stress-Free Task Management.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20" id="tasks">
        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <div className="mb-14 items-center justify-between sm:flex">
              <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
              <div className="flex items-center space-x-5">
                <form>
                  <div className="flex">
                    <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
                      <input
                        type="search"
                        id="search-dropdown"
                        className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none"
                        placeholder="Search Task"
                        required
                        value={search}
                        onChange={(e) => {
                          e.preventDefault();
                          setSearch(e.target.value);
                          dispatch({
                            type: "search",
                            search: e.target.value ?? "",
                          });
                        }}
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4"
                      >
                        <img src={task} alt="alt" />
                        <span className="sr-only">Search</span>
                      </button>
                    </div>
                  </div>
                </form>
                <button
                  className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
                  onClick={() => setIsEdit(true)}
                >
                  Add Task
                </button>
                <button
                  className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
                  onClick={() => {
                    dispatch({
                      type: "emptyTasks",
                    });
                  }}
                >
                  Delete All
                </button>
              </div>
            </div>
            <div className="overflow-auto">
              <table className="table-fixed overflow-auto xl:w-full">
                <thead>
                  <tr>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                      {" "}
                      Title{" "}
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
                      {" "}
                      Description{" "}
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                      {" "}
                      Tags{" "}
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                      {" "}
                      Priority{" "}
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                      {" "}
                      Options{" "}
                    </th>
                  </tr>
                </thead>
                <Table
                  setCurrentItem={setCurrentItem}
                  setVisible={setVisible}
                />
              </table>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-6 md:py-8">
        <div className="container mx-auto">
          <p className="text-center text-xs text-[#6A6A6A] lg:text-sm">
            Copyright ©2024 | All rights reserved by Learn with Sumit
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
