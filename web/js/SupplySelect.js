Ext.define('js.SupplySelect', {
    extend: "Ext.grid.Panel",
    initComponent: function () {
       var checkBox = Ext.create('Ext.selection.CheckboxModel');
        var me = this;
        var store = Ext.create("Ext.data.Store", {
                id: "mystore",
                pageSize: 2,
                proxy: {
                    type: 'ajax',
                    url: "/supplyer/querylist",
                    reader: {
                        type: 'json',
                        root: 'querlistmsg',//根节点
                        totalProperty: 'rows'//总数
                    }
                },
                fields: [
                    {name: 'supplierId', type: "String"},
                    {name: 'supplierName', type: "String"},
                    {name: 'supplierAb', type: "String"},
                    {name: 'address', type: "String"},
                    {name: 'linkName', type: "String"},
                    {name: 'linkTel', type: "String"},
                    {name: 'qq', type: "String"},
                    {name: 'email', type: "String"},
                    {name: 'sortId', type: "Intger"},
                    {name: 'state', type: "boolean"},
                    { name: 'indoor', type: 'bool' }
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
            closable:true,
            margin: 0,
            id: "SupplySelect",
            title: '供应商信息管理',
            titleAlign:"center",
            store: store,
            columns: [
                { header: '供应商编码',  dataIndex: 'supplierId' },
                { header: '供应商名称', dataIndex: 'supplierName'},
                { header: '供应商助记码', dataIndex: 'supplierAb' },
                { header: '供货地址',  dataIndex: 'address' },
                { header: '联系人', dataIndex: 'linkName'},
                { header: '联系电话', dataIndex: 'linkTel' },
                { header: 'QQ',  dataIndex: 'qq' },
                { header: 'Email', dataIndex: 'email'},
                { header: '排序编码', dataIndex: 'sortId' },
                { header: '状态',  dataIndex: 'state' }
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

            buttonAlign:"left",
            buttons:[
                {text:"增加供应商",
                   handler:function(){
                       me.insertsupply(me)
                   }

                },
                {text:"删除供应商信息",
                    handler:function(){
                        me.delectsupply(me)
                    }

                },
                {text:"修改供应商信息",
                    handler:function(){
                        me.updatesupply(me)
                    }
                }
            ],
            tbar:[
                {
                    fieldLabel:'供应商名称',
                    xtype: 'textfield',
                    labelAlign:"right",
                    id:'supinf',
                    name:"selectsuply"
                },
                {   xtype: 'button',
                    text: '点击查询',
                    handler:me.selectinfo
                }
            ]
        });

        this.callParent();
    },

    //删除供应商信息
    delectsupply:function(del){
        var recode=Ext.getCmp("SupplySelect").getSelectionModel().getSelection()[0];
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
                                    fieldLabel:"供应商编码",
                                    name:"delsup.supplierId",
                                    value:recode.get("supplierId")

                                },
                                {
                                    fieldLabel:"供应商名称",
                                    name:"delsup.supplierName",
                                    value:recode.get("supplierName")
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
                url :"/supplyer/delsupply",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if(msg.dequery){
                        Ext.Msg.show({
                            title : "系统提示",
                            msg : msg.mesage,
                            icon : Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES
                        })
                        Ext.getCmp("SupplySelect").store.reload()
                    }
                },
                failure : function(form,action) {
                    var mag = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: mag.mesage,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                }
            });
        }
    },

    //修改信息
    updatesupply:function(upd){
        var recode=Ext.getCmp("SupplySelect").getSelectionModel().getSelection()[0];
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
                id:"suppluupdateid",
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
                            xtype: 'hidden',
                            name:"supplieupdate.supplierId",
                            value:recode.get("supplierId")
                        },
                        {
                            fieldLabel:"供应商名称",
                            name:"supplieupdate.supplierName",
                            value:recode.get("supplierName")
                        },
                        {
                            fieldLabel:"供应商助记码",
                            name:"supplieupdate.supplierAb",
                            value:recode.get("supplierAb")

                        },
                        {
                            fieldLabel:"供货地址",
                            name:"supplieupdate.address",
                            value:recode.get("address")
                        },
                        {
                            fieldLabel:"联系人",
                            name:"supplieupdate.linkName",
                            value:recode.get("linkName")
                        },
                        {
                            fieldLabel:"联系电话",
                            name:"supplieupdate.linkTel",
                            regex: /^((\d{3,4}-)*\d{7,8}(-\d{3,4})*|13\d{9})$/,
                            value:recode.get("linkTel")
                        }, {
                            fieldLabel:"QQ",
                            name:"supplieupdate.qq",
                            value:recode.get("qq")
                        }, {
                            fieldLabel:"Email",
                            vtype:'email',
                            vtypeText:"不是有效的邮箱地址",
                            name:"supplieupdate.email",
                            value:recode.get("email")
                        }, {
                            fieldLabel:"排序编码",
                            name:"supplieupdate.sortId",
                            value:recode.get("sortId")
                        },{
                            xtype: 'checkboxgroup',
                            fieldLabel:"状态",
                            items:[
                                { boxLabel:"正常", name:"supplieupdate.state", inputValue:"正常"},
                                { boxLabel:"缺货", name:"supplieupdate.state", inputValue:"缺货" }
                            ]
                        }
                    ]
                }],
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
                url :"/supplyer/supplyupdete",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if(msg.upinfo){
                        Ext.Msg.show({
                            title : "系统提示",
                            msg : "信息修改成功更",
                            icon : Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES
                        })
                    }
                    Ext.getCmp("SupplySelect").store.reload();
                    Ext.getCmp("suppluupdateid").close();
                },
                failure : function(form,action) {
                    var mag = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: mag.infoma,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                }
            });
        }
    },


    //增加信息
    insertsupply:function(insertin){
        Ext.create("Ext.window.Window",{
            title:"供应商信息管理",
            titleAlign:"center",
            layout:"form",
            frame: true,
            bodyPadding:5,
            width:350,
            id:"supplywindow",
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
                    fieldLabel:"供应商代码",
                    name:"supler.id"
                },
                {
                    fieldLabel:"供应商名称",
                    name:"supler.supplierName"
                },
                {
                    fieldLabel:"供应商助记码",
                    name:"supler.supplierAb"
                },
                {
                    fieldLabel:"供货地址",
                    name:"supler.address"
                },
                {
                    fieldLabel:"联系人",
                    name:"supler.linkName"
                },
                {
                    fieldLabel:"联系电话",
                    name:"supler.linkTel"
                }, {
                    fieldLabel:"QQ",
                    name:"supler.qq"
                }, {
                    fieldLabel:"Email",
                    name:"supler.email"
                }, {
                    fieldLabel:"排序编码",
                    name:"supler.sortId"
                },{
                    xtype: 'checkboxgroup',
                    fieldLabel:"状态",
                    items:[
                        { boxLabel:"正常", name:"supler.state", inputValue:"True",checked: true},
                        { boxLabel:"缺货", name:"supler.state", inputValue:"False" }
                    ]
                }
            ]
            }],
            buttonAlign:"center",
            buttons: [
                { text: "添加",
                   handler:insertin.insertinto
                },
                { text: "重置",
                    handler: function () { this.up("window").down("form").getForm().reset(); } }
            ]

        }).show();
    },

    //插入提交
    insertinto:function(){
        var form = this.up("window").down("form").getForm();
        if(form.isValid()){
            form.submit({
                url :"/supplyer/suplire",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if(msg.query){

                        Ext.getCmp("SupplySelect").store.reload();
                        Ext.getCmp("supplywindow").close();
                    }

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
    },
    //
    //信息查询提交

    selectinfo:function(){
        Ext.getCmp('SupplySelect').store.reload({params:{selectsuply:Ext.getCmp("supinf").getValue()}})
    }
});