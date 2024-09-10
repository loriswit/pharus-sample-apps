<?php

$db = require __DIR__ . "/../../db.php";

$query = pg_query($db, "select id, name from category order by name");
$categories = pg_fetch_all($query);

$newPost = true;
if (!isset($post))
    $post = ["title" => "", "author" => "", "categoryid" => $_GET["category"] ?? "", "content" => ""];

?>

<h1>New post</h1>

<?php require "templates/form.php" ?>
