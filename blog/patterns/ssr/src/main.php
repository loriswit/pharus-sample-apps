<?php

require __DIR__ . "/router.php";

error_reporting(E_ALL);

$router = new Router([
    new Route("GET", "/", "posts/index"),
    new Route("GET", "/posts", "posts/index"),
    new Route("GET", "/posts/new", "posts/new"),
    new Route("POST", "/posts", "posts/create"),
    new Route("GET", "/posts/(\\d+)", "posts/read"),
    new Route("GET", "/posts/(\\d+)/edit", "posts/edit"),
    new Route("PATCH", "/posts/(\\d+)", "posts/update"),
    new Route("DELETE", "/posts/(\\d+)", "posts/delete"),

    new Route("POST", "/posts/(\\d+)/comments", "comments/create"),

    new Route("GET", "/categories", "categories/index"),
    new Route("GET", "/categories/new", "categories/new"),
    new Route("POST", "/categories", "categories/create"),
    new Route("GET", "/categories/(\\d+)", "categories/read"),
    new Route("GET", "/categories/(\\d+)/edit", "categories/edit"),
    new Route("PATCH", "/categories/(\\d+)", "categories/update"),
    new Route("DELETE", "/categories/(\\d+)", "categories/delete"),
]);

ob_start();

try {
    $page = $router->dispatch();

} catch (Exception $e) {
    http_response_code($e->getCode());
    die($e->getMessage());
}

$html = ob_get_clean();

return [$html, $page];
