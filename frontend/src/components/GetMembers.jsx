import { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton';
import { deleteMember, getMembers } from '../services/memberService';
import UpdateButton from './UpdateButton';

export const GetMembers = () => {

    const [members, setMembers] = useState([])

    useEffect(() => {
        getMembers()
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.error("Erreur de récupération :", error);
            });
    }, []);

    return (
        <>
            {members.map((member) => (
                <tr className="hover:bg-accent text-black " key={member.id}>
                    <th scope="row" className="px-6 py-4 font-medium text-neutral whitespace-nowrap">
                        {member.lastName}
                    </th>
                    <td className="px-6 py-4">
                        {member.firstName}
                    </td>
                    <td className="px-6 py-4">
                        {member.email}
                    </td>
                    <td className="px-6 py-4">
                        {member.telephone}
                    </td>
                    <td className="px-6 py-4">
                        {member.status}
                    </td>
                    <td className="px-6 py-4">
                        <UpdateButton />
                        <DeleteButton id={member.id} onDelete={deleteMember} />
                    </td>
                </tr>
            ))}
        </>
    )
}