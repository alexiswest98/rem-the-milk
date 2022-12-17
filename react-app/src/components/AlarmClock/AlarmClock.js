import React from "react";
import "./alarmClock.css"
import "./clock"

export default function AlarmClock() {

	return (
		<body>
		<div id='main-container'>
			<h2 id='clock'></h2>

		<div id='alarm-container'>
			<h3 class="title-set">Set Alarm Time</h3>
				<label>
					<div>
					<select id='alarmhrs' ></select>
					</div>
				</label>
				<label>
					<div>
					<select id='alarmmins'></select>
					</div>
				</label>
				<label>
					<div>
					<select id='alarmsecs' ></select>
					</div>
				</label>
				<label>
					<div>
						<select id="ampm">
							<option value="AM">AM</option>
							<option value="PM">PM</option>
						</select>
					</div>
				</label>
				</div>
				
				<div id='buttonHolder'>
					<div>
						<button  id='setButton' onClick='alarmSet()'>Set Alarm</button>
			</div>
			
			<div>
				<button  id='clearButton' onClick='alarmClear()'>Clear Alarm</button>
			</div>
		</div>
		</div>

		<script type='text/javascript' src='clock.js'></script>
	</body>

	)

}

// onClick={() => alarmSet()}
// onClick={() => alarmClear()}
