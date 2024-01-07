import { farm, wing, wild } from './data.js';
import { welcomeTheme, machineTheme } from './themes.js';

$(document).ready(function() {

    // DECLARE AND ASSIGN GLOBAL VARIABLES
    let currentChoice = ""
    let soundsRecorded = [];
    let soundsList = soundsRecorded;

    // RELOAD THE PAGE WHEN THE HOME BUTTON IS CLICKED
    $('.machine__home').on('click', function() {
        location.reload();
    })

    // HANDLE CLASSES WHEN SOUNDS ARE PLAYED
    $('audio').on('playing', function() {
        $(this).removeClass('ended');
        $(this).addClass('playing');
    })

    // HANDLE CLASSES WHEN SOUNDS ARE NOT PLAYED
    $('audio').on('ended', function() {
        $(this).addClass('ended');
        $(this).removeClass('playing');
    })

    // HANDLE THEME CHOICE
    $('.welcome__choiceBtn').on('click', function() {
        welcomeTheme(this.id);
        currentChoice = this.id;
    })

    // HANDLE THEME CONFIRMATION
    function handleConfirm(theme) {

        if (theme === 'farm') {
            nextPage(farm);
            machineTheme('farm');
        } else if (theme === 'wing') {
            nextPage(wing);
            machineTheme('wing');
        } else if (theme === 'wild') {
            nextPage(wild);
            machineTheme('wild');
        } else {
            alert('unknown theme!')
        }

        $('.welcome').addClass('d-none');
        $('#drum-machine').removeClass('d-none');

    }

    $('#confirmbtn').on('click', () => handleConfirm(currentChoice));

    function nextPage(animals) {

        // assign the sounds to the drum pads 
        for (let i = 0; i < animals.length; i++) {
            $(`audio:eq(${i})`).attr('src', animals[i].audio);
        }

        // make the click on the drum pads trigger the audio AND update the sounds list 
        $("button[class|='drum']").click(function() {
            $(this).children()[0].play();
            $('#display').html(animals[this.id].animal);
            $('#display').removeClass('d-none');
        });

        // make the keydown trigger the audio AND update the sounds list
        $(document).on('keydown', function(event) {

            let currentKey = event.key;

            $.map(animals, function(animal, i) {

                if (animal.key === currentKey.toLowerCase()) {
                    $(`button[class|='drum']:eq(${i})`).children()[0].play();
                    $('#display').html(animal.animal);
                    $('#display').removeClass('d-none');
                }
            })
        })

        // CONTROLS - HOVER AND ACTIVE STATES

        function handleRemoveActive(elem) {
            $(elem).removeClass('machine__controls--hover');
            $(elem).children().removeClass('hold').addClass('d-none');
        }

        $('.machine__controls button').on('mouseenter', function() {
            $(this).addClass('machine__controls--hover');
            $(this).children().removeClass('d-none');
        })

        $('.machine__controls button').on('mouseleave', function() {
            if ($(this).children().hasClass('hold')) {
                return;
            } else {
                $(this).children().addClass('d-none');
                $(this).removeClass('machine__controls--hover');
            }
        })

        $('.machine__controls button:not(:nth-child(3))').on('click', function() {

            $(this).children().addClass('hold');

            const current = this.id;

            $('.machine__controls button:not(:nth-child(3))').map((i, control) => {
                
                if (control.id !== current) {

                    handleRemoveActive(control);

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
            $("button[class|='drum']").off("click", handleClick);
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

                $(`button[class|='drum']:eq(${soundsList[i]})`).children()[0].play();

                let currentSoundDuration = Math.ceil($(`button[class|='drum']:eq(${soundsList[i]})`).children()[0].duration * 1000) + 500;

                await addDelay(currentSoundDuration);
                
                if ($(`button[class|='drum']:eq(${soundsList[i]}) audio`).hasClass('ended')) {

                    i++;

                    if (i === soundsList.length) {
                        soundsList = soundsRecorded;

                        handleRemoveActive('#play');

                        $('#stop').addClass('machine__controls--hover');
                        $('#stop').children().removeClass('d-none').addClass('hold');

                        break;
                    }

                } else {

                    soundsList = soundsList.slice(i);
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
            soundsList = [];

            $('.machine__controls button:not(:nth-child(3))').map((i, control) => handleRemoveActive(control));

        })

    }

})

   