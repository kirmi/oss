Ext.define("Supply",{
    extend:"Ext.form.Panel",
    initComponent:function(){
        var me=this;
        Ext.apply(this, {
            title:"供应商信息管理",
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
                    fieldLabel:"供应商编码",
                    name:"supler.supplierId",
                    allowBlank: false
                },
                {
                    fieldLabel:"供应商名称",
                    name:"supler.supplierName",
                    allowBlank: false
                },
                {
                    fieldLabel:"供应商助记码",
                    name:"supler.supplierAb",
                    allowBlank: false
                },
                {
                    fieldLabel:"供货地址",
                    name:"supler.address",
                    allowBlank: false
                },
                {
                    fieldLabel:"联系人",
                    name:"supler.linkName",
                    allowBlank: false
                },
                {
                    fieldLabel:"联系电话",
                    name:"supler.linkTel",
                    allowBlank: false
                }, {
                    fieldLabel:"QQ",
                    name:"supler.qq",
                    allowBlank: false
                }, {
                    fieldLabel:"Email",
                    name:"supler.email",
                    allowBlank: false
                }, {
                    fieldLabel:"排序编码",
                    name:"supler.sortId",
                    allowBlank: false
                },{
                    xtype: 'checkboxgroup',
                    fieldLabel:"状态",
                    items:[
                        { boxLabel:"正常", name:"supler.state", inputValue:"正常",checked: true},
                        { boxLabel:"缺货", name:"supler.state", inputValue:"缺货" }
                    ]
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
                url :"/supplyer/suplire",
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
