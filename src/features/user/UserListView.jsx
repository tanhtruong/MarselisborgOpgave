import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./userSlice";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import TodoListView from "../todo/TodoListView";
import { Link } from "react-router-dom";

export default function UserListView() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	return (
		<>
			<Container>
				<Col>
					<Table striped hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Phone</th>
								<th>Mail</th>
								<th>City</th>
								<th>Address</th>
							</tr>
						</thead>
						<tbody>
							{user.users.map((user) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>
										<Link to={`users/${user.id}/todos`}>{user.name}</Link>
									</td>
									<td>{user.phone}</td>
									<td>{user.email}</td>
									<td>
										{user.address.city}, <br />
										{user.address.zipcode}
									</td>
									<td>
										{user.address.street}, <br /> {user.address.suite}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Container>
		</>
	);
}
