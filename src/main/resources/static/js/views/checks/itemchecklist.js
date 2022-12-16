define([],function () {
    const LABEL_WIDTH = 200

    let checkedOptions = [
        {id:0, value:"В процессе" },
        {id:1, value:"Не соответсвует" },
        {id:2, value:"Соответствует" }
    ]

    let buttons = {
        cols: [
            {},
            {
                id: 'save_btn',
                view: 'button',
                label: 'Сохранить',
                css: 'webix_primary',
                width: 200,
                click: function () {
                    let modal = $$('itemchecklist_layout').getTopParentView();
                    let params = $$('itemchecklist').getValues()

                webix.confirm('Вы уверены, что хотите внести изменения?')
                    .then(() => {
                    webix.ajax()
                        .headers({'Content-type': 'application/json'})
                        .post('/api/checks/' + params.id, JSON.stringify(params))
                        .then(function(resp) {
                            webix.alert('Запись успешно сохранена')
                            $$('checklist').data.pull[params.id] = params
                            $$('checklist').refresh()
                        })
                        .catch(function(resp) {
                            webix.alert('Не удалось выполнить сохранение')
                        })
                    })
                    setTimeout(function() {
                        modal.close();
                    }, 0)
                }
            },
            {
                view: 'button',
                label: 'Закрыть',
                width: 200,
                click: function () {
                    let modal = $$('itemchecklist_layout').getTopParentView();
                    setTimeout(function() {
                        modal.close();
                    }, 0)
                }
            }
        ]
    }

    return formData = {
        itemchecklist: function (a) {
            return {
                rows: [
                    {
                        id: 'itemchecklist_layout',
                        view: 'scrollview',
                        body: {
                            view: 'form',
                            id: 'itemchecklist',
                            elements: [
                                {view: 'select',name: 'status',label: 'Обработано',labelWidth: LABEL_WIDTH, options: checkedOptions},
                                {view: 'textarea',name: 'comment',label: 'Комментарий',height: 140,labelWidth: LABEL_WIDTH},
                            ]
                        },
                    },
                    buttons
                ]
            }
        }
    }
})