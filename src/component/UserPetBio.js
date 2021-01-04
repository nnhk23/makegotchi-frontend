import React from 'react';
// import { Link } from 'react-router-dom';
import './UserPetBio.css'

const UserPetBio = ({ currentPet }) => {
    const { name, pet } = currentPet
    const { species, personality, hunger_rate, sleepy_rate, dirt_rate } = pet

    let article = 'a'
    const vowels = ['a', 'e', 'i', 'o', 'u']
    if (vowels.includes(personality[0])) {
        article = 'an'
    }

    return (
        <div className="userPet_bio">
            <p>Hi! My name is {name}, and I am {article} {personality.toLowerCase()} {species}. I get hungry every {hunger_rate} seconds and sleepy every {sleepy_rate} seconds, and I need a bath every {dirt_rate} seconds! </p>
        </div>
    )


}
export default UserPetBio