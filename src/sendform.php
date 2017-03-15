<?php
if (isset($_POST['city']) && !empty($_POST['city'])) $city = $_POST['city'];
if (isset($_POST['name']) && !empty($_POST['name'])) $name = $_POST['name'];
if (isset($_POST['surname']) && !empty($_POST['surname'])) $surname = $_POST['surname'];
if (isset($_POST['phone']) && !empty($_POST['phone'])) $phone = $_POST['phone'];
if (isset($_POST['car']) && !empty($_POST['car'])) $car = $_POST['car'];

if (!isset($city)
    || !isset($name)
    || !isset($surname)
    || !isset($phone)
    || !isset($car)
) {
    echo json_encode([
        'error'   => true,
        'message' => 'Заполните обязательные поля!',
    ]);
    exit();
}

$data = [
    'name'     => trim($name) . ' ' . trim($surname),
    'phone'    => $phone,
    'car_name' => $car,
    'city'     => $city,
];

$context = stream_context_create(array(
    'http' => array(
        'method'  => 'POST',
        'header'  => 'Content-Type: application/x-www-form-urlencoded' . PHP_EOL
            . 'Api-Landing-Key: 2daff95c-4a5e-4c24-ad71-e2c8f86cac6e' . PHP_EOL,
        'content' => http_build_query($data),
    ),
));

$response = file_get_contents(
    $file = "http://drivers-crm.opteum.ru",
    $use_include_path = false,
    $context);

echo json_encode([
    'error'   => false,
    'message' => $response,
]);
exit();
