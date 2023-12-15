<?php

use alclate\api\domain\services\ServiceRetard;

return [
    'retards.service' => function () {
        return new ServiceRetard();
    }
];
