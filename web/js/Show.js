Ext.define("js.Show",{
    extend:'Ext.chart.Chart',
    initComponent:function(){

        var store = Ext.create('Ext.data.JsonStore', {
            fields: ['name', 'data'],
            data: [
                { 'name': '香奈儿5号',   'data':426 },
                { 'name': '奥利奥',   'data': 2216 },
                { 'name': 'iphone', 'data': 111 },
                { 'name': '饼干',  'data': 333 },
                { 'name': '毛衣',  'data':333 }
            ]
        });

        Ext.apply(this,{
            title:"入库统计柱状图",
            closable:true,
            id:"zhuzhuangtulist",
            width: 500,
            height: 300,
            animate: true,
            store: store,
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: ['data'],
                    label: {
                        renderer: Ext.util.Format.numberRenderer('0,0')
                    },
                    title: '入库统计',
                    grid: true,
                    minimum: 0
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: 'Sample Metrics'
                }
            ],
            series: [
                {
                    type: 'column',
                    axis: 'left',
                    highlight: true,
                    tips: {
                        trackMouse: true,
                        width: 140,
                        height: 28,
                        renderer: function(storeItem, item) {
                            this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data') + ' $');
                        }
                    },
                    label: {
                        display: 'insideEnd',
                        'text-anchor': 'middle',
                        field: 'data',
                        renderer: Ext.util.Format.numberRenderer('0'),
                        orientation: 'vertical',
                        color: '#333'
                    },
                    xField: 'name',
                    yField: 'data'
                }
            ]
        })

        this.callParent()
    }
});


