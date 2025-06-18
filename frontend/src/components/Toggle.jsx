import Icon from '@mdi/react';
import { mdilPlusBox, mdilMinusBox } from '@mdi/light-js';



export default function Toggle({ toggle, setToggle }) {
    return (<>
        <button
        className='bg-neutral p-2 text-secondary'
            onClick={() => setToggle(!toggle)}>
            {toggle ? <Icon path={mdilPlusBox} size={1} /> :
            <Icon path={mdilMinusBox} size={1} />}
        </button>
    </>)
}