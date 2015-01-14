Ext.define("js.OutStockInfo",{
    extend:"Ext.panel.Panel",
    extend: "Ext.panel.Panel",
    myCode: '',
    myName: '',
    totalmoney: '',//这里面定义的是全局变量在什么地方都可以被调用
    initComponent: function () {
        var me = this, cellEditing;
        cellEditing = new Ext.grid.plugin.CellEditing(
            {
                clicksToEdit: 1,
                listeners: {
                    edit: function (editor, context) {
                        if (context.value) {
                            var myStore = Ext.data.StoreManager.lookup('myStore');
                            if (context.field === 'inStockMerName') {
                                context.record.data.inStockMerNameHidden = me.myCode;
                                context.record.data.inStockMerName = me.myName;
                                myStore.remove(context.record);
                                myStore.insert(context.rowIdx, context.record);
                            }
                            if (context.field === "num") {
                                if (context.record.data.price) {
                                    context.record.data.total = context.record.data.price * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if (context.field === "price") {
                                if (context.record.data.num) {
                                    context.record.data.total = context.record.data.num * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if (context.record.data.inStockMerName && context.record.data.num && context.record.data.price&&context.record.data.stockPrice) {
                                myStore.add({});
                            }

                            //计算入库时的总金额
                            me.totalmoney = 0;
                            for (var i = 0; i < myStore.data.items.length; i++) {
                                if (!isNaN(myStore.data.items[i].data.total) && myStore.data.items[i].data.total != "") {
                                    me.totalmoney += myStore.data.items[i].data.total;
                                }
                            }
                            Ext.getCmp('inStockTotalMoney').setValue(me.totalmoney);
                        }
                    }
                }
            }
        );
        // 出库方式的数据源
        var instorestat = Ext.create("Ext.data.Store", {
            fields: ["name", "svalue"],
            data: [
                {"name": "正常出库", "svalue": "0"},
                {"name": "报溢出库", "svalue": "1"},
                {"name": "报损出库", "svalue": "2"}
            ]
        })

        //获取商品号的数据源
        var merchlist = Ext.create("Ext.data.Store", {
            fields: [
                {name: 'id', type: "Integer"},
                {name: 'merchandiseId', type: "String"},
                {name: 'proStatusName', type: "String"},
                {name: 'merchandiseCName', type: "String"},
                {name: 'merchandiseName', type: "String"}
            ],
            proxy: {
                type: 'ajax',
                url: "/goodsinfo/merchanquerylist",
                reader: {
                    type: 'json',
                    root: 'querlistmech'
                }
            },
            autoLoad: true
        });
        //获取操作员信息的数据源
        var operinfomation=Ext.create("Ext.data.Store",{
            autoLoad: true,
            fields:["operName","operId"],
            proxy:{
                type:"ajax",
                url:"/oper/operinfolist",
                reader:{
                    type:"json",
                    root:"operlist"
                }
            }
        });

        Ext.apply(this, {
            title: "出库单",
            titleAlign: "center",
            width: 1011,
            id:"outstockinfoshowlist",
            border: false,
            closable:true,
            items: [
                {
                    xtype: "form",
                    layout: "vbox",
                    border: false,
                    id: "inputinfomation",
                    items: [
                        {
                            xtype: 'panel',
                            titleAlign: "center",
                            title: "出库信息",
                            width: 1011,
                            height: 225,
                            border: false,
                            items: [
                                {
                                    layout: "column",

                                    defaults: {
                                        border: "false",
                                        padding: "5 5 5 5",
                                        labelAlign: "right",
                                        width: 100
                                    },
                                    //主表的输入项
                                    items: [
                                        {
                                            fieldLabel: '操作员编码',
                                            xtype: "textfield",
                                            columnWidth: 0.3,
                                            name: "outstock.TAuOperInfoByOperId.operId",
                                            xtype:"combobox",
                                            displayField:"operName",
                                            valueField:"operId",
                                            store:operinfomation,
                                            queryMode:"local",
                                            editable:false
                                        },
                                        {
                                            fieldLabel: '出库方式',
                                            xtype: "combobox",
                                            editable: false,
                                            columnWidth: 0.3,
                                            store: instorestat,
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'svalue',
                                            name: "outstock.outType"
                                        },
                                        {
                                            fieldLabel: '出库时间',
                                            xtype: "datefield",
                                            columnWidth: 0.3,
                                            name: "outstock.outTime",
                                            format: "Y-m-d"
                                        },
                                        {
                                            fieldLabel: '经手人',
                                            xtype: "textfield",
                                            columnWidth: 0.3,
                                            name: "outstock.handler"
                                        },
                                        {
                                            fieldLabel: '出库金额',
                                            xtype: "textfield",
                                            columnWidth: 0.3,
                                            readOnly: true,
                                            id: "inStockTotalMoney",
                                            name: "outstock.totalMoney",
                                            value: me.totalmoney
                                        },
                                        {
                                            fieldLabel: '备注',
                                            xtype: "textarea",
                                            columnWidth: 0.3,
                                            name: "outstock.remark"
                                        }
                                    ]
                                }
                            ]
                        },
                        //子表的输入项目
                        {
                            titleAlign: "center",
                            title: "出库明细信息",
                            xtype: 'grid',
                            width: '100%',
                            plugins: cellEditing,
                            store: Ext.create('Ext.data.ArrayStore', {
                                id: 'myStore',
                                data: [
                                    {}
                                ],
                                fields: [
                                    'inStockMerNameHidden', 'inStockMerName', 'num', 'price',"stockPrice", 'total'
                                ]
                            }),
                            columns: [

                                {
                                    hidden: true,
                                    dataIndex: 'inStockMerNameHidden'

                                },
                                {
                                    text: '商品名称',
                                    dataIndex: 'inStockMerName',
                                    editor: {
                                        xtype: 'combobox',
                                        displayField: 'merchandiseName',
                                        valueField: 'merchandiseId',
                                        allowBlank: false,
                                        store: merchlist,
                                        listeners: {
                                            select: function (combo, records) {
                                                me.myCode = this.value;
                                                me.myName = records[0].data.merchandiseName;
                                            }
                                        }

                                    },
                                    dataIndex: 'inStockMerName'
                                },
                                {
                                    text: '出库数量',
                                    editor: new Ext.form.field.Number({
                                        maxValue: 9999,
                                        minValue: 1,
                                        allowBlank: false

                                    }),
                                    dataIndex: 'num'
                                },
                                {
                                    text: '单价',
                                    dataIndex: 'price',
                                    editor: {
                                        allowBlank: false

                                    }
                                },
                                {
                                    text: '出库时的成本单',
                                    width:120,
                                    dataIndex: 'stockPrice',
                                    editor: {
                                        allowBlank: false

                                    }
                                },
                                {
                                    xtype:"hidden",
                                    text: '总价',
                                    dataIndex: 'total'

                                }
                            ]}
                    ]
                }
            ],

            //总体的提交事件
            buttonAlign: "center",
            buttons: [
                {
                    text: "提交",
                    handler: function () {
                        var mydata = Ext.data.StoreManager.lookup('myStore').data.items;
                        var chukuData = '';
                        Ext.each(mydata, function (item, index) {
                            if (!item.data.total) {
                                return;
                            }
                            chukuData += 'chukuData[' + index + '].TMeMerchandiseInfoByMerchandiseId.merchandiseId=' + item.data.inStockMerNameHidden + '&chukuData[' + index + '].num=' + item.data.num + '&chukuData[' + index + '].price=' + item.data.price + '&chukuData[' + index + '].stockPrice=' + item.data.stockPrice ;
                            if (index != mydata.length - 1) {
                                chukuData += '&';
                            }
                        });
                        Ext.getCmp('inputinfomation').submit({

                            url: "/outstock/outstockinsertlist?" + chukuData,
                            success: function (form, action) {
                                var mag = Ext.JSON.decode(action.response.responseText);
                                if (mag.uotsttockquery) {
                                    url:"/main.html"
                                    //Ext.getCmp("SupplySelect").store.reload();
                                    // Ext.getCmp("supplywindow").close();
                                }

                                Ext.Msg.show({
                                    title: "系统提示",
                                    msg: mag.outstockmessage,
                                    icon: Ext.Msg.WARNING,
                                    buttons: Ext.Msg.YES

                                })

                            },
                            failure: function (form, action) {
                                var mag = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.show({
                                    title: "系统提示",
                                    msg: mag.outstockmessage,
                                    icon: Ext.Msg.WARNING,
                                    buttons: Ext.Msg.YES
                                });
                            }
                        });

                    }
                },
                {
                    text: "重置",
                    handler: function () {
                        this.up("form").getForm().reset();
                    }
                }

            ]
        })
        this.callParent()
    }
});
