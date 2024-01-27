/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { initialTasks } from "../data/data";
import { taskReducer } from "../reducers/taskReducer";

export const TaskContext = createContext(null);
export const TaskDispatchContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [taskObj, dispatch] = useReducer(taskReducer, {
    allTasks: initialTasks,
    tasks: initialTasks,
  });

  return (
    <TaskContext.Provider value={taskObj}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};

export const useTasksDispatch = () => {
  return useContext(TaskDispatchContext);
};
