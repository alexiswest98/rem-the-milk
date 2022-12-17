import './index.css'
import React from "react";
import Alexis from '../../Images/Alexis1.png'
import Gabe from '../../Images/Gabe1.png'
import Evan from '../../Images/Evan.png'
import Michael from '../../Images/Michael.png'

export default function AboutUsPage() {



    return (
        <div className="bigAboutUsDiv">

            <div className="blueSideAboutUs">

                <div className="user1BlueSide">
                    <h2>Alexis West</h2>
                    <img src={Alexis} alt="user1" />
                    <a className="linkedin" target="_blank" href='https://www.linkedin.com/in/alexis-west-596a6b203/'>LinkedIn</a>
                    <a className="githubFooter" target="_blank" href='https://github.com/alexiswest98'>Github</a>
                </div>

                <div className="user2BlueSide">
                    <h2>Evan Morgan</h2>
                    <img src={Evan} alt="user2" />
                    <a className="linkedin" target="_blank" href='https://www.linkedin.com/in/evan-morgan-9a2723132/'>LinkedIn</a>
                    <a className="githubFooter" target="_blank" href='https://github.com/ebmorgansb'>Github</a>
                    
                </div>

            </div>


            <div className="whiteSideAboutUs">

                <div className="user3BlueSide">
                    <h2>Gabriel Day</h2>
                    <img src={Gabe} alt="user3" />
                    <a className="linkedin" target="_blank" href='https://www.linkedin.com/in/gabriel-day-536738201/'>LinkedIn</a>
                    <a className="githubFooter" target="_blank" href='https://github.com/Gabetd'>Github</a>
                    
                </div>
                <div className="user4BlueSide">
                    <h2>Michael Lacey</h2>
                    <img src={Michael} alt="user4" />

                    <a className="linkedin" target="_blank" href='https://www.linkedin.com/in/michael-lacey-84875a243/'>LinkedIn</a>
                    <a className="githubFooter" target="_blank" href='https://github.com/MichaelLacey'>Github</a>
                   
                </div>
            </div>
        </div>
    )
}

