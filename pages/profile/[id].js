import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { client, getProfiles } from "../../api";

export default function Profile() {
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        if (id) {
            fetchProfile()
        }
}, [id])

    async function fetchProfile() {
        try {
            const response = await client.query(getProfiles, { id }).toPromise()
            console.log('response: ', response)
        } catch (err) {
            
        }
    }

    return (
        <div>
            {id}
        </div>
    )
}