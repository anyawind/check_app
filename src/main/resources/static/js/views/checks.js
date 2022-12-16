define([],
    function() {
        webix.i18n.setLocale('ru-RU')

        function view_section(title){
            return {
                view: 'template',
                type: 'header',
                template: title
            }
        }

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
                                                        id: 'searchChecklist',
                                                        view: 'button',
                                                        label: 'Найти',
                                                        width: 100,
                                                        css: 'webix_primary',
                                                        on: {
                                                            onItemClick: function () {
                                                                webix.ajax()
                                                                    .headers({'Content-type': 'application/json'})
                                                                    .get('api/checks/getchecklist?id=' + window.globalVar)
                                                                    .then(function (resp) {
                                                                        $$('checklist').clearAll()
                                                                        $$('checklist').parse(resp.json())
                                                                    })
                                                                    .catch(function () {
                                                                        webix.message('error', 'error')
                                                                    })
                                                            }
                                                        }
                                                    },
                                                    {width: 10},
                                                    {
                                                        id: 'addChecklist',
                                                        view: 'button',
                                                        label: 'Добавить',
                                                        width: 100,
                                                        css: 'webix_primary',
                                                        on: {
                                                            onItemClick: function () {
                                                                require(['views/checks/addchecklist'], function (addchecklist) {
                                                                    let newQueryWin = webix.ui({
                                                                        view: 'window',
                                                                        id: 'newQueryWin',
                                                                        head: {
                                                                            view: 'toolbar',
                                                                            elements: [
                                                                                {
                                                                                    view: 'label',
                                                                                    label: 'Создание чек-листа'
                                                                                },
                                                                                {
                                                                                    view: 'icon', icon: 'wxi-close',
                                                                                    click: function () {
                                                                                        $$('newQueryWin').close()
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        width: 600,
                                                                        height: 300,
                                                                        position: 'center',
                                                                        modal: true,
                                                                        body: addchecklist.addchecklist(true)
                                                                        ,
                                                                    });
                                                                    newQueryWin.show()
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
                                        template: '<b>Чек-лист</b>',
                                        borderless: true
                                    },
                                    {
                                        view: 'datatable',
                                        editable: true,
                                        select: true,
                                        multiselect: true,
                                        resizeColumn: true,
                                        scroll: true,
                                        pager: 'checklistPager',
                                        id: 'checklist',
                                        columns: [
                                            {id: 'index', header: '#', sort: 'int'},
                                            {id: 'nameCh', header: 'Наименование', sort: 'text', adjust: true},
                                            {id: 'result', header: 'Результат проверки', adjust: true,
                                                template: function(obj, common, value){
                                                    switch (value) {
                                                        case 0: return "В процессе";
                                                        case 1: return "Не соответсвует";
                                                        case 2: return "Соответствует";
                                                        default: return "В процессе";
                                                    }
                                                },
                                            },
                                            {id: 'comment', header: 'Коментарий', sort: 'text', adjust: true},
                                        ],
                                        scheme: {
                                            $init: function (obj) {
                                                if (obj) {
                                                    obj.index = this.count()
                                                }
                                            },
                                        },
                                        on: {
                                            onAfterLoad: function () {
                                                this.hideOverlay();
                                            },
                                            onItemDblClick: function (id) {
                                                let rowdata = this.getItem(id)
                                                require(['views/checks/itemchecklist'], function(itemchecklist) {
                                                    let newQueryWin = webix.ui({
                                                        view: 'window',
                                                        id: 'newQueryWin',
                                                        head: {
                                                            view: 'toolbar',
                                                            elements: [
                                                                { view: 'label', label: 'Редактирование' },
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
                                                        body: itemchecklist.itemchecklist()
                                                        ,
                                                    });
                                                    $$('itemchecklist').setValues(rowdata)
                                                    newQueryWin.show()
                                                })
                                            },
                                            onBeforeLoad: function () {
                                                this.hideOverlay();
                                            },
                                        },
                                    },
                                    {
                                        cols: [
                                            {
                                                id: 'checklistPager',
                                                view: 'pager',
                                                size: 30,
                                                group: 5,
                                                template: '{common.first()}{common.prev()}{common.pages()}{common.next()}{common.last()}'
                                            },
                                            {
                                                id: 'count_label_checklist',
                                                view: 'label',
                                                align: 'left',
                                                label: ''
                                            },
                                            {},
                                            {
                                                view: "button", label: "Сохранить (csv)", width: 150,
                                                click: function () {
                                                    webix.csv.delimiter.cols = ";";
                                                    webix.toCSV($$("checklist"));
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