<?php

function formatDate($str): string
{
    $date = new DateTimeImmutable($str);
    return $date->format("j F Y");
}
