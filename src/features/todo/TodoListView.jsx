import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "./todoSlice";
import "./TodoListView.css";
import { useLocation, useParams } from "react-router-dom";
import TodoListTable from "./TodoListTable";

export default function TodoListView() {
	const todos = useSelector((state) => state.todo.todos);
	const completedTodos = useSelector((state) => state.todo.numOfCompletedTodos);
	const uncompletedTodos = useSelector((state) => state.todo.numOfUncompletedTodos);
	const params = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTodos(params.userId));
	}, []);

	return (
		<>
			<TodoListTable
				todos={todos.filter((todo) => !todo.completed)}
				numOfTodos={uncompletedTodos}
			/>
			<TodoListTable
				todos={todos.filter((todo) => todo.completed)}
				numOfTodos={completedTodos}
			/>
		</>
	);
}
