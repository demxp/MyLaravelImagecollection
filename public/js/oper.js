function showMessage(data){
	alert(data);
}

function fl(el, md){
	x = 500, originalColor = el.style.backgroundColor;
	el.style.backgroundColor = md;
	
	setTimeout(function(){
	  el.style.backgroundColor = originalColor;
	}, x);	
}

function conn(data){
	fetch('/admin/ajax', {
		method: 'post',
		headers: {  
      		"Content-type": "application/json; charset=UTF-8",
      		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')  
    	},  
    	body: JSON.stringify(data.params)
	})
  	.then(function(response) {
	    return response.json();
	}).then(function(req) {
    	if(req.status == 'ok'){
    		data.oncomplete();
    	}else{
    		data.onerror();
    		throw(req.message);
    	}
	}).catch(function(e){
		switch(e){
			case('ErrorOperation'):
				showMessage("Ошибочная операция");
				break;
			case('IncorrectInputData'):
				showMessage("Некорректные входные данные");
				break;
			case('NotEnoughRights'):
				showMessage("Не хватает прав для выполнения операции");
				break;
			default:
				showMessage(e);
				console.log(e);
				break;
		}
		return false;
	});	
}

jQuery(document.body).on("change",".selectcat",function(e){
	var dataobj = {
		params: {
			'id': $(e.target).closest('tr').data('imid'),
			'data': this.value,
			'command': 'setCategory',
			'group': 'imageOperation'
		},
		'oncomplete': function(){
			fl(e.target.parentNode, 'green');
		},
		'onerror': function(){
			fl(e.target.parentNode, 'red');
		}
	};

	conn(dataobj);
});

jQuery(document.body).on("click","div.imtitle",function(e){
	if(e.target.contentEditable === true){
		return;
	}
	e.target.contentEditable = true;
	e.target.focus();
	jQuery(this).on('keypress', function(e){
	    var keycode = (e.keyCode ? e.keyCode : e.which);
	    if(keycode == '13'){
	    	var text = $(this).text();
	    	var _this = this;
	    	if(text.length < 1){
	    		return alert("Мало букав");
	    	}
	    	setTimeout(function(){
				var dataobj = {
					params: {
						'id': $(e.target).closest('tr').data('imid'),
						'data': text,
						'command': 'setTitle',
						'group': 'imageOperation'						
					},
					'oncomplete': function(){
						$(_this).off('keypress');
						$(_this).text(text);
						_this.contentEditable = 'inherit';
						fl(e.target.parentNode, 'green');
					},
					'onerror': function(){
						$(_this).text("");						
						fl(e.target.parentNode, 'red');
					}
				};

				conn(dataobj);    
	    	})
	    }
	})
})

jQuery(document.body).on("change",".toggleimgvisible",function(e){
	var _this = this;
	var dataobj = {
		params: {
			'id': $(e.target).closest('tr').data('imid'),
			'data': (_this.checked) ? null : "on",
			'command': 'toggleVisibility',
			'group': 'imageOperation'
		},
		'oncomplete': function(){
			return;
		},
		'onerror': function(){
			(_this.checked) ? false : true;
		}
	};

	conn(dataobj);
});

jQuery(".setcattitle").on("click","button",function(e){
	var _this = this;
	var dataobj = {
		params: {
			'id': $(e.target).closest('tr').data('imid'),
			'data': $(e.target).closest('tr').data('imid'),
			'command': 'setCategoryTitleimage',
			'group': 'imageOperation'
		},
		'oncomplete': function(){
			var curr_cat = $(_this).closest('td').find('select').val()
			$(_this).closest('table').find('.setcattitle').map(function(i, elem){
				if($(elem).closest('td').find('select').val() == curr_cat){
					$(elem).removeClass('selected');
				}
			});
			$(_this).closest('.setcattitle').addClass('selected');
			return;
		},
		'onerror': function(){
			return;
		}
	};

	conn(dataobj);
});

jQuery(".imgactions").on("click",".delimage",function(e){
	if(!confirm("Вы уверены?")){
		return false;
	}
	var _this = this;
	var dataobj = {
		params: {
			'id': $(e.target).closest('tr').data('imid'),
			'data': '',
			'command': 'delImage',
			'group': 'imageOperation'
		},
		'oncomplete': function(){
			location.reload();
			return;
		},
		'onerror': function(){
			return;
		}
	};

	conn(dataobj);
});