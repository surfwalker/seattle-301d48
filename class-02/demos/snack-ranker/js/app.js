function startApp() {

    attachListeners();

    loadData();
}

function loadData() {

    $.get('data/snacks.json', 'json').then(response => {

        displaySnacks(response);
  
    }).catch(error => console.error(error));
}

function displaySnacks(snacks) {
    snacks.forEach(snack => {
        const $clone = $('.snack-template').clone();
        $clone.find('h2').html(snack.name);
        $clone.find('h3').html(snack.rank);
        $clone.find('h3').hide();
        $clone.find('p').html(snack.type);
        $clone.find('p').hide();
        $clone.attr('data-type', snack.type);
        $clone.removeClass('snack-template');
        $('.snacks').append($clone);
    });
}

function attachListeners() {
    $('input').on('change', event => {
        $choice = $(event.target);
        const type = $choice.val();

        if (type == 'all') {
            $('li').not('.snack-template').show();
        } else {
            $('li').hide();
            $(`li[data-type="${type}"]`).show();
        }
    });

    $('.snacks').on('click', '.snack', event => {
        $snack = $(event.currentTarget);
        alert('Rank: ' + $snack.find('h3').html())
    });
}

$(startApp);