function startApp() {

    loadData();

    attachListeners();

    showCurrentPage(1);

}

function loadData() {

    const success = snacks => displayPage(snacks);

    const failure = error => console.error(error);

    // Hmm, this is hard coded to 'snacks.json' but I want to show 'healthy.json' data sometimes
    $.get('data/snacks.json', 'json')
        .then(success)
        .catch(failure);
}

function displayPage(snacks) {

    const template = $('#snack-template').html()

    const render = Handlebars.compile(template);

    snacks.forEach(snack => {

        const newSnack = render(snack);

        $('.snacks').append(newSnack);

    });

}


function attachListeners() {

    // snack type radio buttons
    $('input').on('change', event => {
        const $choice = $(event.target);
        const type = $choice.val();

        if (type === 'all') {

            $('.snack').show();

        } else if (type === 'savory') {

            $('.snack').hide();

            $('.snack[data-type="savory"]').show();

        } else {

            $('.snack').hide();

            $('.snack[data-type="sweet"]').show();
        }

    });

    // pages
    $('nav li').on('click', event => {
        const pageNum = $(event.target).attr('data-page');

        showCurrentPage(pageNum);
    });
}

function showCurrentPage(pageNum) {
    $('.page').hide();

    if (parseInt(pageNum) === 1) {
        // show page 1 stuff
        $('.page-1-stuff').show();

    } else {
        // page 2 stuff
        $('.page-2-stuff').show();
    }
}

$(startApp);