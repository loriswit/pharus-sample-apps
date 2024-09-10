<?php

$db = require __DIR__ . "/../../db.php";

$yearFilter = $_GET["year"] ?? false;
$authorFilter = $_GET["author"] ?? false;

$query = pg_query($db,
    "select post.id, title, author, post.created, to_char(post.created, 'YYYY') as year, category.name as category
    from post
    join category on post.categoryid = category.id
    order by created desc");
$posts = pg_fetch_all($query);

$filteredPosts = array_filter($posts,
    fn($post) => (!$yearFilter || $post["year"] === $yearFilter) &&
        (!$authorFilter || $post["author"] === $authorFilter));

$years = array_unique(array_column($posts, "year"));
$authors = array_unique(array_column($posts, "author"));
sort($authors);

require  __DIR__ . "/../../helpers.php"

?>

<header class="index-header">
    <h1>Posts</h1>
    <a class="button" href="/posts/new">New post</a>
</header>

<form>
    <label>Filter by
        <select name="year" onchange="this.form.submit()">
            <option value="">any year</option>
            <?php foreach ($years as $year): ?>
                <option value="<?= $year ?>" <?= $year === $yearFilter ? "selected" : "" ?>><?= $year ?></option>
            <?php endforeach ?>
        </select>
        <select name="author" onchange="this.form.submit()">
            <option value="">any author</option>
            <?php foreach ($authors as $author): ?>
                <option value="<?= $author ?>" <?= $author === $authorFilter ? "selected" : "" ?>><?= $author ?></option>
            <?php endforeach ?>
        </select>
    </label>
</form>

<?php if (empty($filteredPosts)): ?>
    <p>No posts found</p>

<?php else: ?>
    <div class="posts">
        <?php foreach ($filteredPosts as $post): ?>
            <a href="/posts/<?= $post["id"] ?>" class="post">
                <h2><?= $post["title"] ?></h2>
                <p class="category">#<?= $post["category"] ?></p>
                <p class="author">By <span class="name"><?= $post["author"] ?></span></p>
                <p class="date"><?= formatDate($post["created"]) ?></p>
            </a>
        <?php endforeach ?>
    </div>
<?php endif ?>
