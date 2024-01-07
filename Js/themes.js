export function welcomeTheme(theme) {

    const bgImg = $('#welcomeimg');
    const bgColor = $('#welcomecolor');
    const btnChoice = $('.welcome__choiceBtn');
    const btnConfirm = $('#confirmbtn');
    const p = $('#welcomep');
    const title = $('#welcometheme');

    $('.welcome__theme').removeClass('d-none');
    $('.welcome__theme').html(`You picked <span>${theme}</span>`);

    const elements = [bgImg, bgColor, btnChoice, btnConfirm, p, title];

    $.map(elements, function(element, i) {

        element.removeClass(function(i, old) {

            const classes = old.split(" ");
            let remove = "";

            classes.filter(function(name) {
                name.includes('--') && (remove += ` ${name}`);
            })

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
        }
    })
}

export function machineTheme(theme) {

    const title = $('ins');
    const background = $('.machine');
    const display = $('.machine__display');
    const pads = $('.drum-pad');
    const controls = $('.machine__controls, .machine__controls button');
    const btn = $('.machine__home');

    const elements = [title, background, display, pads, controls, btn];

    $.map(elements, function(element, i) {

            element.removeClass(function(i, old) {

                const classes = old.split(" ");
                let remove = "";
    
                classes.filter(function(name) {
                    name.includes('--') && (remove += ` ${name}`);
                })

                return remove;
            })

        switch (i) {
            case 0:
            theme === 'wild' ? element.text('Grr') : theme === 'farm' ? element.text('Moo') : element.text('Piou');
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
            case 5:
            element.addClass(`machine__home--${theme}`);
            break;
        }

    })

}