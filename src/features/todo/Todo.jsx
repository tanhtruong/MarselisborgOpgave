import { useDispatch } from "react-redux";
import { toggleCompleteness } from "./todoSlice";

export default function Todo({ todos }) {
	const dispatch = useDispatch();

	return (
		<>
			{todos.map((todo) => {
				return (
					<tr key={todo.id}>
						<td>{todo.id}</td>
						<td
							className={todo.completed === true ? "completed" : ""}
							onClick={() => dispatch(toggleCompleteness({ id: todo.id }))}>
							{todo.title}
						</td>
					</tr>
				);
			})}
		</>
	);
}
