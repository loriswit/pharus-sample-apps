<?php

$db = require __DIR__ . "/../../db.php";

$keys = ["title", "author", "content", "categoryid"];
$post = array_combine($keys,
    array_map(fn($key) => $_POST[$key] ?? null, $keys));

foreach ($post as $key => $value)
    if (empty($value)) {
        $error = "$key cannot be empty!";
        http_response_code(422);
        require __DIR__ . "/../posts/new.php";
        return;
    }

$result = pg_query_params($db,
    "insert into post (title, author, content, categoryid) values ($1, $2, $3, $4) returning id",
    [$post["title"], $post["author"], $post["content"], $post["categoryid"]]);
$postId = pg_fetch_assoc($result)["id"];
header("Location: /posts/$postId");
exit();
