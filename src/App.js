import React, { useState } from "react";

const api = {
	key: "5aec9ac0c96ac8b35fa93ee50fceab96",
	url: "https://api.openweathermap.org/data/2.5/weather",
};

function App() {
	const [search, setSearch] = useState("");
	const [weather, setWeather] = useState({});

	const lookup = (evt) => {
		if (evt.key === "Enter") {
			fetch(`${api.url}?q=${search}&units=metric&appid=${api.key}`)
				.then((res) => res.json())
				.then((result) => {
					setWeather(result);
					setSearch("");
					console.log(result);
				});
		}
	};

	const dateBuilder = (d) => {
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};
	return (
		<div
			className={
				typeof weather.main != "undefined"
					? weather.main.temp > 11
						? "app hot"
						: "app cold"
					: "app"
			}
		>
			<main>
				<div className="search">
					<input
						type="text"
						className="search__bar"
						placeholder="Search..."
						onChange={(e) => setSearch(e.target.value)}
						value={search}
						onKeyPress={lookup}
					/>
				</div>

				{typeof weather.main != "undefined" ? (
					<>
						<div className="info">
							<div className="info__city">
								{weather.name}, {weather.sys.country}
							</div>
							<div className="info__date">{dateBuilder(new Date())}</div>
						</div>

						<div className="weather">
							<div className="weather__desc">
								<dl>
									<dt>Humidity</dt>
									<dd> {weather.main.humidity} %</dd>
									<dt>Wind speed</dt>
									<dd> {weather.wind.speed} m/s</dd>
									<dt>Cloudiness</dt>
									<dd> {weather.weather[0].description}</dd>
									<dt>Pressure</dt>
									<dd> {weather.main.pressure} hpa</dd>
								</dl>
							</div>

							<div className="weather__temp">
								{Math.round(weather.main.temp)}°C
							</div>
						</div>
					</>
				) : (
					<div className="nodata">
						<h2>Check weather in your city</h2>
					</div>
				)}
			</main>
		</div>
	);
}

export default App;
