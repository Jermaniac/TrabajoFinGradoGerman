import React from 'react';

function InfoExpressions(props){
    if (props.expressions){
        let expressions = props.expressions;
        return (
            <div className="container-fluid">
                {
                    expressions.map( (expression) => {
                        <div className="row">
    
                            <div className="col-11">
                                <div className="progress">
                                    <div  id="barra" className="progress-bar" aria-valuemin="0" aria-valuemax="100">
                                    
                                    </div>
                                    <span className="badge">EY</span> 
                                </div>
                            </div>
                            <div className="col-1" id="imageEmoji">
                                <img src={`./assets/images/emoji_${expression.mood}.png`} alt="emoji"></img>
                            </div>
        
                        </div>
                    })
                }
            </div>  
            );
    }
    else {
        return null;
    }
}
  
export default InfoExpressions;