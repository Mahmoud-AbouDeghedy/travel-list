import { useState } from "react";

import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

// const initialItems = [
// 	{ id: 1, description: "Passports", quantity: 2, packed: false },
// 	{ id: 2, description: "Socks", quantity: 12, packed: false },
// ];

export type itemT = {
	id: number;
	description: string;
	quantity: number;
	packed: boolean;
};

export default function App() {
	const [items, setItems] = useState<itemT[]>([]);

	function handleAddItems(newItem: itemT) {
		setItems((prev) => [...prev, newItem]);
	}

	function handleDeleteItem(id: number) {
		setItems((prev) => prev.filter((item) => item.id !== id));
	}

	function handleToggleItem(id: number) {
		setItems((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	}

	function handleClearList() {
		const confirmed = window.confirm(
			"Are you sure you want to delete all items?"
		);

		confirmed && setItems([]);
	}

	return (
		<div className="app">
			<Logo />
			<Form handleAddItems={handleAddItems} />
			<PackingList
				items={items}
				onDeleteItem={handleDeleteItem}
				onToggleItem={handleToggleItem}
				onClearList={handleClearList}
			/>
			<Stats items={items} />
		</div>
	);
}
