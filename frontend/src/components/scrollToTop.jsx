import Icon from '@mdi/react';
import { mdiArrowUpThick } from '@mdi/js';


export default function ScrollComponent({handleScroll}) {


    return (
        < div className=" fixed py-1 px-2 bottom-21 right-5 w-10 bg-primary text-white rounded-full hover:cursor-pointer" >
            < button onClick={handleScroll}
                className='pt-1'>
                <Icon path={mdiArrowUpThick} size={1} className='hover:cursor-pointer' />
            </button >
        </div >
    )
};
