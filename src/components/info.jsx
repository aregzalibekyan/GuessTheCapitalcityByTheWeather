// info
export default function Info(props) {
    // props - weatherData,handleClick, and many more(App.jsx)
    return (
        <div className="info">
            <p>
                Temperature:{Math.round(props.weatherData.main.temp)} Celsius
                <br />
                Min temperature:{Math.round(props.weatherData.main.temp_min)}
                <br />
                Max temperature:{Math.round(props.weatherData.main.temp_max)}
                <br />
                Feels like:
                {Math.round(props.weatherData.main.feels_like)}

                <br /> Weather:{props.weatherData.weather[0].main} <br /> Capital starts
                with letter {props.weatherData.name[0]} , ends with {props.weatherData.name[props.weatherData.name.length - 1]}
            </p>
            {/* Buttons */}
            <input type="text" onChange={props.handleAnswer} value={props.userGuess} placeholder='For example:London' className='answer' />
            <input type="submit" className="buttons" onClick={props.handleClick} />
            <input type="button" value='Reveal the answer!' onClick={props.handleClick} className="buttons but1" />
            <input type="button" value='Another Capital' onClick={props.handleClick} className="buttons but1" />
            <input type="button" value='Hint?' onClick={props.handleClick} className="buttons but1" />
            <br />
            <div className="buts">
                <input
                    type="button"
                    className="buttons"
                    value="Africa"
                    onClick={props.handleClick}
                />
                <input
                    type="button"
                    className="buttons"
                    value="Europe"
                    onClick={props.handleClick}
                />
                <input
                    type="button"
                    className="buttons"
                    value="Asia"
                    onClick={props.handleClick}
                />
                <input
                    type="button"
                    className="buttons"
                    value="North America"
                    onClick={props.handleClick}
                />
                <input
                    type="button"
                    className="buttons"
                    value="South America"
                    onClick={props.handleClick}
                />
                <input
                    type="button"
                    className="buttons"
                    value="Oceania"
                    onClick={props.handleClick}
                />
                <input
                    type="button"
                    className="buttons"
                    value="All Capitals"
                    onClick={props.handleClick}
                />
            </div>
            <br />
            <p>Current continent:{props.data}</p>
            <p>The flag of the country(Use hint to see):</p>{props.hint && <img id='flag' src={`https://flagsapi.com/${props.weatherData.sys.country}/flat/64.png`} alt={`Flag of ${props.weatherData.sys.country} country.`}/>}
            {!props.isCorrect && props.isCorrect != null &&  (
                <div id="wrongMessage" className='wrong-message'>
                    Wrong capital, take another try!
                </div>
            )} {/* Checks if isn't correct and it isn't null displays message*/}
            {props.revealAnswer && (
                <div id="revealAnswer" className='reveal-answer '>
                    The answer is {props.weatherData.name}
                </div>
            )} {/* Checks if reveal answer is used and if used it shows the right answer*/}
        </div>
    )
}