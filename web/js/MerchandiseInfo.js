Ext.define("MerchandiseInfo",{
    extend:"Ext.form.Panel",
    initComponent:function(){
        var me=this;
        var merchname = Ext.create('Ext.data.Store', {
            fields: ["merchandiseCName","merchandiseCid"],
            proxy: {
                url:"/goodsinfo/qcinfo",
                type:"ajax",
                reader: {
                    type: 'json',
                    root: "listcinfo"
                }
            },
            autoLoad: true
        });
        var  danwei= Ext.create('Ext.data.Store', {
            fields: ["remark","name"],
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
            fields: ["proStatusName","merchandiseCid"],
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

        var shangpin=Ext.create("Ext.data.store",{
            fields:[{
                name:"merchandiseName", type:"String"
                }
            ],
            proxy:{
                type:"ajax",
                url:"/goodsinfo/merinfo",
                reader:{
                    type:"json",
                    root:"listminfo"
                },
                auotload:true
            }
        });

        Ext.apply(this, {
            title:"商品信息管理",
            titleAlign:"center",
            layout:"form",
            frame: true,
            bodyPadding:5,
            width:350,
            defaults: {
            xtype: 'textfield',
                labelWidth:100,
                labelAlign: 'right'
        },
        items: [
            {
                fieldLabel:"商品编码",
                name:"insertmer.merchandiseId"
            },
            {
                fieldLabel:"计量单位",
                xtype:"combobox",
                store: danwei,
                queryMode:'local',
                displayField:"name",
                valueField:"name"
            },
            {
                fieldLabel:"是否促销",
                xtype:"combobox",
                store: ststusinfo,
                queryMode:'local',
                displayField:"proStatusName",
                valueField:"merchandiseCid"
            },
            {
                fieldLabel:"商品类别",
                xtype:"combobox",
                store: merchname,
                queryMode:'local',
                displayField:"merchandiseCName",
                valueField:"merchandiseCid"
            },
            {
                fieldLabel:"商品名称",
                xtype:"combobox",
                store:shangpin,
                queryMode:"local",
                displayField:"merchandiseName",
                valueField:"merchandiseName"
                //name:"insertmer.merchandiseName"
            },
            {
                fieldLabel:"商品助记码",
                name:"insertmer.merchandiseAb"
            }, {
                fieldLabel:"商品价格",
                name:"insertmer.price"
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
                        name:"insertmer.saleStatus",
                        inputValue:1
                    }, {
                        boxLabel:"缺货",
                        name:"insertmer.saleStatus",
                        inputValue:0
                    }
                ]
            }, {
                xtype:"filefield",
                fieldLabel:"图片",
                name:"insertmer.picPath"
            }
        ],
            buttonAlign:"center",
            buttons: [
            { text: "添加",
                handler:me.insertpeople},
            { text: "重置",
                handler: function () { this.up("form").getForm().reset(); } }
        ]
    });

        this.callParent()
    },

    //信息的提交
    insertpeople:function(){
        var form = this.up("form").getForm();
        if(form.isValid()){
            form.submit({
                url :"/goodsinfo/mecinfo",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if(msg.query){
                        Ext.Msg.show({
                            title : "系统提示",
                            msg : msg.mesg,
                            icon : Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES
                        })
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
