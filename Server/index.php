<?php

$data = $_GET['name'];

function sendFCM($mess = "Hello",$id ="f2NlWavsTY4:APA91bGgGzpRdZ_XwnOL9jXdZJstdau1_J80eqHNz78ndnDBrHvyzr70w8AnevFBp8Cl6zQWjjC3O9_0qIVGigj1jWaScQQ1S35D306YWijg3ngdPwqR3Q3nMNTFFEuvFI2PURf0KbuG") {
$url = 'https://fcm.googleapis.com/fcm/send';
$fields = array (
        'to' => $id,
        'notification' => array (
                "body" => $mess,
                "title" => "Title",
                "icon" => "fcm_push_icon",
                "click_action" => "FCM_PLUGIN_ACTIVITY"
        ),
        'data' => array(
			    "landing_page" => "second",
			    "price" => "Hi from here"
        )
);

$fields = json_encode ( $fields );
$headers = array (
        'Authorization: key=' . "AIzaSyAquv44vHdWiqJ0H3nsksmp3gbrZSZUWR4",
        'Content-Type: application/json'
);

$ch = curl_init ();
curl_setopt ( $ch, CURLOPT_URL, $url );
curl_setopt ( $ch, CURLOPT_POST, true );
curl_setopt ( $ch, CURLOPT_HTTPHEADER, $headers );
curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
curl_setopt ( $ch, CURLOPT_POSTFIELDS, $fields );

$result = curl_exec ( $ch );
curl_close ( $ch );
}

sendFCM($data, "");

?>
