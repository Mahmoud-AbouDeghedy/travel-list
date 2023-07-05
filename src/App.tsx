import { useState } from "react";

// const initialItems = [
// 	{ id: 1, description: "Passports", quantity: 2, packed: false },
// 	{ id: 2, description: "Socks", quantity: 12, packed: false },
// ];

type itemT = {
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

	return (
		<div className="app">
			<Logo />
			<Form handleAddItems={handleAddItems} />
			<PackingList
				items={items}
				onDeleteItem={handleDeleteItem}
				onToggleItem={handleToggleItem}
			/>
			<Stats items={items} />
		</div>
	);
}

function Logo() {
	return <h1>🏝️ Far Away 🎧</h1>;
}

function Form({
	handleAddItems,
}: {
	handleAddItems: (newItem: itemT) => void;
}) {
	const [text, setText] = useState("");
	const [quantity, setQuantity] = useState(1);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!text) return;

		const newItem: itemT = {
			id: Date.now(),
			description: text,
			quantity,
			packed: false,
		};
		handleAddItems(newItem);

		setText("");
		setQuantity(1);
	}

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for your 😍 trip?</h3>
			<select
				name=""
				id=""
				value={quantity}
				onChange={(e) => setQuantity(+e.target.value)}
			>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Item..."
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}

function PackingList({
	items,
	onDeleteItem,
	onToggleItem,
}: {
	items: itemT[];
	onDeleteItem: (id: number) => void;
	onToggleItem: (id: number) => void;
}) {
	return (
		<div className="list">
			<ul>
				{items.map((i, idx) => (
					<Item
						item={i}
						key={idx}
						onDeleteItem={onDeleteItem}
						onToggleItem={onToggleItem}
					/>
				))}
			</ul>
		</div>
	);
}

function Item({
	item,
	onDeleteItem,
	onToggleItem,
}: {
	item: itemT;
	onDeleteItem: (id: number) => void;
	onToggleItem: (id: number) => void;
}) {
	return (
		<li>
			<input
				type="checkbox"
				checked={item.packed}
				onChange={() => onToggleItem(item.id)}
			/>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
}

function Stats({ items }: { items: itemT[] }) {
	if (!items.length)
		return (
			<p className="stats">
				<em>Start adding some items to your packing list 🚀</em>
			</p>
		);
	const numItems = items.length;
	const numPacked = items.filter((i) => i.packed).length;
	const percentage = Math.round((numPacked / numItems) * 100);

	return (
		<footer className="stats">
			<em>
				{percentage === 100
					? "You got everything! Ready to go ✈️"
					: `💼 You have ${numItems} items on your list, and you already packed
				${numPacked} (${percentage}%)`}
			</em>
		</footer>
	);
}
