export const taskReducer = (taskObj, action) => {
  const tagsArray =
    typeof action?.tags === "string"
      ? action.tags?.split(",").map((tag) => tag.trim())
      : action?.tags || [];

  const allTasks = [...taskObj.allTasks] ?? [];

  switch (action.type) {
    case "create": {
      const newTask = {
        id: action.id,
        title: action.title,
        description: action.description,
        tags: [...tagsArray],
        priority: action.priority,
      };

      const newTasks = [newTask, ...allTasks];

      return {
        ...taskObj,
        allTasks: newTasks,
        tasks: newTasks,
      };
    }
    case "search": {
      const regex = new RegExp(action?.search?.toLowerCase());
      const searchedTasks = allTasks?.filter((task) =>
        regex.test(task?.title?.toLowerCase())
      );

      return {
        ...taskObj,
        tasks: searchedTasks,
      };
    }
    case "editMode": {
      const updatedTasks = allTasks?.map((el) => {
        if (el?.id === action?.id) {
          return {
            ...el,
            id: action.id,
            title: action.title,
            description: action.description,
            tags: [...tagsArray],
            priority: action.priority,
          };
        } else {
          return el;
        }
      });
      return {
        ...taskObj,
        allTasks: updatedTasks,
        tasks: updatedTasks,
      };
    }
    case "toggleItem": {
      const toggledTasks = allTasks?.map((el) => {
        if (el?.id === action?.id) {
          return { ...el, isToggled: !el.isToggled };
        } else {
          return el;
        }
      });
      return {
        ...taskObj,
        allTasks: toggledTasks,
        tasks: toggledTasks,
      };
    }

    case "emptyTasks": {
      return [];
    }
    case "singleDelete": {
      const newTasks = allTasks.filter((tasks) => tasks.id !== action.id);
      return {
        ...taskObj,
        allTasks: newTasks,
        tasks: newTasks,
      };
    }

    default: {
      throw Error(`No action matched with ${action.type}`);
    }
  }
};
