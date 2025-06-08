import Button from "../components/Button"
import Roles from "../components/Role/Roles"

export default function Role() {
    return <>
        <h2 className="text-center font-medium bg-accent py-4 w-full">Roles</h2>
        <Roles />
        <Button type={'update'} action={'UPDT'} onAction={() => ('')}/>
        <Button type={'delete'} action={'DLT'} onAction={() => ('')}/>
    </>
}
