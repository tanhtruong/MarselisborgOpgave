import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, sortBy } from "./userSlice";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

export default function UserListView() {
	const users = useSelector((state) => state.user.users);
	const numOfUsers = useSelector((state) => state.user.numOfUsers);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	return (
		<>
			<Container className='mt-4'>
				<h2>List of users: {numOfUsers} </h2>
				<Col>
					<Table striped hover>
						<thead>
							<tr>
								<th onClick={() => dispatch(sortBy({ value: "id" }))}>#</th>
								<th onClick={() => dispatch(sortBy({ value: "name" }))}>Name</th>
								<th onClick={() => dispatch(sortBy({ value: "phone" }))}>Phone</th>
								<th onClick={() => dispatch(sortBy({ value: "email" }))}>Mail</th>
								<th
									onClick={() =>
										dispatch(sortBy({ value: "[address].[street]" }))
									}>
									Address
								</th>
							</tr>
						</thead>
						<tbody>
							{users?.map((user) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>
										<Link to={`users/${user.id}/todos`}>{user.name}</Link>
									</td>
									<td>{user.phone}</td>
									<td>{user.email}</td>
									<td>
										{user.address.street}, {user.address.suite}
										<br />
										{user.address.city}, <br /> {user.address.zipcode}
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
