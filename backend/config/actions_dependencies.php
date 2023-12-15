<?php

use alclate\api\app\actions\GetRetardsAction;
use alclate\api\app\actions\PostRetardAction;
use Psr\Container\ContainerInterface;

return [
    'retards.get' => function (ContainerInterface $c) {
        return new GetRetardsAction($c);
    },
    'retard.post' => function (ContainerInterface $c) {
        return new PostRetardAction($c);
    }
];
