export function handleTheme(theme) {

    $('.welcome__theme').removeClass('d-none');
    $('.welcome__theme').html(`You picked <span>${theme}</span>`);

    const bgImg = $('#welcomeimg');
    const bgColor = $('#welcomecolor');
    const btnChoice = $('#choicebtn button');
    const btnConfirm = $('#confirmbtn');
    const p = $('#welcomep');
    const title = $('#welcometheme');

    const elements = [bgImg, bgColor, btnChoice, btnConfirm, p, title];

    $.map(elements, function(element, i) {

        element.removeClass(function(i, old) {

            const classes = old.split(" ");
            let remove = "";

            classes.filter(function(name) {
                // console.log(name.includes('--'));
                name.includes('--') && (remove += ` ${name}`);
            })

            // console.log(remove)
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
            case 4: 
            element.addClass(`welcome__paragraph--${theme}`);
            break;
            case 5:
            element.addClass(`welcome__theme--${theme}`);
            break;
            default:
            element.addClass(`welcome__default`);
        }
    })
}

export function machineTheme(theme) {

    const title = $('ins');
    const background = $('.machine');
    const display = $('.machine__display');
    const pads = $('.drum-pad');
    const controls = $('.machine__controls, .machine__controls button')

    const elements = [title, background, display, pads, controls];

    $.map(elements, function(element, i) {

            element.removeClass(function(i, old) {

                const classes = old.split(" ");
                let remove = "";
    
                classes.filter(function(name) {
                    // console.log(name.includes('--'));
                    name.includes('--') && (remove += ` ${name}`);
                })
    
                // console.log(remove)
                return remove;
            })

        switch (i) {
            case 0:
            theme === 'wild' ? element.text('Grr') : theme === farm ? element.text('Moo') : element.text('Cui');
            element.addClass(`machine__title--${theme}`);
            break;
            case 1:
            element.addClass(`machine--${theme}`);
            break;
            case 2:
            element.addClass(`machine__display--${theme}`);
            break;
            case 3:
            element.addClass(`drum-pad--${theme}`);
            break;
            case 4:
            element.addClass(`machine__controls--${theme}`);
            break;
        }

        

    })


}