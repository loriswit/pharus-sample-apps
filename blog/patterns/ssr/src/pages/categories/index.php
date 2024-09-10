<?php

$db = require __DIR__ . "/../../db.php";

$query = pg_query($db, "select category.id, name, count(post.id) as postcount
    from category
    left join post on post.categoryid = category.id
    group by category.id, name
    order by postcount desc, name");
$categories = pg_fetch_all($query);

?>

<header class="index-header">
    <h1>Categories</h1>
    <a class="button" href="/categories/new">New category</a>
</header>

<div class="categories">
    <?php foreach ($categories as $category): ?>
        <a class="category" href="/categories/<?= $category["id"] ?>">
            <h2><?= $category["name"] ?></h2>
            <p><?= $category["postcount"] ?> posts</p>
        </a>
    <?php endforeach ?>
</div>
