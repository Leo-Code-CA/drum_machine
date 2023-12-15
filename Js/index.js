import { farmAnimals, flyingAnimals, wildAnimals } from './data.js';

$(document).ready(function() {

    let sounds = [];

    // assign the sounds to the drum pads 
    for (let i = 0; i < wildAnimals.length; i++) {
        $(`audio:eq(${i})`).attr('src', wildAnimals[i].audio);
    }

    // make the click on the drum pads trigger the audio AND update the sound list 
    $("button[class|='drum']").click(function() {
        $(this).children()[0].play();
        $('#display').html(wildAnimals[this.id].animal);
    });

    // make the corresponding key press trigger the audio AND update the sound list
    $(document).on('keydown', function(event) {

        let currentKey = event.key;

        $.map(wildAnimals, function(animal, i) {
             if (animal.key === currentKey.toLowerCase()) {
                $(`button[class|='drum']:eq(${i})`).children()[0].play();
                $('#display').html(animal.animal);
             }
        })
    })

    // handle delete click to clear the list of sounds 
    $("#del").click(function() {
        $('#list').children().remove();
        $( "body" ).off( "click", "button[class|='drum']", handleClick);
        sounds = [];
    })




    /////////////////////////////////////////


    function handleClick() {
        sounds.push(this.id);
        // console.log(sounds);
        $('#list').append(`<li>${wildAnimals[this.id].animal}</li>`);
    }

    function handleKeyDown(event) {

        let currentKey = event.key;

        $.map(wildAnimals, function(animal) {
            if(animal.key === currentKey.toLowerCase()) {
                sounds.push(animal.id);
                $('#list').append(`<li>${animal.animal}</li>`)
            }
        })
    }

    $('#rec').click(function() {
        $("button[class|='drum']").on( "click", handleClick);
        $(document).on('keydown', handleKeyDown);
    })


    $('#stop').click(function() {
        $("button[class|='drum']").off( "click", handleClick);
        $(document).off('keydown', handleKeyDown)
    })

    


    ////////////////////////////////////////

    
    

    async function handleResume() {

        let id = $('.playing').parent().attr('id');
        let index = sounds.indexOf(id);
        

        let currentlyPlay = $('.playing')[0];
        currentlyPlay.play();

        console.log('index is ' + index);
        let remainingSounds = sounds.slice(index);
        console.log('sounds is ' + sounds);
        console.log('remaining is ' + remainingSounds);


            for (let i = 0; i < remainingSounds.length; i++) {

                $(`button[class|='drum']:eq(${remainingSounds[i]})`).children()[0].play();
                await addDelay(2000);
        
            }
        }
        
    $('#resume').on('click', handleResume);


    function addDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function playSounds() {

        $(`button[class|='drum']`).children().removeClass('paused');


            for (let i = 0; i < sounds.length; i++) {


            while($(`button[class|='drum']:eq(${sounds[i]})`).children().hasClass('paused') === false) {

                $(`button[class|='drum']:eq(${sounds[i]})`).children()[0].play();
                console.log(`playing: ${$(`button[class|='drum']:eq(${sounds[i]})`).html()}`)
                await addDelay(2000);
                i++;
            
            }
        }


    }

    $('#play').on('click', playSounds);

    


    $('#pause').on('click', function() {

        let id = $('.playing').parent().attr('id');
        let index = sounds.indexOf(id);
        

        $('.playing')[0].pause();

        // let id = $('.playing').parent().attr('id');
        // console.log(id);
        // let index = sounds.indexOf(id);
        // console.log(index);
   

         for (let i = index; i < sounds.length; i++) {
             $(`button[class|='drum']:eq(${sounds[i]})`).children().addClass('paused');
         }

    })



    

    // console.log($(`button[class|='drum']:eq(0)`).children().attr('class'));


    // $('audio').on('play', function() {
    //     $(this).addClass('playing');
    // })

    $('audio').on('playing', function() {
        $(this).removeClass('ended');
        $(this).addClass('playing');
        // console.log($('.playing').parent().attr('id'));
    })

    // $('audio').on('ended', function() {
    //     $(this).removeClass('playing');
    //     $(this).addClass('ended')
    // })

    $('audio').on('ended', function() {
        $(this).addClass('ended');
        $(this).removeClass('playing');
    })


    //////////////////////////////////////////

    

    // async function playSounds() {
    //     for (let i = 0; i < sounds.length; i++) {

    //         let pause = false;

    //         if ($(`button[class|='drum']:eq(${sounds[i]})`).children().hasClass('paused') === false) {

    //             $(`button[class|='drum']:eq(${sounds[i]})`).children()[0].play();
    //             await addDelay(2000);

    //         } else {
    //             $(`button[class|='drum']:eq(${sounds[i]})`).children()[0].pause();
    //         }
    //     }

    // }




    // $('#pause').on('click', function() {
    //     let id = $('.playing').parent().attr('id');

    //     console.log('parent id: ' + id);
    //     console.log('sounds: ' + sounds)

    //     let index = sounds.indexOf(id);
    //     console.log('starting index: ' + index)

    //     for (let i = index; i < sounds.length; i++) {
    //         console.log('the i is: ' + i)
    //         $(`button[class|='drum']:eq(${sounds[i]})`).children()[0].pause()
    //         console.log('I pause the: ' + sounds[i]);
    //     }
    //     // $('.playing')[0].pause();
        
    // })

    
})