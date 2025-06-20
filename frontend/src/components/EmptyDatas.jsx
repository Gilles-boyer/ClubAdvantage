import Icon from '@mdi/react';
import { mdiSleep } from '@mdi/js';

export default function EmptyDatas() {
    return (
        <>
            <div className="alert alert-neutral flex justify-center"> <Icon path={mdiSleep} size={1} />Aucun élément à afficher</div>
        </>
    )
}