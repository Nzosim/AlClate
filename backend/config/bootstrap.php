<?php

// namespace pizzashop\config;

use DI\ContainerBuilder;
use Slim\Factory\AppFactory;

$dependencies = require_once __DIR__ . '/services_dependencies.php';
$actions = require_once __DIR__ . '/actions_dependencies.php';

$builder = new ContainerBuilder();
$builder->addDefinitions($dependencies);
$builder->addDefinitions($actions);
$c = $builder->build();
$app = AppFactory::createFromContainer($c);

$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->setBasePath("/api");
$app->addErrorMiddleware(true, false, false);

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);

    if ($request->getMethod() == 'OPTIONS') {
        $response = $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Credentials', 'true');
    }

    return $response;
});

$capsule = new \Illuminate\Database\Capsule\Manager();
$capsule->addConnection(parse_ini_file(__DIR__ . '/db.env'));
$capsule->setAsGlobal();
$capsule->bootEloquent();

return $app;