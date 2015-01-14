Ext.define("js.Unitinfo",{
    extend: "Ext.grid.Panel",
    initComponent:function(){
       var store=Ext.create("Ext.data.Store",{
           pageSize:5,
            id:"danwei",
             proxy:{
                 type:"ajax",
                 url:"/goodsinfo/UnitInfo",
                 reader:{
                     type:"json",
                     root:"listUnitInfo",
                     totalProperty: 'rows'
                 }
             },
           fields:[
                {name:"unitId",type:"byte"},
                {name:"name",type:"String"},
                {name:"status",type:"Boolean"},
                {name:"remark",type:"String"}
            ],
           autoLoad:false
        });
        store.load({
            params: {
                start: 0,
                limit: 5
            }
        });
        var checkBox = Ext.create('Ext.selection.CheckboxModel');
        Ext.apply(this, {
            margin: 0,
            width: 500,
            id: "unitinf",
            selModel:checkBox,
            closable:true,
            title:"商品促销状态",
            titleAlign:"center",
            store: store,
            columns: [
                { header: '单位编码',  dataIndex: 'unitId' },
                { header: '名称', dataIndex: 'name'},
                { header: '状态',  dataIndex: 'status' },
                { header: '备注',  dataIndex: 'remark' }
            ],
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
                {text:"增加计量单位",
                    handler:function(){

                    }
                },
                {text:"删除计量单位",
                    handler:function(){

                    }
                }
            ]
        }),
        this.callParent();
    }
})
