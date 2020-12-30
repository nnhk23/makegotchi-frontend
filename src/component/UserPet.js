import React from 'react';
// import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const UserPet = ({ currentPet, feedIn, sleepIn, cleanIn }) => {
    const { name, happiness_score, last_fed, last_slept, last_cleaned, pet } = currentPet

    // const parseDateTime = (dateTime) => {
    //     let dateTimeDict = {}
    //     dateTimeDict["year"] = dateTime.slice(0, 4)
    //     dateTimeDict["month"] = dateTime.slice(5, 7)
    //     dateTimeDict["date"] = dateTime.slice(8, 10)
        
    //     const hour = parseInt(dateTime.slice(11, 13))
    //     dateTimeDict["hour"] = hour % 12 === 0 ? "12" : (hour % 12).toString()
    //     dateTimeDict["min"] = dateTime.slice(14, 16)
    //     dateTimeDict["meridiem"] = hour < 12 ? "am" : "pm"

    //     return dateTimeDict
    // }
    // let fed = <p>Feed me!</p>
    // let slept = <p>Tuck me in bed!</p>
    // let cleaned = <p>Clean me!</p>
    // if (last_fed) {
    //     const { year: fedYear, month: fedMonth, date: fedDate, hour: fedHour, min: fedMin, meridiem: fedMeridiem } = parseDateTime(last_fed) 
    //     fed = <p>Last Fed: {`${fedHour}:${fedMin} ${fedMeridiem}`}</p>
    // }
    // if (last_slept) {
    //     const { year: sleptYear, month: sleptMonth, date: sleptDate, hour: sleptHour, min: sleptMin, meridiem: sleptMeridiem } = parseDateTime(last_slept)
    //     slept = <p>Last Slept: {`${sleptHour}:${sleptMin} ${sleptMeridiem}`}</p>
    // }
    // if (last_cleaned) {
    //     const { year: cleanedYear, month: cleanedMonth, date: cleanedDate, hour: cleanedHour, min: cleanedMin, meridiem: cleanedMeridiem } = parseDateTime(last_cleaned)
    //     cleaned = <p>Last Cleaned: {`${cleanedHour}:${cleanedMin} ${cleanedMeridiem}`}</p>
    // }

    return (
        <div>
            <Row>
                <h2>{name}</h2>
            </Row>
            <Row>
                <p>Happiness: {happiness_score}</p> 
            </Row>
            <Row>
                {/* {fed} */}
                {feedIn > 0 ? <p>Feed me in {feedIn} seconds!</p> : <p>I NEED FOOD NOW!!!</p>}
            </Row>
            <Row>
                {/* {slept} */}
                {sleepIn > 0 ? <p>Tuck me in bed in {sleepIn} seconds!</p> : <p>I NEED TO SLEEP NOW!!!</p>}
            </Row>
            <Row>
                {/* {cleaned} */}
                {cleanIn > 0 ? <p>Clean me in {cleanIn} seconds!</p> : <p>I NEED A BATH NOW!!!</p>}
            </Row>
            <Row>
                <img id="pet-img" src={pet.img_url} alt="Pet Image" />
            </Row>
        </div>
    )
}
export default UserPet