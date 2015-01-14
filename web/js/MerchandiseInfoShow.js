Ext.define('js.MerchandiseInfoShow', {
    extend: "Ext.grid.Panel",
    initComponent: function () {
        var me = this;
        var store = Ext.create("Ext.data.Store", {
                id: "mestore",
                pageSize:3,
                proxy: {
                    type: 'ajax',
                    url: "/goodsinfo/merchanquerylist",
                    reader: {
                        type: 'json',
                        root: 'querlistmech',//根节点
                        totalProperty: 'rows'//总数
                    }
                },
                fields: [
                    {name: 'id', type: "Integer"},
                    {name: 'merchandiseId', type: "String"},
                    {name: 'proStatusName', type: "String"},
                    {name: 'merchandiseCName', type: "String"},
                    {name: 'merchandiseName', type: "String"},
                    {name: 'merchandiseAb', type: "String"},
                    {name: 'saleStatus', type: "String"},
                    {name: 'price', type: "String"},
                    {name: 'describe', type: "String"},
                    {name: 'spec', type: "Intger"},
                    {name: 'picPath', type: "String"},
                    {name: 'TMeUnitInfoByUnitId.name', type: "String"},
                    {name: 'TMeProStatusInfoByProStatusId.proStatusName', type: "Intger"},
                    {name: 'TMeMerchandiseCInfoByMerchandiseCid.merchandiseCName', type: "String"}
                ],
                autoLoad: false
            }
        );
        store.load({
            params: {
                start: 0,
                limit:3
            }
        });
        Ext.apply(this, {
            closable:true,
            id: "findcode",
            title: '商品信息',
            titleAlign:"center",
            store: store,
            columns: [
                { header: '商品id',  dataIndex: 'id' },
                { header: '商品编码',  dataIndex: 'merchandiseId' },
                { header: ' 单位', dataIndex: 'TMeUnitInfoByUnitId.name' },
                { header: '促销状态', dataIndex: 'TMeProStatusInfoByProStatusId.proStatusName' },
                { header: '商品类别', dataIndex: 'TMeMerchandiseCInfoByMerchandiseCid.merchandiseCName' },
                { header: '商品名称', dataIndex: 'merchandiseName'},
                { header: '商品助记码', dataIndex: 'merchandiseAb' },
                { header: '商品价格',  dataIndex: 'price' },
                { header: '销售状态', dataIndex: 'saleStatus'},
                { header: '商品描述',  dataIndex: 'describe' },
                { header: '购入数量',  dataIndex: 'spec' },
                { header: '图片', dataIndex: 'picPath' }

            ],
            width:1002,
            height: 300,
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: store,
                    dock: 'bottom',
                    displayInfo: true
                }
            ],
           buttonAlign:"left",
            buttons:[
                {text:"增加商品",
                    handler:function(){
                        me.insertmerch(me)
                    }
                },
                {text:"删除商品",
                handler:function(){
                    me.delectsupply(me)
                }
                },
                {text:"修改商品信息",
                handler:function(){
                    me.updatemerch(me)
                }}
            ]
        });
        this.callParent();
    },

    //删除供应商信息
    delectsupply:function(del){
        var recode=Ext.getCmp("findcode").getSelectionModel().getSelection()[0];
        if(recode==null){
            Ext.Msg.alert("信息提示","请选择要删除的供应商的信息")
        }else{
            Ext.create("Ext.window.Window",{
                    title:"供应商信息管理",
                    titleAlign:"center",
                    layout:"form",
                    frame: true,
                    bodyPadding:5,
                    width:350,
                    items:[
                        {
                            xtype: 'form',
                            defaults: {
                                xtype: 'textfield',
                                labelWidth:100,
                                labelAlign: 'right'
                            },
                            items: [
                                {
                                    fieldLabel:"商品编码",
                                    name:"merchdel.merchandiseId",
                                    value:recode.get("merchandiseId")

                                },
                                {
                                    fieldLabel:"商品名称",
                                    name:"merchdel.merchandiseName",
                                    value:recode.get("merchandiseName")
                                }
                            ]
                        }],
                    buttonAlign:"center",
                    buttons: [
                        { text: "删除",
                            handler:del.delservice
                        }
                    ]

                }
            ).show()};
    },
    //删除的提交
    delservice:function(){
        var form = this.up("window").down("form").getForm();
        if(form.isValid()){
            form.submit({
                url :"/goodsinfo/merchdelect",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if(msg.querydel){
                        Ext.Msg.show({
                            title : "系统提示",
                            msg : msg.messdel,
                            icon : Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES
                        })
                    }
                    Ext.Msg.show({
                        title : "系统提示",
                        msg : msg.messdel,
                        icon : Ext.Msg.WARNING,
                        buttons : Ext.Msg.YES
                    })
                },
                failure : function(form,action) {
                    var mag = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: mag.messdel,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                }
            });
        }
    },
   // 修改信息
    updatemerch:function(upda){
        //数据源
        var merchname = Ext.create('Ext.data.Store', {
            fields: ["merchandiseCName","merchandiseCid"],
            proxy: {
                url:"/goodsinfo/listinfo",
                type:"ajax",
                reader: {
                    type: 'json',
                    root: "listmerchinfo"
                }
            },
            autoLoad: true
        });
        var  danwei= Ext.create('Ext.data.Store', {
            fields: ["unitId","name"],
            proxy: {
                url:"/goodsinfo/UnitInfo",
                type:"ajax",
                reader: {
                    type: 'json',
                    root: "listUnitInfo"
                }
            },
            autoLoad: true
        });
        var  ststusinfo= Ext.create('Ext.data.Store', {
            fields: ["proStatusName","proStatusId"],
            proxy: {
                url:"/goodsinfo/Slistinfo",
                type:"ajax",
                reader: {
                    type: 'json',
                    root: "listinfo"
                }
            },
            autoLoad: true
        });

        var recodedel=Ext.getCmp("findcode").getSelectionModel().getSelection()[0];

        if(recodedel==null){
            Ext.Msg.alert("信息提示","请选择要修改的信息")
        }else{
            Ext.create("Ext.window.Window",{
                title:"商品信息管理",
                titleAlign:"center",
                layout:"form",
                frame: true,
                bodyPadding:5,
                width:350,
                id:"sssclose",
                items: [
                    {
                        defaults: {
                            xtype: 'textfield',
                            labelWidth:100,
                            labelAlign: 'right'
                        },
                        xtype:'form',
                        items:[
                            {
                                fieldLabel:"商品编码",
                                name:"upstatuinfo.merchandiseId",
                                value:recodedel.get("merchandiseId"),
                                readOnly:true
                            },
                            {
                                fieldLabel:"计量单位",
                                xtype:"combobox",
                                store: danwei,
                                queryMode:'local',
                                displayField:"name",
                                valueField:"unitId",
                                name:"upstatuinfo.TMeUnitInfoByUnitId.unitId",
                                value:recodedel.get("TMeUnitInfoByUnitId.unitId")
                            },
                            {
                                fieldLabel:"是否促销",
                                xtype:"combobox",
                                store: ststusinfo,
                                queryMode:'local',
                                displayField:"proStatusName",
                                valueField:"proStatusId",
                                name:"upstatuinfo.TMeProStatusInfoByProStatusId.proStatusId",
                                value:recodedel.get("TMeProStatusInfoByProStatusId.proStatusId")
                            },
                            {
                                fieldLabel:"商品类别",
                                xtype:"combobox",
                                store: merchname,
                                queryMode:'local',
                                displayField:"merchandiseCName",
                                valueField:"merchandiseCid",
                                name:"upstatuinfo.TMeMerchandiseCInfoByMerchandiseCid.merchandiseCid",
                                value:recodedel.get("TMeMerchandiseCInfoByMerchandiseCid.merchandiseCid")
                            },
                            {
                                fieldLabel:"商品名称",
                                name:"upstatuinfo.",
                                value:recodedel.get("merchandiseName")
                            },
                            {
                                fieldLabel:"商品助记码",
                                name:"upstatuinfo.merchandiseAb",
                                value:recodedel.get("merchandiseAb")
                            },
                            {
                                fieldLabel:"商品价格",
                                name:"upstatuinfo.price",
                                value:recodedel.get("price")
                            },
                            {
                                xtype : 'fieldcontainer',
                                fieldLabel : "销售状态",
                                defaultType: 'radiofield',
                                defaults: {
                                    flex: 1
                                },

                                layout: 'hbox',
                                items: [
                                    {
                                        boxLabel  :"在售",
                                        name:"upstatuinfo.saleStatus",
                                        inputValue:true
                                    }, {
                                        boxLabel:"缺货",
                                        name:"upstatuinfo.saleStatus",
                                        inputValue:false
                                    }
                                ]
                            },
                            {
                                fieldLabel:"规格",
                                name:"upstatuinfo.spec",
                                value:recodedel.get("spec")
                            },
                            {
                                fieldLabel:"描述",
                                name:"upstatuinfo.describe",
                                value:recodedel.get("describe")
                            },
                            {
                                fieldLabel:"备注",
                                name:"upstatuinfo.remark",
                                value:recodedel.get("remark")
                            }
                        ]
                    }
                ],
                buttonAlign:"center",
                buttons: [
                    { text: "提交",
                        handler:upda.updatetijiao
                    },
                    { text: "重置",
                        handler: function () { this.up("window").down("form").getForm().reset(); } }
                ]
            }).show();
        }
    },
    //修改信息的提交
    updatetijiao:function(){
        var form = this.up("window").down("form").getForm();
        if(form.isValid()){
            form.submit({
                url :"/goodsinfo/statuddel",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if(msg.query){
                    Ext.Msg.show({
                        title : "系统提示",
                        msg : msg.message,
                        icon : Ext.Msg.WARNING,
                        buttons : Ext.Msg.YES
                    });
                        Ext.getCmp("findcode").store.reload();
                        Ext.getCmp("sssclose").close();
                    }

                },
                failure : function(form,action) {
                    var mag = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: mag.message,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                }
            });
        }
    },
    //增加信息
    insertmerch:function(inset){
        var merchname = Ext.create('Ext.data.Store', {
            fields: ["merchandiseCName","merchandiseCid"],
            proxy: {
                url:"/goodsinfo/listinfo",
                type:"ajax",
                reader: {
                    type: 'json',
                    root: "listmerchinfo"
                }
            },
            autoLoad: true
        });
        var  danwei= Ext.create('Ext.data.Store', {
            fields: ["unitId","name"],
            proxy: {
                url:"/goodsinfo/UnitInfo",
                type:"ajax",
                reader: {
                    type: 'json',
                    root: "listUnitInfo"
                }
            },
            autoLoad: true
        });
        var  ststusinfo= Ext.create('Ext.data.Store', {
            fields: ["proStatusName","proStatusId"],
            proxy: {
                url:"/goodsinfo/Slistinfo",
                type:"ajax",
                reader: {
                    type: 'json',
                    root: "listinfo"
                }
            },
            autoLoad: true
        });

        Ext.create("Ext.window.Window",{
            title:"商品信息管理",
            titleAlign:"center",
            layout:"form",
            id : "window1",
            frame: true,
            bodyPadding:5,
            width:350,
            items: [
                {
                    xtype: 'form',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth:100,
                        labelAlign: 'right'
                    },
                    items:[
                        {
                            fieldLabel:"计量单位",
                            xtype:"combobox",
                            store: danwei,
                            queryMode:'local',
                            displayField:"name",
                            valueField:"unitId",
                            name:"merchinter.TMeUnitInfoByUnitId.unitId"
                        },
                        {
                            fieldLabel:"是否促销",
                            xtype:"combobox",
                            store: ststusinfo,
                            queryMode:'local',
                            displayField:"proStatusName",
                            valueField:"proStatusId",
                            name:"merchinter.TMeProStatusInfoByProStatusId.proStatusId"
                        },
                        {
                            fieldLabel:"商品类别",
                            xtype:"combobox",
                            store: merchname,
                            queryMode:'local',
                            displayField:"merchandiseCName",
                            valueField:"merchandiseCid",
                            name:"merchinter.TMeMerchandiseCInfoByMerchandiseCid.merchandiseCid"
                        },
                        {
                            fieldLabel:"排序编码",
                            name:"merchinter.id "
                        },
                        {
                            fieldLabel:"商品编码",
                            name:"merchinter.merchandiseId"
                        },
                        {
                            fieldLabel:"商品名称",
                            name:"merchinter.merchandiseName"
                        },
                        {
                            fieldLabel:"商品描述",
                            xtype : 'textareafield',
                            grow  : true,
                            name  : 'merchinter.describe'
                        },
                        {
                            xtype: 'numberfield',
                            anchor: '78%',
                            name: 'merchinter.spec',
                            fieldLabel: '商品数量',
                            value:0,
                            maxValue: 99,
                            minValue: 0
                        },
                        {
                            fieldLabel:"商品助记码",
                            name:"merchinter.merchandiseAb"
                        }, {
                            fieldLabel:"商品价格",
                            name:"merchinter.price"
                        },
                        {
                            xtype      : 'fieldcontainer',
                            fieldLabel : "销售状态",
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 1
                            },

                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel  :"在售",
                                    name:"merchinter.saleStatus",
                                    inputValue:true
                                }, {
                                    boxLabel:"缺货",
                                    name:"merchinter.saleStatus",
                                    inputValue:false
                                }
                            ]
                        }, {
                            xtype:"filefield",
                            fieldLabel:"图片",
                            name:"merchinter.picPath"
                        }
                    ]
                }
            ],
            buttonAlign:"center",
            buttons: [
                { text: "添加",
                   handler:inset.insertgoods
                    },
                { text: "重置",
                    handler: function () { this.up("window").down("form").getForm().reset(); } }
            ]
        }).show();
    },
    //信息的提交
    insertgoods:function(){
        var form = this.up("window").down("form").getForm();
        if(form.isValid()){
            form.submit({
                url :"/goodsinfo/mecinfo",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if(msg.queryinsert){
                        Ext.getCmp("findcode").store.reload();
                        Ext.getCmp("window1").close();
                    }
                        Ext.Msg.show({
                            title : "系统提示",
                            msg : msg.mesg,
                            icon : Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES
                        })

                },
                failure : function(form,action) {
                    var mag = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: mag.mesg,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                }
            });
        }
    }
});