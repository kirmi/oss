Ext.define("js.OutStocklist",{
    extend:"Ext.panel.Panel",
    outbillcode:"",
    initComponent:function(){
        var me =this;
        //出库信息的数据源
        var outstock=Ext.create("Ext.data.Store", {
            id: "mystore",
            pageSize: 4,
            proxy: {
                type: 'ajax',
                url: "/outstock/outlist",
                reader: {
                    type: 'json',
                    root: 'listoutstock',//根节点
                    totalProperty: 'rows'//总数
                }
            },
            fields: ["outBillCode","outTime","handler","outType","totalMoney","TAuOperInfoByOperId.operId","remark"],
            autoLoad:false

        });
        outstock.load({
            params: {
                start: 0,
                limit: 4//一页显示多少条记录
            }
        });
        //出库明细信息的数据源
        var outstockdetal=Ext.create("Ext.data.Store",{
            autoLoad:false,
            pageSize: 5,
            fields:["TMeOutStockInfoByOutBillCode.outBillCode","TMeMerchandiseInfoByMerchandiseId.merchandiseId","price","stockPrice","num"],
       proxy:{
           type:"ajax",
           url:"/outstock/listoktdetal",
           reader:{
               type:"json",
               root:"listuotdetal",
               totalProperty:"rows"
           }
       }

        });
        outstockdetal.load({
            params: {
                start: 0,
                limit: 5//一页显示多少条记录
            }
        });
        Ext.apply(this,{
            closable:true,
            layout:"border",
            height:515,
            width:1000,
            id:"outstocklistinfoshow",
            title:"出库信息",
            titleAlign:"center",
            items:[
                {
                    titleAlign:"center",
                    region:"north",
                    width:1000,
                    height:280,
                    title:"出库单信息",
                    xtype:"grid",
                    store:outstock,
                    id:"oustocklistinfomatino",
                    columns:[
                        {header:"出库单号",dataIndex:"outBillCode",width:250},
                        {header:"出库时间",dataIndex:"outTime"},
                        {header:"经手人",dataIndex:"handler"},
                        {header:"出库类型",dataIndex:"outType"},
                        {header:"出库金额",dataIndex:"totalMoney"},
                        {header:"操作员编号",dataIndex:"TAuOperInfoByOperId.operId"},
                        {header:"备注",dataIndex:"remark",width:245}

                    ],
         dockedItems: [
             {
                 xtype: 'pagingtoolbar',
                 store: outstock,
                 dock: 'bottom',
                 displayInfo: true
             }
         ],
                    buttons:[
                        {text:"查询",
                        handler:function(){
                            var recodelist=Ext.getCmp("oustocklistinfomatino").getSelectionModel().getSelection()[0];
                            if(recodelist==null){
                                Ext.Msg.show({
                                    title:"信息提示",
                                    msg:"请选择你要查看的信息",
                                    icon:Ext.Msg.WARNING,
                                    buttons : Ext.Msg.YES
                                });

                            }else {

                                Ext.getCmp('detallist').store.reload({params: {selectoutdetalbillcode: recodelist.get("outBillCode")}});
                            }
                            }
                        },
                        {
                            text:"删除",
                            handler:function(){
                               me.shanchu();
                            }
                        }
                    ]
    },
                {
                    titleAlign:"center",
                    region:"south",
                    width:1000,
                    height:200,
                    title:"出明细信息",
                    xtype:"grid",
                    store: outstockdetal,
                    id:"detallist",
                    columns:[
                        {header:"出库单号",dataIndex:"TMeOutStockInfoByOutBillCode.outBillCode",width:250},
                        {header:"商品编号",dataIndex:"TMeMerchandiseInfoByMerchandiseId.merchandiseId"},
                        {header:"单价",dataIndex:"price"},
                        {header:"出库时成本",dataIndex:"stockPrice"},
                        {header:"数量",dataIndex:"num"}
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: outstockdetal,
                            dock: 'bottom',
                            displayInfo: true
                        }
                    ]
                }
            ],
            buttons:[
                {
                    text:"修改",
                    handler:function(){
                        me.updateinstore(me);

                    }
                },
                {
                    text:"删除",
                    handler:me.detadel
                }
            ]
        });
        this.callParent();
    },

    //删除出库信息
    shanchu:function(){
        var recode=Ext.getCmp("oustocklistinfomatino").getSelectionModel().getSelection()[0];
        if(recode==null){
        Ext.Msg.show({
            title : "系统提示",
            msg :"请选择要删除的信息内容!",
            icon : Ext.Msg.WARNING,
            buttons : Ext.Msg.YES
        });
    }else{
            var outbillcode=recode.get("outBillCode")
                Ext.Msg.show({
                    title:"提示消息",
                    msg:"你确定要删除入库单号为：【"+outbillcode+"】和他对应的的入库明细信息？信息修改后将不能被恢复",
                    icon : Ext.Msg.WARNING,
                    buttons : Ext.Msg.YES,
                    fn:function(butn){
                        if(butn==="yes"){
                            Ext.Ajax.request({
                                url:"/outstock/outstockdel?listinfomation="+outbillcode,
                                success:function(response){
                                    var mag=Ext.JSON.decode(response.responseText);
                                    if(mag.queary){
                                        Ext.Msg.show({
                                            title:"提示信息",
                                            msg:mag.message,
                                            icon:Ext.Msg.WARNING,
                                            buttons:Ext.Msg.YES
                                        });
                                        Ext.getCmp("oustocklistinfomatino").store.reload();
                                        Ext.getCmp("detallist").store.reload();
                                    }
                                }
                            });
                        }
                    }
                });
        }
    },

    //信息的修改
    updateinstore:function(){
        var uotstock=Ext.getCmp("oustocklistinfomatino").getSelectionModel().getSelection()[0];
        var outstocklist=Ext.getCmp("detallist").getSelectionModel().getSelection()[0];
        if(outstocklist==null){
            Ext.Msg.show({
                title : "系统提示",
                msg :"请选择要修改的信息内容!",
                icon : Ext.Msg.WARNING,
                buttons : Ext.Msg.YES
            });
        }else{
       Ext.create("Ext.window.Window",{
           title:"出库信息的修改",
           titleAlign:"center",
           width:600,
           height:400,
           border:false,
           layout:"fit",
           id:"outstocklistwindow",
           items:[
               {
                   layout:"border",
                   xtype:"form",
                   items:[
                       {
                           titleAlign:"center",
                           title:"出库信息",
                           region:"west",
                           width:300,
                           height:300,
                           defaults: {
                               xtype: 'textfield',
                               labelWidth:100,
                               labelAlign: 'right',
                               margin:"10 0 0 0",
                               //readOnly:true,
                               border:false
                           },
                           items:[
                               {
                                   fieldLabel: "出库单号",
                                   name: "sinfo.outBillCode",
                                   value: uotstock.get("outBillCode")
                               },
                               {
                                   fieldLabel:"操作员编码",
                                   name:"ostl.outType",
                                   value:uotstock.get("TAuOperInfoByOperId.operId")
                               },
                               {
                                   fieldLabel:"出库时间",
                                   name:"sinfo.outTime",
                                   value:uotstock.get("outTime")
                               },
                               {
                                   fieldLabel:"经手人",
                                   name:"sinfo.handler",
                                   value:uotstock.get("handler")
                               },
                               {
                                   fieldLabel:"出库方式 ",
                                   name:"sinfo.outType",
                                   value:uotstock.get("outType")
                               },
                               {
                                   fieldLabel:"出库金额",
                                   name:"sinfo.totalMoney",
                                   id:"chukutotalmoneyid",
                                   value:uotstock.get("totalMoney")
                               },
                               {
                                   fieldLabel:"备注",
                                   name:"sinfo.remark",
                                   value:uotstock.get("remark")
                               }

                           ]
                       },
                       {
                           titleAlign:"center",
                           title:"出库明细信息",
                           region:"east",
                           width:300,
                           height:300,
                           defaults: {
                               xtype: 'textfield',
                               labelWidth:100,
                               labelAlign: 'right',
                               margin:"10 0 0 0",
                               //readOnly:true,
                               border:false
                           },
                           items:[
                               {
                                   fieldLabel:"商品id",
                                   name:"sdelinfo.id",
                                   value:outstocklist.get("id")
                               },
                               {
                                   fieldLabel:"商品编码",
                                   name:"sdelinfo.TMeMerchandiseInfoByMerchandiseId.merchandiseId",
                                   value:outstocklist.get("TMeMerchandiseInfoByMerchandiseId.merchandiseId")
                               },
                               {
                                   fieldLabel:"出库单号",
                                   name:"sdelinfo.TMeOutStockInfoByOutBillCode.outBillCode",
                                   value:outstocklist.get("TMeOutStockInfoByOutBillCode.outBillCode")
                               },
                               {
                                   fieldLabel:"数量",
                                   name:"sdelinfo.num",
                                   id:"chukunum11",
                                   value:outstocklist.get("num"),
                                   listener:{
                                       blur : function(){
                                           var num = Ext.getCmp("chukunum11").getValue();
                                           var price = Ext.getCmp("chukuprice11").getValue();
                                           var totalmoney = num*price;
                                           Ext.getCmp("chukutotalmoneyid").setValue(totalmoney);
                                       }
                                   }
                               },
                               {
                                   fieldLabel:"单价",
                                   name:"sdelinfo.price",
                                   id:"chukuprice11",
                                   value:outstocklist.get("price"),
                                   listeners : {
                                       blur : function(){
                                           var num = Ext.getCmp("chukunum11").getValue();
                                           var price = Ext.getCmp("chukuprice11").getValue();
                                           var totalmoney = num*price;
                                           Ext.getCmp("chukutotalmoneyid").setValue(totalmoney);
                                       }
                                   }
                               },
                               {
                                   fieldLabel:"出库时的成本单价",
                                   name:"sdelinfo.stockPrice",
                                   value:outstocklist.get("stockPrice")
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

                       if(form.isValid()){
                           form.submit({
                               url :"/outstock/outstocklist",
                               success : function(form,action){
                                   var msg = Ext.JSON.decode(action.response.responseText);
                                   if(msg.query){
                                       Ext.Msg.show({
                                           title : "系统提示",
                                           msg : msg.message,
                                           icon : Ext.Msg.WARNING,
                                           buttons : Ext.Msg.YES
                                       })
                                   }
                                   Ext.getCmp("oustocklistinfomatino").store.reload();
                                   Ext.getCmp("outstocklistwindow").close();
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
               },
               {
                   text:"重置",
                   handler:function(){
                       this.up("window").down("form").getForm().reset();
                   }
               }
           ]

       }).show();
    }
    },

    //删除明细信息和入库信息
    detadel:function(){
        var delrecode=Ext.getCmp("detallist").getSelectionModel().getSelection()[0];
        var outdetadel=delrecode.get("TMeOutStockInfoByOutBillCode.outBillCode");
        if(delrecode==null) {
            Ext.Msg.show({
                titel: "信息提示",
                msg: "请选择要删除的信息内容!",
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.YES
            });
        }else{
            Ext.Msg.show({
                title:"提示消息",
                msg:"你确定要删除出库单号为：【"+outdetadel+"】的明细信息",
                icon : Ext.Msg.WARNING,
                buttons : Ext.Msg.YES,
                fn:function(butn){
                    if(butn==="yes"){
                        Ext.Ajax.request({
                            url:"/outstock/outdetadel?ddss="+outdetadel,
                            success:function(response){
                                var mag=Ext.JSON.decode(response.responseText);
                                if(mag.query){
                                    var oustockdel=Ext.getCmp("oustocklistinfomatino").getSelectionModel().getSelection()[0];
                                    var detss=oustockdel.get("outBillCode")
                                    Ext.Msg.show({
                                        title:"提示信息",
                                        msg:"出库单号为【"+detss+"】的明细信息已经删除对应的订单下为空是否删除对应的出库单信息？",
                                        icon:Ext.Msg.WARNING,
                                        buttons:Ext.Msg.YES,
                                        fn:function(bbtn){
                                            if(bbtn==="yes"){
                                                Ext.Ajax.request({
                                                    url:"/outstock/outstockdel?ssdd="+detss,
                                                    success:function(response){
                                                        var mag=Ext.JSON.decode(response.responseText);
                                                        if(mag.query){
                                                            Ext.Msg.show({
                                                                title:"提示信息",
                                                                msg:mag.message,
                                                                icon:Ext.Msg.WARNING,
                                                                buttons:Ext.Msg.YES
                                                            });
                                                        }
                                                        Ext.getCmp("oustocklistinfomatino").store.reload();
                                                        Ext.getCmp("detallist").store.reload();
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