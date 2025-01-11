<?php

namespace App\Services;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQService
{
    public function publish($message): void
    {
        try {
            $connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
            $channel = $connection->channel();

            $channel->exchange_declare('code', 'direct', false, false, false);

            $msg = new AMQPMessage(
                $message,
                array('content_type' => 'application/json; charset=utf-8')
            );

            $channel->basic_publish($msg, 'code', 'process_code');

            $channel->close();
            $connection->close();
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }
}
