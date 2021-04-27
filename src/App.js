import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { Dimensions, StatusBar } from "react-native";

import { theme } from "./theme";
import Input from "./components/Input";
import Task from "./components/Task";

const App = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState({
    1: { id: "1", text: "Hanbit", completed: false },
    2: { id: "2", text: "React Native", completed: true },
    3: { id: "3", text: "React Native Sample", completed: false },
    4: { id: "4", text: "Edit TODO Item", completed: false },
  });

  const width = Dimensions.get("window").width;

  const _updateTask = (item) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    setTasks(currentTasks);
  };

  const _toggleTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]["completed"] = !currentTasks[id]["completed"];
    setTasks(currentTasks);
  };

  const _deleteTask = (id) => {
    // 삭제 버튼을 클릭했을 때 항목의 id를 이용하여 tasks에서 해당 항목을 삭제하는 함수.
    // Task 컴포넌트에 생성된 항목 삭제 함수와 함께 항목 내용 전체를 전달해 자식 컴포넌트에서도 항목의 id를 확인할 수 있도록 수정
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    setTasks(currentTasks);
  };

  const _addTask = () => {
    // id는 할 일 항목이 추가되는 시간의 타임스태프를 이용
    // 내용을 나타내는 text는 Input 컴포넌트에 입력된 값을 지정.
    // completed는 새로 입렵되는 항목이므로 항상 false가 된다.
    setNewTask("");
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setTasks({ ...tasks, ...newTaskObject });
  };

  const _handleTextChange = (text) => {
    setNewTask(text);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>TODO List</Title>
        <Input
          placeholder="+ Add a Task"
          value={newTask}
          onSubmitEditing={_addTask}
          onChangeText={_handleTextChange}
        />
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map((item) => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
        </List>
      </Container>
    </ThemeProvider>
  );
};
// ios에서 아이폰 11처럼 노치 디자인이 있는 기기는 컨텐츠가 일부 가려지는 경우가 있다.
// react-native 에서는 자동으로 padding값이 적용되어 노치 디자인 문제를 해결할 수 있는 SafeAreaView 컴포넌트를 제공한다.

// 안드로이드는 status bar 로 인해 컨텐츠가 가려지는 경우가 있다.
// 배경색을 어두운 색으로 설정하면 상태 바의 내용도 눈에 잘 들어오지 않는다는 문제가 있다.
// react-native 에서는 상태 바를 제어할 수 있는 StatusBar 컴포넌트를 제공한다.
// StatusBar 컴포넌트를 이용하면 상태 바의 스타일을 변경할 수 있고, 안드로이드 기기에서 상태 바가 컴포넌트를 가리는 문제를 해결할 수 있다.
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

export default App;
