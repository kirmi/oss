Ext.define("js.Stashow",{
    extend: "Ext.grid.Panel",
    initComponent: function () {
        var checkBox = Ext.create('Ext.selection.CheckboxModel');
        var me = this;
        var store = Ext.create("Ext.data.Store", {
            id: "salestatus",
            pageSize: 2,
            proxy:{
                type:"ajax",
                url:"/goodsinfo/Slistinfo",
                reader:{
                    type:"json",
                    root:"listinfo",
                    totalProperty: 'rows'
                }
            },
            fields:[
                {name:"proStatusName", type:"String"},
                {name:"remark", type:"String"},
                {name:"ststus", type:"Boolean"},
                {name:"proStatusId", type:"byte"}
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
            title: '促销状态管理',
            titleAlign:"center",
            store: store,
            id:"statusinfomation",
            closable:true,
            columns: [
                { header: '促销状态编码',  dataIndex: 'proStatusId' },
                { header: '促销名称', dataIndex: 'proStatusName'},
                { header: '状态',  dataIndex: 'status' },
                { header: '备注',  dataIndex: 'remark' }
            ],
            selModel:checkBox,
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
            buttons:[
                {
                    text:"增加",
                    handler:function(){
                    me.ins(me);
                }
                },
                {text:"删除",
                handler:me.shanchudel
                },
                {text:"修改"},
            ]
        });

        this.callParent();
    },

    ins:function(insertss){
        Ext.create("Ext.window.Window",{
            title: '促销信息的增加',
            width: 350,
            height:220,
            //height:180,
            items: [
                {
                    xtype:"form",
                    border:false,
                    items:[
                        {
                            margin:"10 0 0 0",
                            labelAlign:"right",
                            xtype: 'textfield',
                            name: 'sta.proStatusId',
                            fieldLabel: '促销状态编码',
                            allowBlank: false
                        },
                        {
                            margin:"10 0 0 0",
                            labelAlign:"right",
                            xtype: 'textfield',
                            name: 'sta.proStatusName',
                            fieldLabel: '促销状态名称',
                            allowBlank: false
                        },
                        {
                            xtype      : 'fieldcontainer',
                            fieldLabel : "状态",
                            labelAlign:"right",
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 1
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel  :"正常使用",
                                    name:"sta.status",
                                    inputValue:"True"
                                }, {

                                    boxLabel:"未使用",
                                    name:"sta.status",
                                    inputValue:"False"
                                }
                            ]
                        },
                        {
                            margin:"10 0 0 0",
                            labelAlign:"right",
                            xtype: 'textfield',
                            name: 'sta.remark',
                            fieldLabel:"备注"
                        }
                    ]
                }
                ],
            buttonAlign:"center",
            buttons:[
                {
                    text:"提交",
                    handler:insertss.tijiao
                },
                {text:"重置",
                handler:function(){
                    this.up("window").down("form").getForm().reset();
                }}
            ]
        }).show();
    },
    //信息的提交
    tijiao:function(){
        var form= this.up("window").down("form").getForm();
        if(form.isValid()){
            form.submit({
                url :"/goodsinfo/statusinsert",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if(msg.query){
                        Ext.Msg.show({
                            title : "系统提示",
                            msg : msg.message,
                            icon : Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES
                        });
                    }

                    Ext.getCmp("statusinfomation").store.reload();
                },
                failure : function(form,action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: msg.message,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                }
            });
        }
},
    shanchudel:function(){
        var uotstock=Ext.getCmp("statusinfomation").getSelectionModel().getSelection()[0];

        if(uotstock==null){
            Ext.Msg.show({
                title:"信息提示",
                msg:"请选择要删除的信息",
                icon:Ext.Msg.WARNING,
                buttons:Ext.Msg.YES
        });
    }else{
            Ext.Msg.show({
                title:"信息提示",
                msg:"你删除的促销状态名称是【"+uotstock.get("proStatusName")+"】确定要删除？",
                icon:Ext.Msg.WARNING,
                buttons:Ext.Msg.YES,
                fn:function(bton){
                    var detss=uotstock.get("proStatusName")
                    if(bton==="yes"){
                        Ext.Ajax.request({
                            url:"/goodsinfo/statusdelinfo?statusdel="+detss,
                            success:function(response){
                                var mag=Ext.JSON.decode(response.responseText);
                                if(mag.query){
                                    Ext.Msg.show({
                                        title: "系统提示",
                                        msg: mag.message,
                                        icon: Ext.Msg.WARNING,
                                        buttons: Ext.Msg.YES
                                    });
                                }
                                Ext.getCmp("statusinfomation").store.reload();
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
                }
            });
        }
    }
});
