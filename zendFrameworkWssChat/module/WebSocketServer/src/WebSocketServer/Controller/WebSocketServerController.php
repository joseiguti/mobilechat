<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/WebSocketServer for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace WebSocketServer\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\Console\Request as ConsoleRequest;
use WebSocketServer\Clases\WebSocketServer;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use T4web\Websocket\Client;

class WebSocketServerController extends AbstractActionController
{
    private $ngrestEndPoint = "http://localhost:8080";
    
    public function saveMessageAction (){
        
        $postData = $this->getRequest()->getPost();
        
        $this->layout('layout/ajax_layout.phtml');
        
        if (isset($postData->user) && isset($postData->text)){
        
            header('Content-Type: application/json');
            
            $data = array("user" => $postData->user, "text" => $postData->text);
            
            $data_string = json_encode($data);
             
            $ch = curl_init($this->ngrestEndPoint.'/chats/add');
            
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
            
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            
                'Content-Type: application/json',
            
                'Content-Length: ' . strlen($data_string))
            );
             
            $result = curl_exec($ch);
            
            return array ('result' => $result);
            
        }
        
    }
    
    public function getLastMessagesAction (){
        
        $postData = $this->getRequest()->getPost();
        
        $this->layout('layout/ajax_layout.phtml');
        
        header('Content-Type: application/json');
            
        $curl = curl_init();
            
        curl_setopt_array($curl, [
                
                CURLOPT_RETURNTRANSFER => 1,
                
                CURLOPT_URL => $this->ngrestEndPoint.'/chats/getMessages'
        ]);
            
        $resp = curl_exec($curl);
            
        curl_close($curl);
            
        return array('result'=>$resp);
    }
    
    public function indexAction(){
        
        error_reporting(E_ERROR | E_PARSE);
        
        $request = $this->getRequest();
        
        // Make sure that we are running in a console and the user has not tricked our
        // application into running this action from a public web server.
        if (! $request instanceof ConsoleRequest) {
            
            throw new \RuntimeException('You can only use this action from a console!');
            
        }
        
        $web_socket_port = 8082;

        $server = IoServer::factory(new HttpServer(new WsServer(new WebSocketServer())), $web_socket_port, '127.0.0.1');
        
        $server->run();
    }
    
    
    public function fooAction()
    {
        // This shows the :controller and :action parameters in default route
        // are working when you browse to /webSocketServer/web-socket-server/foo
        return array();
    }
}
