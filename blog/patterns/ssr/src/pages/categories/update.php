<?php

$db = require __DIR__ . "/../../db.php";

$id = $this->params[0];

$category = ["name" => $_POST["name"]];

if (empty($category["name"])) {
    $error = "category name cannot be empty!";
    http_response_code(422);
    require __DIR__ . "/../categories/edit.php";
    return;
}

pg_query_params($db, "update category set modified = now(), name = $1 where id = $2", [$category["name"], $id]);

header("Location: /categories/$id");
exit();
