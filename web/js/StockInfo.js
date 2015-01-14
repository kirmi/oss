Ext.define("js.StockInfo",{
    extend: "Ext.grid.Panel",
    initComponent: function () {

        var me=this;

        var store = Ext.create("Ext.data.Store", {
            autoLoad: false,
            id: "mystore",
            pageSize: 5,
            proxy: {
                type: 'ajax',
                url: "/stocks/StockInfo",
                reader: {
                    type: 'json',
                    root: 'listStockInfo',//根节点
                    totalProperty: 'rows'//总数
                }
            },
            fields: [
                {name: 'tMeMerchandiseInfoByMerchandiseId.merchandiseName', type: "String"},
                {name: 'avgPrice', type: "String"},
                {name: 'num', type: "int"}
            ]

        });
        store.load({
            params: {
                start: 0,
                limit: 5//第一页显示多少条
            }
        });
        Ext.apply(this,{

            title:"库存信息的管理",
            id:"stockes",
            store:store,
            columns:[
                {
                    width:330,
                    header:"商品名称",dataIndex:"TMeMerchandiseInfoByMerchandiseId.merchandiseName"
                },
                {
                    width:330,
                    header:"平均价格",dataIndex:"avgPrice"
                },{
                    width:351,
                    header:"库存数量",dataIndex:"num"
                }
            ],
            dockedItems:[
                {
                    xtype: 'pagingtoolbar',
                    store: store,
                    dock: 'bottom',
                    displayInfo: true
                }
            ],
            tbar:[
                {
                    fieldLabel: '库存数量',
                    xtype: 'textfield',
                    labelAlign:"right"
                },
                {
                    fieldLabel: '平均价格',
                    xtype: 'textfield',
                    labelAlign:"right"
                },
                {
                    xtype:"button",
                    text:"点击查询"
                }
            ]
        });
        this.callParent();
    }
});
