import { useState } from "react";
import Landing from "./components/Landing";
import AddTaskModal from "./components/AddTaskModal";
import { TasksProvider } from "./contexts/listOfTasksContexts";

function App() {
  const [visible, setVisible] = useState(false);
  const [isEdit,setIsEdit]=useState(false)
  const [currentItem, setCurrentItem] = useState(null);

  return (
    <TasksProvider>
      {visible||isEdit ? (
        <AddTaskModal
          visible={visible}
          isEdit={isEdit}
          setVisible={setVisible}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
        />
      ) : (
        <Landing setVisible={setVisible} setIsEdit={setIsEdit} setCurrentItem={setCurrentItem} />
      )}
    </TasksProvider>
  );
}

export default App;
