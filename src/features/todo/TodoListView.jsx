import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, toggleCompleteness } from "./todoSlice";
import { Container, Col, Table } from "react-bootstrap";
import "./TodoListView.css";
import { useLocation, useParams } from "react-router-dom";

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
			<Container className='mt-4'>
				<h2>Todos: {uncompletedTodos}</h2>
				<Col>
					<Table striped hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Title</th>
							</tr>
						</thead>
						<tbody>
							{todos.map((todo) => {
								if (!todo.completed) {
									return (
										<tr key={todo.id}>
											<td>{todo.id}</td>
											<td
												className={
													todo.completed === true ? "completed" : ""
												}
												onClick={() =>
													dispatch(toggleCompleteness({ id: todo.id }))
												}>
												{todo.title}
											</td>
										</tr>
									);
								}
							})}
						</tbody>
					</Table>
				</Col>
			</Container>
			<Container className='mt-4'>
				<h2>Completed todos: {completedTodos}</h2>
				<Col>
					<Table striped hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Title</th>
							</tr>
						</thead>
						<tbody>
							{todos.map((todo) => {
								if (todo.completed) {
									return (
										<tr key={todo.id}>
											<td>{todo.id}</td>
											<td
												className={
													todo.completed === true ? "completed" : ""
												}
												onClick={() =>
													dispatch(toggleCompleteness({ id: todo.id }))
												}>
												{todo.title}
											</td>
										</tr>
									);
								}
							})}
						</tbody>
					</Table>
				</Col>
			</Container>
		</>
	);
}
