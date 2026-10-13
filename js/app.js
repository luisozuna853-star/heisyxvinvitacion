/* Invitación XV años · Heisy Jireh — animaciones e interacción */
(function () {
  "use strict";



  const $ = id => document.getElementById(id);
  const FLORES = {
    rama: "img/flores/rama.webp",
    f10: "img/flores/f10.webp",
    f14: "img/flores/f14.webp",
    f15: "img/flores/f15.webp",
    f18: "img/flores/f18.webp",
    f19: "img/flores/f19.webp",
    f20: "img/flores/f20.webp",
    f21: "img/flores/f21.webp",
    f22: "img/flores/f22.webp",
    f24: "img/flores/f24.webp"
  };
  document.querySelectorAll("img[data-flor]").forEach(im => { im.src = FLORES[im.dataset.flor]; });
  document.querySelectorAll("[data-cfg]").forEach(el => { el.textContent = CONFIG[el.dataset.cfg] || ""; });
  (function () {
    const f = new Date(CONFIG.fechaISO);
    const dia = f.toLocaleDateString("es", { weekday: "long" });
    const mes = f.toLocaleDateString("es", { month: "long" });
    const p = $("infoFecha");
    p.append(dia, document.createElement("br"), f.getDate() + " de " + mes, document.createElement("br"), String(f.getFullYear()));
  })();
  document.title = "Mis XV años · " + CONFIG.nombre;
  const mapa = q => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  $("mapaLugar").href = mapa(CONFIG.direccion);
  $("qrLink").href = $("btnRegistro").href = CONFIG.regalosUrl;
  (function () {
    const ini = new Date(CONFIG.fechaISO), fin = new Date(ini.getTime() + 6 * 3600e3);
    const f = x => x.getFullYear() + String(x.getMonth() + 1).padStart(2, "0") + String(x.getDate()).padStart(2, "0") + "T" + String(x.getHours()).padStart(2, "0") + String(x.getMinutes()).padStart(2, "0") + "00";
    $("btnCal").href = "https://calendar.google.com/calendar/render?action=TEMPLATE"
      + "&text=" + encodeURIComponent("XV años de " + CONFIG.nombre)
      + "&dates=" + f(ini) + "/" + f(fin)
      + "&location=" + encodeURIComponent(CONFIG.direccion);
  })();

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  const g = window.gsap, ST = window.ScrollTrigger, MP = window.MotionPathPlugin;
  const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animar = !!(g && ST && MP) && !reducir;
  if (animar) {
    g.registerPlugin(ST, MP);
    document.documentElement.classList.add("anim");
    // La portada queda oculta detrás del sobre hasta que este desaparece
    g.set(".ani-intro", { y: 22, opacity: 0 });
    g.set("#xv", { clipPath: "inset(0 100% 0 0)" });
    g.set("#anos", { scaleX: 0, opacity: 0 });
    g.set("#nombrePortada", { clipPath: "inset(0 100% 0 0)" });
    g.set("#maravillas", { y: 10, opacity: 0 });
    g.set(["#decoPort1", "#decoPort2"], { opacity: 0, y: 40 });
  }

  /* ---------- Guardado local de la firma ---------- */
  const CLAVE = "xv-firma-" + CONFIG.nombre.toLowerCase();
  function leerFirma() { try { const v = localStorage.getItem(CLAVE); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function guardarFirma(d) { try { localStorage.setItem(CLAVE, JSON.stringify(d)); } catch (e) {} }

  /* ---------- WhatsApp ---------- */
  function urlWhatsApp(msg) { return "https://wa.me/" + CONFIG.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(msg); }
  function mensajeConfirmacion(nombre) {
    return "¡Hola! Soy " + nombre + " y confirmo mi asistencia a los XV años de " + CONFIG.nombre + " el " + CONFIG.fecha + ". ¡Ahí estaré! 👑";
  }
  function urlConfirmacion(nombre) { return urlWhatsApp(mensajeConfirmacion(nombre)); }

  /* ---------- Sello, mariposas y reloj ---------- */
  function selloSVG() {
    let d = "";
    for (let i = 0; i <= 90; i++) {
      const a = i / 90 * Math.PI * 2;
      const r = 46 + 2.2 * Math.sin(a * 7) + 1.4 * Math.sin(a * 13 + 1) + .8 * Math.sin(a * 29);
      d += (i ? "L" : "M") + (50 + r * Math.cos(a)).toFixed(2) + " " + (50 + r * Math.sin(a)).toFixed(2);
    }
    return '<svg viewBox="0 0 100 100"><path d="' + d + 'Z" fill="url(#gSello)" stroke="#8f6f2e" stroke-width=".8"/>'
      + '<circle cx="50" cy="50" r="32" fill="none" stroke="#8f6f2e" stroke-opacity=".5" stroke-width="1.5"/>'
      + '<circle cx="50" cy="50" r="28" fill="url(#gSelloIn)"/>'
      + '<text x="50.7" y="62.7" text-anchor="middle" font-family="Pinyon Script, cursive" font-size="34" fill="#efdcab" opacity=".55">XV</text>'
      + '<text x="50" y="62" text-anchor="middle" font-family="Pinyon Script, cursive" font-size="34" fill="#5e451a">XV</text></svg>';
  }
  function mariposaSVG() {
    const ala = '<path d="M2 -3 C9 -18 26 -34 52 -40 C47 -31 43 -18 36 -8 C27 1 12 2 2 1 Z" fill="url(#gAla2)" stroke="#d9c08a" stroke-width="1.1" stroke-linejoin="round"/>'
      + '<path d="M2 2 C15 2 31 6 35 15 C37 24 30 33 24 38 C21 41 18 46 15 50 C11 40 6 24 2 6 Z" fill="url(#gAla3)" stroke="#d9c08a" stroke-width="1.1" stroke-linejoin="round"/>'
      + '<path d="M3 -2 C14 -14 30 -27 48 -37 M3 -1 C16 -9 28 -14 40 -17 M4 0 C16 -3 26 -5 35 -7 M3 3 C13 9 22 17 26 30 M3 4 C10 12 14 24 15 44" fill="none" stroke="#d9c08a" stroke-opacity=".55" stroke-width=".55"/>'
      + '<path d="M50 -39 C46 -31 43 -20 37 -10" fill="none" stroke="#e8d6a4" stroke-width="2.4" stroke-linecap="round"/>'
      + '<g fill="#e8d6a4"><circle cx="45" cy="-30" r="1.3"/><circle cx="42" cy="-23" r="1.1"/><circle cx="39" cy="-16" r="1"/><circle cx="31" cy="20" r="1.2"/><circle cx="27" cy="29" r="1.1"/><circle cx="21" cy="37" r="1"/></g>';
    return '<svg viewBox="-56 -46 112 100"><g class="ala">' + ala + '</g><g transform="scale(-1 1)"><g class="ala">' + ala + '</g></g>'
      + '<path d="M-1 -15 C-4 -27 -9 -33 -14 -36 M1 -15 C4 -27 9 -33 14 -36" fill="none" stroke="#d9c08a" stroke-width="1" stroke-linecap="round"/>'
      + '<circle cx="-14" cy="-36" r="1.6" fill="#d9c08a"/><circle cx="14" cy="-36" r="1.6" fill="#d9c08a"/>'
      + '<ellipse cx="0" cy="5" rx="2.6" ry="17" fill="url(#gOro)"/><circle cx="0" cy="-13" r="3.2" fill="url(#gOro)"/></svg>';
  }
  document.querySelectorAll(".sello-mitad, .sello-entero").forEach(m => { m.innerHTML = selloSVG(); });
  $("mariposaIntro").innerHTML = mariposaSVG();
  $("mariposaPagina").innerHTML = mariposaSVG();
  function nuevaMariposa(ancho, z) {
    const m = document.createElement("div");
    m.className = "mariposa";
    m.setAttribute("aria-hidden", "true");
    m.style.width = ancho + "px";
    m.style.zIndex = z;
    m.innerHTML = mariposaSVG();
    document.body.appendChild(m);
    g.set(m, { xPercent: -50, yPercent: -50 });
    aleteo(m, g.utils.random(.08, .12));
    return m;
  }
  function revolotear(m, pts, dur) {
    return g.to(m, { motionPath: { path: pts, curviness: 1.4, autoRotate: 90 }, duration: dur, ease: "sine.inOut", repeat: -1, yoyo: true });
  }
  const extrasIntro = [];
  function mariposasIntro() {
    const W = innerWidth, H = innerHeight;
    [
      { desde: [-70, H * .8], ruta: [[.1, .56], [.06, .44], [.13, .36], [.07, .64]], t: 7, a: 56 },
      { desde: [W + 70, H * .3], ruta: [[.9, .5], [.94, .62], [.87, .72], [.93, .42]], t: 8, a: 58 },
      { desde: [W + 70, H * .95], ruta: [[.84, .86], [.92, .8], [.78, .92], [.9, .9]], t: 6, a: 44 },
      { desde: [-70, H * .2], ruta: [[.3, .08], [.5, .05], [.7, .09], [.45, .12]], t: 9, a: 40 }
    ].forEach((r, i) => {
      const m = nuevaMariposa(r.a, 55);
      extrasIntro.push(m);
      g.set(m, { x: r.desde[0], y: r.desde[1] });
      const pts = r.ruta.map(([a, b]) => ({ x: a * W, y: b * H }));
      g.to(m, { motionPath: { path: [{ x: (r.desde[0] + pts[0].x) / 2, y: (r.desde[1] + pts[0].y) / 2 - 50 }, pts[0]], curviness: 1.3, autoRotate: 90 },
        duration: 2.6, delay: .4 + i * .6, ease: "sine.out", onComplete: () => revolotear(m, pts, r.t) });
    });
  }
  function aleteo(el, vel) {
    return g.to(el.querySelectorAll(".ala"), { scaleX: .18, transformOrigin: "0% 50%", duration: vel, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }

  /* ---------- Llegada del sobre ---------- */
  let pulso = null, aleteoIntro = null;
  function llegaMariposa() {
    const s = $("sello").getBoundingClientRect(), W = innerWidth, H = innerHeight;
    const tx = s.left + s.width * .78, ty = s.top + s.height * .12;
    aleteoIntro = aleteo($("mariposaIntro"), .1);
    g.to("#mariposaIntro", {
      motionPath: { path: [{ x: W * .18, y: H * .72 }, { x: W * .32, y: H * .3 }, { x: W * .82, y: H * .18 }, { x: tx + 50, y: ty - 60 }, { x: tx, y: ty }], curviness: 1.4, autoRotate: 90 },
      duration: 4.2, ease: "sine.inOut",
      onComplete() { g.to("#mariposaIntro", { rotation: 24, duration: .7, ease: "sine.out" }); aleteoIntro.timeScale(.22); }
    });
  }
  if (animar) {
    mariposasIntro();
    const W = innerWidth, H = innerHeight;
    g.set("#sobre", { y: -H * .65, rotation: -9, opacity: 0 });
    g.set(["#aperturaTit", "#nota"], { opacity: 0, y: 10 });
    g.set("#sombraPiso", { scale: .4, opacity: 0 });
    g.set("#mariposaIntro", { xPercent: -50, yPercent: -50, x: -80, y: H + 80 });
    g.set("#decoApRamo", { opacity: 0, x: 40, y: -40 });
    g.set("#decoApLibros", { opacity: 0, x: -40, y: 40 });
    g.set("#decoApRama", { opacity: 0, x: 40, y: 40 });
    g.to(["#decoApRamo", "#decoApLibros", "#decoApRama"], { opacity: 1, x: 0, y: 0, duration: 1.8, ease: "power2.out", delay: .2 });
    // Péndulo: cae, se balancea en el centro y luego se queda en la esquina
    const pend = $("pendulo");
    const s0 = Math.min(1.8, (H * .86) / 360, (W * .95) / 160);
    g.set(pend, { x: W / 2 - 80, y: -380 * s0 - 40, scale: s0 });
    const vaiven = g.fromTo(pend, { rotation: 22 }, { rotation: -22, duration: 1.15, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true });
    g.timeline({ delay: .3 })
      .to(pend, { y: 0, duration: 1.3, ease: "power3.out" })
      .add(() => vaiven.play(), .25)
      .to("#aperturaTit", { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" }, 3.7)
      .add(() => { vaiven.kill(); g.to(pend, { rotation: 9, duration: .6, ease: "sine.out" }); }, 3.3)
      .to(pend, { x: -4, y: -70 * Math.min(.8, H * .00105) / .8, scale: Math.min(.8, H * .00105), duration: 1.3, ease: "power3.inOut" }, 3.4)
      .add(() => g.fromTo(pend, { rotation: 9 }, { rotation: -9, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 }), 4.0);

    g.timeline({ delay: 4.3 })
      .to("#sobre", { y: 0, rotation: 2, opacity: 1, duration: 1.6, ease: "power3.out" }, .5)
      .to("#sobre", { rotation: 0, duration: 1.2, ease: "sine.inOut" }, "-=.4")
      .to("#sombraPiso", { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" }, .8)
      .to("#nota", { opacity: 1, y: 0, duration: .9 }, "-=.7")
      .add(() => {
        pulso = g.to("#sello", { scale: 1.035, duration: 1.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
        llegaMariposa();
      });
  }

  /* ---------- Abrir ---------- */
  let abierto = false;
  $("sello").addEventListener("click", () => {
    if (abierto) return;
    abierto = true;
    if (!animar) { terminarApertura(); return; }
    if (pulso) pulso.kill();

    // La mariposa sale volando
    extrasIntro.forEach((e, i) => {
      g.killTweensOf(e);
      const ex = g.getProperty(e, "x"), ey = g.getProperty(e, "y");
      g.to(e, { motionPath: { path: [{ x: ex + (i % 2 ? -60 : 60), y: ey - 120 }, { x: ex + (i % 2 ? -140 : 140), y: -160 }], curviness: 1.2, autoRotate: 90 },
        duration: 2 + i * .3, ease: "power1.in", onComplete: () => e.remove() });
    });
    const m = $("mariposaIntro");
    g.killTweensOf(m);
    if (aleteoIntro) aleteoIntro.timeScale(1.5); else aleteoIntro = aleteo(m, .07);
    const mx = g.getProperty(m, "x"), my = g.getProperty(m, "y");
    g.to(m, { motionPath: { path: [{ x: mx + 70, y: my - 90 }, { x: innerWidth * .88, y: innerHeight * .14 }, { x: innerWidth + 140, y: -140 }], curviness: 1.3, autoRotate: 90 }, duration: 2.2, ease: "power1.in" });

    g.timeline()
      .to(["#nota", "#aperturaTit"], { opacity: 0, y: -10, duration: .4 }, 0)
      .to("#sello", { scale: 1.06, duration: .15, ease: "power1.out" }, 0)
      .set("#selloEntero", { opacity: 0 }, .17)
      .set(".sello-mitad", { opacity: 1 }, .17)
      .to(".sello-mitad.izq", { x: -30, y: 80, rotation: -55, opacity: 0, duration: .85, ease: "power2.in" }, .18)
      .to(".sello-mitad.der", { x: 30, y: 80, rotation: 55, opacity: 0, duration: .85, ease: "power2.in" }, .18)
      .to("#solapa", { rotationX: 180, duration: .9, ease: "power2.inOut" }, .4)
      .set("#solapa", { zIndex: 1 }, .85)
      .to("#carta", { yPercent: -46, duration: 1.2, ease: "power3.out" }, 1.05)
      .to("#sombraPiso", { opacity: 0, duration: .6 }, 2.0)
      .to(["#decoApRamo", "#decoApLibros", "#decoApRama"], { opacity: 0, duration: .7 }, 2.0)
      .to("#sobreWrap", { scale: 6, transformOrigin: "50% 12%", duration: 1.1, ease: "power2.in" }, 2.2)
      .to("#velo", { opacity: 1, duration: .5, ease: "power1.in" }, 2.8)
      .add(revelarPagina, 3.25)
      .add(iniciarPagina, 3.3)
      .to("#velo", { opacity: 0, duration: 1, ease: "power2.out" }, 3.3);
  });

  function revelarPagina() {
    $("apertura").hidden = true;
    $("pagina").classList.remove("oculto");
    window.scrollTo(0, 0);
  }
  function terminarApertura() {
    revelarPagina();
    document.body.classList.remove("cerrado");
    iniciarPagina();
  }

  /* ---------- Página ---------- */
  function iniciarPagina() {
    const previa = leerFirma();
    if (previa) mostrarFirma(previa, false);
    if (!animar) return;

    // Entrada de la portada, de arriba hacia abajo y sin encimarse
    g.timeline({ onComplete: () => { document.body.classList.remove("cerrado"); crearScroll(); } })
      .to(["#decoPort1", "#decoPort2"], { opacity: 1, y: 0, duration: 1.6, ease: "power2.out", stagger: .15 }, 0)
      .to(".ani-intro", { y: 0, opacity: 1, stagger: .14, duration: .8, ease: "power2.out" }, .2)
      .to("#xv", { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power2.inOut" }, "-=.2")
      .to("#anos", { scaleX: 1, opacity: 1, duration: .8, ease: "power2.out" }, "-=.5")
      .to("#nombrePortada", { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power2.inOut" }, "-=.3")
      .to("#maravillas", { y: 0, opacity: 1, duration: .8, ease: "power2.out" }, "-=.4");
  }

  function crearScroll() {
    // Al bajar: primero se van los textos y luego el XV hace zoom
    g.timeline({ scrollTrigger: { trigger: "#portada", start: "top top", end: "+=1000", pin: true, scrub: .8, anticipatePin: 1 } })
      .to("#decoPort1", { x: 60, y: 60, opacity: 0, duration: .5, ease: "power1.in" }, 0)
      .to("#decoPort2", { x: -60, y: 60, opacity: 0, duration: .5, ease: "power1.in" }, 0)
      .to("#introWrap", { y: -90, opacity: 0, duration: .35, ease: "power1.in" }, 0)
      .to("#nombreWrap", { y: 90, opacity: 0, duration: .35, ease: "power1.in" }, 0)
      .to("#xvWrap", { scale: 3.2, opacity: 0, duration: .75, ease: "power1.in" }, .25);

    // Ramas fijas en las esquinas: aparecen al dejar la portada y se apartan en el cierre
    g.to("#decoPortRama", { x: 60, y: -60, opacity: 0, ease: "none", scrollTrigger: { trigger: "#portada", start: "top top", end: "+=400", scrub: .8 } });

    // El reloj se queda en la esquina mientras estás en la portada y sube al seguir bajando
    g.to("#pendulo", { y: -440, ease: "power2.in", scrollTrigger: { trigger: "#fechaSec", start: "top 75%", end: "top 35%", scrub: .6 } });

    // Mariposas que revolotean por la orilla izquierda, detrás del contenido
    [[[.06, .3], [.1, .48], [.05, .66], [.09, .4]], [[.08, .84], [.14, .92], [.05, .76], [.12, .88]]].forEach((ruta, i) => {
      const mm = nuevaMariposa(i ? 42 : 50, 0);
      const pts = ruta.map(([a, b]) => ({ x: a * innerWidth, y: b * innerHeight }));
      g.set(mm, { x: pts[0].x, y: pts[0].y, opacity: 0 });
      g.to(mm, { opacity: 1, duration: 1.2 });
      revolotear(mm, pts, 10 + i * 3);
    });

    // Mariposa que vuela por la página al bajar
    const W = innerWidth, H = innerHeight, mp = $("mariposaPagina");
    g.set(mp, { xPercent: -50, yPercent: -50, x: W * .86, y: H * .13, rotation: -24, opacity: 0 });
    g.to(mp, { opacity: 1, duration: .8 });
    aleteo(mp, .09).timeScale(.35);
    g.to(mp, {
      motionPath: { path: [{ x: W * .86, y: H * .13 }, { x: W * .92, y: H * .3 }, { x: W * .88, y: H * .55 }, { x: W * .93, y: H * .78 }, { x: W * .89, y: H * .6 }, { x: W * .92, y: H * .35 }, { x: W * .9, y: H * .14 }], curviness: 1.2, autoRotate: 90 },
      ease: "none",
      scrollTrigger: { trigger: "#fechaSec", start: "top 80%", endTrigger: "#cierre", end: "bottom bottom", scrub: 1.5 }
    });

    // Destellos con parallax

    // Títulos y ornamentos
    g.utils.toArray(".ornamento").forEach(o => {
      g.from(o, { scaleX: 0, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: o, start: "top 85%", toggleActions: "play none none reverse" } });
    });
    g.utils.toArray(".titulo-seccion").forEach(t => {
      g.from(t, { y: 24, opacity: 0, duration: 1.1, ease: "power2.out", scrollTrigger: { trigger: t, start: "top 85%", toggleActions: "play none none reverse" } });
    });

    // Detalles
    g.from(".padres-linea", { y: 20, opacity: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: ".padres-linea", start: "top 88%", toggleActions: "play none none reverse" } });
    g.from(".info-item", { y: 24, opacity: 0, stagger: .15, duration: .9, ease: "power2.out", scrollTrigger: { trigger: "#info", start: "top 85%", toggleActions: "play none none reverse" } });
    g.from(".cuenta div", { y: 16, opacity: 0, stagger: .1, duration: .8, ease: "power2.out", scrollTrigger: { trigger: "#cuenta", start: "top 90%", toggleActions: "play none none reverse" } });

    // Tarjeta de confirmación: sube como papel
    g.from("#tarjeta", { y: 80, opacity: .2, ease: "none", scrollTrigger: { trigger: "#tarjeta", start: "top bottom", end: "top 45%", scrub: true } });

    // Regalos
    g.from("#qrTarjeta", { y: 30, opacity: 0, duration: 1.1, ease: "power2.out", scrollTrigger: { trigger: "#qrTarjeta", start: "top 88%", toggleActions: "play none none reverse" } });
    g.from(".botones", { y: 20, opacity: 0, duration: .7, scrollTrigger: { trigger: ".botones", start: "top 95%", toggleActions: "play none none reverse" } });
    g.from("#decoCierre", { y: 30, opacity: 0, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: ".cierre", start: "top 85%" } });
    g.from(".firma-final", { clipPath: "inset(0 100% 0 0)", duration: 1.6, ease: "power2.inOut", scrollTrigger: { trigger: ".cierre", start: "top 85%" } });

    ST.refresh();
  }

  /* ---------- Cuenta regresiva ---------- */
  const meta = new Date(CONFIG.fechaISO).getTime();
  const dos = n => String(n).padStart(2, "0");
  function contar() {
    const falta = meta - Date.now();
    if (!(falta > 0)) { $("cuenta").hidden = true; $("cuentaHoy").hidden = false; return false; }
    const s = Math.floor(falta / 1000);
    $("cDias").textContent = Math.floor(s / 86400);
    $("cHoras").textContent = dos(Math.floor(s % 86400 / 3600));
    $("cMin").textContent = dos(Math.floor(s % 3600 / 60));
    $("cSeg").textContent = dos(s % 60);
    return true;
  }
  if (contar()) { const t = setInterval(() => { if (!contar()) clearInterval(t); }, 1000); }


  /* ---------- Confirmar y firmar ---------- */
  $("btnAceptar").addEventListener("click", () => {
    $("btnAceptar").hidden = true;
    $("formulario").hidden = false;
    if (animar) g.from("#formulario", { y: 20, opacity: 0, duration: .5, ease: "power2.out" });
    $("inNombre").focus();
  });

  function validar() {
    const nombre = $("inNombre").value.trim().replace(/\s+/g, " ");
    if (nombre.length < 2) {
      $("errNombre").textContent = "Escribe tu nombre para firmar.";
      $("inNombre").setAttribute("aria-invalid", "true");
      $("inNombre").focus();
      return null;
    }
    $("errNombre").textContent = "";
    $("inNombre").removeAttribute("aria-invalid");
    return { nombre };
  }

  function firmar() {
    const datos = validar();
    if (!datos) return;
    const f = { ...datos, fecha: hoyTexto() };
    guardarFirma(f);
    enviarConfirmacion(f.nombre);
    mostrarFirma(f, true);
  }
  $("btnFirmar").addEventListener("click", firmar);
  $("inNombre").addEventListener("keydown", e => { if (e.key === "Enter") firmar(); });

  /* ---------- Foto de la confirmación firmada ---------- */
  let fotoArchivo = null, fotoURL = null, fotoPNG = null, fotoNombre = "", fotoNombreArchivo = "confirmacion-xv.jpg";
  function cargarImg(src) {
    return new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
  }
  function textoEspaciado(x, txt, cx, y, esp) {
    if ("letterSpacing" in x) { x.letterSpacing = esp + "px"; x.fillText(txt, cx + esp / 2, y); x.letterSpacing = "0px"; return; }
    x.fillText(txt.split("").join(String.fromCharCode(8202)), cx, y);
  }
  // Dibuja la misma tarjeta de confirmación que se ve en la página, ya firmada
  async function crearFoto(f) {
    try {
      await Promise.all([
        document.fonts.load('100px "Pinyon Script"'),
        document.fonts.load('400 34px "Cormorant Garamond"'),
        document.fonts.load('600 34px "Cormorant Garamond"'),
        document.fonts.load('italic 30px "Cormorant Garamond"')
      ]);
    } catch (e) {}
    const W = 1200, H = 1040, c = document.createElement("canvas");
    c.width = W; c.height = H;
    const x = c.getContext("2d");
    const serif = '"Cormorant Garamond", Georgia, serif', script = '"Pinyon Script", "Snell Roundhand", cursive';
    // Fondo azul de la página
    const fondo = x.createRadialGradient(W / 2, H * .4, 80, W / 2, H / 2, W * .8);
    fondo.addColorStop(0, "#1b3690"); fondo.addColorStop(1, "#0d1e5c");
    x.fillStyle = fondo; x.fillRect(0, 0, W, H);
    // Tarjeta marfil
    const cx = 110, cy = 150, cw = W - 220, ch = 820;
    x.save(); x.shadowColor = "rgba(0,0,0,.45)"; x.shadowBlur = 60; x.shadowOffsetY = 26;
    x.fillStyle = "#fffdf8"; x.fillRect(cx, cy, cw, ch); x.restore();
    x.strokeStyle = "#b8954a"; x.lineWidth = 2.2; x.strokeRect(cx + 18, cy + 18, cw - 36, ch - 36);
    x.strokeStyle = "rgba(184,149,74,.5)"; x.lineWidth = 1.6; x.strokeRect(cx + 27, cy + 27, cw - 54, ch - 54);
    // Esquineros dorados
    const esquina = (ex, ey, sx, sy) => {
      x.save(); x.translate(ex, ey); x.scale(sx * 1.5, sy * 1.5);
      x.strokeStyle = "#b8954a"; x.lineWidth = 1.3 / 1.5;
      x.beginPath(); x.moveTo(2, 44); x.lineTo(2, 10); x.quadraticCurveTo(2, 2, 10, 2); x.lineTo(44, 2); x.stroke();
      x.globalAlpha = .7; x.lineWidth = .8 / 1.5;
      x.beginPath(); x.moveTo(8, 38); x.lineTo(8, 14); x.quadraticCurveTo(8, 8, 14, 8); x.lineTo(38, 8); x.stroke();
      x.globalAlpha = 1; x.fillStyle = "#b8954a"; x.beginPath(); x.arc(14, 14, 2.2, 0, Math.PI * 2); x.fill();
      x.restore();
    };
    esquina(cx + 36, cy + 36, 1, 1); esquina(cx + cw - 36, cy + 36, -1, 1);
    esquina(cx + 36, cy + ch - 36, 1, -1); esquina(cx + cw - 36, cy + ch - 36, -1, -1);
    x.textAlign = "center"; x.textBaseline = "alphabetic";
    // Título y texto
    x.fillStyle = "#1c3a9c"; x.font = "96px " + script;
    x.fillText("¿Me acompañas?", W / 2, cy + 175);
    x.fillStyle = "#575f82"; x.font = "400 34px " + serif;
    ["Firma tu invitación para confirmar tu", "asistencia. Se abrirá WhatsApp con tu", "mensaje listo para enviar."]
      .forEach((l, i) => x.fillText(l, W / 2, cy + 250 + i * 46));
    // Firma
    let tam = 104; x.font = tam + "px " + script;
    while (x.measureText(f.nombre).width > 600 && tam > 56) { tam -= 4; x.font = tam + "px " + script; }
    x.fillStyle = "#0f2266"; x.fillText(f.nombre, W / 2, cy + 520);
    x.strokeStyle = "#b8954a"; x.lineWidth = 2; x.beginPath(); x.moveTo(W / 2 - 330, cy + 548); x.lineTo(W / 2 + 330, cy + 548); x.stroke();
    // "Firmado por Nombre · fecha" con el nombre resaltado
    const partes = [["italic 30px " + serif, "#575f82", "Firmado por "], ["600 30px " + serif, "#1a2550", f.nombre], ["italic 30px " + serif, "#575f82", " · " + f.fecha]];
    let total = 0; partes.forEach(([fo, , t]) => { x.font = fo; total += x.measureText(t).width; });
    let px = W / 2 - total / 2; x.textAlign = "left";
    partes.forEach(([fo, col, t]) => { x.font = fo; x.fillStyle = col; x.fillText(t, px, cy + 602); px += x.measureText(t).width; });
    x.textAlign = "center";
    // Agradecimiento
    x.fillStyle = "#1a2550"; x.font = "400 36px " + serif;
    x.fillText("¡Gracias, " + f.nombre.split(" ")[0] + "! Tu lugar está reservado.", W / 2, cy + 690);
    x.fillStyle = "#1c3a9c"; x.font = "italic 30px " + serif;
    x.fillText(CONFIG.fecha.charAt(0).toUpperCase() + CONFIG.fecha.slice(1) + ", " + CONFIG.hora, W / 2, cy + 745);
    // Sello "Asistencia confirmada"
    x.save(); x.translate(W / 2 + 330, cy + 455); x.rotate(-12 * Math.PI / 180);
    x.fillStyle = "#fffdf8"; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI * 2); x.fill();
    x.strokeStyle = "#1c3a9c"; x.lineWidth = 2.6; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI * 2); x.stroke();
    x.lineWidth = 1.4; x.beginPath(); x.arc(0, 0, 67, 0, Math.PI * 2); x.stroke();
    x.fillStyle = "#1c3a9c"; x.font = "600 25px " + serif;
    x.fillText("Asistencia", 0, -4); x.fillText("confirmada", 0, 24);
    x.restore();
    // Flores en la esquina, como en la página
    const flor = await cargarImg(FLORES.f15);
    if (flor) {
      const fw = 230, fh = fw * flor.height / flor.width;
      x.save(); x.translate(cx + cw - 30, cy - 10); x.rotate(18 * Math.PI / 180);
      x.shadowColor = "rgba(2,8,34,.35)"; x.shadowBlur = 16; x.shadowOffsetY = 8;
      x.drawImage(flor, -fw / 2, -fh / 2, fw, fh); x.restore();
    }
    return c;
  }
  async function prepararFoto(f) {
    let lienzo;
    try { lienzo = await crearFoto(f); } catch (e) { return; }
    const jpg = await new Promise(r => lienzo.toBlob(r, "image/jpeg", .93));
    const png = await new Promise(r => lienzo.toBlob(r, "image/png"));
    if (!jpg) return;
    if (fotoURL) URL.revokeObjectURL(fotoURL);
    fotoURL = URL.createObjectURL(jpg);
    fotoPNG = png;
    const nombreArchivo = "confirmacion-xv-" + f.nombre.toLowerCase().replace(/[^a-z0-9áéíóúñü]+/gi, "-") + ".jpg";
    try { fotoArchivo = new File([jpg], nombreArchivo, { type: "image/jpeg" }); } catch (e) { fotoArchivo = null; }
    fotoNombre = f.nombre; fotoNombreArchivo = nombreArchivo;
  }
  function puedeCompartir() {
    try { return !!(fotoArchivo && navigator.canShare && navigator.canShare({ files: [fotoArchivo] })); } catch (e) { return false; }
  }
  function esComputadora() { return !matchMedia("(pointer: coarse)").matches; }
  // Muestra la tarjeta firmada dentro de la página para enviarla cuando el envío automático no fue posible
  function mostrarParaCompartir(nombre, conBoton) {
    const caja = $("compartirTarjeta");
    $("tarjetaImg").src = fotoURL || "";
    $("btnCompartirTarjeta").hidden = !conBoton;
    $("btnCompartirTarjeta").onclick = () => enviarConfirmacion(nombre);
    $("compartirAyuda").textContent = conBoton
      ? "Toca el botón y elige WhatsApp: tu tarjeta firmada se envía junto con el mensaje."
      : (esComputadora()
          ? "Tu tarjeta firmada quedó copiada: en el chat de WhatsApp que se abrió, pégala con Ctrl + V y envíala junto al mensaje."
          : "Este navegador no permite adjuntar la imagen sola. Mantén presionada tu tarjeta y elige Compartir → WhatsApp, o ábrela en Chrome o Safari.");
    caja.hidden = false;
  }
  function enviarConfirmacion(nombre) {
    const texto = mensajeConfirmacion(nombre);
    const listo = fotoArchivo && fotoNombre === nombre;
    // 1) Tarjeta lista: se abre WhatsApp con la tarjeta firmada y el mensaje juntos
    if (listo && puedeCompartir()) {
      navigator.share({ files: [fotoArchivo], text: texto })
        .then(() => { $("compartirTarjeta").hidden = true; })
        .catch(err => { if (!err || err.name !== "AbortError") mostrarParaCompartir(nombre, true); });
      return;
    }
    // 2) La tarjeta aún se está creando: se termina y se ofrece enviarla
    if (!listo) {
      prepararFoto({ nombre, fecha: hoyTexto() }).then(() => {
        if (puedeCompartir()) mostrarParaCompartir(nombre, true);
        else enviarSinArchivos(nombre);
      });
      return;
    }
    // 3) El navegador no deja compartir imágenes
    enviarSinArchivos(nombre);
  }
  function enviarSinArchivos(nombre) {
    if (fotoPNG && navigator.clipboard && window.ClipboardItem) {
      navigator.clipboard.write([new ClipboardItem({ "image/png": fotoPNG })]).catch(() => {});
    }
    mostrarParaCompartir(nombre, false);
    window.open(urlConfirmacion(nombre), "_blank", "noopener");
  }
  // La hoja se prepara mientras la persona escribe su nombre, para enviarla al instante al firmar
  let temporizadorFoto = null;
  $("inNombre").addEventListener("input", () => {
    clearTimeout(temporizadorFoto);
    const nombre = $("inNombre").value.trim().replace(/\s+/g, " ");
    if (nombre.length < 2) return;
    temporizadorFoto = setTimeout(() => prepararFoto({ nombre, fecha: hoyTexto() }), 120);
  });
  function hoyTexto() { return new Date().toLocaleDateString("es-DO", { day: "numeric", month: "long", year: "numeric" }); }

  function mostrarFirma(f, conAnimacion) {
    $("confirmar").hidden = true;
    $("firmaNombre").textContent = f.nombre;
    $("firmaPie").textContent = f.nombre;
    $("firmaFecha").textContent = f.fecha;
    $("gracias").textContent = conAnimacion
      ? "¡Gracias, " + f.nombre.split(" ")[0] + "! Tu lugar está reservado."
      : "¡Gracias, " + f.nombre.split(" ")[0] + "! Ya firmaste esta invitación.";
    const wa = $("waLink");
    wa.href = urlConfirmacion(f.nombre);
    wa.textContent = conAnimacion ? "¿No se abrió WhatsApp? Toca aquí" : "Reenviar confirmación por WhatsApp";
    $("firma").hidden = false;
    $("gracias").hidden = false;
    wa.hidden = false;
    if (fotoNombre !== f.nombre) prepararFoto(f);
    wa.onclick = e => { e.preventDefault(); enviarConfirmacion(f.nombre); };
    if (!conAnimacion) $("compartirTarjeta").hidden = true;
    if (conAnimacion && animar) {
      g.timeline()
        .fromTo("#firmaNombre", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.9, ease: "power1.inOut" })
        .fromTo("#estampa", { scale: 1.6, rotation: -20, opacity: 0 }, { scale: 1, rotation: -12, opacity: 1, duration: .5, ease: "power3.out" })
        .from(["#gracias", "#waLink"], { y: 16, opacity: 0, stagger: .15, duration: .6 }, "-=.1");
      $("firma").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
})();
