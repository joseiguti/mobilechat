<?php
namespace WebSocketServer\Clases;

use SplObjectStorage;
use Ratchet\ConnectionInterface;

/**
 *
 * @author joseiguti
 *        
 */
class Ping implements \T4web\Websocket\Handler\HandlerInterface
{
    public function handle($eventName, array $data, ConnectionInterface $connection, SplObjectStorage $connections)
    {
        $response = [
            'event' => 'pong',
            'data' => $data,
            'error' => null,
        ];
        $connection->send(json_encode($response));
    }
    
}

