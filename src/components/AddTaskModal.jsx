/* eslint-disable react/prop-types */
import "../styles/output.css";
import lws from "../assets/lws-logo-en.svg";
import btn from "../assets/btn.svg";
import { useTasks, useTasksDispatch } from "../contexts/listOfTasksContexts";
import { getNextId } from "../utils";
import { useState } from "react";

const AddTaskModal = ({ setVisible, currentItem,visible }) => {
  const taskObj = useTasks();
  const tasks = taskObj?.tasks ?? [];
  const dispatch = useTasksDispatch();
  const [title, setTitle] = useState(currentItem?.title ?? "");
  const [tags, setTags] = useState(currentItem?.tags ?? "");
  const [description, setDescription] = useState(
    currentItem?.description ?? ""
  );
  const [priority, setPriority] = useState(currentItem?.priority ?? "");

  return (
    <div className="bg-[#1D212B] font-[Inter] max-md:px-4 lg:text-lg">
      <nav className="py-6 md:py-8">
        <div className="container mx-auto flex items-center justify-between gap-x-6">
          <a href="/">
            <img className="h-[45px]" src={lws} alt="Lws" />
          </a>
          <form>
            <div className="flex">
              <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
                <input
                  type="search"
                  id="search-dropdown"
                  className="z-20 block w-full bg-gray-800 px-4 py-2.5 pr-10 focus:outline-none"
                  placeholder="Search Task"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-3"
                >
                  <img src={btn} alt="alt" />
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </nav>

      <form className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
        {visible?"Edit Existing Task":"Add new Task"}
        </h2>

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              value={title}
              id="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </div>
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              required
            ></textarea>
          </div>
          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center lg:mt-20">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            onClick={(e) => {
              e.preventDefault();
              if (!title || !description || !tags?.length || !priority)
                return alert("Please fill-up required fields");
              setVisible(false);
              currentItem
                ? dispatch({
                    type: "editMode",
                    id: currentItem?.id,
                    title,
                    description,
                    tags,
                    priority,
                  })
                : dispatch({
                    type: "create",
                    id: getNextId(tasks),
                    title,
                    description,
                    tags,
                    priority,
                  });
            }}
          >
            {visible?"Edit Existing Task":"Create new Task"}
          </button>
        </div>
      </form>
      <footer className="py-6 md:py-8">
        <div className="container mx-auto">
          <p className="text-center text-xs text-[#6A6A6A] lg:text-sm">
            Copyright ©2023 | All rights reserved by Learn with Sumit
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AddTaskModal;
