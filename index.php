<?php


/**
 * @package Chums
 * @subpackage ProjectedDemands
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2013, steve
 */

use chums\ui\WebUI2;
use chums\user\Groups;

require_once "autoload.inc.php";

$ui = new WebUI2([
    'title' => 'Report Scheduler',
    'bodyClassName' => 'container-fluid',
    'contentFile' => 'body.inc.php',
    'requiredRoles' => [Groups::ADMIN, Groups::REPADMIN],
]);
$ui->addManifestJSON('public/js/manifest.json')
    ->render();
