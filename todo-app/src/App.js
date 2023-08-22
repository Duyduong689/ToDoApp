import { useEffect, useState } from "react";
import { useGetListUsers, userService } from "./services";
import { Button, Divider, List, Select } from "antd";
import { mappingSelectData } from "./utils";
import { useMutation } from "react-query";
import { CheckCircleOutlined, MinusSquareOutlined } from "@ant-design/icons";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [listUserTasks, setListUserTasks] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();
  const [currentMarkDoneTask, setCurrentMarkDoneTask] = useState();

  const { data: listUsersData, isLoading: isLoadingListUsers } =
    useGetListUsers();
  const useGetUserTask = useMutation(userService.getUserTasks, {
    onSuccess: (data) => {
      setListUserTasks((prev) => {
        prev.push({ array: data, id: currentUserId });
        return prev;
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const useMarkDoneTask = useMutation(userService.markDoneTask, {
    onSuccess: (data) => {
      setListUserTasks((prev) => {
        let foundIndex = prev.findIndex((item) => item.id === currentUserId);
        prev[foundIndex].array = markedDoneTask(
          extractCurrentListTasks(listUserTasks)
        );
        return prev;
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleShowUserTask = (value) => {
    setCurrentUserId(value);
  };
  const handleMarkDoneTask = (taskId) => {
    setCurrentMarkDoneTask(taskId);
  };
  const countDoneTask = () => {
    const currentListTask = extractCurrentListTasks(listUserTasks)
    if (currentListTask) {
      let counter = 0;
      let length = currentListTask?.length;
      currentListTask?.map((task) => {
        if (task.completed) {
          counter += 1;
        }
      });
      return `${counter}/${length}`;
    } else return "0/0";
  };
  const sortTask = (listUserTasks) => {
    if (listUserTasks) {
      listUserTasks.sort((taskA, taskB) => {
        if (taskA.completed && !taskB.completed) {
          return 1;
        } else if (!taskA.completed && taskB.completed) {
          return -1;
        } else {
          return 0;
        }
      });
      return listUserTasks;
    }
  };
  const markedDoneTask = (listUserTasks) => {
    let result = listUserTasks.map((task) => {
      if (task.id === currentMarkDoneTask) {
        task.completed = true;
      }
      return task;
    });
    return result;
  };
  const extractCurrentListTasks = (listUserTasks) => {
    let foundIndex = listUserTasks.findIndex(
      (item) => item.id === currentUserId
    );
    const result = listUserTasks[foundIndex];
    return result?.array;
  };
  useEffect(() => {
    if (currentUserId) {
      let foundIndex = listUserTasks.findIndex(
        (item) => item.id === currentUserId
      );
      if (foundIndex == -1) {
        useGetUserTask.mutate(currentUserId);
      }
    }
  }, [currentUserId]);
  useEffect(() => {
    if (currentMarkDoneTask) {
      useMarkDoneTask.mutate(currentMarkDoneTask);
    }
  }, [currentMarkDoneTask]);

  if (isLoadingListUsers) return <LoadingSpinner />;
  return (
    <div className="appWrapper ">
      <div className="appFieldWrapper">
        <span style={{ fontWeight: "500" }}>User</span>
        <div style={{ flex: "1" }}>
          <Divider />
        </div>
      </div>
      <Select
        style={{
          width: 200,
        }}
        placeholder="Select user"
        showSearch
        options={mappingSelectData(listUsersData, "id", "name")}
        onChange={(value) => {
          handleShowUserTask(value);
        }}
      />
      <div className="appFieldWrapper">
        <span style={{ fontWeight: "500" }}>Tasks</span>
        <div style={{ flex: "1" }}>
          <Divider />
        </div>
      </div>
      <List
        style={{ height: "500px", overflow: "auto" }}
        bordered
        dataSource={sortTask(extractCurrentListTasks(listUserTasks))}
        renderItem={(item) => (
          <List.Item style={{ display: "flex" }}>
            <div className="listItemWrapper">
              {item.completed && (
                <CheckCircleOutlined style={{ color: "#40d63d " }} />
              )}
              {!item.completed && (
                <MinusSquareOutlined style={{ color: "#fab851 " }} />
              )}

              <span>{item.title}</span>
            </div>
            {!item.completed && (
              <Button
                loading={
                  currentMarkDoneTask == item.id && useMarkDoneTask.isLoading
                }
                onClick={() => {
                  handleMarkDoneTask(item.id);
                }}
                size="small"
              >
                Mark done
              </Button>
            )}
          </List.Item>
        )}
      />
      <span>Done {countDoneTask()} tasks</span>
    </div>
  );
}

export default App;
