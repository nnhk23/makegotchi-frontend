import React from 'react';
// import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const UserPet = ({ currentPet }) => {
    const { name, happiness_score, last_fed, last_slept, last_cleaned, pet } = currentPet
    // const { hunger_rate, sleepy_rate, dirt_rate } = pet
    console.log(typeof last_fed)

    const parseDateTime = (dateTime) => {
        console.log(dateTime)
        console.log(new Date(dateTime))
        let dateTimeDict = {}
        dateTimeDict["year"] = dateTime.slice(0, 4)
        dateTimeDict["month"] = dateTime.slice(5, 7)
        dateTimeDict["date"] = dateTime.slice(8, 10)
        
        const hour = parseInt(dateTime.slice(11, 13))
        dateTimeDict["hour"] = hour % 12 === 0 ? "12" : (hour % 12).toString()
        dateTimeDict["min"] = dateTime.slice(14, 16)
        dateTimeDict["meridiem"] = hour < 12 ? "am" : "pm"

        return dateTimeDict
    }
    let fed = <p>Feed me!</p>
    let slept = <p>Tuck me in bed!</p>
    let cleaned = <p>Clean me!</p>
    if (last_fed) {
        const { year: fedYear, month: fedMonth, date: fedDate, hour: fedHour, min: fedMin, meridiem: fedMeridiem } = parseDateTime(last_fed) 
        fed = <p>Last Fed: {`${fedHour}:${fedMin} ${fedMeridiem}`}</p>
    }
    if (last_slept) {
        const { year: sleptYear, month: sleptMonth, date: sleptDate, hour: sleptHour, min: sleptMin, meridiem: sleptMeridiem } = parseDateTime(last_slept)
        slept = <p>Last Slept: {`${sleptHour}:${sleptMin} ${sleptMeridiem}`}</p>
    }
    if (last_cleaned) {
        const { year: cleanedYear, month: cleanedMonth, date: cleanedDate, hour: cleanedHour, min: cleanedMin, meridiem: cleanedMeridiem } = parseDateTime(last_cleaned)
        cleaned = <p>Last Cleaned: {`${cleanedHour}:${cleanedMin} ${cleanedMeridiem}`}</p>
    }

    return (
        <div>
            <Row>
                <h2>{name}</h2>
            </Row>
            <Row>
                <p>Happiness: {happiness_score}</p> 
            </Row>
            <Row>
                {fed}
            </Row>
            <Row>
                {slept}
            </Row>
            <Row>
                {cleaned}
            </Row>
            <Row>
                <img id="pet-img" src={pet.img_url} alt="Pet Image" />
            </Row>
        </div>
    )
}
export default UserPet