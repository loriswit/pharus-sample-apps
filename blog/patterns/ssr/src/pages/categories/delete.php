<?php

$db = require __DIR__ . "/../../db.php";

$id = $this->params[0];

pg_query_params($db, "delete from category where id = $1", [$id]);

header("Location: /categories");
exit();
