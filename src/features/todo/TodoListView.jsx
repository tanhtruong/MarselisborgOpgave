import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "./todoSlice";
import { Container, Col, Table } from "react-bootstrap";
import "./TodoListView.css";
import { useLocation, useParams } from "react-router-dom";

export default function TodoListView() {
	const todo = useSelector((state) => state.todo);
	const params = useParams();
	console.log(params.userId);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTodos(params.userId));
	}, []);

	return (
		<>
			<Container>
				<h2>Todos: </h2>
				<Col>
					<Table striped hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Title</th>
							</tr>
						</thead>
						<tbody>
							{todo.todos.map((todo) => {
								if (!todo.completed) {
									return (
										<tr key={todo.id}>
											<td>{todo.id}</td>
											<td
												className={
													todo.completed === true ? "completed" : ""
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
				<h2>Completed todos:</h2>
				<Col>
					<Table striped hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Title</th>
							</tr>
						</thead>
						<tbody>
							{todo.todos.map((todo) => {
								if (todo.completed) {
									return (
										<tr key={todo.id}>
											<td>{todo.id}</td>
											<td
												className={
													todo.completed === true ? "completed" : ""
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
