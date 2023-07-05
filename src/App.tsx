import { useState } from "react";

const initialItems = [
	{ id: 1, description: "Passports", quantity: 2, packed: false },
	{ id: 2, description: "Socks", quantity: 12, packed: false },
];

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

	return (
		<div className="app">
			<Logo />
			<Form handleAddItems={handleAddItems} />
			<PackingList items={items} />
			<Stats />
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

function PackingList({ items }: { items: itemT[] }) {
	return (
		<div className="list">
			<ul>
				{items.map((i, idx) => (
					<Item item={i} key={idx} />
				))}
			</ul>
		</div>
	);
}

function Item({ item }: { item: itemT }) {
	return (
		<li>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button>❌</button>
		</li>
	);
}

function Stats() {
	return (
		<footer className="stats">
			<em>💼 You have X items on your list, and you already packed X (X%)</em>
		</footer>
	);
}
