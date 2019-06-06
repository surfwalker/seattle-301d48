$(startApp);

function startApp() {

    showPage(1);

    addEventListeners();
}

function addCandies(candyInfos) {

    const template = $('#candybar-template').html();

    const render = Handlebars.compile(template);

    candyElements = [];

    candyInfos.forEach(candyInfo => {
        candyElements.push(render(candyInfo));
    });


    $('#candies td').remove();

    $('#candies').append(candyElements);
}

function addEventListeners() {

    $('nav li').on('click', event => {

        const pageNum = $(event.target).data('page');

        showPage(pageNum);

    });
}

function showPage(pageNum) {

    let dataName;

    if (pageNum === 1) {
        dataName = 'candies.json';
    } else {
        dataName = 'chips.json';
    }

    $.get(dataName, 'json')
        .then(addCandies)
        .catch(error => console.error(error));
}