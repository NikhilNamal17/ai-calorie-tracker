import React from 'react';

import PropTypes from 'prop-types';

const Card = ({ body, imgSrc, imgAlt, val }) => {






    return (
        <div className="card col-md-auto" style={{

            alignItems: "center"
        }}>
            <img className="card-img-top" src={imgSrc} alt={imgAlt} />
            <div className="card-body">
                <h3 className="card-text">  {body}</h3>

            </div>
            <div className="card-body">
                {
                    val && val.map(itm => {
                        return (
                            <div key={itm.Fats}>
                                <h5 key={itm["Toatal Calories"]} className="card-text"> Toatal Calories(per 100g) {itm["Toatal Calories"]}</h5>
                                <h6 key={itm.Carbs} className="card-text">
                                    Carbs: {itm.Carbs}g
                                    <br />
                                    Fats: {itm.Fats}g
                                    <br />
                                    Protein: {itm.Protein}g
                                    <br />
                                    <br />
                                    <br />

                                </h6>


                            </div>
                        )
                    })
                }



            </div>
        </div>
    );
};

Card.propTypes = {
    body: PropTypes.string.isRequired
};

export default Card;