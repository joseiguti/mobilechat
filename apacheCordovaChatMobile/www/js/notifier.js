		notifier_number = 0,
		inc = 1,
		function(i) {
			i
					.extend({
						notifier : function(o) {
							var e = {
								message : "this is your notifier message",
								color1 : "white",
								color2 : "black",
								delay : "0",
								closeButton : "",
								popup : "#showEvent",
								popupContent: "#showEventContent",
								historical_id: "0",
							};
									notifier_number++,
									o = i.extend(e, o),
									"text" != o.closeButton ? i("body").append(
											"<div align='center' id='notifierblock"
													+ notifier_number + "'><a>"
													+ o.message
													+ "</a><a id='notifierbttn"
													+ notifier_number
													+ "'>X</a></div>")
													
											: i("body").append("<div align='center' id='notifierblock"+ notifier_number+ "'><a>"
															+ o.message
															+ "</a><a id='notifierbttn"+ notifier_number+ "' herf='"+o.popup+"'>Ver</a></div>"),
																	
									i("body").append("<div id='notifierfun"
															+ notifier_number
															+ "'><script>$('#notifierbttn"
															+ notifier_number
															+ "').click(function(){ if ('"+o.historical_id+"' != 0){ updatePopupShowEvent('"+o.popupContent+"','"+o.historical_id+"'); $( '"+o.popup+"' ).popup( 'open' ); }   $('#notifierblock"
															+ notifier_number
															+ "').animate({'top': '-=100%'}, function(){$('#notifierblock"
															+ notifier_number
															+ "').remove();$('#notifierfun"
															+ notifier_number
															+ "').remove();});});</script></div>"),
															
									i("#notifierblock" + notifier_number).css({
										position : "fixed",
										top : "-100%",
										width : "100%",
										height : "auto",
										"text-align" : "center",
										"font-size" : "13px",
										"background-color" : o.color1,
										padding : "1%",
										border : "solid",
										"border-color" : o.color1,
										color : o.color2
									}), "text" == o.closeButton ? i(
											"#notifierbttn" + notifier_number)
											.css({
												color : o.color1,
												"background-color" : o.color2,
												padding : "5px",
												"padding-left" : "15px",
												"padding-right" : "15px",
												"margin-left" : "25px",
												"border-radius" : "5px",
												cursor : "pointer"
											}) : i(
											"#notifierbttn" + notifier_number)
											.css({
												color : o.color1,
												"background-color" : o.color2,
												padding : "5px",
												"padding-left" : "9px",
												"padding-right" : "9px",
												right : "2%",
												"margin-top" : "1.5%",
												"border-radius" : "100px",
												position : "absolute",
												cursor : "pointer"
											}), i(
											"#notifierblock" + notifier_number)
											.delay(1e3 * o.delay - 1e3)
											.animate({
												top : "+=100%"
											});

							var n = function(o) {
								inc++, i("#notifierblock" + o).css({
									"z-index" : 9999999 + inc
								})
							};

							setTimeout(n, 1e3 * o.delay - 1e3, notifier_number)
return notifier_number;
						}
					})
		}(jQuery);