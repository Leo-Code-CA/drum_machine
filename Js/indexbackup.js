import { farm, wing, wild } from './data.js';
import { handleTheme } from './themes.js';

export let currentChoice = ""

$(document).ready(function() {

    // let currentChoice = ""

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

    let sounds = [];

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

    // handle delete click - clear the list of sounds 
    $("#del").click(function() {
        $('#list').children().remove();
        $("button[class|='drum']").off( "click", handleClick);
        sounds = [];
    })


    /////////////////////////////////////////

    // when record is "ON", remember the sounds played (by click) and list them
    function handleClick() {
        sounds.push(this.id);
        $('#list').append(`<li>${animals[this.id].animal}</li>`);
    }

    
    // when record is "ON", remember the sounds played (by key down) and list them 
    function handleKeyDown(event) {

        let currentKey = event.key;

        $.map(animals, function(animal) {
            if(animal.key === currentKey.toLowerCase()) {
                sounds.push(animal.id);
                $('#list').append(`<li>${animal.animal}</li>`)
            }
        })
    }

    // turn record "ON" - the sounds list starts to be updated
    $('#rec').click(function() {
        $("button[class|='drum']").on("click", handleClick);
        $(document).on('keydown', handleKeyDown);
    })

    // turn record "OFF" - the sounds list is no more updated
    $('#stop').click(function() {
        $("button[class|='drum']").off( "click", handleClick);
        $(document).off('keydown', handleKeyDown)
    })

    
    ////////////////////////////////////////
    let paused = 0;
    let remainingSounds = [];

    // replay the sounds saved in the list starting from the last one which was played when the paused button got clicked
    async function handleResume() {

        // let id = $('.playing').parent().attr('id');
        // let index = sounds.indexOf(id);
        

        let currentlyPlay = $('.playing')[0];
        currentlyPlay.play();


        if (remainingSounds.length === 0) {
            remainingSounds = sounds.slice(paused);
        } else {
            remainingSounds = remainingSounds.slice(paused);
        }

        // console.log('index is ' + index);
        // let remainingSounds = sounds.slice(paused);
        
        console.log('remaining sounds is: ' + remainingSounds);


            for (let i = 0; i < remainingSounds.length; i++) {

                $(`button[class|='drum']:eq(${remainingSounds[i]})`).children()[0].play();
                paused = i;
                console.log(`paused is: ${paused}`)
                let currentSoundDuration = Math.ceil($(`button[class|='drum']:eq(${remainingSounds[i]})`).children()[0].duration * 1000) + 100;
                await addDelay(currentSoundDuration);
        
            }
        }
        
    $('#resume').on('click', handleResume);


    // delay between two replayed sounds to avoid them to play all at the same time
    function addDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    

    // replay the sounds saved in the list
    async function playSounds() {

        console.log(`sounds is: ${sounds}`);

        $(`button[class|='drum']`).children().removeClass('paused');


            for (let i = 0; i < sounds.length; i++) {


            while($(`button[class|='drum']:eq(${sounds[i]})`).children().hasClass('paused') === false) {

                $(`button[class|='drum']:eq(${sounds[i]})`).children()[0].play();
                console.log(`playing: ${$(`button[class|='drum']:eq(${sounds[i]})`).children().attr('id')}`)
                paused = i;
                remainingSounds = [];
                console.log(`paused is: ${paused}`);
                // console.log($('#Q')[0].duration);
                let currentSoundDuration = Math.ceil($(`button[class|='drum']:eq(${sounds[i]})`).children()[0].duration * 1000) + 100;
                // console.log(currentSoundDuration)
                await addDelay(currentSoundDuration);
                i++;
            
            }
        }


    }

    $('#play').on('click', playSounds);

    


    $('#pause').on('click', function() {
        

        $('.playing')[0].pause();

        // let soundsarr = [];

        // if (remainingSounds.length === 0) {
        //     soundsarr = sounds;
        // } else {
        //     soundsarr = remainingSounds;
        // }
   

        //  for (let i = 0; i < soundsarr.length; i++) {
        //      $(`button[class|='drum']:eq(${sounds[i]})`).children().addClass('paused');
        //  }

    })



    


    $('audio').on('playing', function() {
        $(this).removeClass('ended');
        $(this).addClass('playing');
    })


    $('audio').on('ended', function() {
        $(this).addClass('ended');
        $(this).removeClass('playing');
    })


}
    
// })










///////////////////////////////////////////////////////////////////



function addDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


$('#click').on('click', playthesounds)

async function playthesounds() {

    const soundslist = [0, 1, 2]

    let i = 0;


    while (i < soundslist.length) {

        console.log(`I'm playing ${wild[i].animal}`)
        $(`button[class|='drum']:eq(${soundslist[i]})`).children()[0].play();

        // let currentSoundDuration = Math.ceil($(`button[class|='drum']:eq(${soundslist[i]})`).children()[0].duration * 1000) + 100;

        // console.log(`I'm about to wait ${currentSoundDuration}`);

        await addDelay(5000);

        console.log(`I have waited 5sec`);

        const classornot = $(`button[class|='drum']:eq(${soundslist[i]}) audio`).hasClass('ended');

        console.log(`do ${wild[i].animal} has the class ended? ${classornot}`)
        
        if ($(`button[class|='drum']:eq(${soundslist[i]}) audio`).hasClass('ended')) {

            i++;

            console.log('I increase i, it is now equal to' + i )

        } else {

            console.log('the else was triggered, i exit')
            break;
            
        }


    }
    

}

// GOOF JOB I MANAGED TO EXIT THE LOOP WHEN PAUSED IS TRIGGERED. NOW YOU JUST HAVE TO REMEBER THE SONGS THAT ARE LEFT IN THE ARRAY SO YOU CAN KEEP PLAYING THEM WHEN THE USER RESUMES! GZ!!!!!!!!!!!!














})

   