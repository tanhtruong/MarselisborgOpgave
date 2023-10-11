import { Container, Col, Table } from "react-bootstrap";
import Todo from "./Todo";
import "./styles.css";

export default function TodoListTable({ todos, numOfTodos }) {
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
							<Todo todos={todos} />
						</tbody>
					</Table>
				</Col>
			</Container>
		</>
	);
}
