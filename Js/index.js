import { farmAnimals, flyingAnimals, wildAnimals } from './data.js';

// $(document).ready(function() {

//     function applyTheme(theme) {
//         return {
//             mainBG: `bg--${theme} row vh-100 welcome`,
//             secondaryBG: `welcome__bg--${theme} welcome__bg position-absolute start-50 top-50 translate-middle d-flex flex-column justify-content-evenly align-items-center z-1`,
//             themeBTN: `welcome__themebtn--${theme} btn theme welcome__themebtn`,
//             choiceBTM: `welcome__choicebtn--${theme} btn welcome__choicebtn`

//         }
//     }

//     $('#welcome').removeClass(function(i, old) {
//         console.log('i remove' + old)
//         return old;
//     });
//     $('#welcome').addClass(applyTheme('wild').mainBG)

//     $('#welcomebg').removeClass(function(i, old) {
//         console.log('i remove' + old)
//         return old;
//     });
//     $('#welcomebg').addClass(applyTheme('wild').mainBG)
    

//     farm wild wing 

//     confirm

    /// LOOP OR MAP OR WHATEVER BUT FIND SOMETHING BETTER BECAUSE THIS LOOKS BAD :( GOOD LUCK!



    function handleTheme(theme) {

        $('.pick').text(`You picked ${theme}`)

        const bgImg = $('#welcomeimg');
        const bgColor = $('#welcomecolor');;
        const btnChoice = $('#choicebtn button');;
        const btnConfirm = $('#confirmbtn');;

        const elements = [bgImg, bgColor, btnChoice, btnConfirm];

        $.map(elements, function(element, i) {

            element.removeClass(function(i, old) {

                const classes = old.split(" ");
                let remove = "";

                classes.filter(function(name) {
                    console.log(name.includes('--'));
                    name.includes('--') && (remove += ` ${name}`);
                })

                console.log(remove)
                return remove;
            })

            switch(i) {
                case 0:
                element.addClass(`welcome__bgImg--${theme}`);
                break;
                case 1:
                element.addClass(`welcome__bgColor--${theme}`)
                break;
                case 2:
                element.addClass(`welcome__choiceBtn--${theme}`);
                break;
                case 3:
                element.addClass(`welcome__confirmBtn--${theme}`);
                break;
                default:
                element.addClass(`welcome__default`);
            }
        })
    }
    
    $('#choicebtn button').on('click', function() {
        handleTheme(this.id);
    })

    
    ///////////////////////////////////////////////////////////////////////////////////
    // Welcome page content

    // let pickTheme;
    // let finalChoice;
    

    // $('button.theme').on('click', handleChoice);
    // $('#confirm').on('click', handleConfirm);
    

    // function handleChoice() {

    //     pickTheme = $(this).attr('id');

    //     if (pickTheme === 'farm') {
    //         $('.welcome').removeClass(['bg--wild', 'bg--wing']);
    //         $('.welcome').addClass('bg--farm');
    //         $('.welcome__bg').removeClass(['welcome__bg--wild', 'welcome__bg--wing']);
    //         $('.welcome__bg').addClass('welcome__bg--farm');
    //     } else if (pickTheme === 'wild') {
    //         $('.welcome').removeClass(['bg--farm', 'bg--wing']);
    //         $('.welcome').addClass('bg--wild');
    //         $('.welcome__bg').removeClass(['welcome__bg--farm', 'welcome__bg--wing']);
    //         $('.welcome__bg').addClass('welcome__bg--wild');
    //     } else if (pickTheme === 'wing') {
    //         $('.welcome').removeClass(['bg--farm', 'bg--wild']);
    //         $('.welcome').addClass('bg--wing');
    //         $('.welcome__bg').removeClass(['welcome__bg--wild', 'welcome__bg--farm']);
    //         $('.welcome__bg').addClass('welcome__bg--wing');
    //     }
    // }

    // function handleConfirm() {

    //     let animals;
    //     finalChoice = pickTheme;

    //     if (finalChoice === 'farm') {
    //         animals = farmAnimals;
    //     } else if (finalChoice === 'wild') {
    //         animals = wildAnimals;
    //     } else if (finalChoice = 'wing') {
    //         animals = flyingAnimals;
    //     }

    //     nextPage(animals);
        
    //     $('.welcome').addClass('d-none');
    //     $('#drum-machine').removeClass('d-none');
    //     console.log(animals);
    // } 


    ////////////////////////////////////////////////////////////////////////////////////////////////

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

        console.log(currentKey)

        $.map(animals, function(animal, i) {
            console.log(animal.key);
            console.log(animals);
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

    // when record is "ON", remember the sounds played by clicking and list them
    function handleClick() {
        sounds.push(this.id);
        $('#list').append(`<li>${animals[this.id].animal}</li>`);
    }

    
    // when record is "ON", remember the sounds played by pressing a key and list them 
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

    // replay the sounds saved in the list starting from the last one which was played when the paused button has been clicked
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
                console.log(currentSoundDuration)
                await addDelay(currentSoundDuration);
                i++;
            
            }
        }


    }

    $('#play').on('click', playSounds);

    


    $('#pause').on('click', function() {

        // let id = $('.playing').parent().attr('id');
        // // let index = sounds.indexOf(id);
        // let index = sounds.indexOf(id);
        // console.log(`index of paused sound in sound array is: ${index} and sounds is: ${sounds}`)
        

        $('.playing')[0].pause();

        let soundsarr = [];

        if (remainingSounds.length === 0) {
            soundsarr = sounds;
        } else {
            soundsarr = remainingSounds;
        }
   

         for (let i = 0; i < soundsarr.length; i++) {
             $(`button[class|='drum']:eq(${sounds[i]})`).children().addClass('paused');
         }

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