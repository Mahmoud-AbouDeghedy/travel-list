import { useState } from "react";

import { itemT } from "./App";

export default function Form({
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
			<select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
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
