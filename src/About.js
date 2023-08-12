import React from 'react';
import './About.css';
import './Styles.css';

const About = (props) => {
    return (
        <div className="about">
            <div className="head mt-4 mb-4">
              <h1 style={{textAlign: "center"}}>St Peter's Table</h1>
            </div>
            <div className="container box-display box-arrive rounded">
                <div className="row mt-4">
                    This is a charitable non-profit organization that will sell bibles to sponsor their good deeds.  Saint Peter’s Table is about bringing people to the table in regard to providing food for them to eat and knowledge for their souls to flourish.  In the bible Jesus had asked Peter to feed and take care of his sheep.

                    <br />

                    <div className="quoted">
                        NIV Version
                        John 21:15-17
                        <br />
                        15 When they had finished eating, Jesus said to Simon Peter, “Simon son of John, do you love me more than these?”
                        “Yes, Lord,” he said, “you know that I love you.”
                        Jesus said, “Feed my lambs.”
                        16 Again Jesus said, “Simon son of John, do you love me?”
                        He answered, “Yes, Lord, you know that I love you.”
                        Jesus said, “Take care of my sheep.”
                        17 The third time he said to him, “Simon son of John, do you love me?”
                    </div>

                    Peter was hurt because Jesus asked him the third time, “Do you love me?” He said, “Lord, you know all things; you know that I love you.”
                    Jesus said, “Feed my sheep.
                    <br />
                    This is not a task that Saint Peter alone should carry and we should all try to carry out the will of God.  We do not believe that God was merely referring to Peters ability to provide food but also to his ability to provide truth and spiritual wisdom that people could consume in order to be fulfilled by the Holy spirit.  Peter was sad because he had betrayed God three times and when Jesus asked Peter to take care of his sheep three times, he knew it was because he had sin that needed forgiven.  We all have sins to be forgiven and we all share Peter’s mission to help those in need.  Bibles will be sold to care for and feed people.

                    <div className="quoted">
                        ESV John 6:35
                        <br />
                        Jesus said to them, “I am the bread of life; whoever comes to me shall not hunger, and whoever believes in me shall never thirst.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;