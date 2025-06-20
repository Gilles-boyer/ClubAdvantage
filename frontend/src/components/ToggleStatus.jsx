
export default function ToggleStatus({ status, onAction }) {
    return (
        <input
            type="checkbox"
            checked={status}
            onChange = {onAction}
            className="toggle !border-indigo-600 !bg-indigo-500 checked:!border-orange-500 checked:!bg-orange-400 checked:!text-orange-800"
        />)
}