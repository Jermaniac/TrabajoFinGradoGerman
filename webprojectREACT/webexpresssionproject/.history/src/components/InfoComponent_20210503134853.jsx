import React from 'react';
import '../styles/InfoComponent.css'
function InfoExpressions( {expressions, changeExpression}){

    if (expressions){
        let expressionsFormatted = formatProbabilities(expressions);
        changeExpression(expressions)

        return (
            <div className="container-fluid">
                {
                    expressionsFormatted.map( (expression) => {
                        return (
                        <div className="row" key={expression.mood}>
                            <div className="col-11">
                                <div className="progress">
                                    <div  id="barra" className="progress-bar" aria-valuemin="0" aria-valuemax="100" style={{width:expression.probability+ "%"}}>
                                        {expression.probability}
                                    </div>
                                    <span className="badge">{expression.mood}</span>
                                </div>
                            </div>
                            <div className="col-1" id="imageEmoji">
                                <img src={`./assets/images/emoji_${expression.mood}.png`} alt="emoji"></img>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
            );

    }
    else {
        return null;
    }
}

function formatProbabilities(expressions){

    return expressions.map( (expression,index) => {
        return  {
            "mood": expression.mood,
            "probability": (expression.probability * 100).toFixed(2)
        }

    })

}

export default InfoExpressions;