<?php
if ( ( isset( $_POST[ 'Name' ] ) ) && ( strlen( trim( $_POST[ 'Name' ] ) ) > 0 ) ) {
	$name = stripslashes( strip_tags( $_POST[ 'Name' ] ) );
} else {
	$name = 'No name entered';
}
if ( ( isset( $_POST[ 'Email' ] ) ) && ( strlen( trim( $_POST[ 'Email' ] ) ) > 0 ) ) {
	$email = stripslashes( strip_tags( $_POST[ 'Email' ] ) );
} else {
	$email = 'No email entered';
}
if ( ( isset( $_POST[ 'Phone' ] ) ) && ( strlen( trim( $_POST[ 'Phone' ] ) ) > 0 ) ) {
	$phone = stripslashes( strip_tags( $_POST[ 'Phone' ] ) );
} else {
	$phone = 'No phone entered';
}
if ( ( isset( $_POST[ 'Message' ] ) ) && ( strlen( trim( $_POST[ 'Message' ] ) ) > 0 ) ) {
	$message = stripslashes( strip_tags( $_POST[ 'Message' ] ) );
} else {
	$message = 'No text entered';
}
ob_start();
?>
    <html>
    <head>
        <style type="text/css">
        </style>
    </head>
    <body>
    <table width="550" border="0" cellspacing="0" cellpadding="15">
        <tr bgcolor="#eeffee">
            <td>Name</td>
            <td><?php echo $name; ?></td>
        </tr>
        <tr bgcolor="#eeeeff">
            <td>Email</td>
            <td><?php echo $email; ?></td>
        </tr>
        <tr bgcolor="#eeffee">
            <td>Phone</td>
            <td><?php echo $phone; ?></td>
        </tr>
        <tr bgcolor="#eeeeff">
            <td>Message</td>
            <td><?php echo $message; ?></td>
        </tr>
    </table>
    </body>
    </html>
<?php
$body = ob_get_contents();

$to     = 'your@domains.com';
$toname = 'Your Name';

require 'PHPMailerAutoload.php';

$mail = new PHPMailer;
$mail->setFrom( $email, $name );
$mail->addReplyTo( $email, $name );
$mail->addAddress( $to, $toname );
$mail->Subject = 'Demo Form:  Contact form submitted';
$mail->msgHTML( $body );
$mail->AltBody = $message;

//send the message, check for errors
if ( ! $mail->send() ) {
	echo "Mailer Error: " . $mail->ErrorInfo;
} else {
	echo "Message sent!";
}
