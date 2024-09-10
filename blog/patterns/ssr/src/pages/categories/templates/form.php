<form method="post" action="<?= $newCategory ? "/categories" : "/categories/$id" ?>">
    <?php if (!$newCategory): ?>
        <input type="hidden" name="_method" value="patch"/>
    <?php endif ?>
    <?php if (isset($error)): ?>
        <p class="error"><?= $error ?></p>
    <?php endif ?>
    <label>
        Category name
        <input type="text" id="nameInput" name="name" required minlength="1" autofocus value="<?= $category["name"] ?>">
    </label>
    <button type="submit"><?= $newCategory ? "Create" : "Update" ?></button>
</form>
