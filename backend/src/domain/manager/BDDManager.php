<?php

namespace alclate\api\domain\manager;

use alclate\api\domain\entities\Retard;
class BDDManager {

    public static function getRetards() {
        try {
            $retards = Retard::get();
        } catch (\Exception $e) {
            echo $e;
        }
        return $retards;
    }

    public static function postRetard($retards) {
        $late = Retard::create($retards);
        $late->save();
    }
}