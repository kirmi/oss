Ext.define("js.Instore",{
    extend: "Ext.panel.Panel",
    //鼠标右击事件
    billcode:"",
    totalmoney:"",
    initComponent: function () {
        var me = this;

        //入库信息的数据源
        var store = Ext.create("Ext.data.Store", {
            id:"mInstore",
            pageSize: 5,
            proxy:{
                type:"ajax",
                url:"/stocks/liststock",
                reader:{
                    type:'json',
                    root:"listall",
                    totalProperty: 'row'
                }
            },
            fields:[
               "billCode","inTime","inType","handler","totalMoney","remark","TAuOperInfoByOperId.operId","TBaSupplierInfoBySupplierId.supplierId"
            ],
            autoLoad:false

        });
        store.load({
            params: {
                start: 0,
                limit: 5
            }
        });
        var store1=Ext.create('Ext.data.Store', {
            id: 'myStore',
            pageSize:5,
            proxy:{
                type:"ajax",
                url:"/stocks/instodellist.action",
                reader:{
                    type:"json",
                    root:"instockdetailist",
                    totalProperty:"rows"
                }
            },
            fields:[
                "id","num","price","TMeInStockInfoByBillCode.billCode","TMeMerchandiseInfoByMerchandiseId.merchandiseId"
            ],
            autoLoad:false
        });
        store1.load({
            params: {
                start: 0,
                limit: 5
            }
        });
        Ext.apply(this,{
            layout:"border",
            width:1000,
            height:800,
            title:"入库管理",
            closable:true,
            id:"instoreinfoshow",

            items:[
                {
                    listeners:{
                        itemcontextmenu:function(view,record,item,index,e,eOpts){

                             billcode=record;

                            //禁用浏览器的右键相应事件
                            e.preventDefault();
                            e.stopEvent();
                            var menu = new Ext.menu.Menu({
                                //控制右键菜单位置
                                float:true,

                                items:[
                                   {
                                    text:"删除",
                                    iconCls:'leaf',
                                    handler:function(){
                                        //this.up("menu").hide();
                                        //alert("删除");
                                        me.delectinstore(record);
                                    }
                                },
                                    {
                                        text: "查看订单详细信息",
                                        iconCls: 'leaf',
                                        handler: function () {
                                            this.up("menu").hide();
                                            Ext.getCmp('instoorebillcodelist').store.reload({params: {selectbillcode:record.get("billCode")}});
                                        }
                                    }
                                ]
                            }).showAt(e.getXY());//让右键菜单跟随鼠标位置
                        }
                    },
                    region:"north",
                    width:1000,
                    height:258,
                    store:store,
                    title:"入库信息",
                    titleAlign:"center",
                    id:"instoreshow",
                    xtype:"grid",
            columns: [
                { header: '入库单号',  dataIndex: 'billCode',width:250 },
                { header: '操作员编码', dataIndex: 'TAuOperInfoByOperId.operId'},
                { header: '供应商编码', dataIndex: 'TBaSupplierInfoBySupplierId.supplierId',width:250 },
                { header: '入库方式', dataIndex: 'inType',width:80},
                { header: '入库时间', dataIndex: 'inTime',width:80 },
                { header: '经手人', dataIndex: 'handler' },
                { header: '入库金额', dataIndex: 'totalMoney',width:80},
                { header: '备注', dataIndex: 'remark',width:50 }
            ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: store,
                dock: 'bottom',
                displayInfo: true
            }]
                },
                //子表查询后的显示目录
                {
                    listeners:{
                        itemcontextmenu:function(view,record,item,index,e,eOpts){
                            //禁用浏览器的右键相应事件
                            e.preventDefault();
                            e.stopEvent();
                            var menu = new Ext.menu.Menu({
                                //控制右键菜单位置
                                float:true,
                                items:[
                                   {
                                    text:"修改",
                                    iconCls:'leaf',
                                    handler:function(){
                                        me.updateinstore(record);
                                    }
                                },{
                                    text:"删除",
                                    iconCls:'leaf',
                                    handler:function(){
                                        me.deldatelist(record);
                                    }
                                }
                                ]
                            }).showAt(e.getXY());
                        }
                    },
                    region:"south",
                    titleAlign:"center",
                    title:"入库明细信息",
                    xtype: 'grid',
                    store: store1,
                    width:1000,
                    height:250,
                    id:"instoorebillcodelist",
                    columns:[
                        { header: '递增流水号',  dataIndex: 'id'},
                        { header: '商品编码',  dataIndex: 'TMeMerchandiseInfoByMerchandiseId.merchandiseId',width:250 },
                        { header: '入库单号',  dataIndex: 'TMeInStockInfoByBillCode.billCode',width:250 },
                        { header: '入库数量',  dataIndex: 'num' },
                        { header: '进价',  dataIndex: 'price' }
                    ]}
            ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: store1,
                dock: 'bottom',
                displayInfo: true
            }]
        })
        this.callParent();
    },
    //信息的删除
    delectinstore:function(del){

        var instocebillcode='';

        Ext.Msg.show({
            title : "系统提示",
            msg :"你确定要删除入库单号为：【"+del.get("billCode")+"】和他对应的的入库明细信息？",
            icon : Ext.Msg.WARNING,
            buttons : Ext.Msg.YES,
            fn:function(butn){
                if(butn==="yes"){
                    instocebillcode=del.get("billCode");
                    Ext.Ajax.request({
                        url :"/stocks/delinstore?ttt="+instocebillcode,
                        success : function(response){
                            var mag = Ext.JSON.decode(response.responseText);
                            if(mag.delinsotrequer){
                                Ext.Msg.show({
                                    title : "系统提示",
                                    msg :"信息删除成功",
                                    icon : Ext.Msg.WARNING,
                                    buttons : Ext.Msg.YES
                                });
                                Ext.getCmp("instoreshow").store.reload();
                                Ext.getCmp("instoorebillcodelist").store.reload();
                            }
                        },
                        failure : function(response) {
                            var mag = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title: "系统提示",
                                msg:"信息删除失败",
                                icon: Ext.Msg.WARNING,
                                buttons: Ext.Msg.YES
                            });
                        }
                    })
                }
            }
        });
2
    },
    //商品更新
    updateinstore:function(update){
    Ext.create("Ext.window.Window",{
        title:"入录信息的修改",
        titleAlign:"center",
        width:600,
        height:400,
        border:false,
        layout:"fit",
       items:[
           {
               xtype:"form",
               layout:"border",
               items:[
                   {
                       titleAlign:"center",
                       region:'west',
                       width:300,
                       title:"入库单信息",
                       defaults: {
                           xtype: 'textfield',
                           labelWidth:100,
                           labelAlign: 'right',
                           margin:"10 0 0 0",
                           readOnly:true
                       },
                       items:[
                           {
                               readOnly:true,
                               fieldLabel:"入库单号",
                               value:billcode.get("billCode"),
                               name:"insdd.billCode"
                           },
                           {
                               readOnly:true,
                               fieldLabel:"操作员编码",
                               value:billcode.get("TAuOperInfoByOperId.operId"),
                               name:"insdd.TAuOperInfoByOperId.operId"
                           },
                           {
                               readOnly:true,
                               fieldLabel:"供应商编码",
                               value:billcode.get("TBaSupplierInfoBySupplierId.supplierId"),
                               name:"insdd.TBaSupplierInfoBySupplierId.supplierId"
                           },
                           {
                               fieldLabel:"入库方式",
                               readOnly:false,
                               value:billcode.get("inType"),
                               name:"insdd.inType"
                           },
                           {
                               readOnly:true,
                               fieldLabel:"入库时间",
                               value:billcode.get("inTime"),
                               name:"insdd.inTime"
                           },
                           {
                               readOnly:true,
                               fieldLabel:"经手人",
                               value:billcode.get("handler"),
                               name:"insdd.handler"
                           },
                           {
                               readOnly:true,
                               fieldLabel:"入库金额",
                               value:billcode.get("totalMoney"),
                               name:"insdd.totalMoney"
                           },
                           {
                               fieldLabel:"备注",
                               readOnly:false,
                               value:billcode.get("remark"),
                               name:"insdd.remark"
                           }
                       ]
                   }, {
                       titleAlign:"center",
                       region:'east',
                       width:300,
                       title:"入库明细信息",
                       defaults:{
                           xtype: 'textfield',
                           labelWidth:100,
                           labelAlign: 'right',
                           margin:"10 0 0 0",
                           readOnly:true
                       },
                       items:[
                           {
                               fieldLabel:"递增流水号",
                               value:update.get("id"),
                               name:"insttf.id"
                           },
                           {
                               fieldLabel:"商品编码",
                               value:update.get("TMeMerchandiseInfoByMerchandiseId.merchandiseId"),
                               name:"insttf.TMeMerchandiseInfoByMerchandiseId.merchandiseId"
                           },
                           {
                               fieldLabel:"入库单号",
                               value:update.get("TMeInStockInfoByBillCode.billCode"),
                               name:"insttf.TMeInStockInfoByBillCode.billCode"
                           },

                           {
                               fieldLabel:"入库数量",
                               readOnly:false,
                               value:update.get("num"),
                               name:"insttf.num"

                           },
                           {
                               fieldLabel:"进价",
                               readOnly:false,
                               value:update.get("price"),
                               name:"insttf.price"

                           }
                       ]
                   }
               ]
           }
       ],
        buttonAlign:"center",
        buttons:[
            {
                text:"修改",
               handler:function(){
                   var form=this.up("window").down("form").getForm();
                   form.submit({
                       url :"/stocks/instockup",
                       success : function(form,action){
                           var msg = Ext.JSON.decode(action.response.responseText);
                           if(msg.query){
                               Ext.Msg.show({
                                   title : "系统提示",
                                   msg : msg.message,
                                   icon : Ext.Msg.WARNING,
                                   buttons : Ext.Msg.YES

                               });

                               Ext.getCmp("SupplySelect").store.reload();
                               Ext.getCmp("supplywindow").close();
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
            },{
                text:"取消",
                handler:function(){
                    this.up("window").down("form").getForm().reset();
                }
            }
        ]
    }).show();
},
    //明细信息的删除
    deldatelist:function(){
        Ext.Msg.show({
            title : "系统提示",
            msg :"你确定要删除入库明细单号为：【"+billcode.get("billCode")+"】的信息？",
            icon : Ext.Msg.WARNING,
            buttons : Ext.Msg.YES,
            fn:function(butn){
                var detalcode=billcode.get("billCode")
                if(butn==="yes"){
                    Ext.Ajax.request({
                        url :"/stocks/deldetalit?ddd="+detalcode,
                        success : function(response){
                            var mag = Ext.JSON.decode(response.responseText);
                            if(mag.query){
                                Ext.Msg.show({
                                    title : "系统提示",
                                    msg :mag.message,
                                    icon : Ext.Msg.WARNING,
                                    buttons : Ext.Msg.YES
                                });
                                Ext.Msg.show({
                                    title : "系统提示",
                                    msg :"入库明细单号为：【"+detalcode+"】的信息已经被删除，对应的入库单信息已经为空是否一起删除？",
                                    icon : Ext.Msg.WARNING,
                                    buttons : Ext.Msg.YES,

                                   fn:function(butns){
                                       var dds=billcode.get("billCode");
                                       if(butns=="yes"){
                                           Ext.Ajax.request({
                                               url :"/stocks/dellit?ccc="+dds,
                                               success:function(response){
                                               var mag = Ext.JSON.decode(response.responseText);
                                               if(mag.query){
                                                   Ext.Msg.show({
                                                       title : "系统提示",
                                                       msg :mag.message,
                                                       icon : Ext.Msg.WARNING,
                                                       buttons : Ext.Msg.YES
                                                   });
                                                   Ext.getCmp("instoreshow").store.reload();
                                                   Ext.getCmp("instoorebillcodelist").store.reload();
                                               }

                                           }
                                           });
                                       }
                                   },
                                    failure : function(response) {
                                        var mag = Ext.JSON.decode(response.responseText);
                                        Ext.Msg.show({
                                            title: "系统提示",
                                            msg:mag.message,
                                            icon: Ext.Msg.WARNING,
                                            buttons: Ext.Msg.YES
                                        });
                                    }
                                });
                            }
                        },
                        failure : function(response) {
                            var mag = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title: "系统提示",
                                msg:mag.message,
                                icon: Ext.Msg.WARNING,
                                buttons: Ext.Msg.YES
                            });
                        }
                    })
                }
            }
        });

    }
});
