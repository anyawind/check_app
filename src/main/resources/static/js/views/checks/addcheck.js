define([],function () {
    const LABEL_WIDTH = 200

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
                    let modal = $$('addcheck_layout').getTopParentView();
                    let params = $$('addcheck').getValues()
                    let validate = true;

                    if(params.nameCh === '' || params.fio === '' || params.address === ''||
                        params.number === '' || params.nameobj === '') {
                        validate = false
                    }

                    if(validate){
                        webix.ajax()
                            .headers({'Content-type': 'application/json'})
                            .post('/api/checks/new', JSON.stringify(params))
                            .then(function(resp) {
                                webix.alert('Запись успешно сохранена')
                                $$('searchBtn').callEvent('onItemClick')
                            })
                            .catch(function(resp) {
                                webix.alert('Не удалось выполнить сохранение')
                            })

                        setTimeout(function() {
                            modal.close();
                        }, 0)
                    }
                    else {
                        webix.message('Все поля должны быть заполнены')
                    }
                }
            },
            {
                view: 'button',
                label: 'Закрыть',
                width: 200,
                click: function () {
                    let modal = $$('addcheck_layout').getTopParentView();
                    setTimeout(function() {
                        modal.close();
                    }, 0)
                }
            }
        ]
    }

    return formData = {
        addcheck: function () {
            return {
                rows: [
                    {
                        id: 'addcheck_layout',
                        view: 'scrollview',
                        body: {
                            view: 'form',
                            id: 'addcheck',
                            elements: [
                                {view: 'textarea',name: 'nameCh',label: 'Наименование проверки',height: 40,labelWidth: LABEL_WIDTH},
                                {view: 'textarea',name: 'fio',label: 'ФИО',height: 40,labelWidth: LABEL_WIDTH},
                                {view: 'textarea',name: 'address',label: 'Адрес',height: 40,labelWidth: LABEL_WIDTH},
                                {view: 'textarea',name: 'number',label: 'Номер',height: 40,labelWidth: LABEL_WIDTH},
                                {view: 'textarea',name: 'nameobj',label: 'Наименование объекта',height: 40,labelWidth: LABEL_WIDTH},
                            ]
                        },
                    },
                    buttons
                ]
            }
        }
    }
})