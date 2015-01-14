Ext.define("js.Kucuntongji",{
    extend:"Ext.chart.Chart",
    initComponent:function(){
        var me=this;
        var store = Ext.create('Ext.data.JsonStore',{
            proxy: {
                type: 'ajax',
                url: "/stocks/StockInfo",
                reader: {
                    type: 'json',
                    root: 'listStockInfo'
                }
            },
            fields: ["avgPrice","num","TMeMerchandiseInfoByMerchandiseId.merchandiseName"],

            autoLoad:true

        });
        Ext.apply(this, {
            title:"库存数量统计图",
            id:"kucuntongjijs",
            closable:true,
            width: 350,
            height: 350,
            animate: true,
            store: store,
            theme: 'Base:gradients',
            shadaow : true,
            legend : {
              position : "right"
            },
            series: [{
                type: 'pie',
                angleField: 'num',
                showInLegend: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    height: 28,
                    renderer: function(storeItem, item) {
                        var total = 0;
                        store.each(function(rec) {
                            total += rec.get('num');
                        });
                        this.setTitle(storeItem.get('TMeMerchandiseInfoByMerchandiseId.merchandiseName') + ': ' + Math.round(storeItem.get('num') ) );
                    }
                },
                highlight: {
                    segment: {
                        margin:10
                    }
                },
                label: {
                    field: 'TMeMerchandiseInfoByMerchandiseId.merchandiseName',
                    display: 'rotate',
                    contrast: true,
                    font: '18px Arial',
                    hideLessThan: 18
                }
            }]
        });
        this.callParent();
    }
});
