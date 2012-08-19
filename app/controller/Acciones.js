Ext.define('myMoney.controller.Acciones', {
    extend: 'Ext.app.Controller',
	
	requires: [
		'Ext.field.Select',
		'Ext.field.Number',
		'Ext.field.DatePicker',
		'Ext.ActionSheet'
	],
	    
	config: {
        refs: {
			acciones: 'acciones',
			transaccion: 'transaccion',
			presupuesto: 'presupuesto',
			mainView: 'mainView',
			
        },
        control: {
			'acciones list':{
				itemtap: 'showDetails'
			},
			
			transaccion:{
				needBack: 'needBack',
				saveTransCommand: 'saveTransCommand'
			},
			
			presupuesto: {
				showMenuCommand: 'showMenuCommand',
				fillParametresCommand: 'fillParametresCommand',
				backViewCommand: 'needBack'
			},
			
			'presupuesto #bEdita': {
				tap: 'editaPCommand'
			},
			
			'presupuesto #bAcepta': {
				tap: 'editaPCommand'
			}
        }
    },
	
	animacionIzq: {type: 'slide', direction: 'left'},
	animacionDer: {type: 'slide', direction: 'right'},
	
	//Funciones de ayuda
	
	getTheData: function(theStore){
		var store = Ext.getStore(theStore);
		var dataClass = store.getData();
		
		return dataClass;
	},
	
	isTimeToSave: function(myInfo, model){
		var myStore = Ext.getStore('Transacciones');
		myStore.add(myInfo);
		myStore.sync();
		Ext.Msg.alert('Hecho', 'La informacion se ha almacenado satisfactoriamente');
		
		console.log('Estoy editando?'+this.getTransaccion().miEstado());
		if(this.getTransaccion().miEstado()==false){
			console.log('Entre a reset');
			model.reset();
		}
		
		//var edito = this.getTransaccion().verificaEdicion();
	},
	
	muestraVentana: function(record){
		var transaccEditor = this.getTransaccion();
		transaccEditor.setRecord(record);
		Ext.Viewport.animateActiveItem(transaccEditor, this.animacionIzq);
	},
	
	//Traducir la fecha
	translateMyDate: function(miMes, miDia, full){
	//Meses
	switch (miMes){
		case 'Jan': miMes = 'Ene';
		break;
		case 'Feb': miMes = 'Feb';
		break;
		case 'Mar': miMes = 'Mar';
		break;
		case 'Apr': miMes = 'Abr';
		break;
		case 'May': miMes = 'May';
		break;
		case 'Jun': miMes = 'Jun';
		break;
		case 'Jul': miMes = 'Jul';
		break;
		case 'Aug': miMes = 'Ago';
		break;
		case 'Sep': miMes = 'Sep';
		break;
		case 'Oct': miMes = 'Oct';
		break;
		case 'Nov': miMes = 'Nov';
		break;
		case 'Dec': miMes = 'Dic';
		break;
	}
	//Meses
	switch (miDia){
		case 'Mon': miDia = 'Lun';
		break;
		case 'Tue': miDia = 'Mar';
		break;
		case 'Wed': miDia = 'Mie';
		break;
		case 'Thu': miDia = 'Jue';
		break;
		case 'Fri': miDia = 'Vie';
		break;
		case 'Sat': miDia = 'Sab';
		break;
		case 'Sun': miDia = 'Dom';
		break;
	}
	
	},
	
	//Regresar al menu de acciones
	needBack: function(){
		Ext.Viewport.animateActiveItem(this.getMainView(), this.animacionDer)
	},
	
	//Editor de Presupuesto
	fillParametresCommand: function(){
		//Se incorporan las categorias del store dentro del fieldset de los parametros
		var dataClass = this.getTheData('Presupuestos');
		
		Ext.getCmp('myFSp').removeAll(true, true);
		
		for (i=0; i<dataClass.all.length; i++){		
			var field = {
				xtype: 'numberfield',
				name: dataClass.all[i].data.name,
				label: dataClass.all[i].data.name,
				value: dataClass.all[i].data.monto,
				minValue: 0,
			};
		
		Ext.getCmp('myFSp').add(field);
		Ext.getCmp('myFSp').setDisabled(true);
		Ext.getCmp('myFSm').setDisabled(true);
		}
	},
	
	editaPCommand: function(button){
		if(button.getId()=='bEdita'){
			Ext.getCmp('myFSp').setDisabled(false);
			Ext.getCmp('myFSm').setDisabled(false);
		}else{
			Ext.getCmp('myFSp').setDisabled(true);
			Ext.getCmp('myFSm').setDisabled(true);
		}
	},
	
	showMenuCommand: function(){
		
		myMenu = Ext.Viewport.add({
			xtype: 'actionsheet',
			items: [{text: 'Guardar',ui: 'confirm', handler: this.savePresupuesto, scope: this},
					{text: 'Cancelar', handler: function(){myMenu.hide()}},
					{text: 'Borrar',ui: 'decline'},
			]	
		});
	},
	
	//Guardando Presupuesto
	savePresupuesto: function(){
		
		var store = Ext.getStore('Presupuesto');
		var model = this.getPresupuesto();
		var values = model.getValues();
		
		//Gestion del Monto base lo obtengo a traves de: (model.getItems().map.myFSm.items.items[0]);
		
		/*var montoMensual = (model.getItems().map.myFSm.items.items[0]);
		if(null == store.findRecord('name', montoMensual.getName())){
			store.add({name: montoMensual.getName()}, {monto: 0});
		}else{
			var index = store.findExact('name', montoMensual.getName());
			var record = store.getAt(index);
			record.set('monto', montoMensual.getValue());
		}*/
		
		//Ruta de los Parametros del presupuesto y si se sustituye getLabel por getValue obtenemos el valor
		//model.getItems().map.myFSp.items.items[0].getLabel()
		
		var info = model.getItems().map.myFSp.items.items;
		for (i=0; i<store.getCount(); i++){
			if(null != store.findRecord('name', info[i].getLabel())){
				var index = store.findExact('name', info[i].getLabel());
				var record = store.getAt(index);
				record.set('monto', info[i].getValue());
			}
		}
		
		store.sync();	
		myMenu.hide();
	},
	
	//Guardado de las Transacciones
	saveTransCommand: function(){
		var model = this.getTransaccion();
		var valoresActuales = model.getRecord();
		var values = model.getValues();
		
		//Formato de Fecha con mm/dd/yyyy
		//console.log(model.getItems().items[1].items.items[4].getFormattedValue());
		
		//Se traduce la fecha:
		//console.log(model.getItems().items[1].items.items[4].getValue());
		
		this.translateMyDate(values.fecha);
		
		//Actualizo los campos del contacto para luego poder usar el metodo de validacion sobre mi modelo
		valoresActuales.set('clasificacion',values.clasificacion);
		valoresActuales.set('descripcion',values.descripcion);
		valoresActuales.set('monto',values.monto);
		valoresActuales.set('cuenta',values.cuenta);
		valoresActuales.set('date',values.fecha);
		
		var errors = valoresActuales.validate();
		//Muestro el error si existe alguno
		if(errors.items.length!=0){
			for(i=0;i<errors.length;i++){
			Ext.Msg.alert('Espera!', errors.items[i].getMessage(), Ext.emptyFn);}
			return;
		}else{
		//Guardo los valores porque no hubo ningun error
			if(values.clasificacion==null||values.cuenta==null){
				Ext.Msg.confirm('Seguro?', 
				'Los valores en blanco seran guardados con el nombre de "Otros" desea continuar?',
				function(buttonId, value){
					if(buttonId=='yes'){
						valoresActuales.set('clasificacion', 'Otros'); valoresActuales.set('cuenta', 'Otros');
						this.isTimeToSave(valoresActuales, model);
					}else{return;}
				});
			}else{this.isTimeToSave(valoresActuales, model);}
		}
	},
	
	//Muestra vistas
	showDetails: function(list, index, element, record){
		switch(index){
		case 0:
			var myInfo = Ext.create('myMoney.model.Transaccion', {
				"clasificacion": "Otros",
				"descripcion": "",
				"monto": "",
				"cuenta": "Otros",
				"date": "",
			}); 
			
			this.muestraVentana(myInfo);
		break;
		
		case 1: 
			Ext.Viewport.animateActiveItem(this.getPresupuesto(), this.animacionIzq);
		break;
		}
	},
});
