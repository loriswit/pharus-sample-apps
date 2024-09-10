<?php

$db = require __DIR__ . "/../../db.php";

$id = $this->params[0];

$query = pg_query_params($db, "select id, name from category where id = $1", [$id]);
$category = pg_fetch_assoc($query);

if (!$category)
    throw new Exception("not found", 404);

$query = pg_query_params($db,
    "select id, title, author, created from post where post.categoryid = $1 order by created desc", [$id]);
$posts = pg_fetch_all($query);

require __DIR__ . "/../../helpers.php"

?>

<header class="category-header">
    <h1>Category: <?= $category["name"] ?></h1>
    <div class="actions">
        <a class="button" href="/posts/new?category=<?= $id ?>">New post</a>
        <a class="button" href="/categories/<?= $id ?>/edit">Edit category</a>
        <form method="post" id="deleteForm">
            <input type="hidden" name="_method" value="delete"/>
            <button type="submit">Delete category</button>
        </form>
    </div>
</header>


<?php if (empty($posts)): ?>
    <p>No posts in this category yet</p>

<?php else: ?>
    <div class="posts">
        <?php foreach ($posts as $post): ?>
            <a href="/posts/<?= $post["id"] ?>" class="post">
                <h2><?= $post["title"] ?></h2>
                <p class="author">By <span class="name"><?= $post["author"] ?></span></p>
                <p class="date"><?= formatDate($post["created"]) ?></p>
            </a>
        <?php endforeach ?>
    </div>
<?php endif ?>

<script defer>
    deleteForm.addEventListener("submit", event => {
        event.preventDefault()
        if (confirm("Are you sure you want to delete this category and all its posts? (No undo)"))
            event.target.submit()
    })
</script>
