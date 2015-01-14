Ext.define("js.jinhuo", {
    extend: "Ext.panel.Panel",
    myCode: '',
    myName: '',
    totalmoney: '',
    initComponent: function () {
        var me = this, cellEditing;
        var opername = document.getElementById("aa").value;
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
                            if (context.record.data.inStockMerName && context.record.data.num && context.record.data.price) {
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
        //供应商编码的数据源
        var suppli = Ext.create("Ext.data.Store", {
            fields: [
                {name: 'supplierId', type: "String"},
                {name: 'supplierName', type: "String"}
            ],
            proxy: {
                type: "ajax",
                url: "/supplyer/querylist",
                reader: {
                    type: "json",
                    root: "querlistmsg"
                }
            },
            autoLoad: true

        });

        //入库方式的数据源
        var instorestat = Ext.create("Ext.data.Store", {
            fields: ["name", "svalue"],
            data: [
                {"name": "正常入库", "svalue": "0"},
                {"name": "报溢入库", "svalue": "1"},
                {"name": "报损入库", "svalue": "2"}
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
                    root: 'querlistmech',//根节点
                    totalProperty: 'rows'//总数
                }
            },
            autoLoad: true
        });

        Ext.apply(this, {
            title: "进货单",
            closable:true,
            titleAlign: "center",
            width: 1011,
            border: false,
            id:"jinhuoinfoshow",
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
                            title: "入库信息",
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
                                            fieldLabel: '经手人',
                                            xtype: "textfield",
                                            columnWidth: 0.3,
                                            name: "insok.TAuOperInfoByOperId.operId",
                                            value:opername,
                                            readOnly:true

                                        },
                                        {
                                            fieldLabel: '供应商编码',
                                            xtype: "combobox",
                                            columnWidth: 0.3,
                                            editable: false,
                                            store: suppli,
                                            queryMode: 'local',
                                            displayField: 'supplierName',
                                            valueField: 'supplierId',
                                            name: "insok.TBaSupplierInfoBySupplierId.supplierId"
                                        },
                                        {
                                            fieldLabel: '入库方式',
                                            xtype: "combobox",
                                            editable: false,
                                            columnWidth: 0.3,
                                            store: instorestat,
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'svalue',
                                            name: "insok.inType"
                                        },
                                        {
                                            fieldLabel: '入库时间',
                                            xtype: "datefield",
                                            columnWidth: 0.3,
                                            name: "insok.inTime",
                                            format: "Y-m-d"
                                        },
                                        {
                                            fieldLabel: '经手人',
                                            xtype: "textfield",
                                            columnWidth: 0.3,
                                            name: "insok.handler",
                                            value:opername,
                                            readOnly:true
                                        },
                                        {
                                            fieldLabel: '入库金额',
                                            xtype: "textfield",
                                            columnWidth: 0.3,
                                            readOnly: true,
                                            id: "inStockTotalMoney",
                                            name: "insok.totalMoney",
                                            value: me.totalmoney
                                        },
                                        {
                                            fieldLabel: '备注',
                                            columnWidth: 0.3,
                                            xtype: "textarea",
                                            name: "insok.remark"
                                        }
                                    ]
                                }
                            ]
                        },
                        //子表的输入项目
                        {
                            titleAlign: "center",
                            title: "入库明细信息",
                            xtype: 'grid',
                            width: '100%',
                            height:700,
                            plugins: cellEditing,
                            store: Ext.create('Ext.data.ArrayStore', {
                                id: 'myStore',
                                data: [
                                    {}
                                ],
                                fields: [
                                    'inStockMerNameHidden', 'inStockMerName', 'num', 'price', 'total'
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
                                    text: '入库数量',
                                    editor: new Ext.form.field.Number({
                                        maxValue: 9999,
                                        minValue: 1,
                                        allowBlank: false

                                    }),
                                    dataIndex: 'num'
                                },
                                {
                                    text: '进价',
                                    dataIndex: 'price',
                                    editor: {
                                        allowBlank: false

                                    }
                                },
                                {
                                    xtype: "hidden",
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
                        var jinhuoData = '';
                        Ext.each(mydata, function (item, index) {
                            if (!item.data.total) {
                                return;
                            }
                            jinhuoData += 'jinhuoData[' + index + '].TMeMerchandiseInfoByMerchandiseId.merchandiseId=' + item.data.inStockMerNameHidden + '&jinhuoData[' + index + '].num=' + item.data.num + '&jinhuoData[' + index + '].price=' + item.data.price;
                            if (index != mydata.length - 1) {
                                jinhuoData += '&';
                            }
                        });
                        Ext.getCmp('inputinfomation').submit({

                            url: "/stocks/instoreinfomation?" + jinhuoData,
                            success: function (form, action) {
                                var mag = Ext.JSON.decode(action.response.responseText);
                                if (mag.instockquery) {
                                    url:"/main.html"
                                    //Ext.getCmp("SupplySelect").store.reload();
                                    // Ext.getCmp("supplywindow").close();
                                }

                                Ext.Msg.show({
                                    title: "系统提示",
                                    msg: mag.instockmess,
                                    icon: Ext.Msg.WARNING,
                                    buttons: Ext.Msg.YES

                                })

                            },
                            failure: function (form, action) {
                                var mag = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.show({
                                    title: "系统提示",
                                    msg: mag.instockmess,
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
})