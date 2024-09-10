<?php

class Route
{
    public string $method;
    public string $path;
    public string $page;
    private array $params = [];

    public function __construct(string $method, string $path, string $page)
    {
        $this->method = $method;
        $this->path = $path;
        $this->page = $page;
    }

    public function parse(string $url): bool
    {
        $ok = preg_match("~^$this->path$~", $url, $this->params) === 1;
        if ($ok) array_shift($this->params);
        return $ok;
    }

    public function render(): void
    {
        require __DIR__ . "/pages/$this->page.php";
    }
}

class Router
{
    private array $routes;

    public function __construct($routes)
    {
        $this->routes = $routes;
    }

    public function dispatch(): string
    {
        $method = $_SERVER["REQUEST_METHOD"];
        if ($method === "POST" && isset($_POST["_method"]))
            $method = strtoupper($_POST["_method"]);

        $url = strtok($_SERVER["REQUEST_URI"], "?");
        while (strlen($url) > 1 && str_ends_with($url, "/"))
            $url = substr($url, 0, -1);

        $target_route = null;
        $possible_routes = array_filter($this->routes, fn($route) => $route->method === $method);
        foreach ($possible_routes as $route)
            if ($route->parse($url)) {
                $target_route = $route;
                break;
            }

        if (!$target_route)
            throw new Exception("not found", 404);

        $target_route->render();
        return $target_route->page;
    }
}
