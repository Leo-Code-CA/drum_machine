$(document).ready(function() {

    $(window).on('resize', handleResize);

    function handleResize() {
        let width = $(window).width();
        let height = $(window).height();

        // width > height ? console.log('width is bigger than height') : console.log('height is bigger than width');
        width > height ? $('.machine--wild').addClass('.machine--wild--horizontal') : console.log('width smaller than height');
    }
    
})

// no need

