import { farm, wing, wild } from './data.js';
import { handleTheme } from './themes.js';

let currentChoice = ""
let soundsRecorded = [];
let soundsList = soundsRecorded;

$(document).ready(function() {


    $('audio').on('playing', function() {
        $(this).removeClass('ended');
        $(this).addClass('playing');
    })


    $('audio').on('ended', function() {
        $(this).addClass('ended');
        $(this).removeClass('playing');
    })


    // HANDLE THEME CHOICE
    $('#choicebtn button').on('click', function() {
        handleTheme(this.id);
        currentChoice = this.id;
    })

    // HANDLE THEME CONFIRMATION
    function handleConfirm(theme) {

        theme === 'farm' ? nextPage(farm) : theme === 'wing' ? nextPage(wing) : nextPage(wild);

        $('.welcome').addClass('d-none');
        $('#drum-machine').removeClass('d-none');

    }

    $('#confirmbtn').on('click', () => handleConfirm(currentChoice));


    function nextPage(animals) {

        // assign the sounds to the drum pads 
        for (let i = 0; i < animals.length; i++) {
            $(`audio:eq(${i})`).attr('src', animals[i].audio);
        }

        // make the click on the drum pads trigger the audio AND update the sound list 
        $("button[class|='drum']").click(function() {
            $(this).children()[0].play();
            $('#display').html(animals[this.id].animal);
        });

        // make the corresponding key press trigger the audio AND update the sound list
        $(document).on('keydown', function(event) {

            let currentKey = event.key;

            // console.log(currentKey)

            $.map(animals, function(animal, i) {
                // console.log(animal.key);
                // console.log(animals);
                if (animal.key === currentKey.toLowerCase()) {
                    $(`button[class|='drum']:eq(${i})`).children()[0].play();
                    $('#display').html(animal.animal);
                }
            })
        })

        
    // CONTROL - RECORD

    function handleClick() {
        soundsRecorded.push(this.id);
        $('#list').append(`<li>${animals[this.id].animal}</li>`);
    }

    function handleKeyDown(event) {

        let currentKey = event.key;

        $.map(animals, function(animal) {
            if(animal.key === currentKey.toLowerCase()) {
                soundsRecorded.push(animal.id);
                $('#list').append(`<li>${animal.animal}</li>`)
            }
        })
    }

    $('#rec').click(function() {
        $("button[class|='drum']").on("click", handleClick);
        $(document).on('keydown', handleKeyDown);
    })


    // CONTROL - STOP
        
    function stop() {
        $("button[class|='drum']").off( "click", handleClick);
        $(document).off('keydown', handleKeyDown);
    }

    $('#stop').on('click', stop)


    // CONTROL - PLAY / RESUME

    function addDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function playOrResume() {

        let i = 0;

        while (i < soundsList.length) {

            console.log(`I'm playing ${wild[i].animal}`)
            $(`button[class|='drum']:eq(${soundsList[i]})`).children()[0].play();

            let currentSoundDuration = Math.ceil($(`button[class|='drum']:eq(${soundsList[i]})`).children()[0].duration * 1000) + 500;

            await addDelay(currentSoundDuration);

            console.log(`I have waited ${currentSoundDuration}`);

            const classornot = $(`button[class|='drum']:eq(${soundsList[i]}) audio`).hasClass('ended');

            console.log(`do ${wild[i].animal} has the class ended? ${classornot}`)
            
            if ($(`button[class|='drum']:eq(${soundsList[i]}) audio`).hasClass('ended')) {

                i++;

                console.log(`i is now: ${i}`);

                if (i === soundsList.length) {
                    console.log(`i'm equal to the length of the array: ${i}. Now I have to be reset`)
                    soundsList = soundsRecorded;
                    console.log(`soundlist is now: ${soundsList}`)
                    break;
                }

            } else {

                soundsList = soundsList.slice(i);
                console.log('the else was triggered, i will exit but first, I update soundslist. Now soundlist =' + soundsList)
                break;
                
            }

        }

    }

    $('#play').on('click', playOrResume);

    // PAUSE

    $('#pause').on('click', function() {

        $('.playing')[0].pause();

    })


    // RESET

    $("#del").click(function() {

        $('#list').children().remove();
        stop();
        soundsRecorded = [];
    })


    }


})

   