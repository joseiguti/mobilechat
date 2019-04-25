<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'WebSocketServer\Controller\WebSocketServer' => 'WebSocketServer\Controller\WebSocketServerController',
        ),
    ),
    'router' => array(
				'routes' => array(
						'web-socket-server' => array(
								'type'    => 'segment',
								'options' => array(
										'route'    => '/web-socket-server[/:action][/:lat][/:lng]',
										'constraints' => array(
												'action' 		=> '[a-zA-Z][a-zA-Z0-9_-]*',
										        'lat'           => '-?\d+(.\d+)?',
										        'lng'           => '-?\d+(.\d+)?',
										),
										'defaults' => array(
												'controller' => 'WebSocketServer\Controller\WebSocketServer',
												'action'     => 'index',
										),
								),
						),
				),
	),
    
    'console' => array(
        'router' => array(
            'routes' => array(
                
                'web-socket-server' => array(
                    'options' => array(
                        // add [ and ] if optional ( ex : [<doname>] )
                        'route' => 'web-socket-server',
                        'defaults' => array(
                            '__NAMESPACE__' => 'WebSocketServer\Controller',
                            'controller' => 'WebSocketServer',
                            'action' => 'index'
                        ),
                    ),
                ),
                
            )
        )
    ),
    
    'view_manager' => array(
        'template_path_stack' => array(
            'WebSocketServer' => __DIR__ . '/../view',
        ),
    ),
);
