<?php

$db = require __DIR__ . "/../../db.php";

$category = ["name" => $_POST["name"]];

if (empty($category["name"])) {
    $error = "category name cannot be empty!";
    http_response_code(422);
    require __DIR__ . "/../categories/new.php";
    return;
}

$result = pg_query_params($db, "insert into category (name) values ($1) returning id", [$category["name"]]);
$postId = pg_fetch_assoc($result)["id"];
header("Location: /categories/$postId");
exit();
