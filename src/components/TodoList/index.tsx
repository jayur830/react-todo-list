import { FC } from "react";
import { Provider } from "./Provider";

import AddButtonWrap from "./AddButtonWrap";
import TodoListContent from "./TodoListContent";

const TodoList: FC = () => {
    return (
        <Provider>
            <AddButtonWrap />
            <TodoListContent />
        </Provider>
    );
};

export default TodoList;