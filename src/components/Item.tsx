import { itemT } from "./App";

export default function Item({
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
