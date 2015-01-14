Ext.define("js.Index",{
    extend:"Ext.container.Viewport",
    kucuntongji: function(){
        Ext.require("js.Kucuntongji",function(){
            var obj = Ext.create("js.Kucuntongji");
            var center = Ext.getCmp("centershow");
            var tab = center.items.get("kucuntongjijs");
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
    zhuzhuangturuku: function(){
        Ext.require("js.Show",function(){
            var obj = Ext.create("js.Show");
            var center = Ext.getCmp("centershow");
            var tab = center.items.get("zhuzhuangtulist ");
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
    zhuzhuangtuchuku: function(){
        Ext.require("js.Show",function(){
            var obj = Ext.create("js.XiaoLiang");
            var center = Ext.getCmp("centershow");
            var tab = center.items.get("zhexianshow ");
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
    initComponent:function(){
        this.createMenuList();
        var me =this;
        var opername = document.getElementById("aa").value;
        var rolename = document.getElementById("bb").value;
        Ext.Ajax.request({
            url : "/oper/indexshow",
            async : false,
            success : function(response){
                jsonData=response.responseText;
                if(typeof(jsonData)==="string"){
                    jsonData = Ext.JSON.decode(response.responseText);

                }
            }
        });
        var treestore = Ext.create("Ext.data.TreeStore",{
            fields : [
                {name :"text",type :"String", mapping : "menu.menuName"}
            ],
            root: {
                    //text: opername,
                    //id: '-1',
                children:jsonData.node.children
            }
        });
        Ext.apply(this,{
            layout: 'border',
            border:false,
            items:[
                {
                    region: 'north',
                    height:91,
                    bodyStyle:'background:url(images/top.jpg) repeat;',
                    layout: {
                        type: 'table',
                        columns: 5
                    },
                    defaults:{
                        margin:"62 0 0 10"
                    },
                    items:[
                        {
                            width:120,
                            html:"欢迎您："+rolename,
                            border:false,
                            bodyStyle:{
                                background:"#daedfe"
                            }
                        },{
                            width:1,
                            height:13
                        },{
                            width:50,
                            border:false,
                            html:opername,
                            bodyStyle:{
                                background:"#daedfe"
                            }
                        },
                        {
                            border:false,
                            margin:"62.7 0 0 1040   ",
                            items:[
                                {
                                    width: 120,
                                    xtype:"button",
                                    text:"注销当前用户",
                                    handler:function(){
                                        Ext.Msg.show({
                                            title : "系统提示",
                                            msg :"确定要注销当前用户吗？",
                                            icon : Ext.Msg.WARNING,
                                            buttons : Ext.Msg.YES,
                                            fn:function(bton){
                                                if(bton==="yes"){
                                                    window.location="login.jsp"
                                                }
                                            }
                                        });
                                    }
                                }

                            ]
                        }
                    ]
                },
                {
                    region: 'center',
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
                                    handler:me.zhuzhuangturuku,
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
                                    handler:me.zhuzhuangtuchuku,
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
                                    handler:me.kucuntongji,
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
                    region: 'east',
                    width:200,
                    title:"当前用户【"+opername+"】权限展示",
                    xtype:"Panel",
                    rootVisible: false,
                    store:treestore,
                    split: true
                },
                {
                    region: 'west',
                    width: 190,
                    title:"菜单栏",
                    layout: 'accordion',
                    collapsible: true,
                    split: true,
                    items: me.menuList
                }
            ]

        });
        this.callParent()
    },
        menuList: new Array(),
        createMenuList: function () {
            var menuData = {}, tpl, me = this;
            tpl = new Ext.XTemplate(
                '<tpl for=".">',
                '<div class="part01">',
                '<img src="{src}" style="margin-top:10px">',
                '<div class="con">',

                '<div class="con1">{remark}</div>',
                '</div>',
                '</div>',
                '</tpl>'
            );

            Ext.Ajax.request({
                url: '/oper/indexshow',
                async: false,
                success: function (response) {
                    menuData = Ext.JSON.decode(response.responseText);
                }
            });

            for (var i = 0, len = menuData.node.children.length; i < len; i++) {
                var storeID = 'store_' + i, item, title = menuData.node.children[i].menu.menuName;
                Ext.create('Ext.data.Store', {
                    id: storeID,
                    data: menuData.node.children[i].children,
                    fields: [
                        { name: 'src', type: 'string',mapping:"menu.src" },
                        { name: 'menuName', type: 'string',mapping : 'menu.menuName' },
                        { name: 'model', type: 'string' ,mapping:"menu.model"},
                        { name: 'tag', type: 'string',mapping:"menu.tag " }
                    ]
                });
                item = {
                    xtype: 'panel',
                    title: title,
                    titleAlign:"center",
                    layout: 'fit',
                    items: [
                        {
                            style: {
                                background:"#c6c1ff"
                            },
                            xtype: 'dataview',
                            store: Ext.data.StoreManager.lookup(storeID),
                            tpl: tpl,
                            itemSelector: 'div.part01',
                            listeners: {
                                itemclick: function (view, record) {
                                    Ext.require(record.get("model"), function () {
                                        var center = Ext.getCmp("centershow");
                                        var tag = center.items.get(record.get("tag"));
                                        if (!tag) {
                                            var obj = Ext.create(record.get("model"));
                                            center.add(obj);
                                            center.setActiveTab(obj);
                                        } else {
                                            if (center.setActiveTab() !== tag) {
                                                center.setActiveTab(tag);
                                            }
                                        }
                                    }, this);
                                }
                            }

                        }
                    ]
                };

                me.menuList.push(item);
            }
        }
});

