Ext.define("js.Merchanc",{
    extend: "Ext.grid.Panel",
    initComponent:function(){
        var me =this;
        var store = Ext.create("Ext.data.Store", {
            id: "saletypes",
            pageSize: 2,
            proxy:{
                type:"ajax",
                url:"/goodsinfo/listinfo",
                reader:{
                    type:"json",
                    root:"listmerchinfo",
                    totalProperty: 'rows'
                }
            },
            fields:[
                {name:"merchandiseCid",type:"String"},
                {name:"merchandiseCName",type:"String"},
                {name:"sortId",type:"Integer"},
                {name:"state",type:"Boolean"}
            ],
            autoLoad:false

        });
        store.load({
            params: {
                start: 0,
                limit: 2//一页显示多少条记录
            }
        });

        Ext.apply(this, {
            margin: 0,
            id: "SupplySelect",
            title: '供应商信息管理',
            titleAlign:"center",
            store: store,
            id:"merchanclass",
            closable:true,
            columns: [
                { header: '促销状态编码',  dataIndex: 'merchandiseCid' },
                { header: '促销名称', dataIndex: 'merchandiseCName'},
                { header: '状态',  dataIndex: 'sortId' },
                { header: '备注',  dataIndex: 'state' }
            ],
            disableSelection: false,
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
                {text:"增加商品类别",
                    handler:function(){
                    me.insertclass(me)
                    }
                },
                {text:"删除商品类别",
                    handler:function(){
                    me.delectmerchclass(me)
                    }
                },
                {text:"修改商品类别",
                    handler:function(){
                        me.updatemerchclass(me)
                    }}
            ]
        }),
        this.callParent();
    },
    //删除供应商信息
    delectmerchclass:function(del){
        var recode=Ext.getCmp("merclassdelect").getSelectionModel().getSelection()[0];
        if(recode==null){
            Ext.Msg.alert("信息提示","请选择要删除的供应商的信息")
        }else{
            Ext.create("Ext.window.Window",{
                    title:"商品类别信息删除",
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
                                    fieldLabel:"商品类别编码",
                                    name:"tmecladel.merchandiseCid",
                                    value:recode.get("merchandiseCid")

                                },
                                {
                                    fieldLabel:"商品类别名称",
                                    name:"tmecladel.merchandiseCName",
                                    value:recode.get("merchandiseCName")
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

    //删除信息的提交
    delservice:function(){
        var form = this.up("window").down("form").getForm();
        if(form.isValid()){
            form.submit({
                url :"/goodsinfo/temcladelect",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if(msg.tmecladelquery){
                        Ext.Msg.show({
                            title : "系统提示",
                            msg : msg.tmecladelmess,
                            icon : Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES
                        })
                    }
                    Ext.Msg.show({
                        title : "系统提示",
                        msg : msg.tmecladelmess,
                        icon : Ext.Msg.WARNING,
                        buttons : Ext.Msg.YES
                    })
                },
                failure : function(form,action) {
                    var mag = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: mag.tmecladelmess,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                }
            });
        }
    },

    //修改信息
    updatemerchclass:function(upd){
        var recode=Ext.getCmp("merclassdelect").getSelectionModel().getSelection()[0];
        if(recode==null){
            Ext.Msg.alert("信息提示","请选择要修改的供应商的信息")
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
                                    xtype:"hidden",
                                    name:"tmeclaupdate.merchandiseCid",
                                    value:recode.get("merchandiseCid")
                                },
                                {
                                    fieldLabel:"商品类别名称",
                                    name:"tmeclaupdate.merchandiseCName",
                                    value:recode.get("merchandiseCName")
                                },
                                {
                                    fieldLabel:"排序编码",
                                    name:"tmeclaupdate.sortId",
                                    value:recode.get("sortId")
                                },
                                {
                                    xtype      : 'fieldcontainer',
                                    fieldLabel : "状态",
                                    defaultType: 'radiofield',
                                    defaults: {
                                        flex: 1
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            boxLabel  :"使用",
                                            name:"tmeclaupdate.state",
                                            inputValue:0
                                        }, {
                                            boxLabel:"未使用",
                                            name:"tmeclaupdate.state",
                                            inputValue:1
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    buttonAlign:"center",
                    buttons: [
                        { text: "修改",
                            handler:upd.updatereply
                        },
                        { text: "重置",
                            handler: function () { this.up("window").down("form").getForm().reset(); } }
                    ]

                }
            ).show()};
    },

    //修改信息的提交
    updatereply:function(){
        var form = this.up("window").down("form").getForm();
        if(form.isValid()){
            form.submit({
                url :"/goodsinfo/temclaupdate",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if(msg.tmeclaupdatequery){
                        Ext.Msg.show({
                            title : "系统提示",
                            msg : msg.tmeclaupdatelmess,
                            icon : Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES
                        })
                    }
                },
                failure : function(form,action) {
                    var mag = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: mag.tmeclaupdatelmess,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                }
            });
        }
    },


    //增加信息
    insertclass:function(insertin){
        Ext.create("Ext.window.Window",{
            title:"增加商品类别",
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
                            fieldLabel:"商品类别名称",
                            name:"tmecla.merchandiseCName"
                        },
                        {
                            fieldLabel:"排序编码",
                            name:"tmecla.sortId"
                        },
                        {
                            xtype      : 'fieldcontainer',
                            fieldLabel : "状态",
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 1
                            },

                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel  :"使用",
                                    name:"tmecla.state",
                                    inputValue:0
                                }, {
                                    boxLabel:"未使用",
                                    name:"tmecla.state",
                                    inputValue:1
                                }
                            ]
                        }
                    ]
                }],
            buttonAlign:"center",
            buttons: [
                { text: "添加",
                    handler:insertin.inserclassreplay
                },
                { text: "重置",
                    handler: function () { this.up("window").down("form").getForm().reset(); } }
            ]

        }).show();
    },

    //插入提交
    inserclassreplay:function(){
        var form = this.up("window").down("form").getForm();
        if(form.isValid()){
            form.submit({
                url :"/goodsinfo/temclainsrt",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if(msg.tmeclaquery){
                        Ext.Msg.show({
                            title : "系统提示",
                            msg : msg.tmeclamess,
                            icon : Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES

                        })
                    }

                },
                failure : function(form,action) {
                    var mag = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: mag.tmeclamess,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                }
            });
        }
    }
});
