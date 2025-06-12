import Button from "./Button"

export default function MobilePagination({ object, visibleCards, setVisibleCards,}) {
    const max = object.length

    return (<>
        {visibleCards === 3 && (
            <div className="space-x-3 mb-3">
                <Button label={'voir plus'} onAction={() => setVisibleCards(vc => vc + 3)} className={'btn-neutral'} />
            </div>
        )}
        {(visibleCards > 3 && visibleCards < max) && (
            <div className="space-x-3 mb-3">
                <Button label={'voir plus'} onAction={() => setVisibleCards(vc => vc + 3)} className={'btn-neutral'} />
                <Button label={'voir moins'} onAction={() => setVisibleCards(vc => vc - 3)} className={'btn-primary'} />
            </div>
        )}
        {visibleCards > max && (
            <div className="space-x-3 mb-3">
                <Button label={'voir moins'} onAction={() => setVisibleCards(3)} className={'btn-primary'} />
            </div>
        )}
    </>)
}
