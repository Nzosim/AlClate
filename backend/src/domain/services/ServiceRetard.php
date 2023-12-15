<?php

namespace alclate\api\domain\services;

use alclate\api\domain\manager\BDDManager;

class ServiceRetard {

    public function getRetards() {
        try {
            $retards = BDDManager::getRetards();
        }catch(\Exception $e) {
            echo "Erreur : " . $e;
        }
        return $retards;
    }

    public function postRetard($retard) {
        try {
            BDDManager::postRetard($retard);
        }catch(\Exception $e) {
            echo "Erreur : " . $e;
        }
    }
}