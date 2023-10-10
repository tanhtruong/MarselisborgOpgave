import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root.jsx";
import ErrorPage from "./ErrorPage.jsx";
import TodoListView from "./features/todo/TodoListView.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
	{ errorElement: <ErrorPage /> },
	{
		path: "/",
		element: <Root />,
	},
	{
		path: "users/:userId/todos",
		element: <TodoListView />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
