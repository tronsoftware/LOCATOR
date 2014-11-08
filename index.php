<?php 
header("Content-Type: text/html;charset=UTF-8");
require_once("./include/membersite_config.php");

if(!$fgmembersite->CheckLogin())
{
    $fgmembersite->RedirectToURL("login.php");
    exit;
}
?>
<!DOCTYPE html>
<html>
  <head> 
  <meta name="copyright" content="Copyright(C) TronSoftware."/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
<meta http-equiv="Content-type" content="text/html; charset=UTF-8" />

    <title>3TECH GTS</title>
    <link rel="stylesheet" href="styles/slidebars.css"/>
    <link href="JS/leaflet-0.7.3/leaflet.css" rel="stylesheet" type="text/css" />
    <link href="styles/styles.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="styles/leaflet.label.css" />
    <style type="text/css" media="screen">
    .header.row { height: 40px; 
        background:#dfdfdf url(images/btnback.png)repeat-x;
        background-size:contain;
    }
    .body.row { top: 45px; bottom: 65px; padding: 0.5em; }
    .footer.row { height: 60px; bottom: 0px;padding: 0.5em; }
    .header, .footer { padding: 0em 0em; }
    </style>
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
<link rel="icon" href="/favicon.ico" type="image/x-icon"/>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="http://maps.google.com/maps/api/js?v=3&sensor=false"></script>
<script src="JS/raphael.2.1.0.min.js"></script>
<script src="JS/justgage.1.0.1.min.js"></script>
<script src="JS/slidebars.js"></script>
<script src="JS/spin.min.js"></script>
<script src="JS/moment.js"></script>
<script src="JS/maps.js"></script>
<script src="JS/leaflet-0.7.3/leaflet.js"></script>
<script src="JS/Google.js"></script>
<script src="JS/leaflet-plugins/bing.js"></script>
<script src="JS/leaflet-plugins/bouncemarker.js"></script>
<script src="JS/leaflet-plugins/leaflet.label.js"></script>
<script src="JS/leaflet-plugins/Leaflet.EdgeMarker.js"></script>
<script>
	(function($) {
    $(document).ready(function() {
      $.slidebars();
    });
  }) (jQuery);
</script>
</head>
<body  onload="load()">    
<div id="sb-site"> 
    <div class="header row">
    <div class="colmask threecol">
    <div class="colmid">
		<div class="colleft">
			<div class="col1">
             <div id="title"
             style="background:#dfdfdf url(images/messages.gif)repeat-x;">3TECH<br />LOCATOR</div> 
            </div>
            <div class="col2 sb-toggle-left" >
              <a class="sb-toggle-left" ><img src="images/settings.png"width="40" height="40" align="left" /></a>  
            </div>	
            <div class="col3 sb-toggle-right" >
             <a class="sb-toggle-right"><img src="images/users.png" width="40" height="40" align="right" /></a>
            </div>
        </div>
     </div>
     </div>
     </div>
     <div class="body row ">
         <div id="map"></div>
     </div> 
     <div class="footer row">
         <div id="messages">3TECH Locator</div>
     </div> 
    <div id="spinnerarea"></div>
        <div id="JG" style="
           position: absolute;
           height:50px;
           width:50px;
           bottom: 90px;
           left: 20px;
           padding: 2px;
        "></div>
     <div id="logo" style="
           position: absolute;
           height:40px;
           width:80px;
           top: 55px;
           right: 10px;
         
           "><img src="images/perfil.jpg" width="80" height="40" align="center" />
     </div>
</div>
<div class="sb-slidebar sb-left">
      <!-- left Slidebar  -->
      <div id="settings">
      <p align="center"
          style="
          text-align: center;
          line-height: 30px;
          font-size: 15px;
          height:30px;
          background:#dfdfdf url(images/btnback.png)repeat-x;
          background-size:contain;"
          >OPCIONES</p>
      <div id="OPmaps">
          <p align="left" style="color: black;">Mapas</p>
          <input class="BTNopciones" style="
          background-image: url('images/osm.png');
          vertical-align: middle;
          background-repeat: no-repeat;
          background-position: left;
          padding-left: 40px;            
          " type="button" value="OpenStreet" onclick="changeMap(osm)" />
          <input class="BTNopciones" style="
          background-image: url('images/GH.png');
          vertical-align: middle;
          background-repeat: no-repeat;
          background-position: left;
          padding-left: 40px;  
          "  type="button" value="Google Hybrido" onclick="changeMap(gglh)" />
          <input class="BTNopciones" style="
          background-image: url('images/GS.png');
          vertical-align: middle;
          background-repeat: no-repeat;
          background-position: left;
          padding-left: 40px;  
          "  type="button" value="Google Rutas" onclick="changeMap(gglr)" />
          <input class="BTNopciones" style="
          background-image: url('images/GT.png');
          vertical-align: middle;
          background-repeat: no-repeat;
          background-position: left;
          padding-left: 40px;  
          "  type="button" value="Google Terreno" onclick="changeMap(gglt)" />
      </div>
      <div id="OPinfo">
          <p align="left" style="color: black;">Capas</p>
          <input class="BTNopciones" style="
          background-image: url('images/RT.png');
          vertical-align: middle;
          background-repeat: no-repeat;
          background-position: left;
          padding-left: 40px;  
          " type="button" value="Rutas" onclick="swithCapas(Ruta,this)" />
          <input class="BTNopciones" style="
          background-image: url('images/ANT.png');
          vertical-align: middle;
          background-repeat: no-repeat;
          background-position: left;
          padding-left: 40px;  
          " type="button" value="Posiciones Anteriores" onclick="swithCapas(Anteriores,this)" />
      </div>
      <div id="OPinfo">
          <p align="left" style="color: black;">Sesion</p>
          <input class="BTNopciones" style="
          background-color:#FFCC00;
          background-image: url('images/logout.png');
          vertical-align: middle;
          background-repeat: no-repeat;
          background-position: left;
          padding-left: 40px;  
          " type="button" value=" SALIR / LOGOUT" onclick="location.href='login.php?logout'" />
        </div>
      </div>
</div>

<div class="sb-slidebar sb-right">
      <!-- right Slidebar -->    
      <div id="unidades"><p align="center"
          style="
          text-align: center;
          line-height: 30px;
          font-size: 15px;
          height:30px;
          background:#dfdfdf url(images/btnback.png)repeat-x;
          background-size:contain;">DISPOSITIVOS</p>
      <div id="UNunidades"><p align="right" style="
      color: black;"
      >Unidades</p></div>
      <div id="GroupList"><p align="right" style="color: black;">Grupos</p></div>
      </div>
      </div>
</div>

</body>	

<script type="text/javascript">
//<![CDATA[
   
    var FTg = false;
    var FTu = false;    
    var unidadesDIV;
    var messages;
    var intervalID;
    var newInterval;
    var currentInterval;
function load() {
        account = <?php echo json_encode($fgmembersite->GETaccountID()); ?>;
        user = <?php echo json_encode($fgmembersite->GETUserID()); ?>;
        pass = <?php echo json_encode($fgmembersite->GETpass()); ?>;

        unidadesDIV = document.getElementById('UNunidades'); 
        groupDIV = document.getElementById('GroupList');      
        messages = document.getElementById('messages');
        var map = document.getElementById('map');
        DIVjg = document.getElementById('JG');
        title = document.getElementById('title');
        target = document.getElementById('spinnerarea');
        intervalID = 0;
        newInterval = 0;
        currentInterval = 0;
        zoomLV = 16;
        tipo = 'Unit';        
        unidad = getUrlVars()["unitid"];
        if (unidad == null) unidad = Tools.readCookie("unidad");
        if (Tools.readCookie("zoom") != null) zoomLV = Tools.readCookie("zoom");        
        spinner = new Spinner(opts).spin();
        target.appendChild(spinner.el);
        showWaitImage('Cargando Unidades...');
        var i = 0;
        
    // obtenemos las unidades y creamos los botones        
        data = GetUnits(account,user,pass)
        loadUnits(data,unidad);
     // obtenemnos los grupos habilitados y creamos los botones
        data = GetGroupList(account,user)
        loadGroups(data);        
        		
    // si hay unidad seleccionada carga el mapa correspondiente
        hideWaitImage();
        if (title.value != null) {
    	getUnitForMap();
   		} else {
        $.slidebars.open('right');
        }
 }
 
 </script>

</html>





