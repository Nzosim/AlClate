<?php

namespace alclate\api\app\actions;

use alclate\api\app\renderer\JSONRenderer;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class PostRetardAction
{

    private ContainerInterface $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args)
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $this->container->get('retards.service')->postRetard($data);
        }catch (\Exception $e){
            $data = [
                "message" => "400 Bad Request",
                "exception" => [[
                    "type" => "Slim\\Exception\\HttpBadRequestException",
                    "message" => $e->getMessage(),
                    "code" => $e->getCode(),
                    "file" => $e->getFile(),
                    "line" => $e->getLine(),
                ]]
            ];
            $code = 400;

            return JSONRenderer::render($rs, $code, $data)
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Methods', 'POST' )
                ->withHeader('Access-Control-Allow-Credentials', 'true')
                ->withHeader('Content-Type', 'application/json');
        }

        return JSONRenderer::render($rs, 200, [])
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Methods', 'POST' )
            ->withHeader('Access-Control-Allow-Credentials', 'true')
            ->withHeader('Content-Type', 'application/json');
    }
}

