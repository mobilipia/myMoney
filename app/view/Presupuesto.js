Ext.define('myMoney.view.Presupuesto', {
	extend: 'Ext.form.Panel',
	alias: 'widget.presupuesto',
	id: 'presId',
	
	requires: ['Ext.SegmentedButton'],
	
	config: {
		scrollable: true,
		fullscreen: true,
		align: 'center',
		styleHtmlContent: true
	},
	
	initialize: function(){
		this.callParent(arguments);
		
		var field = {
			xtype: 'numberfield',
			name: 'montoBase',
			label: 'Monto Mensual',
			value: 0,
			minValue: 0,
		};
		
		var  buttonEA = {
			xtype: 'segmentedbutton',

			items: [
			{text: 'Editar', ui: 'action', id: 'bEdita'},
			{text: 'Bloquear', ui: 'action', id: 'bAcepta'}
			]
		};
		
		var buttonReturn = {
			xtype: 'button',
			ui: 'back',
			text: 'Atras',
			handler: this.backView,
			scope: this
		};
		
		var topBar = {
			xtype: 'toolbar',
			docked: 'top',
			title: 'Presupuesto',
			
			items: [buttonReturn, {xtype: 'spacer'}]
		};
		
		//Boton que muestra el menu
		var menuButton = {
			iconMask: true,
			id: 'menuB',
			ui: 'plain',
			iconCls: 'organize',
			handler: this.showMenu,
			scope: this,
		};
		
		var bottomBar = {
			xtype: 'toolbar',
			docked: 'bottom',
			items: [{xtype: 'spacer'}, menuButton]
		};
		
		this.add([topBar,buttonEA,  
				{xtype: 'fieldset', id: 'myFSm', title: 'Monto Base', instructions: 'Indique el monto mensual aproximado para la creacion del presupuesto', 
				items: [field]},
				{xtype: 'fieldset', id: 'myFSp', title: 'Parametros', instructions: 'Valores ideales de gastos para el cumplimiento del presupuesto',
				}, bottomBar]);
				
		this.fillParametres();
	},
	
	showMenu: function(){
		this.fireEvent('showMenuCommand');
	},
	
	fillParametres: function(){
		this.fireEvent('fillParametresCommand');
	},
	
	backView: function(){
		this.fireEvent('backViewCommand');
	}
});