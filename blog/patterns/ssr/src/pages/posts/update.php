<?php

$db = require __DIR__ . "/../../db.php";

$id = $this->params[0];

$keys = ["title", "author", "content", "categoryid"];
$post = array_combine($keys,
    array_map(fn($key) => $_POST[$key] ?? null, $keys));

foreach ($post as $key => $value)
    if (empty($value)) {
        $error = "$key cannot be empty!";
        http_response_code(422);
        require __DIR__ . "/../posts/edit.php";
        return;
    }

pg_query_params($db,
    "update post set modified = now(), title = $1, author = $2, content = $3, categoryid = $4 where id = $5",
    [$post["title"], $post["author"], $post["content"], $post["categoryid"], $id]);

header("Location: /posts/$id");
exit();
