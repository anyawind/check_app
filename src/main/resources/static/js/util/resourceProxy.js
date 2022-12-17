define(function() {
    var ajax = webix.ajax().headers({
        'Content-type': 'application/json'
    })

    webix.proxy.proxy = {
        init: function() {
            webix.extend(this, webix.proxy.rest)
        },
        load: function(view, params) {
            let url = view.config.url.source
            return ajax.get(url)
        },
    }
})
