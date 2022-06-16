import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { client, getProfiles } from "../../api";
import Image from 'next/image';

export default function Profile() {
    const [profile, setProfile] = useState()
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
            setProfile(response.data.profiles.items[0])
        } catch (err) {
            
        }
    }

    if (!profile) return null

    return (
        <div>
            {
                profile.picture ? (
                    <Image 
                        width="200px"
                        height="200px"
                        src={profile.picture.original.url}
                    />
                ) : (
                    <div style={{ width: '200px', height: '200px', backgroundColor: 'black'}} />)
            }
            <div>
                <h4>{profile.handle}</h4>
                <p>{profile.bio}</p>
                <p>Followers: {profile.stats.totalFollowers}</p>
                <p>Following: {profile.stats.totalFollowing}</p>
            </div>
        </div>
    )
}