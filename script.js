// 'use strict';

let hr = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let reset = document.getElementById('reset');
let slider = document.querySelector(".slider");
let close = document.querySelector("#close");
let sw = document.getElementById('stopwatch');
let startBtn = document.querySelector(".startBtn");
let lap = document.querySelector('#lap');
let pause = document.querySelector('#pause');
let stopHour = document.querySelector('#stopHour');
let stopMin = document.querySelector('#stopMin');
let stopSec = document.querySelector('#stopSec');
let stop;
let stoper;
let remainingMiliseconds;
                                                // CLOCK
let clock = {
    hour: 0,
    minutes: 0,
    seconds: 0,
    time(){

        let currentTime = new Date();

        this.hour = currentTime.getHours();
        this.minutes = currentTime.getMinutes();
        this.seconds = currentTime.getSeconds();

        if(this.hour === 0){
            this.hour = 12;
        }
        if(this.hour < 12){
            this.hour = "0" + this.hour;
        }
        if(this.minutes < 10){
            this.minutes = "0" + this.minutes;
        }
        if(this.seconds < 10){
            this.seconds = "0" + this.seconds;
        }
        sec.innerText = this.seconds;
        min.innerText = this.minutes;
        hr.innerText = this.hour;
    }
};
let timer = clock.time;
setInterval( timer.bind(clock), 1000);



                                    //   STOP WATCH
let stopwatch = {
    hour: 00,
    minutes: 00,
    seconds: 00,
    time(){
        this.seconds++;

        if(this.seconds === 60){
            this.seconds = 0;
            this.minutes++;
            if(this.minutes === 60){
                this.minutes = 0;
                this.hour++;
            }
        }
        // console.log(`${this.hour} : ${this.minutes} : ${this.seconds}`);
        if(this.seconds > 9){
            stopSec.innerText = this.seconds;
        }
        else{
            stopSec.innerText = '0' + this.seconds;
        }

        if(this.minutes > 9){
            stopMin.innerText = this.minutes;
        }
        else{
            stopMin.innerText = '0' + this.minutes;
        }

        if(this.hour > 9){
            stopHour.innerText = this.hour;
        }
        else{
            stopHour.innerText = '0' + this.hour;
        }
    }
};

                                        //   RESET BUTTON
reset.addEventListener('click', () => {
    clock.hour = 0;
    clock.minutes = 0;
    clock.seconds = 0;
    sec.innerText = '00';
    min.innerText = '00';
    hr.innerText = '00';
});


close.addEventListener("click", ()=>{
    slider.style.left = "-100%";
});

sw.addEventListener('click', ()=>{
    slider.style.left = "0";
});

                                    // START BUTTON
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    lap.style.display = "block";
    pause.style.display = "block";
    stoper = stopwatch.time;
    stop = setInterval( stoper.bind(stopwatch), 1000);

});

                                    //PAUSE AND RESUME BUTTON
pause.addEventListener('click', ()=>{
    if(pause.innerText === 'Pause'){
        pause.innerText = 'Resume';
        lap.innerText = 'Reset';
        clearInterval(stop);
    }
    else{
        pause.innerText = 'Pause';
        lap.innerText = 'Lap';
        setTimeout(() => {
            stop = setInterval( stoper.bind(stopwatch), 1000);
        }, 500);
    }
});

                                //    LAP BUTTON
lap.addEventListener('click',()=>{
    let li,ol;
    if(lap.innerText === 'Lap'){
        li = document.createElement('li');
        li.innerText = `${stopwatch.hour} : ${stopwatch.minutes} : ${stopwatch.seconds}`;
        ol = document.getElementById('orderList');
        ol.style.display = 'block';
        // ol.appendChild(li);
        ol.insertBefore(li, ol.firstChild);
    }
    else if(lap.innerText === "Reset"){
        // ol.style.display = 'none';
        startBtn.style.display = "block";
        lap.style.display = "none";
        pause.style.display = "none";
        stopwatch.hour = 0;
        stopwatch.minutes = 0;
        stopwatch.seconds = 0;
        stopSec.innerText = '00';
        stopMin.innerText = '00';
        stopHour.innerText = '00';
        pause.innerText = 'Pause';
        lap.innerText = 'Lap';
        let allLi = document.querySelectorAll('li');

        for(let lists of allLi){
            lists.remove();
        }
    }
});

