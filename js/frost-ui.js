(() => {
  "use strict";
  const $ = (s, root=document) => root.querySelector(s);
  const hero = $(".hero");
  if (!hero) return;
  // Static hero background: no canvas animation or particle loop on low-end devices.

  // Add version shortcuts without replacing the existing 26.2 launch link.
  const actions = $(".hero .actions");
  if(actions){
    const versions=document.createElement("div");
    versions.className="frost-launches";
    versions.innerHTML='<a href="./play.html?version=1.8.8" >Launch 1.8.8</a><a href="./play.html?version=1.12.2" >Launch 1.12.2</a><a href="./play.html?version=26.2" >Launch 26.2</a><a href="./play.html?version=26.3" >Launch 26.3</a>';
    actions.insertAdjacentElement("afterend",versions);
  }

  // HUD Studio: a real browser-input preview; game-only telemetry stays clearly marked.
  const section=document.createElement("section");
  section.className="section";
  section.id="hud-studio";
  section.innerHTML='<div class="eyebrow">FROST HUD LAB</div><h2>HUD Studio</h2><p>Preview your layout and save your preferences. Game FPS and server ping need a supported in-game bridge.</p><div class="frost-hud-grid"><div class="frost-preview" id="frostPreview" data-frost-style="modern"><div class="frost-preview-hud" id="frostPreviewHud"><div class="frost-widget" id="frostFpsWidget"><small>FPS · PREVIEW</small><strong id="frostFps">--</strong></div><div class="frost-widget" id="frostPingWidget"><small>PING · GAME</small><strong>Not connected</strong></div><div class="frost-widget" id="frostKeysWidget"><small>KEYSTROKES</small><div class="frost-keys"><span></span><span class="frost-key" data-fkey="KeyW">W</span><span></span><span class="frost-key" data-fkey="KeyA">A</span><span class="frost-key" data-fkey="KeyS">S</span><span class="frost-key" data-fkey="KeyD">D</span></div></div></div></div><div class="card frost-settings"><h3>Customize overlay</h3><label class="frost-control"><span>Visual style</span><select id="frostStyle"><option value="modern">Frost Modern</option><option value="1.8">Classic 1.8</option><option value="1.12">Classic 1.12</option></select></label><label class="frost-control"><span>FPS preview</span><input type="checkbox" id="frostShowFps" checked></label><label class="frost-control"><span>Ping placeholder</span><input type="checkbox" id="frostShowPing" checked></label><label class="frost-control"><span>Keystrokes</span><input type="checkbox" id="frostShowKeys" checked></label><label class="frost-control"><span>HUD position</span><select id="frostPosition"><option value="left">Top left</option><option value="right">Top right</option></select></label><p class="frost-note">The FPS number here measures this preview page only. Ping is intentionally unavailable until Frost is connected to the game's network telemetry.</p><button class="btn" id="frostReset">Reset HUD settings</button></div></div>';
  const mods=$("#mods");
  if(mods) mods.insertAdjacentElement("beforebegin",section);
  else document.querySelector("main")?.append(section);

  const defaults={style:"modern",fps:true,ping:true,keys:true,position:"left"};
  let prefs={...defaults};
  try{prefs={...defaults,...JSON.parse(localStorage.getItem("frostHudPrefs")||"{}")};}catch{}
  const preview=$("#frostPreview"),hud=$("#frostPreviewHud");
  const controls={style:$("#frostStyle"),fps:$("#frostShowFps"),ping:$("#frostShowPing"),keys:$("#frostShowKeys"),position:$("#frostPosition")};
  function persist(){try{localStorage.setItem("frostHudPrefs",JSON.stringify(prefs));}catch{}}
  function apply(){
    preview.dataset.frostStyle=prefs.style;
    controls.style.value=prefs.style;controls.fps.checked=prefs.fps;controls.ping.checked=prefs.ping;controls.keys.checked=prefs.keys;controls.position.value=prefs.position;
    $("#frostFpsWidget").classList.toggle("frost-hidden",!prefs.fps);
    $("#frostPingWidget").classList.toggle("frost-hidden",!prefs.ping);
    $("#frostKeysWidget").classList.toggle("frost-hidden",!prefs.keys);
    hud.style.left=prefs.position==="left"?"18px":"auto";
    hud.style.right=prefs.position==="right"?"18px":"auto";
    hud.style.alignItems=prefs.position==="right"?"flex-end":"flex-start";
    persist();
  }
  controls.style.addEventListener("change",e=>{prefs.style=e.target.value;apply()});
  controls.fps.addEventListener("change",e=>{prefs.fps=e.target.checked;apply()});
  controls.ping.addEventListener("change",e=>{prefs.ping=e.target.checked;apply()});
  controls.keys.addEventListener("change",e=>{prefs.keys=e.target.checked;apply()});
  controls.position.addEventListener("change",e=>{prefs.position=e.target.value;apply()});
  $("#frostReset").addEventListener("click",()=>{prefs={...defaults};apply()});
  apply();

  // Do not run a permanent animation loop just to animate a launcher preview.
  $("#frostFps").textContent = "Preview only";

  const held=new Set();
  function updateKeys(){document.querySelectorAll("[data-fkey]").forEach(k=>k.classList.toggle("on",held.has(k.dataset.fkey)));}
  addEventListener("keydown",e=>{if(["KeyW","KeyA","KeyS","KeyD"].includes(e.code)){held.add(e.code);updateKeys();}});
  addEventListener("keyup",e=>{held.delete(e.code);updateKeys();});
  addEventListener("blur",()=>{held.clear();updateKeys();});
})();
