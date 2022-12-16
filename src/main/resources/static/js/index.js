requirejs.config({
    baseUrl: 'js'
})


function buildRoute(view) {
    return function() {
        webix.ui({
            id: 'root',
            rows: [
                view
            ]
        }, $$('root'))
        $$('searchChecklist').callEvent('onItemClick')
        $$('searchBtn').callEvent('onItemClick')
    }
}

function buildButton(label, route) {
    return {
        view: 'button',
        value: label,
        width: 100,
        align: 'center',
        click: function() {
            routie(route)
        }
    }
}

require(
    [
        'views/main',
        'views/checks',
        'util/resourceProxy',
    ],
    function(main,checks, resourceProxy) {
    webix.ready(function() {
        webix.ui({
            container: 'app',
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            rows: [
                {
                    view: 'toolbar',
                    cols: [
                        buildButton('Home', ''),
                    ]
                },
                {
                    id: 'root'
                }
            ]
        })
    })

    routie({
        '': buildRoute(main),
        'checks': buildRoute(checks)
    })
})
