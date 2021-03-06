Ext.define('myMoney.store.Clasificacion',{
	extend: 'Ext.data.Store',
	requires:"Ext.data.proxy.LocalStorage",
	
	config: {
		model: 'myMoney.model.Name',
		autoLoad: true,
		
		proxy: {
			type: 'localstorage',
			id: 'classid'
		},
		
		sorters: [{property: 'name'}, {direction: 'DESC'}],
	}
});