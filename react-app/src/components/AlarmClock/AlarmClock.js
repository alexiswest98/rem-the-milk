import React, { useState, useEffect } from 'react';
import './Clock.css'

function CurrentTime() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const hours = time.getHours();
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();

	return (
		<div className="wrapper">
			<div className="wrapper display">
				<div id="time">{hours}:{minutes}:{seconds}</div>
			</div>
		</div>
	);
}

export default CurrentTime;
