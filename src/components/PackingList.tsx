import { useState } from "react";

import { itemT } from "./App";
import Item from "./Item";

export default function PackingList({
	items,
	onDeleteItem,
	onToggleItem,
	onClearList,
}: {
	items: itemT[];
	onDeleteItem: (id: number) => void;
	onToggleItem: (id: number) => void;
	onClearList: () => void;
}) {
	const [sortBy, setSortBy] = useState("input");

	let sortedItems;
	if (sortBy === "input") sortedItems = items;
	else if (sortBy === "description")
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));
	else
		sortedItems = items
			.slice()
			.sort((a, b) => Number(a.packed) - Number(b.packed));

	return (
		<div className="list">
			<ul>
				{sortedItems.map((i, idx) => (
					<Item
						item={i}
						key={idx}
						onDeleteItem={onDeleteItem}
						onToggleItem={onToggleItem}
					/>
				))}
			</ul>
			<div className="actions">
				<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value="input">Sort by input order</option>
					<option value="description">Sort by input description</option>
					<option value="packed">Sort by packed status</option>
				</select>
				<button onClick={onClearList}>Clear List</button>
			</div>
		</div>
	);
}
