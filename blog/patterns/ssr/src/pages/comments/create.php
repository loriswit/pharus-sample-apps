<?php

$db = require __DIR__ . "/../../db.php";

$postId = $this->params[0];

$keys = ["author", "content"];
$comment = array_combine($keys,
    array_map(fn($key) => $_POST[$key] ?? null, $keys));

foreach ($comment as $key => $value)
    if (empty($value)) {
        $error = "$key cannot be empty!";
        http_response_code(422);
        require __DIR__ . "/../posts/read.php";
        return;
    }

$result = pg_query_params($db, "insert into comment (postid, author, content) values ($1, $2, $3) returning id",
    [$postId, $_POST["author"], $_POST["content"]]);
$commentId = pg_fetch_assoc($result)["id"];

header("Location: /posts/$postId#comment-$commentId");
exit();
