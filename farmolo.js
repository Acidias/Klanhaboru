// ==UserScript==
// @name        Farmoló script klánháborura
// @namespace   farmolo.aci.v1.5
// @include     https://hu*.klanhaboru.hu/game.php?village=*&screen=place*
// @include     https://hu*.klanhaboru.hu/*
// @include     https://hu*.klanhaboru.hu/game.php?village=*&try=confirm&screen=place&target=*
// @include     https://hu40.klanhaboru.hu/game.php?village=8574&screen=place&try=confirm
// @require     https://gist.github.com/Acidias/27b22243686c53316282414c2011ce3c/raw/cadad8542ea371454d1af899d9a8c80263cf3a3d/Barbar%2520falu%2520list%25C3%25A1z%25C3%25B3
// @grant GM_getValue
// @grant GM_setValue
// @version     1
// ==/UserScript==
var village_id = game_data.village.id;

/////MEGERŐSITŐ GOMB!/////

setInterval(function () {
  var troop_con = document.getElementById("troop_confirm_go");
  if(troop_con){
    troop_con.click();
  }
}, Math.random()*500+1000);
/*
var alertsound = document.createElement("audio");
alertsound.src = "http://soundjax.com/reddo/78956%5EBEEP.mp3";
//alertsound.loop = "true";
setTimeout(function (){
var bot = document.getElementById("bot_check");
if(bot){
  //alert(bot);
  alertsound.play();

}
}, 2000);

var oldal = document.getElementById("topContainer");
if(!oldal){
  var alertsound = document.createElement("audio");
  alertsound.src = "http://soundjax.com/reddo/78956%5EBEEP.mp3";
  alertsound1.play();
  alertsound1.loop = "true";
}
*/

////LEÁLLIT GOMB///
var leallit = document.createElement("button");
var leallit_text = document.createTextNode("Inditás");
leallit.appendChild(leallit_text);
leallit.style.position="fixed";
leallit.style.top="90%";
leallit.style.height="5%";
leallit.style.width="8%";
leallit.style.left="8%";
leallit.style.textAlign="center";
leallit.style.zIndex="999";
leallit.addEventListener("click", leallitas);
document.body.appendChild(leallit);

function leallitas(event){
leallit_text.nodeValue = leallit_text.nodeValue == 'Inditás' ? 'Leállit' : 'Inditás';
GM_setValue("leallit_text", leallit_text.nodeValue);
}
leallit_text.nodeValue = GM_getValue("leallit_text", "");

////CONFIGMEZO////
var config = document.createElement("div");
  config.style.position="fixed";
  config.style.background="#eee";
  config.style.top="100px";
  config.style.height="450px";
  config.style.width="250px";
  config.style.textAlign="center";
  config.style.zIndex="999";
  //config.style.visibility="hidden";
  document.body.appendChild(config);
////MEGNYITAS GOMB////
var megnyitas = document.createElement("button");
var megnyitas_text = document.createTextNode("Megnyitás");
  megnyitas.appendChild(megnyitas_text);
  megnyitas.style.position="fixed";
  megnyitas.style.top="90%";
  megnyitas.style.height="5%";
  megnyitas.style.width="8%";
  megnyitas.style.textAlign="center";
  megnyitas.style.zIndex="999";
  megnyitas.addEventListener("click", megnyitas_c);
  document.body.appendChild(megnyitas);

function megnyitas_c(event) {
  config.style.visibility = config.style.visibility == 'visible' ? 'hidden' : 'visible';
  megnyitas_text.nodeValue = megnyitas_text.nodeValue == 'Megnyitás' ? 'Bezárás' : 'Megnyitás';
  GM_setValue("megnyitas_a", megnyitas_text.nodeValue);
  GM_setValue("megnyitas_cc", config.style.visibility);
}
config.style.visibility = GM_getValue("megnyitas_cc", "");
megnyitas_text.nodeValue = GM_getValue("megnyitas_a", "");

/*

  ////FARMOLÁS INDUL/////
var farm_ind_p = document.createElement("P");
var farm_ind = document.createTextNode("Farmolás indul: ");
farm_ind_p.appendChild(farm_ind)
config.appendChild(farm_ind_p);

var szamlalo_div = document.createElement("div");
szamlalo_div.style.position="fixed";
szamlalo_div.style.background="#eee";
szamlalo_div.style.height="40px";
szamlalo_div.style.width="100px";
szamlalo_div.style.left="5px";
szamlalo_div.style.top="8%";
szamlalo_div.style.textAlign="center";
szamlalo_div.setAttribute("id", "sajat");
document.body.appendChild(szamlalo_div);

var rand_reload = Math.round(Math.random() * (700000 - 500000) + 700000);
var text = document.createTextNode(rand_reload);
szamlalo_div.appendChild(text);
var min = rand_reload / 1000 / 60;
var r = min % 1;
var sec = Math.floor(r * 60);
min = Math.floor(min);
var idozito = setInterval(v_szamol, 1000);
var lejart = false;
function v_szamol() {
  sec--;
  if(min == 0 && sec == 0){
    clearInterval(idozito);
    lejart = true;
  }
  if(sec < 10)
  { sec1 = '0'+sec; }
  else
  { sec1 = sec; }
  document.querySelector("#sajat").textContent = min + ":" + sec1;
  if(sec == 0){
    min--;
    sec = 60;
  }
  if(lejart)
  location.reload();
}

*/

  ////KOORDINÁTÁK/////
  var coordtext = document.createTextNode("Koordináták száma: ");
  var coordinput=document.createElement("textarea");
  coordinput.setAttribute("id", "koordinatak");
  coordinput.style.width = "230px";
  coordinput.style.height= "100px";
  coordinput.value=GM_getValue("koordinatak_" + village_id, "");
  var coords = coordinput.value.split(" ");
  var coordsSize = document.createTextNode(coords.length);
  config.appendChild(coordtext);
  config.appendChild(coordsSize);
  config.appendChild(coordinput);

////INDITÓ IDŐZITŐ//////

if(GM_getValue("leallit_text", "") == "Leállit"){
  var kl_menyiseg = document.getElementById("units_entry_all_light");
  var kl_menyiseg_t = "0";
    if(kl_menyiseg){
        kl_menyiseg_t = document.getElementById("units_entry_all_light").innerHTML;
        var kl_menyiseg_s = kl_menyiseg_t.match(/\d/g);
        kl_menyiseg_s = kl_menyiseg_s.join("");
        var min_kl_menyiseg = 10;
        setTimeout(function (){
            var coords = coordinput.value.split(" ");
            var sp=document.getElementsByName("input")[0];
            var c = GM_getValue("lastcoordid", "");
            c+=1;
            sp.value=coords[c];
            GM_setValue("lastcoordid", c);
            if(coords.length <= c){
                c=0;
                sp.value=coords[c];
                GM_setValue("lastcoordid", c);
                setInterval(function() {document.getElementById("target_attack").click();}, Math.random()*5000+7000); // Menyi időnként küldje //
            } else if (min_kl_menyiseg > kl_menyiseg_s){
                setTimeout(function() { window.location=window.location;},Math.random()*5000+7000);
            } else {
                document.getElementById("target_attack").click();
            }
        } ,Math.random()*60+100);
    }
} else {
  //alert("Leállitottad a botot");
}
  ////SEREG////
  ////LÁNDZSÁS///
var egysegek = ["spear",
               "sword",
               "axe",
               "spy",
               "light",
               "heavy",
               "ram",
               "catapult",
               "knight",
               "snob"
               ];
for(var i in egysegek) {
    var kep = document.createElement("img");
    kep.src = "//dshu.innogamescdn.com/8.31/24103/graphic/unit/unit_" + egysegek[i] + ".png?48b3b";
    config.appendChild(kep);
    var input=document.createElement("input");
    input.setAttribute("id", "script_input_" + egysegek[i]);
    config.appendChild(input);
    input.value=GM_getValue(egysegek[i] + "_" + village_id, "");
    var pageinput=document.getElementById("unit_input_" + egysegek[i]);
    if(pageinput) {
        pageinput.value = input.value;
    }
    var sortores = document.createElement("br");
    config.appendChild(sortores);
}
////IDŐŐŐ/////

////MENTÉSGOMB////
  function mentes(event){
    //GM_setValue("ido", ido.value);
    GM_setValue("koordinatak_" + village_id, coordinput.value);
    for(var i in egysegek){
      GM_setValue(egysegek[i] + "_" + village_id, document.getElementById("script_input_" + egysegek[i]).value);
    }
  //GM_setValue("szamlalo_text", szamlalo_text_mentett);
  }
  var mentesgomb=document.createElement("button");
  mentesgomb.appendChild(document.createTextNode("Mentés!"));
  mentesgomb.addEventListener("click", mentes);
  config.appendChild(mentesgomb);
