// Imports
import { useState, useEffect } from "react";
import { useWindowSize } from 'react-use';
import Confetti from "react-confetti";
import Capitals from "./Capitals.jsx";
import axios from "axios";
import "./App.css";
import Header from "./components/header.jsx"
import Footer from "./components/footer.jsx"
import Info from "./components/info.jsx"
function App() {
  // States
  const { width, height } = useWindowSize();
  const [weatherData, setWeatherData] = useState(null);
  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [data, setData] = useState("Europe");
  const [randomCity, setRandomCity] = useState(
    Capitals[data].cities[Math.floor(Math.random() * Capitals[data].cities.length)]
  );
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [hint, setHint] = useState(false);
  // Your api key here
  const apiKey = "YOUR_API_KEY";

  useEffect(() => {
    const fetchRandomWeather = async () => {
      // Fetch data from api
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: randomCity,
              appid: apiKey,
              units: "metric",
            },
          }
        );

        // Update the state with the fetched data
        setWeatherData(response.data);
      } catch (error) {
        // Handle the error
        console.error("Error fetching weather data:", error.message);
      }
    };

    fetchRandomWeather();
  }, [randomCity]); // Fetch the data every time randomCity changes
  function handleAnswer(event) {
    // After every change setUserGuess to input value
    const capitalized =
      event.target.value.charAt(0).toUpperCase() +
      event.target.value.slice(1).toLowerCase();
    setUserGuess(capitalized);
  }

  function handleClick(event) {
    // Checking what event it is and start actions
    if (event.target.type === "submit") {
      if(userGuess.length < 4){
        alert("Type your guess(min length 4)") // Checking if user typed less characters than 4
      }
      else {
        if (
          userGuess.trimEnd() ===
          weatherData.name.charAt(0).toUpperCase() +
          weatherData.name.slice(1).toLowerCase()
        ) {
          setIsCorrect(true);
          const timeout = setTimeout(() => {
            setIsCorrect(null);
          }, 7000)
          setUserGuess("");
          setRandomCity(
            Capitals[data].cities[Math.floor(Math.random() * Capitals[data].cities.length)]
          );
          setHint(false);
          setRevealAnswer(false);
          return () => clearTimeout(timeout);
        } else {
          setIsCorrect(false); // Ensure setIsCorrect is set to false for incorrect answers
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }
      }
      
    } else if (event.target.value === "Another Capital") {
      setRandomCity(
        Capitals[data].cities[Math.floor(Math.random() * Capitals[data].cities.length)]
      );
      setHint(false);
      setIsCorrect(null);
      setRevealAnswer(false);
    } else if (event.target.value != "Reveal the answer!" && event.target.value != "Hint?") { // If user wants to change the continent
      if (event.target.value != data) {
        let target = event.target.value;
        setRandomCity(
          Capitals[target].cities[Math.floor(Math.random() * Capitals[target].cities.length)]
        );
        setData(target);
        setHint(false);
        setIsCorrect(null);
        setRevealAnswer(false);
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }

    }
    else if (event.target.value === "Hint?") { // Hint
      setHint(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); // Scrolling to the bottom
    }
    else { // If user wants to reveal the answers
      setRevealAnswer(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }

  return (

    <div className="main">
      {isCorrect && <Confetti width={width} height={height} />}
      <Header />
      {(!isCorrect || isCorrect == null) && weatherData && (
        <Info userGuess={userGuess} weatherData={weatherData} revealAnswer={revealAnswer} handleClick={handleClick} handleAnswer={handleAnswer} data={data} hint={hint} isCorrect={isCorrect} />
      )}
      {isCorrect && isCorrect != null && <p style={{ textAlign: "center" }} >YAY!</p>}
      {isCorrect && isCorrect != null && <p style={{ textAlign: "center" }}>Did you know? {Capitals[data].interestFacts[Math.floor(Math.random() * Capitals[data].interestFacts.length)]}</p>}
      <Footer />
    </div>

  );
}

export default App;
