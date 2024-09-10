<form method="post" action="<?= $newPost ? "/posts" : "/posts/$id" ?>">
    <?php if (!$newPost): ?>
        <input type="hidden" name="_method" value="patch"/>
    <?php endif ?>
    <?php if (isset($error)): ?>
        <p class="error"><?= $error ?></p>
    <?php endif ?>
    <label>
        Post title
        <input type="text" name="title" required minlength="1" autofocus value="<?= $post["title"] ?>">
    </label>
    <label>
        Author name
        <input type="text" name="author" required minlength="1" value="<?= $post["author"] ?>">
    </label>
    <label>
        Category
        <select name="categoryid" required>
            <?php if ($newPost): ?>
                <option disabled selected value> -- please select --</option>
            <?php endif ?>
            <?php foreach ($categories as $category): ?>
                <option value="<?= $category["id"] ?>" <?= $post["categoryid"] === $category["id"] ? "selected" : "" ?>>
                    <?= $category["name"] ?>
                </option>
            <?php endforeach ?>
        </select>
    </label>
    <label>
        Body
        <textarea rows="16" name="content" required minlength="1"><?= $post["content"] ?></textarea>
    </label>
    <button type="submit"><?= $newPost ? "Create" : "Update" ?></button>
</form>
