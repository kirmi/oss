Ext.define("js.OperInfoshow",{
    extend: "Ext.grid.Panel",
    initComponent:function(){
        var me=this;
        var store = Ext.create("Ext.data.Store", {
            //id: "operalistdata",
            pageSize: 2,
            proxy: {
                type: 'ajax',
                url:"oper/operinfolist",
                reader: {
                    type: 'json',
                    root: 'operlist',//根节点
                    totalProperty: 'rows'//总数
                }
            },
            fields:["operId","TAuRoleInfoByRoleId.roleName","operName","pwd","address","linkTel","qq","email","mobile","sortId","state"],

            autoLoad:false

        });
        store.load({
            params: {
                start: 0,
                limit: 2//一页显示多少条记录
            }
        });
        var checkBox = Ext.create('Ext.selection.CheckboxModel');
        Ext.apply(this, {
            id: "jsoperinfostoreshow",
            closable:true,
            margin: 0,
            title: '管理员信息',
            titleAlign:"center",
            store: store,
            selModel:checkBox,
            columns: [
                { header: '操作员编码',  dataIndex: 'operId' },
                { header: '角色名称', dataIndex: 'TAuRoleInfoByRoleId.roleName'},
                { header: '操作员名称', dataIndex: 'operName' },
                { header: '密码',  dataIndex: 'pwd' },
                { header: '地址', dataIndex: 'address'},
                { header: '联系电话', dataIndex: 'linkTel' },
                { header: 'QQ',  dataIndex: 'qq' },
                { header: 'Email', dataIndex: 'email'},
                { header: '排序编码', dataIndex: 'sortId' },
                { header: '状态',  dataIndex: 'state' }
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
                {text:"增加管理员",
                    handler:function(){
                        me.insertopera(me)
                    }

                },
                {
                    text:"删除管理员信息",
                    handler:me.operdelist

                },
                {text:"修改管理员信息",
                    handler:function(){
                        me.upopera(me)
                    }
                }
            ]
            //tbar:[
            //    {
            //        fieldLabel:'操作员权限名称',
            //        xtype: 'textfield',
            //        labelAlign:"right",
            //        id:'supinf',
            //        name:"selectsuply"
            //    },
            //    {   xtype: 'button',
            //        text: '点击查询',
            //        handler:me.selectinfo
            //    }
            //]
        });

        this.callParent();
    },

    //操作员信息的注册
    insertopera:function(inoper){
        inoper.storekind = Ext.create("Ext.data.Store", {
            proxy: {
                type: 'ajax',
                url: "/role/roleinfomation",
                reader: {
                    type: 'json',
                    root: 'listrole'
                }
            },
            fields: [
                "roleId","roleName","sortId","state"
            ],
            autoLoad: true
        });
        Ext.create("Ext.window.Window", {
            title:"商品信息管理",
            titleAlign:"center",
            layout:"form",
            frame: true,
            bodyPadding:5,
            width:350,
            id:"operinfoshowindow",
            border:false,
           items:[
               {
                   defaults: {
                       xtype: 'textfield',
                       labelWidth:100,
                       labelAlign: 'right'
                   },
                   xtype:"form",
                   items: [
                       {
                           fieldLabel:"操作员id",
                           name:"operin.id"

                       },
                       {
                           fieldLabel:"操作员编码",
                           name:"operin.operId"

                       },
                       {
                           fieldLabel:"角色名称",
                           xtype:"combobox",
                           store: inoper.storekind,
                           queryMode:'local',
                           displayField:"roleName",
                           valueField:"roleId",
                           name:"operin.TAuRoleInfoByRoleId.roleId"
                       },
                       {
                           fieldLabel:"操作员名称",
                           name:"operin.operName",
                           maxLength : 20,//允许输入的最大字符数
                           maxLengthText : "用户帐号最大长度不能超过20个字符！",
                           minLength : 3, //允许输入的最少字符数
                           minLengthText : "用户帐号最小长度不能少于3个字符！"
                       },
                       {
                           fieldLabel:"密码",
                           name:"operin.pwd"

                       },
                       {
                           fieldLabel:"地址",
                           name:"operin.address"
                       },
                       {
                           fieldLabel:"联系电话",
                           name:"operin.linkTel"
                       },
                       {
                           fieldLabel:"QQ",
                           name:"operin.qq"
                       },
                       {
                           fieldLabel:"Email",
                           name:"operin.email"
                       },
                       {
                           fieldLabel:"手机号码",
                           name:"operin.mobile"
                       },
                       {
                           fieldLabel:"排序编码",
                           name:"operin.sortId"
                       },
                       {
                           fieldLabel:"状态",
                           xtype: 'fieldcontainer',
                           defaultType: 'radiofield',
                           layout:"column",
                           items:[
                               {
                                   boxLabel  : '使用',
                                   name      : 'operin.state',
                                   inputValue: 'True',
                                   id        : 'stat21'
                               }, {
                                   boxLabel  : '停用',
                                   name      : 'operin.state',
                                   inputValue: 'False',
                                   id        : 'stat2'
                               }
                           ]
                       }
                   ]
               }
           ],
            buttonAlign:"center",
            buttons: [
                { text: "添加",
                    handler:inoper.insertpeople},
                { text: "重置",
                    handler: function () { this.up("window").down("form").getForm().reset(); } }
            ]
        }).show();
    },
    //注册提交
    insertpeople:function(){
    var form = this.up("window").down("form").getForm();
    if(form.isValid()){
        form.submit({
            url :"/oper/operinfoinsert",
            success : function(form,action){
                var msg = Ext.JSON.decode(action.response.responseText);
                if(msg.query){
                    Ext.Msg.show({
                        title : "系统提示",
                        msg : msg.message,
                        icon : Ext.Msg.WARNING,
                        buttons : Ext.Msg.YES
                    });

                    Ext.getCmp("jsoperinfostoreshow").store.reload();
                    Ext.getCmp("operinfoshowindow").close();
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
    },
    //多条信息的删除
    operdelist:function(){
        var operrecode= Ext.getCmp("jsoperinfostoreshow").getSelectionModel().getSelection();
        var list="";
        for(var i= 0,len=operrecode.length;i<len;i++){
            list+=operrecode[i].get("operId")
            if(i!=len-1){
                list+=","
            }
        if(operrecode==null){
            Ext.Msg.show({
                title:"系统提示",
                msg:"请选择要修改的信息",
                icon:Ext.Msg.WARNING,
                buttons: Ext.Msg.YES
            });
        }else{

            Ext.Msg.show({
                title:"系统提示",
                msg:"确定要删除"+len+"条记录？",
                icon:Ext.Msg.WARNING,
                buttons: Ext.Msg.YES,
                fn:function(bton){
                    if(bton==="yes"){
                        Ext.Ajax.request({
                            url:"/oper/operdel?reolist="+list,
                            success:function(response){
                                var mag=Ext.JSON.decode(response.responseText);
                                Ext.Msg.show({
                                    title : "系统提示",
                                    msg : mag.message,
                                    icon : Ext.Msg.WARNING,
                                    buttons : Ext.Msg.YES
                                });
                                Ext.getCmp("jsoperinfostoreshow").store.reload();
                            },
                            failure:function(response){
                                var mag =Ext.JSON.decode(response.responseText);
                                Ext.Msg.show({
                                    title:"",
                                    msg:mag.message,
                                    icon:Ext.Msg.WARNING,
                                    buttons:Ext.msg.YES
                                });
                            }
                        });
                    }
                }
            });
            }
        }
    },
    //修改I信息
    upopera:function(upo){
        upo.storeupkind = Ext.create("Ext.data.Store", {
            proxy: {
                type: 'ajax',
                url: "/role/roleinfomation",
                reader: {
                    type: 'json',
                    root: 'listrole'
                }
            },
            fields: [
                "roleId","roleName","sortId","state"
            ],
            autoLoad: true
        });
        var delrecode=Ext.getCmp("jsoperinfostoreshow").getSelectionModel().getSelection()[0];
        if(delrecode==null){
            Ext.Msg.alert("信息提示","请选择要修改的内容")
        }else{
        Ext.create("Ext.window.Window",{
            title:"操作员信息的修改",
            width:300,
            id:"windowoperlistupdate1",
            items:[
                {
                    xtype:"form",
                    defaults:{
                        xtype:"textfield",
                        labelAlign:"right",
                        labelWidth:100
                    },
                    items:[
                        {
                            defaults: {
                                xtype: 'textfield',
                                labelWidth:100,
                                labelAlign: 'right'
                            },
                            xtype:"form",
                            items: [
                                {
                                    fieldLabel:"操作员id",
                                    name:"updaopera.id",
                                    value:delrecode.get("id")

                                },
                                {
                                    fieldLabel:"操作员编码",
                                    name:"updaopera.operId",
                                    value:delrecode.get("operId")

                                },
                                {
                                    fieldLabel:"角色名称",
                                    xtype:"combobox",
                                    store:upo.storeupkind,
                                    queryMode:'local',
                                    displayField:"roleName",
                                    valueField:"roleId",
                                    name:"updaopera.TAuRoleInfoByRoleId.roleId"
                                },
                                {
                                    fieldLabel:"操作员名称",
                                    name:"updaopera.operName",
                                    value:delrecode.get("operName")

                                },
                                {
                                    fieldLabel:"密码",
                                    name:"updaopera.pwd",
                                    value:delrecode.get("id")

                                },
                                {
                                    fieldLabel:"地址",
                                    name:"updaopera.address",
                                    value:delrecode.get("address")
                                },
                                {
                                    fieldLabel:"联系电话",
                                    name:"updaopera.linkTel",
                                    value:delrecode.get("linkTel")
                                },
                                {
                                    fieldLabel:"QQ",
                                    name:"updaopera.qq",
                                    value:delrecode.get("id")
                                },
                                {
                                    fieldLabel:"Email",
                                    name:"updaopera.email",
                                    value:delrecode.get("email")
                                },
                                {
                                    fieldLabel:"手机号码",
                                    name:"updaopera.mobile",
                                    value:delrecode.get("mobile")
                                },
                                {
                                    fieldLabel:"排序编码",
                                    name:"updaopera.sortId",
                                    value:delrecode.get("sortId")
                                },
                                {
                                    fieldLabel:"状态",
                                    xtype: 'fieldcontainer',
                                    defaultType: 'radiofield',
                                    layout:"column",
                                    items:[
                                        {
                                            boxLabel  : '使用',
                                            name      : 'updaopera.state',
                                            inputValue: 'True',
                                            id        : 'stat21'
                                        }, {
                                            boxLabel  : '停用',
                                            name      : 'updaopera.state',
                                            inputValue: 'False',
                                            id        : 'stat2'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            buttonAlign:"center",
            buttons:[
                {
                    text:"提交",
                    handler:upo.xinxitijioa
                },
                {
                    text:"重置",
                    handler:function(){
                        this.up("window").down("form").getForm().reset();
                    }
                }
            ]
        }).show();}
},
    xinxitijioa:function(){
       var form= this.up("window").down("form").getForm();
        if(form.isValid()){
            form.submit({
                url:"/oper/upoperdel",
                success:function(form,action){
                    var mag=Ext.JSON.decode(action.response.responseText);
                    if(mag.query){
                        Ext.Msg.show({
                            title:"信息提示",
                            msg:mag.message,
                            icon:Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES
                        });
                        Ext.getCmp("jsoperinfostoreshow").store.reload();
                        Ext.getCmp("windowoperlistupdate1").close();
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
