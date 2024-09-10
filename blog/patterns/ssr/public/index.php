<?php [$html, $page] = require "../src/main.php" ?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>My Blog</title>
        <link rel="stylesheet" href="/style/main.css">
        <?php if (file_exists(__DIR__ . "/style/$page.css")): ?>
            <link rel="stylesheet" href="/style/<?= $page ?>.css">
        <?php endif ?>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
    </head>

    <body>
        <header class="site-header">
            <div class="title">My Blog</div>
            <nav>
                <a href="/posts">All posts</a>
                <a href="/categories">Categories</a>
            </nav>
        </header>
        <main id="<?= $page ?>-page">
            <?= $html ?>
        </main>
    </body>
</html>
