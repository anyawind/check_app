define(['collections/checks'],function (checks) {
    const LABEL_WIDTH = 200

//    let check = checks
//    alert(check)


    let chname

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
                    let modal = $$('addchecklist_layout').getTopParentView();
                    let params = $$('addchecklist').getValues()

                    let validate = true;

                    alert(params.chname)

                    if(validate){
                        webix.ajax()
                            .headers({'Content-type': 'application/json'})
                            .post('/api/checks/newchecklist?chname='+params.chname, JSON.stringify(params))
                            .then(function(resp) {
                                webix.alert('Запись успешно сохранена')
                            })
                            .catch(function(resp) {
                                webix.alert('Не удалось выполнить сохранение')
                            })

                        setTimeout(function() {
                            modal.close();
                        }, 0)
                    }
                    else {
                        webix.message('Неверный формат данных')
                    }
                }
            },
            {
                view: 'button',
                label: 'Закрыть',
                width: 200,
                click: function () {
                    let modal = $$('addchecklist_layout').getTopParentView();
                    setTimeout(function() {
                        modal.close();
                    }, 0)
                }
            }
        ]
    }

    return formData = {
        addchecklist: function () {
            return {
                rows: [
                    {
                        id: 'addchecklist_layout',
                        view: 'scrollview',
                        body: {
                            view: 'form',
                            id: 'addchecklist',
                            elements: [
                                {view: 'select',name: 'chname', options: checks,label: 'Проверка',labelWidth: LABEL_WIDTH},
                                {view: 'textarea',name: 'nameCh',label: 'Наименование чек-листа',height: 40,labelWidth: LABEL_WIDTH},

                            ]
                        },

                    },
                    buttons
                ]
            }
        }
    }
})

