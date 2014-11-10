<?PHP
require_once("./include/fg_membersite.php");

$fgmembersite = new FGMembersite();

//Provide your site name here
$fgmembersite->SetWebsiteName('3TECH GTS');

//Provide the email address where you want to get notifications
$fgmembersite->SetAdminEmail('tron@3tech.com.ar');

//Provide your database login details here:
//hostname, user name, password, database name and table name

$fgmembersite->InitDB(/*hostname*/'localhost', //host:port de el SQL Server
                      /*username*/'root', // Usuario con privilegios ALL sobre BD
                      /*password*/'++++++',
                      /*database name*/'gts', // Normalmente gts
                      /*table name*/'User'); // siempre User

//For better security. Get a random string from this link: http://tinyurl.com/randstr
// and put it here
$fgmembersite->SetRandomKey('qSRcVS6DrTzrPvr');

?>
