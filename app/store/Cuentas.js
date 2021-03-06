Ext.define('myMoney.store.Cuentas',{
	extend: 'Ext.data.Store',
	requires:"Ext.data.proxy.LocalStorage",
	
	config: {
		model: 'myMoney.model.Name',
		autoLoad: true,
		
		proxy: {
            type: 'localstorage',
            id: 'data-cuentas-id'
        },
		
		sorters: [{property: 'name'}, {direction: 'DESC'}],
	}
});