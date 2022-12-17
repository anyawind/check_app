define([],
    function() {

    webix.i18n.setLocale('ru-RU')

        webix.ajax()
            .get('api/checks/')
            .then(function (resp) {
                $$('checks').clearAll()
                $$('checks').parse(resp.json())
            })
            .catch(function () {
                webix.message('error', 'error')
            })

    return {
        rows: [
            {
                template: "1",
                body: {
                    rows: [
                        {
                            view: 'toolbar',
                            height: 60,
                            elements: [
                                {
                                    view: 'flexlayout',
                                    cols: [
                                        {width: 2},
                                        {
                                            height: 35,
                                            cols: [
                                                {width: 10},
                                                {
                                                    id: 'addBtn',
                                                    view: 'button',
                                                    label: 'Добавить',
                                                    width: 100,
                                                    css: 'webix_primary',
                                                    on: {
                                                        onItemClick: function () {
                                                            require(['views/checks/addcheck'], function(addcheck) {
                                                                let newQueryWin = webix.ui({
                                                                    view: 'window',
                                                                    id: 'newQueryWin',
                                                                    head: {
                                                                        view: 'toolbar',
                                                                        elements: [
                                                                            { view: 'label', label: 'Создание проверки' },
                                                                            { view: 'icon', icon: 'wxi-close',
                                                                                click: function () {
                                                                                    $$('newQueryWin').close()
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    width: 600,
                                                                    height: 400,
                                                                    position: 'center',
                                                                    modal: true,
                                                                    body: addcheck.addcheck(true)
                                                                    ,
                                                                });
                                                                newQueryWin.show()
                                                            })
                                                        }
                                                    }
                                                },
                                            ]
                                        },
                                        {width: 2},
                                        {
                                            height: 35,
                                            cols: [
                                                {width: 10},
                                                {
                                                    id: 'searchBtn',
                                                    view: 'button',
                                                    label: 'Найти',
                                                    hidden: true,
                                                    width: 80,
                                                    css: 'webix_primary',
                                                    on: {
                                                        onItemClick: function () {
                                                            webix.ajax()
                                                                .get('api/checks/')
                                                                .then(function (resp) {
                                                                    $$('checks').clearAll()
                                                                    $$('checks').parse(resp.json())
                                                                })
                                                                .catch(function () {
                                                                    webix.message('error', 'error')
                                                                })
                                                        }
                                                    }
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                }
            },
            {
                height: 400,
                template: "2",
                body: {
                    cols: [
                        {
                            rows: [
                                {
                                    view: 'template',
                                    height: 30,
                                    template: '<b>Список проверок</b>',
                                    borderless: true
                                },
                                {
                                    view: 'datatable',
                                    editable: true,
                                    select: true,
                                    multiselect: true,
                                    resizeColumn: true,
                                    scroll: true,
                                    pager: 'checksPager',
                                    id: 'checks',
                                    columns: [
                                        {id: 'index', header: '#', sort: 'int', adjust: 'header'},
                                        {id: 'nameCh', header: 'Наименование',sort: 'text', adjust: true},
                                        {id: 'fio', header: 'ФИО проверяющего',sort: 'text', adjust: true},
                                        {id: 'nameobj', header: 'Наименование обьекта',sort: 'text', adjust: true},
                                        {id: 'address', header: 'Адрес объекта',sort: 'text', adjust: true},
                                        {id:'status', header: 'Статус', adjust: true,
                                            template: function(obj, common, value){
                                                switch (value) {
                                                    case 0: return "В процессе";
                                                    case 1: return "Завершена";
                                                    default: return "В процессе";
                                                }
                                            },
                                        },
                                        {id: 'number', header: 'Номер', sort: 'int'},
                                    ],
                            //        url: 'proxy->api/checks/',
                                    scheme: {
                                        $init: function (obj) {
                                            if (obj) {
                                                obj.index = this.count()
                                            }
                                        },
                                    },
                                    on: {
                                        onItemDblClick: function(id) {
                                            let rowdata = this.getItem(id)
                                            window.globalVar = rowdata
                                            routie('checks')
                                        },
                                        onBeforeLoad: function () {
                                            this.hideOverlay();
                                        },
                                    },
                                },
                                {
                                    cols: [
                                        {
                                            id: 'checksPager',
                                            view: 'pager',
                                            size: 30,
                                            group: 5,
                                            template: '{common.first()}{common.prev()}{common.pages()}{common.next()}{common.last()}'
                                        },
                                        {
                                            id: 'count_label_checks',
                                            view: 'label',
                                            align: 'left',
                                            label: ''
                                        },
                                        {},
                                        {
                                            view: "button", label: "Сохранить (csv)", width: 150,
                                            click:function(){
                                                webix.csv.delimiter.cols = ";";
                                                webix.toCSV($$("checks"));
                                            }
                                        }
                                    ]
                                },
                            ]

                        },
                    ]
                }
            },
        ]
    }
})