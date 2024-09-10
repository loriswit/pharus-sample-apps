<?php

$db = require __DIR__ . "/../../db.php";

$id = $this->params[0];

$query = pg_query($db, "select id, name from category order by name");
$categories = pg_fetch_all($query);

$query = pg_query_params($db, "select title, author, content, categoryid from post where id = $1", [$id]);
$post = pg_fetch_assoc($query);

$newPost = false;

?>

<h1>Edit post</h1>

<?php require "templates/form.php" ?>
