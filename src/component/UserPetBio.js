import React from 'react';
// import { Link } from 'react-router-dom';

const UserPetBio = ({ name, pet }) => {
    const { species, personality, hunger_rate, sleepy_rate, dirt_rate } = pet
    
    let article = 'a'
    const vowels = ['a', 'e', 'i', 'o', 'u']
    if (vowels.includes(personality[0])) {
        article = 'an'
    }

    return (
        <div>
            <p>Hi! My name is {name}, and I am {article} {personality.toLowerCase()} {species}. I get hungry every {hunger_rate} seconds and sleepy every {sleepy_rate} seconds, and I need a bath every {dirt_rate} seconds! </p>
        </div>
    )
}
export default UserPetBio