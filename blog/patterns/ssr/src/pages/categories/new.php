<?php

$db = require __DIR__ . "/../../db.php";

$newCategory = true;
if (!isset($category))
    $category = ["name" => ""];

?>

<h1>New category</h1>

<?php require "templates/form.php" ?>
