<?php

$dbHost = getenv("DB_HOST") ?: "localhost";
$dbName = getenv("DB_NAME") ?: "blog";
$dbUser = getenv("DB_USER") ?: "postgres";
$dbPass = getenv("DB_PASS") ?: $dbUser;

$db = pg_connect("host=$dbHost dbname=$dbName user=$dbUser password=$dbPass")
or die("Could not connect: " . pg_last_error());

return $db;
