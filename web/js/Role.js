Ext.define('js.Role', {
    extend: "Ext.panel.Panel",

    initComponent: function () {
        var me = this;
        var store = Ext.create("Ext.data.Store", {
                id: "mestore",
                pageSize:5,
                proxy: {
                    type: 'ajax',
                    url: "/role/roleinfomation",
                    reader: {
                        type: 'json',
                        root: 'listrole',//根节点
                        totalProperty: 'rows'//总数
                    }
                },
                fields: [
                    "roleId","roleName","sortId","state"
                ],
                autoLoad: false
            }
        );
        store.load({
            params: {
                start: 0,
                limit:5
            }
        });



        var checkBox = Ext.create('Ext.selection.CheckboxModel');
        Ext.apply(this, {
            closable:true,
            title:"操作员种类和操作权限",
            titleAlign:"center",
            width:1000,
            id:"relaygoplay",
            height:400,
            layout:"border",
            items:[
                {
                    region:"west",
                    id: "roleinfomation",
                    closable:true,
                    title: '操作员种类',
                    titleAlign:"center",
                    store: store,
                    selModel:checkBox,
                    border:false,
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
                                        text:"查看用户权限",
                                        iconCls:'leaf',
                                        handler:function(){
                                            var ttsd = record.get("roleId");
                                            //查看权限的数据源
                                            Ext.Ajax.request({
                                                url: "/oper/selectshowtreelist?selectrolcode="+ ttsd,
                                                async : false,
                                                success : function(response){
                                                    me.mydataone=response.responseText;
                                                    if(typeof(me.mydataone)==="string"){
                                                        me.mydataone = Ext.JSON.decode(response.responseText);
                                                    }
                                                    me.mychidren = me.mydataone.node.children;
                                                    Ext.getCmp("treepanelid").getRootNode().removeAll(false);
                                                    Ext.getCmp("treepanelid").setRootNode(me.mydataone.node);
                                                    Ext.getCmp("treepanelid").getRootNode().data.text= record.data.roleName;
                                                    Ext.getCmp("treepanelid").expandAll();
                                                }
                                            });

                                            }
                                    }
                                ]
                            }).showAt(e.getXY());//让右键菜单跟随鼠标位置
                        }
                    },
                    xtype:"grid",
                    columns: [
                        {header:"权限id",dataIndex:"roleId",width:150},
                        {header:"管理员种类名称",dataIndex:"roleName",width:200},
                        //{header:"排序编码",dataIndex:"sortId"},
                        {header:"使用状态 ",dataIndex:"state",width:150}
                    ],
                    width:672,
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
                        {text:"增加管理员种类",
                            handler:function(){
                                me.roleinsert(me)
                            }
                        },
                        {text:"删除管理员",
                            handler:function(){
                                me.reoldel(me)
                            }
                        },
                        {text:"修改管理员信息",
                            handler:function(){
                                me.reolupdate()
                            }},
                    ]
                },{
                    title:"操作权限",
                    titleAlign:"center",
                    width:290,
                    region:"east",
                    border:false,
                    items : [{
                        xtype:"treepanel",
                        id : "treepanelid",
                        split: true,
                        store:Ext.create("Ext.data.TreeStore",{
                            fields : [
                                {name :"text",type :"string", mapping : "menu.menuName"}
                            ],
                            root: {
                                id : "-1",//这里面是防止乱序的，
                                text : "权限查询",//这里是在不加载是显示的根节点
                                children:me.mychidren
                            }})
                    }]
                }
            ]
        });
        this.callParent();
    },
    //增加管理员种类
    roleinsert:function(relin){
        //树的数据源
        Ext.Ajax.request({
            url : "/oper/showtreelist",
            async : false,
            success : function(response){
                jsonData=response.responseText;
                if(typeof(jsonData)==="string"){
                    jsonData = Ext.JSON.decode(response.responseText);
                }
            }
        });
        var treestoreshowlist = Ext.create("Ext.data.TreeStore",{
            fields : [
                {name :"text",type :"String", mapping : "menu.menuName"},
                {name :"id",type :"int", mapping : "menu.menuId"}
            ],
            root: {
                id:"childrenlistmenu",
                children:jsonData.node.children
            }
        });

        //状态数据源
        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"True", "name":"使用"},
                {"abbr":"False", "name":"停用"},
            ]
        });

        Ext.create("Ext.window.Window",{
            width:280,
            height:500,
            id:"rolewidowshow",
            layout:"border",
           items:[
               {
                   title:"操作员种类添加",
                   titleAlign:"center",
                   region:"north",
                   border:false,
                   defaults: {
                       margin:"10 0 0 0 ",
                       xtype: 'textfield',
                       labelWidth:100,
                       labelAlign: 'right'
                   },
                   xtype:"form",
                   id:"formsubmitsss",
                   items:[
            {
                fieldLabel:"权限id",
                    name:"roleId"
            },
            {
                fieldLabel:"管理名称",
                name:"roleName"
            },
            {
                fieldLabel:"排序id",
                name:"sortId"
            }, {
                xtype: 'combobox',
                fieldLabel: '使用状态',
                store: states,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'abbr',
                name:"state",
                margin:"10 0 10 0"
                       }
                   ]
               },
               {
                   region: 'south',
                   width:200,
                   height:240,
                   border:false,
                   xtype:"treepanel",
                   rootVisible: false,
                   store:treestoreshowlist,
                   split: true,
                   id:"windowshowtreepanel"
               }

           ],
            buttonAlign:"center",
            buttons:[
                {text:"添加",
                handler: relin.roelreply

                },
                {text:"重置",
                handler:function(){
                    this.up("window").down("form").getForm().reset();
                }}
            ]

        }).show();
    },
    //注册提交
    roelreply:function(){

        var realform = Ext.getCmp("formsubmitsss").query();
        var childersmu = Ext.getCmp("windowshowtreepanel").getChecked();
        var treearray = new Array();
        Ext.each(childersmu,function(node,index){
            if(node.data.id!="-1"){
                treearray[index]={};
                treearray[index].menuId=node.data.id;
            }
        });
        var roleform = {};
        Ext.each(realform, function (item) {
            if (item) {
                if (item.xtype == 'combobox' || item.xtype == 'textfield') {
                    roleform[item.name] = item.lastValue;
                }
            }
        });
        var form= Ext.create("Ext.form.Panel",{

        });
        if(form.isValid()){
            form.submit({
                url:"/oper/qunxiantianjia",
                jsonSubmit : true,
                params : {
                    rlosinfo:roleform,
                    dds : treearray
                },
                success:function(form,action){
                    var mag=Ext.JSON.decode(action.response.responseText)
                    if(mag.query){
                        Ext.Msg.show({
                            title:"信息提示",
                            msg:mag.message,
                            icon:Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES
                        });

                        Ext.getCmp("roleinfomation").store.reload();
                        Ext.getCmp("rolewidowshow").close();
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
            })
        }
},
    //多条删除
    reoldel:function(){
        var record = Ext.getCmp("roleinfomation").getSelectionModel().getSelection();
        var list="";
        for(var i= 0,len=record.length;i<len;i++){
            list+=record[i].get("roleId")
                if(i!=len   -1){
                    list += ","
                }
        }
        Ext.Msg.show({
            title : "系统提示",
            msg : "确定要删除【"+len+"】条吗?",
            icon : Ext.Msg.WARNING,
            buttons : Ext.Msg.YESNO,
            fn:function(bton){
                if(bton==="yes"){
                    Ext.Ajax.request({
                        url:"/role/roledel?reolist="+list,
                        success : function(response){
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title : "系统提示",
                                msg : msg.message,
                                icon : Ext.Msg.WARNING,
                                buttons : Ext.Msg.YES
                            });
                            Ext.getCmp("roleinfomation").store.reload();
                        },
                        failure : function(response){
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title : "系统提示",
                                msg : msg.message,
                                icon : Ext.Msg.WARNING,
                                buttons : Ext.Msg.YES
                            });
                        }
                    });
                }
            }
        });
    },
    //修改信息
    reolupdate:function(uprel){
        var updatessstates = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"True", "name":"使用"},
                {"abbr":"False", "name":"停用"},
            ]
        });
        Ext.Ajax.request({
            url : "/oper/showtreelist",
            async : false,
            success : function(response){
                jsonData=response.responseText;
                if(typeof(jsonData)==="string"){
                    jsonData = Ext.JSON.decode(response.responseText);
                }
            }
        });
        var treestoreupdatelist111 = Ext.create("Ext.data.TreeStore",{
            fields : [
                {name :"text",type :"String", mapping : "menu.menuName"},
                {name :"id",type :"int", mapping : "menu.menuId"}
            ],
            root: {
                id:"childrenlistmenu",
                children:jsonData.node.children
            }
        });
        var ssmmd = Ext.getCmp("roleinfomation").getSelectionModel().getSelection()[0];
        if(ssmmd==null){
            Ext.Msg.show({
                title:"信息提示",
                msg:"请选择要修改的内容",
                icon:Ext.Msg.WARNING,
                buttons : Ext.Msg.YES
            });
        }else{
        Ext.create("Ext.window.Window",{
           title:"信息的修改",
            titleAlign:"center",
            layout:"border",
            width:300,
            height:470  ,
            xtype:"form",
            id:"updatewindouinss",
            items:[
                {
                    xtype:"form",
                    region:"north",
                    width:310,
                    items:[
                        {
                            defaults:{
                                xtype:"textfield",
                                labelWidth:100,
                                labelAlign:"right",
                                margin:"10 0 0 0 "
                            },
                            items:[
                                {
                                    readOnly:true,
                                    fieldLabel:"权限id",
                                    value:ssmmd.get("roleId"),
                                    name:"roleId"
                                },
                                {
                                    fieldLabel:"管理员种类名称",
                                    value:ssmmd.get("roleName"),
                                    name:"roleName"
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '使用状态',
                                    store: updatessstates,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'abbr',
                                    name:"state",
                                    margin:"10 0 10 0"
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'south',
                    width:290,
                    height:252,
                    xtype:"treepanel",
                    rootVisible: false,
                    store:treestoreupdatelist111,
                    split: true,
                    margin:"0 2 0 2",
                    id:"checkyudatelist"
                }
            ],
            buttonAlign:"center",
            buttons:[
                {
                    text:"提交",
                    handler:function(){
                        var uprealform = Ext.getCmp("updatewindouinss").query();
                        var upchildersmu = Ext.getCmp("checkyudatelist").getChecked();
                        var uptreearray = new Array();
                        Ext.each(upchildersmu,function(node,index){
                            if(node.data.id!="-1"){
                                uptreearray[index]={};
                                uptreearray[index].menuId=node.data.id;
                            }
                        });
                        var uproleform = {};
                        Ext.each(uprealform, function (item) {
                            if (item) {
                                if (item.xtype == 'combobox' || item.xtype == 'textfield') {
                                    uproleform[item.name] = item.lastValue;
                                }
                            }
                        });
                        var form= Ext.create("Ext.form.Panel",{

                        });
                        if(form.isValid()){
                            form.submit({
                                url:"/oper/updaatelistmue",
                                jsonSubmit : true,
                                params : {
                                    uprlosinfo:uproleform,
                                    updds:uptreearray
                                },
                                success:function(form,action){
                                    var mag=Ext.JSON.decode(action.response.responseText)
                                    if(mag.query){
                                        Ext.Msg.show({
                                            title:"信息提示",
                                            msg:mag.message,
                                            icon:Ext.Msg.WARNING,
                                            buttons : Ext.Msg.YES
                                        });
                                        Ext.getCmp("roleinfomation").store.reload();
                                        Ext.getCmp("updatewindouinss").close();
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
                            })
                        }
                    }
                },
                {
                    text:"重置",
                    handler:function(){
                        this.up("window").down("form").getForm().reset()
                    }
                }
            ]
        }).show();
        }
    }
});
