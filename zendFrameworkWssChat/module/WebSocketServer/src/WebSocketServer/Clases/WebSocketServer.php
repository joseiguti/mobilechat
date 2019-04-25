<?php
namespace WebSocketServer\Clases;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class WebSocketServer implements MessageComponentInterface{

    protected $clients;
    
    protected $names = array ();
    
    public function __construct() {
        
        $this->clients = new \SplObjectStorage;
    }
    
    public function onOpen(ConnectionInterface $conn) {
        
        $this->clients->attach($conn);
        
        $this->names[$conn->resourceId] = 'noname';
        
        echo "Se inicia una conexion...\n";
        
    }
    
    public function onMessage(ConnectionInterface $from, $msg) {
        
        $structMsg = json_decode($msg);

        foreach ($this->clients as $client) {
            
            echo "Se envia un mensaje...\n";
            
            $this->names[$from->resourceId] = $structMsg->user;
            
            if ($from->resourceId != $client->resourceId)
            
                $client->send(json_encode(
                    
                    array(
                        
                        'type'=>$structMsg->type, 
                        
                        'msg'=> $structMsg->msg,
                        
                        'user'=>$structMsg->user)
                    
                ));
            
        }
        
    }
    
    public function onClose(ConnectionInterface $conn) {
        
        $this->onMessage($conn, json_encode(
                    
            array(
                        
            'type'=>'notification', 
                        
            'msg'=> '<b>'.$this->names[$conn->resourceId].'</b> acaba de salir del chat.',
                        
            'user'=>'')
                    
        ));
        
        $this->clients->detach($conn);
    
        echo "Se cierra una conexion...\n";
    }
    
    public function onError(ConnectionInterface $conn, \Exception $e) {
        
        $conn->close();
    }
    
}