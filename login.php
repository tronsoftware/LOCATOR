<?PHP
require_once("./include/membersite_config.php");
if (isset($_GET['logout']))
{
$fgmembersite->LogOut();
}
if(isset($_POST['submitted']))
{
   if($fgmembersite->Login())
   {
        $fgmembersite->RedirectToURL("displaymap.php");
   }
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es-ES" lang="es-ES">
<head>
  <meta http-equiv='Content-Type' content='text/html; charset=utf-8'/>
  <meta name="copyright" content="Copyright(C) TronSoftware.2014"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
 
   <title>3TECH GTS LOGIN</title>
      <link rel="STYLESHEET" type="text/css" href="styles/fg_membersite.css" />
      <script type='text/javascript' src='JS/gen_validatorv31.js'></script>

<body>

<!-- Form Code Start -->
<div id='fg_membersite'>
<form id='login' action='<?php echo $fgmembersite->GetSelfScript(); ?>' method='post' accept-charset='UTF-8'>
<fieldset >
<legend>Login</legend>

<input type='hidden' name='submitted' id='submitted' value='1'/>

<div class='short_explanation'>* Campos OBLIGATORIOS</div>

<div><span class='error'><?php echo $fgmembersite->GetErrorMessage(); ?></span></div>
<div class='container'>
    <label for='account' >Cuenta*:</label><br/>
    <input type='text' name='account' id='account' value='<?php echo $fgmembersite->SafeDisplay('account') ?>' maxlength="50" /><br/>
    <span id='login_account_errorloc' class='error'></span>
</div>
<div class='container'>
    <label for='username' >Usuario*:</label><br/>
    <input type='text' name='username' id='username' value='<?php echo $fgmembersite->SafeDisplay('username') ?>' maxlength="50" /><br/>
    <span id='login_username_errorloc' class='error'></span>
</div>
<div class='container'>
    <label for='password' >Password*:</label><br/>
    <input type='password' name='password' id='password' maxlength="50" /><br/>
    <span id='login_password_errorloc' class='error'></span>
</div>

<div class='container'>
    <input type='submit' name='Submit' value='Entrar' />
</div>

</fieldset>
</form>
<!-- client-side Form Validations:
Uses the excellent form validation script from JavaScript-coder.com-->

<script type='text/javascript'>
// <![CDATA[

    var frmvalidator  = new Validator("login");
    frmvalidator.EnableOnPageErrorDisplay();
    frmvalidator.EnableMsgsTogether();
    
    frmvalidator.addValidation("accoun","req","Introdusca su Cuenta");
    
    frmvalidator.addValidation("username","req","Introdusca su  Usuario");
    
    frmvalidator.addValidation("password","req","Introdusca su  Password");

// ]]>
</script>
</div>
</body>
</html>