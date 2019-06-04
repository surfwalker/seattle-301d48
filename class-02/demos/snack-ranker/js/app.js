function loadData() {
    $.get('data/snacks.json', 'json').then(response => {

        displaySnacks(response);
        
        attachListeners();

    }).catch(error => console.error(error));
}

function displaySnacks(snacks) {
    snacks.forEach(snack => {
        const $clone = $('.snack-template').clone();
        $clone.find('h2').html(snack.name);
        $clone.find('h3').html(snack.rank);
        $clone.find('p').html(snack.type);
        $clone.removeClass('snack-template');
        $('.snacks').append($clone);
    });
}

function attachListeners() {
    $('input').on('change', event => {
        alert('change ' + event.target.value);
    });
}

$(loadData);