Ext.define("MainList",{
    extend:"Ext.container.Viewport",
    dobutton : function(){
        Ext.require("js.MerchandiseInfoShow",function(){
            var obj = Ext.create("js.MerchandiseInfoShow");
            var center = Ext.getCmp("mytabPanel");
            var tab = center.items.get("findcode");//这里面是要展示的页面的id值
            if(!tab){
                center.add(obj);
                center.setActiveTab(obj);
            }else{
                if(center.setActiveTab()!==tab){
                    center.setActiveTab(tab);
                }
            }
        })
    },
    mecher: function(){
        Ext.require("js.SupplySelect",function(){
            var obj = Ext.create("js.SupplySelect");
            var center = Ext.getCmp("mytabPanel");
            var tab = center.items.get("SupplySelect");
            if(!tab){
                center.add(obj);
                center.setActiveTab(obj);
            }else{
                if(center.setActiveTab()!==tab){
                    center.setActiveTab(tab);
                }
            }

        })
    },
    Instore: function(){
        Ext.require("js.Instore",function(){
            var obj = Ext.create("js.Instore");
            var center = Ext.getCmp("mytabPanel");
            var tab = center.items.get("mInstore");
            if(!tab){
                center.add(obj);
                center.setActiveTab(obj);
            }else{
                if(center.setActiveTab()!==tab){
                    center.setActiveTab(tab);
                }
            }

        })
    },
    StockInfo: function(){
        Ext.require("js.StockInfo",function(){
            var obj = Ext.create("js.StockInfo");
            var center = Ext.getCmp("mytabPanel");
            var tab = center.items.get("stockes");
            if(!tab){
                center.add(obj);
                center.setActiveTab(obj);
            }else{
                if(center.setActiveTab()!==tab){
                    center.setActiveTab(tab);
                }
            }

        })
    },
    stashow: function(){
        Ext.require("js.Stashow",function(){
            var obj = Ext.create("js.Stashow");
            var center = Ext.getCmp("mytabPanel");
            var tab = center.items.get("stashows");
            if(!tab){
                center.add(obj);
                center.setActiveTab(obj);
            }else{
                if(center.setActiveTab()!==tab){
                    center.setActiveTab(tab);
                }
            }

        })
    },
    mch: function(){
        Ext.require("js.Merchanc",function(){
            var obj = Ext.create("js.Merchanc");
            var center = Ext.getCmp("mytabPanel");
            var tab = center.items.get("merch");
            if(!tab){
                center.add(obj);
                center.setActiveTab(obj);
            }else{
                if(center.setActiveTab()!==tab){
                    center.setActiveTab(tab);
                }
            }

        })
    },
    uinfo: function(){
        Ext.require("js.Unitinfo",function(){
            var obj = Ext.create("js.Unitinfo");
            var center = Ext.getCmp("mytabPanel");
            var tab = center.items.get("unitinf");
            if(!tab){
                center.add(obj);
                center.setActiveTab(obj);
            }else{
                if(center.setActiveTab()!==tab){
                    center.setActiveTab(tab);
                }
            }

        })
    },
    jinhuol: function(){
        Ext.require("js.jinhuo",function(){
            var center = Ext.getCmp("mytabPanel");
            var tab = center.items.get("jinhuogoods");
            if(!tab){
                var obj = Ext.create("js.jinhuo");
                center.add(obj);
                center.setActiveTab(obj);
            }else{
                if(center.setActiveTab()!==tab){
                    center.setActiveTab(tab);
                }
            }

        },this);
    },
    //商品出库
    chuku:function(){
        Ext.require("js.OutStocklist",function(){
            var center=Ext.getCmp("mytabPanel")//获取要显示到什么地方panel的id值
            var tab=center.items.get("oustocklistinfomatino")//用获取到的显示的位置id值获取到将要显示的东西的id
            if(!tab){
                var obj=Ext.create("js.OutStocklist")//创造要显示的东西
                center.add(obj);
                center.setActiveTab(obj)
            }else{
                if(center.setActiveTab()!==tab){
                    center.setActiveTab(tab);
                }
            }
        });

    },
    initComponent:function(){
        var me =this;
        Ext.apply(this,{
                layout: 'border',
                border:false,
                items:[
                    {
                        region: 'north',
                        height:91,
                        bodyStyle:'background:url(images/top.jpg) repeat;'

                    }, {
                        titleAlign:"center",
                        region:'east',
                        border:false,
                        split: true,
                        width:200,
                        xtype:"panel",
                        bodyStyle:'background:url(images/leftback.jpg)',
                        margin:"0 5 0 0",
                        items:[

                            {

                               // text:"首页",
                                margin:"30 0 0 20 ",
                                xtype:"button",
                                width:160,
                                height:33,
                                border:false,
                                style: {
                                    background:"#3b78ce"
                                },
                                html:'<div style="background-image:url(images/left/shouye.jpg);height:24px;width:160px"></div>'
                            },
                            {
                                //text:"商品信息",
                                margin:"10 0 0 20 ",
                                xtype:"button",
                                width:160,
                                height:33,
                                border:false,
                            menu:[
                                {
                                    border:false,
                                    width:155,
                                    text:"商品信息",
                                    handler : me.dobutton
                                },
                                {
                                    border:false,
                                    width:155,
                                    text:"商品类别管理",
                                    handler:me.mch
                                },
                                {
                                    border:false,
                                    width:155,
                                    text:"计量单位管理",
                                    handler:me.uinfo
                                },
                                {
                                    border:false,
                                    width:155,
                                    text: "商品促销状态管理",
                                    handler:me.stashow
                                }
                            ],

                                style: {
                                    background:"#3b78ce"
                                },
                                html:'<div style="background-image:url(images/left/shangpin.jpg);height:24px;width:160px"></div>'
                            },
                            {

                                //text:"供应商信息",
                                margin:"10 0 0 20 ",
                                xtype:"button",
                                width:160,
                                height:33,
                                border:false,
                                style: {
                                    background:"#3b78ce"
                                },
                                handler : me.mecher,
                                html:'<div style="background-image:url(images/left/gongyingshang.jpg);height:24px;width:160px"></div>'
                            },
                            {

                                //text:"库存信息",
                                margin:"10 0 0 20 ",
                                xtype:"button",
                                width:160,
                                height:33,
                                border:false,
                                style: {
                                    background:"#3b78ce"
                                },
                                handler:me.Instore,
                                html:'<div style="background-image:url(images/left/kucun.jpg);height:24px;width:160px"></div>'
                            },
                            {
                                //text:"进货",
                                margin:"10 0 0 20 ",
                                xtype:"button",
                                width:160,
                                height:33,
                                border:false,
                                style: {
                                    background:"#3b78ce"
                                },
                                handler:me.jinhuol,
                                html:'<div style="background-image:url(images/left/ruku.jpg);height:24px;width:160px"></div>'

                            },{

                                //text:"出库管理",
                                margin:"10 0 0 20 ",
                                xtype:"button",
                                width:160,
                                height:33,
                                border:false,
                                handler:me.chuku,
                                style: {
                                    background:"#3b78ce"
                                },
                                html:'<div style="background-image:url(images/left/chukuguanli.jpg);height:24px;width:160px"></div>'
                            },{

                                //text:"出库",
                                margin:"10 0 0 20 ",
                                xtype:"button",
                                width:160,
                                height:33,
                                border:false,
                                style: {
                                    background:"#3b78ce"

                                },
                                html:'<div style="background-image:url(images/left/chuku.jpg);height:24px;width:160px"></div>'

                            },
                            {

                                //text:"操作员信息",
                                margin:"10 0 0 20 ",
                                xtype:"button",
                                width:160,
                                height:33,
                                border:false,
                                style: {
                                    background:"#3b78ce"
                                }
                            },
                            {

                                //text:"物流信息",
                                margin:"10 0 0 20 ",
                                xtype:"button",
                                width:160,
                                height:33,
                                border:false,
                                style: {
                                    background:"#3b78ce"
                                },
                                html:'<div style="background-image:url(images/left/wuliu.jpg);height:24px;width:110px"></div>'
                            },
                            {

                                //text:"会员信息",
                                margin:"10 0 0 20 ",
                                xtype:"button",
                                width:160,
                                height:33,
                                border:false,
                                style: {
                                    background:"#3b78ce"
                                },
                                html:'<div style="background-image:url(images/left/huiyuan.jpg);height:24px;width:160px"></div>'
                            },
                            {
                                //text:"订单信息",
                                margin:"10 0 0 20 ",
                                xtype:"button",
                                width:160,
                                height:33,
                                border:false,
                                style: {
                                    background:"#3b78ce"
                                },
                                html:'<div style="background-image:url(images/left/dingdan.jpg);height:24px;width:160px"></div>'
                            },
                            {

                                //text:"系统设置",
                                margin:"10 0 0 20 ",
                                xtype:"button",
                                width:160,
                                height:33,
                                border:false,
                                style: {
                                    background:"#3b78ce"
                                },
                                html:'<div style="background-image:url(images/left/shezhi.jpg);height:24px;width:160px"></div>'
                            },




                        ]
                        //items:[
                        //
                        //    {
                        //        //首页
                        //        xtype:"button",
                        //        width:230,
                        //        height:33,
                        //        border:false,
                        //
                        //    },
                        //    {
                        //
                        //        xtype:"button",
                        //        width:230,
                        //        height:33
                        //    },
                        //
                        //    {
                        //        //供应商
                        //        xtype:"button",
                        //        width:155,
                        //        height:60,
                        //
                        //        border:false,
                        //        handler : me.mecher
                        //    },
                        //
                        //    {
                        //        //库存信息
                        //        xtype:"button",
                        //        width:155,
                        //        height:60,
                        //
                        //        border:false,
                        //        menu:[
                        //            {
                        //                text: '商品库存种类',
                        //                handler:me.StockInfo
                        //            },
                        //            {
                        //                text: '商品库存信息',
                        //                handler:me.StockInfo
                        //            },
                        //            {
                        //                text: '入库管理',
                        //                handler:me.Instore
                        //            },
                        //            {text: '出库管理'},
                        //            {
                        //                text:'购买货物',
                        //                handler:me.jinhuol
                        //            }
                        //        ]
                        //
                        //    },
                        //
                        //    {
                        //        //商品信息
                        //        xtype:"button",
                        //        width:155,
                        //        height:60,
                        //
                        //        border:false,
                        //        menu:[
                        //            {text:"商品信息",
                        //                handler : me.dobutton
                        //            },
                        //            {
                        //                text:"商品类别管理",
                        //                handler:me.mch
                        //            },
                        //            {
                        //                text:"计量单位管理",
                        //                handler:me.uinfo
                        //            },
                        //            {
                        //                text:"商品促销状态管理",
                        //                handler:me.stashow
                        //            }
                        //        ]
                        //
                        //
                        //    },
                        //
                        //    {
                        //        //会员信息
                        //        xtype:"button",
                        //        width:155,
                        //        height:60,
                        //
                        //        border:false
                        //    },
                        //
                        //    {
                        //        //订单信息
                        //        xtype:"button",
                        //        width:155,
                        //        height:60,
                        //
                        //        border:false
                        //    },
                        //
                        //    {
                        //        //物流信息
                        //        xtype:"button",
                        //        width:155,
                        //        height:60,
                        //
                        //        border:false
                        //    },
                        //
                        //    {
                        //        //操作员信息
                        //        xtype:"button",
                        //        width:155,
                        //        height:60,
                        //
                        //        border:false
                        //    }
                        //]
                },{
                        region: 'center',
                        id:"mytabPanel",
                        xtype:"tabpanel",
                        id:"centershow",
                        items:[
                            {
                                title:"首页",
                                layout:{
                                    type: 'table',

                                    columns: 5
                                },
                                margin:"60 0 0 125",
                                items:[
                                    {
                                        width:182,
                                        height:182,
                                        xtype:"button",
                                        border:false,
                                        style: {
                                            background:"#ffffff"
                                        },
                                        html:'<div style="background-image:url(images/center/chuku.jpg);height:160px;widows:160;px"></div>'

                                    },{
                                        width:50,
                                        height:182,
                                        border:false

                                    },{

                                        width:182,
                                        height:182,
                                        xtype:"button",
                                        border:false,
                                        style: {
                                            background:"#ffffff"
                                        },
                                        html:'<div style="background-image:url(images/center/kucun.jpg);height:160px;widows: 160;px"></div>'
                                    },{
                                        width:50,
                                        border:false,
                                        height:182
                                    },
                                    {
                                        width:182,
                                        height:182,
                                        xtype:"button",
                                        border:false,
                                        style: {
                                            background:"#ffffff"
                                        },
                                        html:'<div style="background-image:url(images/center/shangpin.jpg);height:160px;widows: 160;px"></div>'
                                    },
                                    {
                                        width:182,
                                        border:false,
                                        height:50

                                    },{
                                        width:50,
                                        border:false,
                                        height:50

                                    },{

                                        width:182,
                                        border:false,
                                        height:50
                                    },{
                                        width:50,
                                        border:false,
                                        height:50
                                    },
                                    {
                                        width:182,
                                        border:false,
                                        height:50
                                    },
                                    {
                                        width:182,
                                        height:182,
                                        xtype:"button",
                                        border:false,
                                        style: {
                                            background:"#ffffff"
                                        },
                                        html:'<div style="background-image:url(images/center/tongji.jpg);height:160px;widows: 160;px"></div>'
                                    },
                                    {
                                        width:50,
                                        border:false,
                                        height:182
                                    },
                                    {
                                        width:182,
                                        height:182,
                                        xtype:"button",
                                        border:false,
                                        style: {
                                            background:"#ffffff"
                                        },
                                        html:'<div style="background-image:url(images/center/ruku.jpg);height:160px;widows:160;px"></div>'
                                    },
                                    {
                                        width:50,
                                        border:false,
                                        height:182
                                    },
                                    {
                                        width:182,
                                        height:182,
                                        xtype:"button",
                                        border:false,
                                        style: {
                                            background:"#ffffff"
                                        },
                                        html:'<div style="background-image:url(images/center/xiaoshou.jpg);height:160px;widows: 160;px"></div>'
                                    }
                                ]
                            }
                        ]
                },
                    {
                        region: 'west',
                        width: 190,
                        title:"菜单栏",
                        layout: 'accordion',
                        collapsible: true,
                        split: true

                    }
                ]

            });
        this.callParent()
    },
});
