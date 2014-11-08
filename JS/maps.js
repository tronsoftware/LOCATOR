    // Spin 
var opts = {
lines: 11, // The number of lines to draw
length: 21, // The length of each line
width: 10, // The line thickness
radius: 17, // The radius of the inner circle
corners: 1, // Corner roundness (0..1)
rotate: 0, // The rotation offset
direction: 1, // 1: clockwise, -1: counterclockwise
color: 'LightSteelBlue', // #rgb or #rrggbb or array of colors
speed: 1.3, // Rounds per second
trail: 56, // Afterglow percentage
shadow: true, // Whether to render a shadow
hwaccel: false, // Whether to use hardware acceleration
//className: 'spinner', // The CSS class to assign to the spinner
//zIndex: 2e9, // The z-index (defaults to 2000000000)
top: '50%', // Top position relative to parent
left: '50%' // Left position relative to parent
};  

var Tools = {
createCookie: function(name, value,days) {
if (days) {
  var date = new Date();
  date.setTime(date.getTime()+(days*24*60*60*1000));
  var expires = "; expires="+date.toGMTString();
}else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
},
readCookie: function(name) {
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for(var i=0;i < ca.length;i++) {
  var c = ca[i];
  while (c.charAt(0)==' ') c = c.substring(1,c.length);
  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
}
return null;
},
eraseCookie: function(name) {
Tools.createCookie(name,"",-1);
}
};

function getUrlVars() {
var vars = [], hash;
var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
for(var i = 0; i < hashes.length; i++) {
hash = hashes[i].split('='); 
vars.push(hash[0]); vars[hash[0]] = hash[1]; 
}
return vars;
} 


function GetGroupList(account,user){
     $.ajax({
        url: 'include/getGroupList.php?account='+account+'&user='+user+'&pass='+pass,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
        result = data;
    },
    error: function (xhr, status, errorThrown) {
        console.log("responseText: " + xhr.responseText);
        console.log("status: " + xhr.status);
        console.log("errorThrown: " + errorThrown);
    }
  });
 return result;
}

function GetUnits(account,user,pass){
     $.ajax({
        url: 'include/getUnits.php?account='+account+'&user='+user+'&pass='+pass,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
        result = data;
    },
    error: function (xhr, status, errorThrown) {
        console.log("responseText: " + xhr.responseText);
        console.log("status: " + xhr.status);
        console.log("errorThrown: " + errorThrown);
    }
  });
 return result;
}

function loadUnits(json,unitid) {
    if (json.length == 0) {
        showMessage('No hay unidades disponibles a la vista.');
        map.innerHTML = null;
    }
    else {
        // iterate through the units and load them into the button array.
        $(json.DeviceList).each(function(key, value){
            
            var boton = document.createElement('button');
            boton.type = "button";
            boton.id = "BTNunidad";
            boton.innerHTML = $(this).attr('Device_desc');
            boton.value = $(this).attr('Device');
            boton.style.backgroundImage="url(images/UN.png)";
            boton.style.verticalAlign="middle";
            boton.style.backgroundRepeat="no-repeat";
            boton.style.backgroundPosition= "right";
            boton.style.paddingRight="40px"; 
            var funct = function () { UNIDAselect(boton.value,boton.innerHTML)};
            boton.addEventListener('click', funct, false);
			if ($(this).attr('Device')==unitid) {				
                title.value = unidad;
                title.innerHTML = $(this).attr('Device_desc')+"<br>Status...";
			}
            var shortSessionID = $(this).attr('Device');
            unidadesDIV.appendChild(boton);
        });

       showMessage('<span style="color:#F00;">Por favor seleccione una Unidad.</span>');
    }
}
function loadGroups(json) {
            if (json.length == 0) {
            return;
            }
        // iterate through the units and load them into the button array.
        $(json.GroupList).each(function(key, value){
            
            var boton = document.createElement('button');
            boton.type = "button";
            boton.id = "BTNGroup";
            boton.innerHTML = $(this).attr('grupID');
            boton.style.backgroundImage="url(images/GP.png)";
            boton.style.verticalAlign="middle";
            boton.style.backgroundRepeat="no-repeat";
            boton.style.backgroundPosition= "right";
            boton.style.paddingRight="40px"; 
            var funct = function () { GROUPselect(boton.innerHTML)};
            boton.addEventListener('click', funct, false);

           // var shortSessionID = $(this).attr('Device');
            groupDIV.appendChild(boton);
        });
}
function changeMap(newmap){
map.removeLayer (osm);
map.removeLayer (gglr);
map.removeLayer (gglh);
map.removeLayer (gglt)
map.addLayer(newmap);
$.slidebars.close();
}

function swithCapas(layer,btn){
    
     if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            btn.className = 'BTNopciones off';
        } else {
            map.addLayer(layer);
            btn.className = 'BTNopciones';
        }
$.slidebars.close();
}
function UNIDAselect(unidad,unit_desc) {

    title.value = unidad;
    title.innerHTML = unit_desc+"<br>Status...";
    Tools.createCookie("unidad", unidad, 7);
    Tools.createCookie("mapTipe", "Unit", 7);
    if (tipo == 'Group'){
        BL.off();
        FTu=true;
        DIVjg.style.display = "";
    }
    tipo = "Unit";    
    $.slidebars.close();
    getUnitForMap();
        
    }
function GROUPselect(group) {
    title.value = group;
    title.innerHTML = "Grupo:<br>"+group;
    Tools.createCookie("grupo", group, 7);
    Tools.createCookie("mapTipe", "Group", 7);
    tipo = "Group";
    FTg=true;   
    $.slidebars.close();
    getGroupForMap();    
    DIVjg.style.display = "none";
      
    }
// muestra la ruta de la unidad
function getUnitForMap() { 
    if (hasMap()) {
		showLoadMap('<center>Cargando Datos...</center>');
        autoRefresh(0);
        
        unidad = title.value;
        var url = 'include/getUnitData.php?account='+account+'&user='+user+'&pass='+pass+'&unitID='+unidad+'&limit=30';
       
        $.ajax({
               url: url,
               type: 'POST',
               encoding:"UTF-8",
               dataType: 'json',
               contentType: "text/json; charset=UTF-8",
               success: function(data) {
                  UnitMap(data);
                  
               },
               error: function (xhr, status, errorThrown) {
                   console.log("responseText: " + xhr.responseText);
                   console.log("status: " + xhr.status);
                   console.log("errorThrown: " + errorThrown);
                }
           });
           
    }
    else {
        alert("Por favor seleccione una ruta antes de intentar actualizar el mapa.");
    }
}
// muestra las rutas de el Grupo
function getGroupForMap() { 
    if (hasMap()) {
		showLoadMap('<center>Cargando Datos...</center>');
        autoRefresh(0);
        
        grupo = title.value;
        var url = 'include/getGroupData.php?account='+account+'&user='+user+'&pass='+pass+'&groupID='+grupo+'&limit=10';
       
        $.ajax({
               url: url,
               type: 'GET',
               dataType: 'json',
               success: function(data) {
                  GroupMap(data);
               },
               error: function (xhr, status, errorThrown) {
                   console.log("responseText: " + xhr.responseText);
                   console.log("status: " + xhr.status);
                   console.log("errorThrown: " + errorThrown);
                }
           });
    }
    else {
        alert("Por favor seleccione una ruta antes de intentar actualizar el mapa.");
    }
}
function hasMap() {
    if (title.innerHTML == null) { 
        return false;
    }
    else {
        return true;
    }
}
function CreateMap(){
        // capa de eventos
		window.Ultimo = new L.LayerGroup();
        Anteriores = new L.LayerGroup();
        Ruta = new L.LayerGroup();
        
		//Capas base
		osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

		// Las opciones para las capas de Google: SATELLITE, ROADMAP, HYBRID o TERRAIN
		
        gglr = new L.Google('ROADMAP');
		gglh = new L.Google('HYBRID');
		gglt = new L.Google('TERRAIN');
		
        map = L.map('map', {
			layers: [window.Ultimo, Ruta,Anteriores]
		});

				
		//Añadimos los dos objetos para hacer el control de capas
			var baseMaps = {
				"OpenStreetMap": osm,
				"Google Rutas": gglr,
				"Google Hybrido": gglh,
				"Google Terreno": gglt,
			};

		var overlays = {
		    "Posiciones Anteriores": Anteriores,
            "Ruta": Ruta
		};
	    map.addLayer(osm,gglr,gglh,gglt);        
        map.setZoom(zoomLV);
        map.on('zoomend', function(e) {
            MapZoom();
        });
        BL = new L.edgeMarker().addTo(map);
        BL.off();
    jg = new JustGage({
    id: "JG", 
    value: 0, 
    min: 0,
    max: 90,
    shadowVerticalOffset : 2,
    title: "Velocidad",
    titleFontColor : '#000000',
    showInnerShadow : true,
    shadowSize : 5,
    shadowOpacity : 0.4,
    showMinMax :false,
    label: "Km/h",
    labelFontColor :'#000000'
  });

}
function UnitMap(json) {
    if (json.length == 0) {
        showMessage('No hay datos de seguimiento para ver.');
    }
    else {
        hideWaitImage();
        // make sure we only create map object once
        if (map.id == 'map') {
            CreateMap();
        }           
            var finalLocation = false;
			var counter = 0;
			var latlngs = Array();
		    //borramos los marcadores previos
            Anteriores.clearLayers();
           window.Ultimo.clearLayers();
           Ruta.clearLayers();
            // iterate through the locations and create map markers for each location
            $(json.DeviceList[0].EventData).each(function(key, value){
                counter++;                
                if (counter == $(json.DeviceList[0].EventData).length) {                    
                   if (!FTu){ map.panTo(new L.LatLng($(this).attr('GPSPoint_lat'),$(this).attr('GPSPoint_lon')),true);}
                    jg.refresh($(this).attr('Speed'));
                    finalLocation = true;
					finaltime = $(this).attr('Timestamp_date') + ' ' +$(this).attr('Timestamp_time');
                    finaladress = $(this).attr('Address');
                    title.innerHTML = json.DeviceList[0].Device_desc + "<br>"+$(this).attr('StatusCode_desc');
                    showMessage(("<center>"+ finaltime 
                    + " ("+ moment(finaltime,"YYYY-MM-DD HH:mm:ss").fromNow()
                    +")<br>" + finaladress
                    +"<br>" + $(this).attr('Speed') +" km/h "+$(this).attr('Heading_desc')+"</center>"
                    ));
        
                }
                    
                var marker = createMarker(
                    $(this).attr('StatusCode_desc'),
                    json.DeviceList[0].Device_desc,
                    $(this).attr('GPSPoint_lat'),
                    $(this).attr('GPSPoint_lon'),
                    $(this).attr('Speed'),
                    $(this).attr('Heading'),
                    $(this).attr('Timestamp_date')+' '+$(this).attr('Timestamp_time'),
                    $(this).attr('Device'),
                    $(this).attr('Altitude'),
                    $(this).attr('Address'),
                    map, finalLocation);
				latlngs.push(new L.LatLng($(this).attr('GPSPoint_lat'),$(this).attr('GPSPoint_lon')));
            });
            
			polyline = L.polyline(latlngs, {dashArray: '5, 5, 1, 5',color: 'red',weight:"3"}).addTo(Ruta);
        }
        if (FTu){
        map.fitBounds(latlngs);
        FTu = false;
        if(map.getZoom()>16){map.setZoom(16)}
        }
        autoRefresh(1);
   
}
function GroupMap(json) {
    if (json.length == 0) {
        showMessage('No hay datos de seguimiento para ver.');
    }
    else {
        hideWaitImage();
        // make sure we only create map object once
        if (map.id == 'map') {
            CreateMap();
        }
            // borramos los marcadores previos
			Anteriores.clearLayers();
            window.Ultimo.clearLayers();
            Ruta.clearLayers();
            window.MyApp = Array();
            
            // iterate through the Devices 
            for (i = 0; i < json.DeviceList.length; i++) { 
                          
            var finalLocation = false;
			var counter = 0;
			var latlngs = Array();
            // iterate through the Events and create map markers for each location
            $(json.DeviceList[i].EventData).each(function(key, value){
                counter++;                
                if (counter == $(json.DeviceList[i].EventData).length) {                    
                    finalLocation = true;
					finaltime = $(this).attr('Timestamp_date') + ' ' +$(this).attr('Timestamp_time');
                    finaladress = $(this).attr('Address');
                    window.MyApp.push(new L.LatLng($(this).attr('GPSPoint_lat'),$(this).attr('GPSPoint_lon')));
                }                    
                var marker = createMarker(
                    $(this).attr('StatusCode_desc'),
                    json.DeviceList[i].Device_desc,
                    $(this).attr('GPSPoint_lat'),
                    $(this).attr('GPSPoint_lon'),
                    $(this).attr('Speed'),
                    $(this).attr('Heading'),
                    $(this).attr('Timestamp_date')+' '+$(this).attr('Timestamp_time'),
                    $(this).attr('Device'),
                    $(this).attr('Altitude'),
                    $(this).attr('Address'),
                    map, finalLocation);
				latlngs.push(new L.LatLng($(this).attr('GPSPoint_lat'),$(this).attr('GPSPoint_lon')));
            });
			var polyline = L.polyline(latlngs, {dashArray: '5, 5, 1, 5',color: 'red',weight:"3"}).addTo(Ruta);
        }
        
        }
        if (FTg){
        map.fitBounds(window.MyApp);
        if(map.getZoom()>16){map.setZoom(16)}
        FTg = false;
        BL.on();
        }
        autoRefresh(1);
        showMessage(("<center>Grupo: "+ title.value + "<br>"+ json.DeviceList.length + " Unidades</center>"));
}
function createMarker(status,devDesc,latitude, longitude, speed, direction, gpsTime, unitid, altitud, Direccion, map, finalLocation) {
    var diferencia = moment(gpsTime,"YYYY-MM-DD HH:mm:ss").fromNow();
    var iconUrl;
	speed = Math.floor(speed);
	if (finalLocation) {
		 var markerIcon = new L.Icon({
            iconUrl:      'images/pin30_orange_' + getCompassImage(direction,speed) +'.png',
            shadowUrl:    'images/pin30_shadow.png',
            iconSize:     [28, 40],
            shadowSize:   [40, 40],
            iconAnchor:   [14, 40],
            labelAnchor: [4, -30],
            shadowAnchor: [13, 40],
            popupAnchor:  [0, -31]
		});
    } else {
        	var markerIcon = new L.Icon({
            iconUrl:      'images/' + getRouteImage(direction,speed) + '.png',
           // shadowUrl:    'images/pin30_shadow.png',
            iconSize:     [30, 30],
           // shadowSize:   [30, 30],
            iconAnchor:   [15, 15],
           // shadowAnchor: [8, 30],
            popupAnchor:  [0, -16]
		});
    };
    var lastMarker = "</td></tr>";
    if (finalLocation) {
        lastMarker = "</td></tr><tr><td align=left>&nbsp;</td><td><b>Ultima Posicion</b></td></tr>";
    }

    var popupWindowText = "<table border=0 style=\"font-size:95%;font-family:arial,helvetica,sans-serif;\">"
	    + "<tr><td align=right>Unidad:</td><td>" + devDesc + "</td><td>&nbsp;</td></tr>"
        + "<tr><td align=right>Status:</td><td>" + status + "</td><td>&nbsp;</td></tr>"
		+ "<tr><td align=right>Tiempo:</td><td colspan=2>" + gpsTime +  "</td></tr>"
        + "<tr><td align=right>Antiguedad:</td><td colspan=2>" + diferencia +  "</td></tr>"
		+ "<tr><td align=right>Velocidad:</td><td>" + speed +  " Km/h</td></tr>"
        + "<tr><td align=right>Altitud:</td><td>" + altitud + " mts</td><td>&nbsp;</td></tr>"
		+ "<tr><td align=right>Direccion:</td><td>" + Direccion + "</td><td>&nbsp;</td></tr></table>";
      
 if (finalLocation) {        
		 L.marker(new L.LatLng(latitude, longitude),{icon: markerIcon,bounceOnAdd: true,bounceOnAddOptions: {duration: 1000, height: 100}}).bindPopup(popupWindowText).bindLabel(devDesc, { noHide: true, direction: 'auto'}).addTo(window.Ultimo);
    } else {
       if (tipo == 'Unit'){L.marker(new L.LatLng(latitude, longitude),{icon: markerIcon}).bindPopup(popupWindowText).bindLabel(devDesc+"<br>"+speed +  " kmh",{ direction: 'auto'}).addTo(Anteriores);}
    };
}

function getCompassImage(azimuth,speed) {
    if (speed < 2)
            return "dot";
    if ((azimuth >= 337 && azimuth <= 360) || (azimuth >= 1 && azimuth < 23))
            return "compassN";
    if (azimuth >= 23 && azimuth < 68)
            return "compassNE";
    if (azimuth >= 68 && azimuth < 113)
            return "compassE";
    if (azimuth >= 113 && azimuth < 158)
            return "compassSE";
    if (azimuth >= 158 && azimuth < 203)
            return "compassS";
    if (azimuth >= 203 && azimuth < 248)
            return "compassSW";
    if (azimuth >= 248 && azimuth < 293)
            return "compassW";
    if (azimuth >= 293 && azimuth < 337)
            return "compassNW";
    return "dot";
}
function getRouteImage(azimuth,speed) {
    if (speed < 2)
            return "track-none";
    if ((azimuth >= 337 && azimuth <= 360) || (azimuth >= 1 && azimuth < 23))
            return "track-0";
    if (azimuth >= 23 && azimuth < 68)
            return "track-2";
    if (azimuth >= 68 && azimuth < 113)
            return "track-4";
    if (azimuth >= 113 && azimuth < 158)
            return "track-6";
    if (azimuth >= 158 && azimuth < 203)
            return "track-8";
    if (azimuth >= 203 && azimuth < 248)
            return "track-10";
    if (azimuth >= 248 && azimuth < 293)
            return "track-12";
    if (azimuth >= 293 && azimuth < 337)
            return "track-14";
    return "dot";
}
function getRouteImageFULL(azimuth,speed) {
    if (speed < 2)
            return "track-none";
    if ((azimuth >= 371.25 && azimuth <= 360) || (azimuth >= 0 && azimuth < 11.25))
            return "track-0";
    if (azimuth >= 11.25 && azimuth < 33.75)
            return "track-1";
    if (azimuth >= 33.75 && azimuth < 78.75)
            return "track-2";
    if (azimuth >= 78.75 && azimuth < 101.5)
            return "track-3";
    if (azimuth >= 101.5 && azimuth < 123.75)
            return "track-4";
    if (azimuth >= 123.75 && azimuth < 146.25)
            return "track-5";
    if (azimuth >= 146.25 && azimuth < 168.75)
            return "track-6";
    if (azimuth >= 168.75 && azimuth < 191.25)
            return "track-7";
    if (azimuth >= 191.25 && azimuth < 213.75)
            return "track-8";
    if (azimuth >= 213.75 && azimuth < 236.25)
            return "track-9";
    if (azimuth >= 236.25 && azimuth < 258.75)
            return "track-10";
    if (azimuth >= 258.75 && azimuth < 281.25)
            return "track-11";
    if (azimuth >= 281.25 && azimuth < 303.75)
            return "track-12";
    if (azimuth >= 303.75 && azimuth < 326.25)
            return "track-13";
    if (azimuth >= 326.25 && azimuth < 348.75)
            return "track-14";
    if (azimuth >= 348.75 && azimuth < 371.25)
            return "track-15";
    return "track-none";
}

function autoRefresh(newInterval) {
   if (newInterval > 0) { // moving to another interval (3)
                clearInterval(intervalID);
                intervalID = setInterval("get"+tipo+"ForMap();",20000);
                currentInterval = newInterval;
            }
            else { // we are turning off (2)
                clearInterval(intervalID);
                newInterval = 0;
                currentInterval = 0;

            }
}
function showMessage(message) {
     messages.innerHTML = '<strong>' + message + '</strong>';
}

function showRouteName() {
    showMessage(routeSelect.options[routeSelect.selectedIndex].innerHTML);	
}

function showWaitImage(theMessage) {  
    spinner.spin(target);
    showMessage(theMessage);
}

function hideWaitImage() {
   // map.innerHTML = '';
    messages.innerHTML = 'LOCATOR';
   spinner.stop(target);
}
function showLoadMap(theMessage) {
    showMessage(theMessage);
    spinner.spin(target);
    
}
function MapZoom() {
    if (tipo == 'Unit'){Tools.createCookie("zoom",map.getZoom())};
    autoRefresh(0);
    autoRefresh(1);
}

