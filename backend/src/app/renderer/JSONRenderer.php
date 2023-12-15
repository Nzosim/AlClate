<?php

namespace alclate\api\app\renderer;

use Psr\Http\Message\ResponseInterface as Response;

class JSONRenderer
{
    public static function render(Response $rs, int $code, mixed $data = null): Response
    {
        $rs = $rs->withStatus($code)->withHeader('Content-Type', 'application/json;charset=utf-8');
        if (!is_null($data)) $rs->getBody()->write(json_encode($data));
        return $rs;
    }
}