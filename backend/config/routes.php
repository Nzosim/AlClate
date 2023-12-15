<?php
declare(strict_types=1);

use Slim\App;

return function (App $app): void {

    $app->get('/retards', $app->getContainer()->get('retards.get'))
        ->setName('get_retards');

    $app->post('/retards/add', $app->getContainer()->get('retard.post'))
        ->setName('add_retard');

};