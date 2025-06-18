

export default function Toggle({ toggle, setToggle }) {
    return (<>
        <button
            onClick={() => setToggle(!toggle)}>
        </button>
    </>)
}