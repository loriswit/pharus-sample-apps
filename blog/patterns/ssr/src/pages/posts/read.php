<?php

require __DIR__ . "/../../../vendor/autoload.php";
$db = require __DIR__ . "/../../db.php";

$id = $this->params[0];

$query = pg_query_params($db,
    "select title, author, content, post.created, post.modified, categoryid, category.name as category
    from post
    join category on post.categoryid = category.id
    where post.id = $1", [$id]);
$post = pg_fetch_assoc($query);

if (!$post)
    throw new Exception("not found", 404);

$query = pg_query_params($db,
    "select id, author, content, created, modified
    from Comment
    where postid = $1
    order by created", [$id]);
$comments = pg_fetch_all($query);

if (!isset($comment))
    $comment = ["content" => "", "author" => ""];

$Parsedown = new Parsedown();

function formatDate1($str): string
{
    $date = new DateTimeImmutable($str);
    return $date->format("l, j F Y");
}

function formatDate2($str): string
{
    $date = new DateTimeImmutable($str);
    return $date->format("j F Y, H:i");
}

?>

<header class="post-header">
    <h1><?= $post["title"] ?></h1>

    <a class="button" href="/categories/<?= $post["categoryid"] ?>">#<?= $post["category"] ?></a>
    <p class="author">by <span class="name"><?= $post["author"] ?></span></p>
    <p class="date">
        <?= formatDate1($post["created"]) ?>
        <?php if ($post["created"] != $post["modified"]): ?>
            (last modified <?= formatDate2($post["modified"]) ?>)
        <?php endif ?>
    </p>
    <div class="actions">
        <a class="button" href="/posts/<?= $id ?>/edit">Edit post</a>
        <form method="post" id="deleteForm">
            <input type="hidden" name="_method" value="delete"/>
            <button type="submit">Delete post</button>
        </form>
    </div>
</header>

<div class="content"><?= $Parsedown->text($post["content"]) ?></div>

<footer class="post-footer">
    <?php if (count($comments) > 0): ?>
        <h2>Comments</h2>
        <div class="comments">
            <?php foreach ($comments as $com): ?>
                <div class="comment" id="comment-<?= $com["id"] ?>">
                    <header>
                        <div class="author"><?= $com["author"] ?></div>
                        <div class="date"><?= formatDate1($com["created"]) ?></div>
                    </header>
                    <div class="message"><?= $com["content"] ?></div>
                </div>
            <?php endforeach ?>
        </div>
    <?php else: ?>
        <p>No comments yet</p>
    <?php endif ?>

    <form method="POST" action="/posts/<?= $id ?>/comments" id="commentForm">
        <h3>Leave a comment</h3>

        <?php if (isset($error)): ?>
            <p class="error"><?= $error ?></p>
        <?php endif ?>

        <label for="name">Your name</label>
        <input id="name" name="author" minlength="1" required value="<?= $comment["author"] ?>">
        <label for="message">Message</label>
        <textarea id="message" name="content" rows="4" minlength="1" required><?= $comment["content"] ?></textarea>
        <div class="actions">
            <button type="submit">Send</button>
        </div>
    </form>
</footer>

<script defer>
    document.getElementById("deleteForm").addEventListener("submit", event => {
        event.preventDefault()
        if (confirm("Are you sure you want to delete this post? (No undo)"))
            event.target.submit()
    })

    <?php if (isset($error)): ?>
    commentForm.scrollIntoView()
    <?php endif; ?>
</script>
