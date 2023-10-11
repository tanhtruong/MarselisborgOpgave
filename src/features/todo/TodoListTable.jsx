import { useDispatch } from "react-redux";
import { Container, Col, Table } from "react-bootstrap";
import { toggleCompleteness } from "./todoSlice";
import "./styles.css";

export default function TodoListTable({ todos, numOfTodos }) {
	const dispatch = useDispatch();

	return (
		<>
			<Container className='mt-4'>
				<h2>Todos: {numOfTodos}</h2>
				<Col>
					<Table striped hover bordered id='todoTable'>
						<thead>
							<tr>
								<th>#</th>
								<th>Title</th>
							</tr>
						</thead>
						<tbody>
							{todos.map((todo) => {
								return (
									<tr key={todo.id}>
										<td>{todo.id}</td>
										<td
											className={todo.completed === true ? "completed" : ""}
											onClick={() =>
												dispatch(toggleCompleteness({ id: todo.id }))
											}>
											{todo.title}
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</Col>
			</Container>
		</>
	);
}
