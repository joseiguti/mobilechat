
var isLogged = false;

var userLogged = '';

var gatewayURL = 'http://chat.localhost/web-socket-server';

var gatewayWS = 'ws://127.0.0.1:8082';

var connWS = null;

jQuery.support.cors = true;

mobiscroll.settings = {
	    theme: 'ios'
	};

$(function () {

    $('#ingresar').on('click', function () {
    	
    	if ($('#nickname').val() != ''){
    		
    		isLogged = true;
    		
    		userLogged = $('#nickname').val();
    		
    		$.mobile.changePage("#chat", "fade");
    		
    		$("#incomingMessages").scrollTop($("#incomingMessages")[0].scrollHeight);
    		
    		connWS.send(JSON.stringify({
    			
    			'user': userLogged,
    			
    			'msg': '<b>' + userLogged + '</b>' + " acaba de entrar en la sala",
    			
    			'type': "notification"
    			
    		}));
    		
    	}else{
    	
    		mobiscroll.toast({
                message: 'Ingrese un usuario'
            });
    		
    	}
        
        
    });
    
    $('#enviar').on('click', function () {
    	
    	if ($('#mensaje').val() != ''){
    	
    		var parametros = {
    				
                    "user": userLogged,
				
    				"text": $("#mensaje").val(),
            };
    		
    		$.ajax({
			
    			timeout: 3000,
			
    			url : gatewayURL + '/save-message',
			
    			type : 'POST',
			
    			data : parametros,
			
    			success : function(data, status, xhr) {
				
    				connWS.send(JSON.stringify({
    	    			
    					'type': 'chat',
    					
    	    			'msg': $("#mensaje").val(),
    	    			
    	    			'user': userLogged
    	    			
    	    		}));
    				
    				$('#incomingMessages').append('<div class=\'message\'><span class=\'username\'>'+userLogged+': </span>'+$("#mensaje").val()+'</div>');
    				
    				$("#incomingMessages").scrollTop($("#incomingMessages")[0].scrollHeight);
    				
    				$("#mensaje").val('');
    				
    				$("#mensaje").focus();
				
    			},
			
    			error : ajaxErrorHandler
			
    		});	
    	
    	}else{
    		
    		mobiscroll.toast({
    		    
    			message: "Escriba un mensaje"
    	    
    		});
    		
    	}
    	
    	
    });
    
    
});

$(document).ready(function () {
	
	if (userLogged == ''){
		
		$.mobile.changePage("#index", "fade");
		
	}
	
	connWS = new WebSocket(gatewayWS);
	
	connWS.onopen = function(e) {
		
		mobiscroll.toast({
		    
			message: "Bienevenido al chat Unimonito!"
	    
		});

	};
	
	connWS.onmessage = function(e) {
		
		if ($.mobile.activePage.attr('id') == 'chat') {
		
			var obj = JSON.parse(e.data);

			if (obj.type == 'notification'){
			
				mobiscroll.toast({
			    
					message: obj.msg
		    
				});
				
				$('#incomingMessages').append('<div class=\'message\'><span class=\'notification\'>'+obj.msg+'</span></div>');
				
				$("#incomingMessages").scrollTop($("#incomingMessages")[0].scrollHeight);
			}
			
			
			if (obj.type == 'chat'){
			
				$('#incomingMessages').append('<div class=\'message\'><span class=\'username\'>'+obj.user+': </span>'+obj.msg+'</div>');
				
				$("#incomingMessages").scrollTop($("#incomingMessages")[0].scrollHeight);
			}
			
		}

	};

	connWS.onerror = function(error) {
		
		mobiscroll.toast({
		    
			message: "Error conectando a web socket server"
	    
		});
		
	};

	connWS.onclose = function(event) {


	};
	
	
	$.ajax({
		
		timeout: 3000,
		
		url : gatewayURL + '/get-last-messages',
		
		cache : false,
		
		type : 'GET',
		
		success : function(data, status, xhr) {
	
			console.log(data);
			
			$.each(data.result, function(index, item) {
				
				$('#incomingMessages').append('<div class=\'message\'><span class=\'username\'>'+item.user+': </span>'+item.text+'</div>');
				
			});
			
		},
		
		error : ajaxErrorHandler
		
	});
	
});


function ajaxErrorHandler(xhr, ajaxOptions, thrownError) {
	
	msgError = '';
	
	if (ajaxOptions.statusText != null && ajaxOptions.statusText != '')
		
		msgError = msgError + '[' + ajaxOptions.statusText + ']';
	
	else if (thrownError != null && thrownError != '')
		
		msgError = msgError + '[' + thrownError + ']';
	
	else if (xhr != null && xhr.statusText != null && xhr.statusText != '')
		
		msgError = msgError + '[' + xhr.statusText + ']';
	
	msgError = msgError + ' (Estado: '+xhr.status+')';	

	mobiscroll.toast({
    
		message: msgError
    
	});

}