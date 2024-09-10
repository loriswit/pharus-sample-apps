<?php

$db = require __DIR__ . "/../../db.php";

$id = $this->params[0];

$query = pg_query_params($db, "select name from category where id = $1", [$id]);
$category = pg_fetch_assoc($query);

$newCategory = false;

?>

<h1>Edit category</h1>

<?php require "templates/form.php" ?>

<script defer>
    nameInput.select()
</script>
