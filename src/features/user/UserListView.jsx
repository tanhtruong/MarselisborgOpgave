import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, sortByName } from "./userSlice";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import "./UserListView.css";

export default function UserListView() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [users, setUsers] = useState([]);
	const [idOrder, setIdOrder] = useState(false);
	const [nameOrder, setNameOrder] = useState(false);
	const [phoneOrder, setPhoneOrder] = useState(false);
	const [emailOrder, setEmailOrder] = useState(false);
	const [addressOrder, setAddressOrder] = useState(false);

	useEffect(() => {
		dispatch(fetchUsers());
		setUsers(user.users);
	}, []);

	function sortData(property, setFunction, order) {
		setFunction(!order);
		if (property === "number") {
			const newUsers = [...users].sort(function (a, b) {
				return order ? a[property] - b[property] : b[property] - a[property];
			});
			setUsers(newUsers);
		} else {
			const newUsers = [...users].sort((a, b) => {
				if (a[property] === b[property]) {
					return order ? a.number > b.number : a.number < b.number;
				}

				if (order) {
					if (a[property] > b[property]) return 1;
					else if (a[property] < b[property]) return -1;
					else {
						return a.number > b.number ? 1 : -1;
					}
				} else {
					if (a[property] < b[property]) return 1;
					else if (a[property] > b[property]) return -1;
					else {
						return a.number > b.number ? 1 : -1;
					}
				}
			});

			setUsers(newUsers);
		}
	}

	return (
		<>
			<Container className='mt-4'>
				<h2>List of users:</h2>
				<Col>
					<Table striped hover>
						<thead>
							<tr>
								<th onClick={() => sortData("id", setIdOrder, idOrder)}>#</th>
								<th onClick={() => sortData("name", setNameOrder, nameOrder)}>
									Name
								</th>
								<th onClick={() => sortData("phone", setPhoneOrder, phoneOrder)}>
									Phone
								</th>
								<th onClick={() => sortData("email", setEmailOrder, emailOrder)}>
									Mail
								</th>
								<th
									onClick={() =>
										sortData("address", setAddressOrder, addressOrder)
									}>
									Address
								</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
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
