/* eslint-disable react/prop-types */
import td from "../assets/td.svg";
import td1 from "../assets/td1.svg";
import { useTasks, useTasksDispatch } from "../contexts/listOfTasksContexts";
const Table = ({ setVisible, setCurrentItem }) => {
  const taskObj = useTasks();
  const tasks = taskObj?.tasks ?? [];
  const dispatch = useTasksDispatch();

  return (
    <>
      <tbody>
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((item) => (
            <tr
              key={item.id}
              className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
            >
              <td
                className="cursor-pointer"
                onClick={() => {
                  console.log("item toggle", item?.isToggled);
                  dispatch({
                    type: "toggleItem",
                    id: item?.id,
                  });
                }}
              >
                <img src={item?.isToggled ? td : td1} alt="alt" />
              </td>
              <td>{item.title}</td>
              <td>
                <div>{item.description}</div>
              </td>
              <td>
                <ul className="flex justify-center gap-1.5 flex-wrap">
                  {item.tags?.length > 0 &&
                    item?.tags?.map((tag, index) => (
                      <li key={index}>
                        <span className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#00D991A1] px-2.5 text-sm capitalize text-[#F4F5F6]">
                          {tag}
                        </span>
                      </li>
                    ))}
                </ul>
              </td>
              <td className="text-center">{item.priority}</td>
              <td>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    className="text-red-500"
                    onClick={() => {
                      dispatch({
                        type: "singleDelete",
                        id: item?.id,
                      });
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="text-blue-500"
                    onClick={() => {
                      setVisible(true);
                      setCurrentItem(item);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              <h1 className="mb-1.5 mt-2.5  text-[56px] font-bold leading-none text-[#F5BF42] lg:text-[73px]">
                Task List is empty!
              </h1>
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default Table;
