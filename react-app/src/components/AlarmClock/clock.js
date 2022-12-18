import React, { useEffect, useState, useRef } from 'react';

const AlarmClock = () => {
    const sound = useRef(new Audio("MORNING.wav"));
    sound.current.loop = true;
    const [time, setTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
          const date = new Date();
          let hours = date.getHours();
          const minutes = `0${date.getMinutes()}`.slice(-2);
          const seconds = `0${date.getSeconds()}`.slice(-2);
          const ampm = hours < 12 ? 'AM' : 'PM';
          hours = hours % 12;
          hours = hours || 12; // replace 0 with 12
          setTime(`${hours}:${minutes}:${seconds} ${ampm}`);
        }, 1000);
      
        return () => clearInterval(interval);
      }, []);
      


    function addZero(time) {

        return (time < 10) ? "0" + time : time;

    }

    function getCurrentTime() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${hours}:${minutes}:${seconds}`;
      }
      

    // function hoursMenu() {
    //     const select = document.getElementById('alarmhrs');
    //     let hrs = 12;

    //     for (let i = 1; i <= hrs; i++) {
    //         select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    //     }
    // }

    // function minMenu() {
    //     const select = document.getElementById('alarmmins');
    //     let min = 59;

    //     for (let i = 0; i <= min; i++) {
    //         select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    //     }
    // }

    // function secMenu() {
    //     const select = document.getElementById('alarmsecs');
    //     let sec = 59;

    //     for (let i = 0; i <= sec; i++) {
    //         select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    //     }
    // }

    // function alarmSet() {
    //     const hr = document.getElementById('alarmhrs');
    //     const min = document.getElementById('alarmmins');
    //     const sec = document.getElementById('alarmsecs');
    //     const ap = document.getElementById('ampm');

    //     const selectedHour = hr.options[hr.selectedIndex].value;
    //     const selectedMin = min.options[min.selectedIndex].value;
    //     const selectedSec = sec.options[sec.selectedIndex].value;
    //     const selectedAP = ap.options[ap.selectedIndex].value;

    //     const alarmTime = addZero(selectedHour) + ":" + addZero(selectedMin) + ":" + addZero(selectedSec) + selectedAP;
    //     console.log('alarmTime:' + alarmTime);

    //     document.getElementById('alarmhrs').disabled = true;
    //     document.getElementById('alarmmins').disabled = true;
    //     document.getElementById('alarmsecs').disabled = true;
    //     document.getElementById('ampm').disabled = true;

    //     // when alarmtime is equal to currenttime then play a sound
    //     setInterval(() => {
    //         const date = new Date();
    //         let hours = (12 - (date.getHours()));
    //         let minutes = date.getMinutes();
    //         let seconds = date.getSeconds();
    //         let ampm = (date.getHours()) < 12 ? 'AM' : 'PM';

    //         if (hours < 0) {
    //             hours = hours * -1;
    //         } else if (hours.toString() === '00') {
    //             hours = 12;
    //         } else {
    //             hours = hours;
    //         }

    //         const currentTime = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + "" + ampm;
    //         if (currentTime === alarmTime) {
    //             sound.current.play();
    //         }
    //     }, 1000);
    // }

    // function clearAlarm() {
    //     document.getElementById('alarmhrs').disabled = false;
    //     document.getElementById('alarmmins').disabled = false;
    //     document.getElementById('alarmsecs').disabled = false;
    //     document.getElementById('ampm').disabled = false;
    //     sound.current.pause();
    //     sound.current.currentTime = 0;
    // }

    return (
        <div id='main-container'>
            <h2 id='clock'>{time}</h2>

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
                    <button id='setButton' onClick='alarmSet()'>Set Alarm</button>
                </div>

                <div>
                    <button id='clearButton' onClick='alarmClear()'>Clear Alarm</button>
                </div>
            </div>
        </div>
    );
};


