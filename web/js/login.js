Ext.define("Login",{
    extend:"Ext.form.Panel",
    initComponent:function(){
        var me=this;
        Ext.apply(this, {
            layout:"form",
            height:180,
            width:220,
            border:false,
            items:[
                {
                    height:40,
                    xtype: 'textfield',
                    allowBlank: false,
                    blankText: "姓名不能为空",
                    name:"operinfo.operName"
                },
                {
                    border:false,
                    height:26
                },
                {
                    height:40,
                    blankText: "密码不能为空",
                    xtype: 'textfield',
                    allowBlank: false,
                    inputType: 'password',
                    name:"operinfo.pwd"
                }
            ],
            buttonAlign:"center",
            buttons: [
                {
                    height:35,
                    width:160,
                    text: "登陆",
                    handler:me.insertpeople,
                    bodyStyle:{
                        background:"#006cd4"
                    }
                }
            ]
        });

        this.callParent()
    },

    //登陆信息的提交
    insertpeople:function(){
        var form = this.up("form").getForm();
        if(form.isValid()){
            form.submit({
                url :"/oper/opercheck",
                success : function(form,action){
                    var mag = Ext.JSON.decode(action.response.responseText);
                    if(mag.operquery){
                        Ext.Msg.show({
                            title : "系统提示",
                            msg :mag.message,
                            icon : Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES
                        });
                        window.location="index.jsp"
                        //window.location = "index.jsp?oper.operName=" + Ext.getCmp("opername").value
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
