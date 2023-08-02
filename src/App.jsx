import { useState, useEffect } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTodo from "./AddTodo";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function App() {
	const [todos, setTodos] = useState([]);

	const columnDefs = [
		{ field: "title", sortable: true, filter: true, width: "auto" },
		{ field: "author", sortable: true, filter: true, width: "auto" },
		{ field: "year", sortable: true, filter: true, width: "auto" },
		{ field: "isbn", sortable: true, filter: true, width: "auto" },
		{ field: "price", sortable: true, filter: true, width: "auto" },
		{
			headerName: "",
			field: "id",
			width: 90,
			cellRenderer: (params) => (
				<IconButton
					onClick={() => deleteTodo(params.value)}
					size="small"
					color="error"
				>
					<DeleteIcon />
				</IconButton>
			),
		},
	];

	useEffect(() => {
		fetchItems();
	}, []);

	const fetchItems = () => {
		fetch(
			"https://bookstore-68436-default-rtdb.europe-west1.firebasedatabase.app/books.json"
		)
			.then((response) => response.json())
			.then((data) => addKeys(data))
			.catch((err) => console.error(err));
	};

	// Add keys to the todo objects
	const addKeys = (data) => {
		const keys = Object.keys(data);
		const valueKeys = Object.values(data).map((item, index) =>
			Object.defineProperty(item, "id", { value: keys[index] })
		);
		setTodos(valueKeys);
	};

	const addTodo = (newTodo) => {
		fetch(
			"https://bookstore-68436-default-rtdb.europe-west1.firebasedatabase.app/books/.json",
			{
				method: "POST",
				body: JSON.stringify(newTodo),
			}
		)
			.then((response) => fetchItems())
			.catch((err) => console.error(err));
	};

	const deleteTodo = (id) => {
		fetch(
			`https://bookstore-68436-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
			{
				method: "DELETE",
			}
		)
			.then((response) => fetchItems())
			.catch((err) => console.error(err));
	};

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h5">TodoList</Typography>
				</Toolbar>
			</AppBar>
			<AddTodo addTodo={addTodo} />
			<div
				className="ag-theme-material"
				style={{ height: 400, width: "70vw" }}
			>
				<AgGridReact rowData={todos} columnDefs={columnDefs} />
			</div>
		</>
	);
}

export default App;