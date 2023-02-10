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

	let hours = time.getHours().toString().padStart(2, '0');
	let minutes = time.getMinutes().toString().padStart(2, '0');
	let seconds = time.getSeconds().toString().padStart(2, '0');
	let amPm = 'AM';

	if (hours >= 12) {
		amPm = 'PM';
		hours = (hours % 12).toString().padStart(2, '0');
	  }
	  
	  if (hours === '00') {
		hours = '12';
	  }

	return (
		<div class="wrapper">
			<div class="display">
				<div id="time">{hours}:{minutes}:{seconds}</div>
			</div>
		</div>
	);
}

export default CurrentTime;
