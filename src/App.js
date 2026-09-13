import React, { useState, useEffect, useMemo, Fragment } from "react";
import { MENU as MENU_FALLBACK } from "./data"; 
import { useCarrito } from "./useCarrito";
import logoImg from "./logo 2.png";
import logoPrintImg from "./Logo_caballito_white_33.png";

import bg1 from "./unnamed 2.jpg";
import bg2 from "./unnamed 4.jpg";
import bg3 from "./unnamed 3.jpg";

import "./App.css";

const SHEET_TSV_URL = "https://docs.google.com/spreadsheets/d/13M56AJuKsTfdRglrZBIr_iitRB8RhRsSOsWynTI4i4k/export?format=tsv";

const AUTH_CONFIG = {
  ADMIN_PIN: "9999",
  OPERATOR_PIN: "1234"
};

const HeaderLogo = () => {
  const [error, setError] = useState(false);
  if (error) return <div style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive", fontSize: "32px", color: "#ffffff", lineHeight: "1", paddingRight: "10px", fontWeight: "bold" }}>Caballito</div>;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "45px", width: "110px", marginRight: "8px" }}>
      <img src={logoImg} alt="Pizzería Caballito" style={{ height: "280%", width: "auto", objectFit: "contain", objectPosition: "center", transform: "translateY(1px) scale(1.1)", filter: "grayscale(1) invert(1) brightness(200%)", mixBlendMode: "screen", pointerEvents: "none", clipPath: "inset(25% 10% 25% 10%)" }} onError={() => setError(true)} />
    </div>
  );
};

const PrintLogo = () => {
  const [error, setError] = useState(false);
  if (error) return <div style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive", fontSize: "32px", color: "#1a5c2a", lineHeight: "1", paddingRight: "10px", fontWeight: "bold" }}>Caballito</div>;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "60px", width: "160px", backgroundColor: "#ffffff", borderRadius: "8px", border: "2px solid #1a5c2a", padding: "8px" }}>
      <img src={logoPrintImg} alt="Pizzería Caballito" style={{ height: "100%", width: "auto", objectFit: "contain", objectPosition: "center", pointerEvents: "none" }} onError={() => setError(true)} />
    </div>
  );
};

const Icons = {
  Moto: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 14v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="3"/><path d="M14 17h-4"/><circle cx="17" cy="17" r="3"/></svg>,
  Store: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  Bill: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>,
  Arrows: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3L4 7l4 4"/><path d="M4 7h16"/><path d="M16 21l4-4-4-4"/><path d="M20 17H4"/></svg>,
  Phone: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
  Card: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>,
  PhoneInput: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  MapPin: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  User: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  House: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  Size: () => <svg width="18" height="18" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="16" r="4"></circle><circle cx="15" cy="10" r="6"></circle></svg>,
  SizeL: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle></svg>,
  SizeM: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="6"></circle></svg>,
  SizeAll: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><circle cx="19" cy="12" r="3"></circle><circle cx="5" cy="12" r="3"></circle></svg>,
  HalfCircle: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="2" x2="12" y2="22"></line></svg>,
  Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Money: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
  Box: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
  Target: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
  StarFilled: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  Star: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  Info: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
  SearchGlass: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Check: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
  Edit: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
  Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  ChevronDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
  ChartBar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
  PizzaWhole: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="2" x2="12" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line></svg>,
  PizzaSlice: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 20h20L12 2z"></path><circle cx="12" cy="14" r="1.5"></circle><circle cx="9" cy="17" r="1"></circle><circle cx="15" cy="16" r="1"></circle></svg>,
  Empanada: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2h10v10z"></path><path d="M2 12s2 2 3 0 2 2 3 0 2 2 3 0 2 2 3 0 2 2 3 0"></path></svg>,
  Drink: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 6h14l-2 16H7L5 6z"></path><line x1="8" y1="2" x2="10" y2="6"></line></svg>,
  List: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>,
  Printer: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>,
  Logout: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
};

const sanitizeText = (txt) => {
    if (!txt) return "";
    return txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim();
};

const normSpelling = (txt) => {
    if (!txt) return "";
    let normalized = sanitizeText(txt).replace(/MUZARRELLA/g, "MUZZARELLA").replace(/MUZARELLA/g, "MUZZARELLA");
    normalized = normalized.replace(/\bCHICA\b/g, "MEDIANA").replace(/\bCHICAS\b/g, "MEDIANAS");
    normalized = normalized.replace(/\bCHICO\b/g, "MEDIANO").replace(/\bCHICOS\b/g, "MEDIANOS");
    normalized = normalized.replace(/\bJAMON Y MORRON\b(?!ES)/g, "JAMON Y MORRONES"); 
    return normalized;
};

const analizarComponentePromo = (textoRaw) => {
    let texto = normSpelling(textoRaw).replace(/ A ELECCIÓN/g, "").replace(/ A ELECCION/g, "").trim();
    let qty = 1;
    const qtyMatch = texto.match(/^(\d+)\s*(.*)/);
    if (qtyMatch) {
        qty = parseInt(qtyMatch[1], 10);
        texto = qtyMatch[2].trim();
    } else if (texto.includes("1 DOCENA") || texto.includes("UNA DOCENA")) {
        qty = 12;
        texto = texto.replace(/1 DOCENA DE |UNA DOCENA DE |1 DOCENA |UNA DOCENA /g, "").trim();
    } else if (texto.includes("MEDIA DOCENA")) {
        qty = 6;
        texto = texto.replace(/MEDIA DOCENA DE |MEDIA DOCENA /g, "").trim();
    }

    let tamano = "GRANDE";
    if (texto.includes("MEDIANA") || texto.includes("MEDIANAS")) {
        tamano = "MEDIANA";
        texto = texto.replace(/\bMEDIANAS?\b/g, "").trim();
    } else if (texto.includes("CHICA") || texto.includes("CHICAS")) {
        tamano = "CHICA";
        texto = texto.replace(/\bCHICAS?\b/g, "").trim();
    } else if (texto.includes("GRANDE") || texto.includes("GRANDES")) {
        tamano = "GRANDE";
        texto = texto.replace(/\bGRANDES?\b/g, "").trim();
    }

    texto = texto.replace(/^DE\s+/g, "").trim();
    texto = texto.replace(/^PORCIONES DE\s+/g, "").trim();
    texto = texto.replace(/^PORCIONES\s+/g, "").trim();

    let categoria = "PIZZA";
    let sabor = texto;

    if (texto.includes("EMPANADA")) {
        categoria = "EMPANADAS";
        sabor = texto.replace(/\bEMPANADAS?\b/g, "").trim();
    } else if (texto.includes("FAINA")) {
        categoria = "PORCIONES";
        sabor = "FAINA TRADICIONAL";
    } else if (texto.includes("CALZONE")) {
        categoria = "CALZONE";
        sabor = texto.replace(/\bCALZONES?\b/g, "CALZONE").trim();
        if (!sabor.includes("CALZONE")) sabor = "CALZONE " + sabor;
    } else if (texto.includes("RELLENA")) {
        categoria = "PIZZA RELLENA";
        sabor = texto.replace(/\bRELLENAS?\b/g, "").trim();
    } else if (texto.includes("BEBIDA") || texto.includes("COLA") || texto.includes("CERVEZA")) {
        categoria = "BEBIDAS";
    } else {
        sabor = texto.replace(/\bPIZZAS?\b/g, "").trim();
    }

    sabor = sabor.replace(/^DE\s+/g, "").trim();
    if (sabor === "") sabor = "A ELECCIÓN";

    return { categoria, cantidad: qty, tamano, sabor };
};

const desglosarPromocion = (nombrePromo) => {
    return nombrePromo.split('+').map(part => analizarComponentePromo(part));
};

const evalTaxonomia = (itemCat, filterCat, itemName = "") => {
    const iC = (itemCat || "").toUpperCase();
    const fC = (filterCat || "").toUpperCase();
    if (fC === "TODOS") return true;
    if (fC === "PIZZA" && (iC === "PIZZA" || iC === "PIZZAS")) return true;
    if (fC === "PIZZA RELLENA" && (iC === "PIZZA RELLENA" || iC === "PIZZAS RELLENAS")) return true;
    if (fC === "EMPANADAS" && (iC === "EMPANADA" || iC === "EMPANADAS")) return true;
    if (fC === "PORCIONES" && (iC === "PORCIÓN" || iC === "PORCION" || iC === "PORCIONES")) return true;
    if (fC === "CALZONE" && (iC === "CALZONE" || iC === "CALZONES")) return true;
    if (fC === "BEBIDAS" && (iC === "BEBIDA" || iC === "BEBIDAS")) return true;
    if (fC === "ESPECIALES" && (iC === "ESPECIAL" || iC === "ESPECIALES")) return true;
    if (fC === "PROMOCIÓN" || fC === "PROMOCIONES" || fC === "PROMOCION") {
        if (iC === "PROMOCIÓN" || iC === "PROMOCIONES" || iC === "PROMOCION") return true;
    }
    return iC === fC;
};

// MOTOR CONTABLE ESTRICTO PARA VALUACIÓN DE AUDITORÍA
const obtenerPrecioHistoricoExacto = (categoriaStr, saborStr, tamañoStr, menuSnapshot) => {
    if (!menuSnapshot) return 0;
    let cLower = (categoriaStr || "").toLowerCase();
    let catObj = menuSnapshot[cLower] || menuSnapshot[cLower + 's'] || menuSnapshot[cLower.replace(/s$/, '')];
    if (!catObj && menuSnapshot["pizza"]) catObj = menuSnapshot["pizza"]; 
    if (!catObj || !catObj.items) return 0;

    const sLimpio = normSpelling(saborStr).replace(/\b(GRANDE|MEDIANA|CHICA|PORCIÓN|PORCION)\b/gi, '').trim();
    const tReq = (tamañoStr || "GRANDE").toUpperCase();

    const matchExacto = catObj.items.find(i => {
        const nLimpio = normSpelling(i.n).replace(/\b(GRANDE|MEDIANA|CHICA|PORCIÓN|PORCION)\b/gi, '').trim();
        if (["PIZZA", "CALZONE", "PIZZA RELLENA"].includes(cLower.toUpperCase())) {
            return nLimpio === sLimpio && (i.t || "GRANDE").toUpperCase() === tReq;
        }
        return nLimpio === sLimpio || nLimpio.includes(saborStr) || sLimpio.includes(nLimpio);
    });
    return matchExacto ? Number(matchExacto.p) : 0;
};

const getPillStyle = (type, val) => {
    const v = (val || "").toUpperCase();
    if (v === 'DELIVERY') return { bg: '#e6f4ea', color: '#166534', icon: <Icons.Moto /> }; 
    if (v === 'PICKUP') return { bg: '#fef9c3', color: '#b45309', icon: <Icons.Store /> }; 
    if (v === 'EFECTIVO') return { bg: '#f1f5f9', color: '#475569', icon: <Icons.Bill /> }; 
    if (v === 'TRANSFERENCIA') return { bg: '#f1f5f9', color: '#475569', icon: <Icons.Arrows /> }; 
    if (v === 'TARJETA') return { bg: '#f1f5f9', color: '#475569', icon: <Icons.Card /> }; 
    if (v === 'QR') return { bg: '#f1f5f9', color: '#475569', icon: <Icons.Phone /> }; 
    if (v === 'PENDIENTE') return { bg: '#fee2e2', color: '#991b1b', icon: <Icons.Clock /> }; 
    if (v === 'COMPLETADO' || v === 'ENTREGADO') return { bg: '#dcfce7', color: '#166534', icon: <Icons.Check /> }; 
    return { bg: '#f1f5f9', color: '#475569', icon: null }; 
};

const CustomSelect = ({ value, options, onChange, placeholder, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find(o => o.value === value);
  return (
    <div style={{ position: "relative", width: "100%", opacity: disabled ? 0.5 : 1 }} tabIndex={disabled ? -1 : 0} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setIsOpen(false); }}>
      <div onClick={() => !disabled && setIsOpen(!isOpen)} className="audit-input-v2 hover-card" style={{ display: "flex", alignItems: "center", gap: "8px", cursor: disabled ? "not-allowed" : "pointer", borderBottom: isOpen ? "2px solid #1a5c2a" : "2px solid #e2e8f0", paddingBottom: "6px", transition: "border-color 0.2s" }}>
        {selected && selected.icon && <span style={{ display: "flex", color: "#1a5c2a" }}>{selected.icon}</span>}
        <span style={{ flex: 1, fontWeight: "700", color: "#1e293b", fontSize: "14px" }}>{selected ? selected.label : placeholder}</span>
        <span style={{ display: "flex", color: "#64748b", transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}><Icons.ChevronDown /></span>
      </div>
      {isOpen && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #cbd5e1", borderRadius: "8px", zIndex: 100, maxHeight: "250px", overflowY: "auto", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", marginTop: "4px" }}>
          {options.map(opt => (
            <div key={opt.value} onClick={() => { onChange(opt.value); setIsOpen(false); }} style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", borderBottom: "1px solid #f1f5f9", background: value === opt.value ? "#f0f8f2" : "#fff", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = value === opt.value ? "#f0f8f2" : "#fff"}>
              {opt.icon && <span style={{ display: "flex", color: "#1a5c2a" }}>{opt.icon}</span>}
              <span style={{ fontWeight: "700", color: value === opt.value ? "#1a5c2a" : "#334155", fontSize: "13px" }}>{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const checkTamaño = (texto, targetTam) => {
    if (!targetTam || targetTam === "Todos") return true;
    const txt = (texto || "").toUpperCase();
    const tgt = targetTam.toUpperCase();
    if (txt === tgt || txt.includes(tgt)) return true;
    if (tgt === "MEDIANA" && (txt === "MEDIANO" || txt.includes("MEDIANO") || txt.includes("CHICA") || txt.includes("CHICO"))) return true;
    return false;
};

const parseGustos = (gustosText) => {
    if (!gustosText) return [];
    return gustosText.split(/,\s*(?=\d+\s+)/).map(part => {
        const m = part.trim().match(/^(\d+)\s+(.+)$/);
        if (m) return { qty: parseInt(m[1], 10), name: m[2].trim() };
        return { qty: 1, name: part.trim() };
    });
};

const parsearDireccionLegacy = (dirCruda) => {
  if (!dirCruda) return { c: "", p: "", d: "", casa: false };
  const dir = dirCruda.toUpperCase();
  if (dir.includes("(CASA)")) return { c: dir.replace("(CASA)", "").trim(), p: "", d: "", casa: true };
  const match = dir.match(/(.*?), PISO (\d+)\s*(.*)/);
  if (match) return { c: match[1].trim(), p: match[2], d: match[3].replace("DEPTO", "").trim(), casa: false };
  return { c: dir, p: "", d: "", casa: false };
};

const getEmpPriority = (name) => {
  const n = name.toUpperCase();
  if (n.includes("CARNE")) return 1;
  if (n.includes("JAMON Y MUZZARELLA") || n.includes("JAMÓN Y MUZZARELLA")) return 2;
  if (n.includes("POLLO")) return 3;
  if (n.includes("ALBAHACA")) return 4;
  if (n.includes("CEBOLLA Y MUZZARELLA")) return 5;
  return 6;
};

const getInitials = (name) => {
  if (!name) return "NN";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0].substring(0, 2).toUpperCase();
};

export default function App() {
  const [authRole, setAuthRole] = useState(null); 
  const [pinInput, setPinInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const { carrito, agregarAlCarrito, modificarCantidad, eliminarDelCarrito, limpiarCarrito, montoTotal } = useCarrito();
  const [menu, setMenu] = useState({});
  const [sincronizando, setSincronizando] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [pestañaActiva, setPestañaActiva] = useState("nuevo_pedido");
  const [telefono, setTelefono] = useState("");
  const [nombre, setNombre] = useState("");
  const [calle, setCalle] = useState("");
  const [piso, setPiso] = useState("");
  const [depto, setDepto] = useState("");
  const [esCasa, setEsCasa] = useState(false);
  const [tipoPedido, setTipoPedido] = useState("delivery");
  const [metodoPago, setMetodoPago] = useState("Transferencia");
  const [observaciones, setObservaciones] = useState("");
  const [modoMitades, setModoMitades] = useState(false);
  const [mitades, setMitades] = useState([]);
  const [modoEmpanadas, setModoEmpanadas] = useState(0); 
  const [gustosEmpanadas, setGustosEmpanadas] = useState({});
  const [promoPendienteEmpanadas, setPromoPendienteEmpanadas] = useState(null);
  const [tamañoSeleccionado, setTamañoSeleccionado] = useState("Grande");
  const [historial, setHistorial] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [contadorPedidos, setContadorPedidos] = useState(0);
  const [pedidoPendiente, setPedidoPendiente] = useState(null); 
  const [ticketVisualizado, setTicketVisualizado] = useState(null); 
  const [datosImpresionCocina, setDatosImpresionCocina] = useState(null);
  const [mostrarModalDemora, setMostrarModalDemora] = useState(false);
  const [clienteEnEdicion, setClienteEnEdicion] = useState(null);
  const [clienteVisualizado, setClienteVisualizado] = useState(null); 
  const [busquedaCliente, setBusquedaCliente] = useState(""); 
  const [sugerenciasAutocompletado, setSugerenciasAutocompletado] = useState([]); 
  const [paginaClientes, setPaginaClientes] = useState(1);
  const CLIENTES_POR_PAGINA = 9;
  const [paginaPendientes, setPaginaPendientes] = useState(1);
  const PENDIENTES_POR_PAGINA = 6;
  const [repTab, setRepTab] = useState("pulso"); 
  const [audDesde, setAudDesde] = useState("");
  const [audHasta, setAudHasta] = useState("");
  const [audTipoProd, setAudTipoProd] = useState("Todos");
  const [audTamProd, setAudTamProd] = useState("Todos");
  const [audGustoProd, setAudGustoProd] = useState("");
  const [audClienteTipo, setAudClienteTipo] = useState("nombre"); 
  const [audCliente, setAudCliente] = useState("");
  const [audPago, setAudPago] = useState("Todas");
  const [audEnvio, setAudEnvio] = useState("Todos");
  const [audResultados, setAudResultados] = useState(null);
  const [audResumenNLG, setAudResumenNLG] = useState(""); 
  const [audMetricas, setAudMetricas] = useState({ unidades: 0, recaudacion: 0 });
  const [sugerenciasAudCliente, setSugerenciasAudCliente] = useState([]);
  const [expandedAuditRows, setExpandedAuditRows] = useState({});
  const [esFiltroPedidoActivo, setEsFiltroPedidoActivo] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setPedidoPendiente(null); setTicketVisualizado(null); setClienteVisualizado(null); setClienteEnEdicion(null); setMostrarModalDemora(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => { setPaginaClientes(1); }, [busquedaCliente]);

  useEffect(() => {
    try {
      const menuGuardado = localStorage.getItem("menuLocal");
      if (menuGuardado) {
        const menuParseado = JSON.parse(menuGuardado);
        const firstCat = Object.keys(menuParseado)[0];
        if (firstCat && menuParseado[firstCat].items.length > 0 && !menuParseado[firstCat].items[0].hasOwnProperty('t')) {
          localStorage.removeItem("menuLocal");
          setMenu(MENU_FALLBACK); setCategoria(Object.keys(MENU_FALLBACK)[0]);
        } else {
          setMenu(menuParseado); setCategoria(firstCat || "");
        }
      } else {
        setMenu(MENU_FALLBACK); setCategoria(Object.keys(MENU_FALLBACK)[0]);
      }
      const guardadoHistorial = localStorage.getItem("historialPedidos");
      if (guardadoHistorial) setHistorial(JSON.parse(guardadoHistorial));
      const guardadoContador = localStorage.getItem("contadorPedidos");
      if (guardadoContador) setContadorPedidos(parseInt(guardadoContador, 10));
      const guardadoClientes = localStorage.getItem("directorioClientes");
      if (guardadoClientes) {
        const clientesCrudos = JSON.parse(guardadoClientes);
        const clientesMigrados = clientesCrudos.map(c => ({
          id: c.id || Date.now() + Math.random(), nombre: sanitizeText(c.nombre || "Sin Nombre"),
          telefonos: Array.isArray(c.telefonos) ? c.telefonos : (c.telefono ? [c.telefono] : []), direccion: sanitizeText(c.direccion || "")
        }));
        setClientes(clientesMigrados);
      }
    } catch (error) { setMenu(MENU_FALLBACK); }
  }, []);

  useEffect(() => {
    setModoMitades(false); setMitades([]); setModoEmpanadas(0); setGustosEmpanadas({}); setPromoPendienteEmpanadas(null); setBusquedaCliente(""); setSugerenciasAutocompletado([]);
  }, [categoria, pestañaActiva]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === AUTH_CONFIG.ADMIN_PIN) { setAuthRole("ADMIN"); setLoginError(false); setPinInput(""); } 
    else if (pinInput === AUTH_CONFIG.OPERATOR_PIN) { setAuthRole("OPERATOR"); setLoginError(false); setPinInput(""); setPestañaActiva("nuevo_pedido"); } 
    else { setLoginError(true); setPinInput(""); }
  };

  const handleLogout = () => {
    if(!window.confirm("¿Seguro que deseas cerrar la sesión?")) return;
    setAuthRole(null); setPestañaActiva("nuevo_pedido");
  };

  const sincronizarMenu = async () => {
    if(!window.confirm("Descargar y actualizar los precios desde Google Sheets.")) return;
    setSincronizando(true);
    try {
      const response = await fetch(SHEET_TSV_URL);
      if (!response.ok) throw new Error("No se pudo conectar con Google Sheets.");
      const textData = await response.text();
      const filas = textData.split('\n');
      const nuevoMenu = {};
      let itemsAgregados = 0;
      for (let i = 1; i < filas.length; i++) {
        const fila = filas[i].trim();
        if (!fila) continue;
        const columnas = fila.split('\t');
        if (columnas.length >= 5) {
          const catRaw = columnas[0].trim();
          if (!catRaw || catRaw.toLowerCase() === "categoría" || catRaw.toLowerCase() === "categoria") continue;
          const cat = catRaw.toLowerCase(); 
          const producto = columnas[1].trim().toUpperCase(); 
          const tamaño = columnas[2].trim(); 
          const rawPrecio = columnas[4].replace(/[^\d]/g, '');
          const precio = parseInt(rawPrecio, 10) || 0; 
          if (!nuevoMenu[cat]) nuevoMenu[cat] = { items: [] };
          nuevoMenu[cat].items.push({ n: producto, t: tamaño || "Único", p: precio });
          itemsAgregados++;
        }
      }
      if (itemsAgregados === 0 || Object.keys(nuevoMenu).length === 0) throw new Error("El documento está vacío o el formato tabular no coincide.");
      setMenu(nuevoMenu); setCategoria(Object.keys(nuevoMenu)[0]); localStorage.setItem("menuLocal", JSON.stringify(nuevoMenu));
      alert(`Menú sincronizado con éxito. (${itemsAgregados} variantes cargadas)`);
    } catch (error) { alert("Error al sincronizar. Se mantiene el menú local anterior. Detalle: " + error.message);
    } finally { setSincronizando(false); }
  };

  const obtenerPrecioEmpanadaPromo = (tipo) => {
    let encontrado = 0;
    let allItems = [];
    Object.keys(menu).forEach(k => { allItems = [...allItems, ...(menu[k].items || [])] });
    allItems.forEach(item => {
      const nNorm = normSpelling(item.n).toLowerCase();
      if (tipo === 12 && nNorm.includes("docena") && !nNorm.includes("media") && nNorm.includes("empanada")) encontrado = item.p;
      else if (tipo === 6 && nNorm.includes("media docena") && nNorm.includes("empanada")) encontrado = item.p;
    });
    return encontrado || (tipo === 12 ? 28600 : 15600);
  };
  const precioDocena = obtenerPrecioEmpanadaPromo(12);
  const precioMediaDocena = obtenerPrecioEmpanadaPromo(6);

  const getTamañoDisplay = (tam, cat) => {
    const catLower = (cat || "").toLowerCase();
    if (tam.toLowerCase() === "mediana" && ["calzone", "calzones"].includes(catLower)) return "MEDIANO";
    return tam.toUpperCase();
  };

  const buscarSugerenciasFormulario = (textoInput) => {
    if (!textoInput.trim() || textoInput.length < 2) { setSugerenciasAutocompletado([]); return; }
    const inputSanitizado = sanitizeText(textoInput);
    const palabrasBuscadas = inputSanitizado.split(/\s+/);
    const filtrados = clientes.filter(c => {
      const nombreC = sanitizeText(c.nombre);
      const dirC = sanitizeText(c.direccion);
      const matchNombre = palabrasBuscadas.every(palabra => nombreC.includes(palabra));
      const matchTelefono = c.telefonos && c.telefonos.some(t => t.includes(textoInput));
      const matchDir = dirC && palabrasBuscadas.every(palabra => dirC.includes(palabra));
      return matchNombre || matchTelefono || matchDir;
    });
    setSugerenciasAutocompletado(filtrados);
  };

  const buscarSugerenciasAuditoria = (textoInput, tipoBusqueda) => {
    setAudCliente(textoInput);
    if (!textoInput.trim() || textoInput.length < 2) { setSugerenciasAudCliente([]); return; }
    const inputSanitizado = sanitizeText(textoInput);
    const palabras = inputSanitizado.split(/\s+/);
    const filtrados = clientes.filter(c => {
      const nombreC = sanitizeText(c.nombre);
      const dirC = sanitizeText(c.direccion);
      if (tipoBusqueda === "nombre") return palabras.every(p => nombreC.includes(p));
      else if (tipoBusqueda === "telefono") return c.telefonos && c.telefonos.some(t => t.includes(textoInput));
      else if (tipoBusqueda === "direccion") return dirC && palabras.every(p => dirC.includes(p));
      return false;
    });
    setSugerenciasAudCliente(filtrados);
  };

  const seleccionarClienteAutocompletar = (c) => {
    setNombre(c.nombre || "");
    if (c.telefonos && c.telefonos.length > 0) setTelefono(c.telefonos[0]); 
    const dirParseada = parsearDireccionLegacy(c.direccion);
    setCalle(dirParseada.c); setPiso(dirParseada.p); setDepto(dirParseada.d); setEsCasa(dirParseada.casa);
    setSugerenciasAutocompletado([]); 
  };

  const seleccionarClienteAuditoria = (c) => {
    if (audClienteTipo === "nombre") setAudCliente(c.nombre || "");
    else if (audClienteTipo === "telefono" && c.telefonos?.length > 0) setAudCliente(c.telefonos[0]);
    else if (audClienteTipo === "direccion") setAudCliente(c.direccion || "");
    setSugerenciasAudCliente([]);
  };

  const toggleMitad = (producto) => {
    const index = mitades.findIndex(m => m.n === producto.n);
    if (index > -1) setMitades(mitades.filter((_, i) => i !== index));
    else if (mitades.length < 2) setMitades([...mitades, producto]);
  };

  const removerMitadSeleccionada = (index) => {
    const nuevasMitades = [...mitades];
    nuevasMitades.splice(index, 1);
    setMitades(nuevasMitades);
  };

  const confirmarMitadYMitad = () => {
    if (mitades.length !== 2) return;
    const precioBase = Math.round((mitades[0].p + mitades[1].p) / 2);
    agregarAlCarrito({ tipoItem: categoria.toUpperCase(), n: `MITAD Y MITAD`, tam: getTamañoDisplay(tamañoSeleccionado, categoria), gustos: `${mitades[0].n} / ${mitades[1].n}`.toUpperCase(), p: precioBase });
    setModoMitades(false); setMitades([]);
  };

  const totalGustosEmpanadas = Object.values(gustosEmpanadas).reduce((acc, val) => acc + val, 0);
  
  const modificarGustoEmpanada = (nombre, delta) => {
    setGustosEmpanadas(prev => {
      const nuevo = (prev[nombre] || 0) + delta;
      if (nuevo < 0 || (delta > 0 && totalGustosEmpanadas >= modoEmpanadas)) return prev; 
      const actualizado = { ...prev, [nombre]: nuevo };
      if (nuevo === 0) delete actualizado[nombre];
      return actualizado;
    });
  };

  const confirmarEmpanadas = () => {
    if (totalGustosEmpanadas !== modoEmpanadas) return;
    const resumenGustos = Object.entries(gustosEmpanadas).map(([s, c]) => `${c} ${s}`).join(", ");
    if (promoPendienteEmpanadas) {
      agregarAlCarrito({ tipoItem: "PROMOCIÓN", n: promoPendienteEmpanadas.n.toUpperCase(), gustos: `${modoEmpanadas} EMP.: ${resumenGustos.toUpperCase()}`, p: promoPendienteEmpanadas.p });
      setPromoPendienteEmpanadas(null);
    } else {
      const precioFinal = modoEmpanadas === 12 ? precioDocena : precioMediaDocena;
      const nombreEmp = modoEmpanadas === 12 ? 'DOCENA DE EMPANADAS' : (modoEmpanadas === 6 ? 'MEDIA DOCENA DE EMPANADAS' : `${modoEmpanadas} EMPANADAS`);
      agregarAlCarrito({ tipoItem: "EMPANADAS", n: nombreEmp, gustos: resumenGustos.toUpperCase(), p: precioFinal });
    }
    setModoEmpanadas(0); setGustosEmpanadas({});
  };

  const manejarSeleccionProducto = (p) => {
    const catLower = (categoria || "").toLowerCase();
    const nombreProdLower = (p.n || "").toLowerCase();
    if (catLower.includes("promoción") || catLower.includes("promocion")) {
      let cantidadEmpanadasIncluidas = 0;
      const matchNumerico = nombreProdLower.match(/(\d+)\s*empanada/);
      if (matchNumerico) { cantidadEmpanadasIncluidas = parseInt(matchNumerico[1], 10); } 
      else if (nombreProdLower.includes("docena") && !nombreProdLower.includes("media")) { cantidadEmpanadasIncluidas = 12; } 
      else if (nombreProdLower.includes("media docena")) { cantidadEmpanadasIncluidas = 6; } 
      else {
        const wordsMap = {"una":1, "un":1, "dos":2, "tres":3, "cuatro":4, "cinco":5, "seis":6};
        for (const [w, num] of Object.entries(wordsMap)) {
            if (nombreProdLower.includes(`${w} empanada`)) { cantidadEmpanadasIncluidas = num; break; }
        }
      }
      if (cantidadEmpanadasIncluidas > 0) {
        setPromoPendienteEmpanadas(p); setModoEmpanadas(cantidadEmpanadasIncluidas); setGustosEmpanadas({}); return; 
      }
    }

    const requiereTamaño = ["pizza", "pizzas", "pizza rellena", "pizzas rellenas", "calzone", "calzones"].includes(catLower);
    const esPorcion = ["porción", "porcion", "porciones"].includes(catLower);
    
    const nombreItem = p.n.toUpperCase();
    let subItem = null;
    if (requiereTamaño) subItem = getTamañoDisplay(tamañoSeleccionado, categoria);
    else if (esPorcion) subItem = "PORCIÓN";

    let tipoComanda = categoria.toUpperCase();
    if (["PIZZA", "PIZZAS"].includes(catLower)) tipoComanda = "PIZZA";
    else if (["CALZONE", "CALZONES"].includes(catLower)) tipoComanda = "CALZONE";
    else if (["PIZZA RELLENA", "PIZZAS RELLENAS"].includes(catLower)) tipoComanda = "PIZZA RELLENA";
    else if (["PROMOCIÓN", "PROMOCIONES", "PROMOCION"].includes(catLower)) tipoComanda = "PROMOCIÓN";
    else if (["EMPANADA", "EMPANADAS"].includes(catLower)) tipoComanda = "EMPANADAS";
    else if (esPorcion) tipoComanda = "PORCIONES";
    else if (["BEBIDA", "BEBIDAS"].includes(catLower)) tipoComanda = "BEBIDAS";
    else if (["ESPECIAL", "ESPECIALES"].includes(catLower)) tipoComanda = "ESPECIALES";

    agregarAlCarrito({ tipoItem: tipoComanda, n: nombreItem, tam: subItem, p: p.p });
  };

  const obtenerDireccionFormateada = () => {
    const c = sanitizeText(calle);
    if (!c) return "";
    if (esCasa) return `${c} (CASA)`;
    const p = piso.replace(/\D/g, ''); 
    const d = sanitizeText(depto);
    let res = c;
    if (p) res += `, PISO ${p}`;
    if (d) res += `, DEPTO ${d}`;
    return res;
  };

  const procesarGeneracionPedido = () => {
    if (carrito.length === 0) return alert("Agregá productos al carrito.");
    if (!nombre.trim()) return alert("El nombre del cliente es obligatorio.");
    if (tipoPedido === "delivery" && !calle.trim()) return alert("La calle es obligatoria para Delivery.");
    setMostrarModalDemora(true);
  };

  const confirmarConDemora = (minutos) => {
    let horaCalculada = "Lo antes posible";
    if (minutos > 0) {
      const ahora = new Date();
      ahora.setMinutes(ahora.getMinutes() + minutos);
      horaCalculada = ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    }
    const nuevoNumero = (Number(contadorPedidos) || 0) + 1;
    setContadorPedidos(nuevoNumero);
    localStorage.setItem("contadorPedidos", nuevoNumero.toString());

    const dirEstructurada = tipoPedido === "delivery" ? obtenerDireccionFormateada() : "";
    const menuSnapshot = JSON.parse(JSON.stringify(menu));

    setPedidoPendiente({
      id: nuevoNumero, fecha: new Date().toLocaleDateString('es-AR'), hora: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      cliente: sanitizeText(nombre), telefono, direccion: dirEstructurada, 
      direccionDetalle: { calle: sanitizeText(calle), piso: piso.trim(), depto: sanitizeText(depto), esCasa: esCasa },
      tipoPedido, horaRetiro: horaCalculada, metodoPago, observaciones,
      items: [...carrito], total: montoTotal, estado: "pendiente", menuSnapshot: menuSnapshot 
    });
    setMostrarModalDemora(false);
  };

  const ejecutarCierreYImpresion = (pedido, requiereImprimir) => {
    const pedidoLimpio = { ...pedido };
    pedidoLimpio.cliente = sanitizeText(pedido.cliente);
    pedidoLimpio.direccion = sanitizeText(pedido.direccion);

    const nuevoHistorial = [pedidoLimpio, ...historial];
    setHistorial(nuevoHistorial); localStorage.setItem("historialPedidos", JSON.stringify(nuevoHistorial));

    if (pedidoLimpio.telefono) {
      let nuevosClientes = [...clientes];
      const indexCliente = nuevosClientes.findIndex(c => c.telefonos && c.telefonos.includes(pedidoLimpio.telefono));
      if (indexCliente === -1) {
        nuevosClientes.push({ id: Date.now(), nombre: pedidoLimpio.cliente, telefonos: [pedidoLimpio.telefono], direccion: pedidoLimpio.direccion || "" });
      } else {
        nuevosClientes[indexCliente].nombre = pedidoLimpio.cliente; 
        if (pedidoLimpio.direccion) nuevosClientes[indexCliente].direccion = pedidoLimpio.direccion; 
      }
      setClientes(nuevosClientes); localStorage.setItem("directorioClientes", JSON.stringify(nuevosClientes));
    }

    if (requiereImprimir) {
      setDatosImpresionCocina(pedidoLimpio);
      setPedidoPendiente(null); setTicketVisualizado(null);
      setTimeout(() => { window.print(); setDatosImpresionCocina(null); }, 350);
    } else {
      setPedidoPendiente(null); setTicketVisualizado(null);
    }
    limpiarCarrito(); 
    setNombre(""); setTelefono(""); setCalle(""); setPiso(""); setDepto(""); setEsCasa(false); setObservaciones(""); 
  };

  const marcarComoCompletado = (id) => {
    const nuevo = historial.map(p => p.id === id ? { ...p, estado: "completado" } : p);
    setHistorial(nuevo); localStorage.setItem("historialPedidos", JSON.stringify(nuevo));
  };

  const eliminarPedidoHistorial = (id, e) => {
    e.stopPropagation(); 
    if (!window.confirm("Eliminar pedido. Esto alterará las estadísticas financieras.")) return;
    const nuevo = historial.filter(p => p.id !== id);
    setHistorial(nuevo); localStorage.setItem("historialPedidos", JSON.stringify(nuevo));
  };

  const vaciarHistorialPedidos = () => {
    if (window.confirm("ATENCIÓN: Seguro que deseas eliminar TODOS los pedidos del historial\n\nEsta acción reseteará las estadísticas de ventas y reportes a $0. Los clientes agendados NO se borrarán.")) {
      setHistorial([]); setContadorPedidos(0); localStorage.setItem("historialPedidos", JSON.stringify([])); localStorage.setItem("contadorPedidos", "0");
      alert("El historial de pedidos y los reportes han sido reiniciados a 0.");
    }
  };

  const vaciarDirectorioClientes = () => {
    if (window.confirm("ATENCIÓN: Seguro que deseas eliminar TODOS los clientes registrados en la agenda")) {
      setClientes([]); localStorage.setItem("directorioClientes", JSON.stringify([]));
      alert("La agenda de clientes ha sido vaciada completamente.");
    }
  };

  const eliminarCliente = (id) => {
    if(!window.confirm("Seguro que deseas eliminar a este cliente.")) return;
    const filtrados = clientes.filter(c => c.id !== id);
    setClientes(filtrados); localStorage.setItem("directorioClientes", JSON.stringify(filtrados));
  };

  const iniciarCreacionCliente = () => {
    setClienteEnEdicion({ id: Date.now(), nombre: "", telefonos: [""], direccion: "", calleEdit: "", pisoEdit: "", deptoEdit: "", esCasaEdit: false, isNew: true });
  };

  const editarClienteExistente = (c) => {
    const dirParseada = parsearDireccionLegacy(c.direccion);
    setClienteEnEdicion({ ...c, calleEdit: dirParseada.c, pisoEdit: dirParseada.p, deptoEdit: dirParseada.d, esCasaEdit: dirParseada.casa });
  };

  const guardarEdicionCliente = () => {
    if(!clienteEnEdicion.nombre.trim()) return alert("El nombre es obligatorio.");
    const telefonosValidos = clienteEnEdicion.telefonos.filter(t => t.trim() !== "");
    if(telefonosValidos.length === 0) return alert("Debe tener al menos un teléfono.");
    
    let dirRes = sanitizeText(clienteEnEdicion.calleEdit);
    if (dirRes) {
        if (clienteEnEdicion.esCasaEdit) dirRes += " (CASA)";
        else {
            if (clienteEnEdicion.pisoEdit) dirRes += `, PISO ${clienteEnEdicion.pisoEdit}`;
            if (clienteEnEdicion.deptoEdit) dirRes += `, DEPTO ${sanitizeText(clienteEnEdicion.deptoEdit)}`;
        }
    }
    const clienteActualizado = { ...clienteEnEdicion, nombre: sanitizeText(clienteEnEdicion.nombre), direccion: dirRes, telefonos: telefonosValidos };
    delete clienteActualizado.calleEdit; delete clienteActualizado.pisoEdit; delete clienteActualizado.deptoEdit; delete clienteActualizado.esCasaEdit;
    
    let nuevaLista = clienteEnEdicion.isNew ? [clienteActualizado, ...clientes] : clientes.map(c => c.id === clienteActualizado.id ? clienteActualizado : c);
    if (clienteEnEdicion.isNew) delete clienteActualizado.isNew;
    
    setClientes(nuevaLista); localStorage.setItem("directorioClientes", JSON.stringify(nuevaLista));
    setClienteEnEdicion(null);
  };

  const calcularMetricasCliente = (cliente) => {
    try {
      const telsCliente = Array.isArray(cliente.telefonos) ? cliente.telefonos : [];
      const pedidosDelCliente = historial.filter(p => p.telefono && telsCliente.includes(p.telefono));
      if (pedidosDelCliente.length === 0) return { totalPedidos: 0, ultimoPedido: "Sin registro", mesPedidos: 0, mesGastado: 0, ultimoPedidoId: 0 };
      const ultimoPedido = pedidosDelCliente[0]?.fecha || "Sin registro";
      const ultimoPedidoId = pedidosDelCliente[0]?.id || 0;
      const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
      const pedidosUltimoMes = pedidosDelCliente.filter(p => {
        if (!p.fecha || typeof p.fecha !== 'string') return false;
        const partes = p.fecha.split('/');
        if (partes.length !== 3) return false;
        const fechaPedido = new Date(partes[2], partes[1] - 1, partes[0]);
        fechaPedido.setHours(0, 0, 0, 0);
        const diffTime = hoy.getTime() - fechaPedido.getTime();
        const diffDias = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDias >= 0 && diffDias <= 30;
      });
      const mesGastado = pedidosUltimoMes.reduce((acc, p) => acc + (p.total || 0), 0);
      return { totalPedidos: pedidosDelCliente.length, ultimoPedido, mesPedidos: pedidosUltimoMes.length, mesGastado, ultimoPedidoId };
    } catch (e) { return { totalPedidos: 0, ultimoPedido: "Error", mesPedidos: 0, mesGastado: 0, ultimoPedidoId: 0 }; }
  };

  const { pedidosPendientes, historialPorFecha, clientesEnriquecidos, estadisticas } = useMemo(() => {
    const pend = historial.filter(p => p.estado === "pendiente");
    const histFechas = historial.reduce((acc, p) => {
      const f = p.fecha || "Fecha desconocida";
      if (!acc[f]) acc[f] = [];
      acc[f].push(p);
      return acc;
    }, {});

    let clientesCalc = [];
    if (pestañaActiva === "clientes") {
      const busquedaSanitizada = sanitizeText(busquedaCliente);
      clientesCalc = clientes.map(c => ({ ...c, metricas: calcularMetricasCliente(c) }))
        .filter(c => sanitizeText(c.nombre).includes(busquedaSanitizada) || c.telefonos.some(t => t.includes(busquedaCliente)) || (sanitizeText(c.direccion || "").includes(busquedaSanitizada)))
        .sort((a, b) => b.metricas.ultimoPedidoId !== a.metricas.ultimoPedidoId ? b.metricas.ultimoPedidoId - a.metricas.ultimoPedidoId : b.id - a.id);
    }

    let stats = { totalRecaudado: 0, totalPedidos: 0, ticketPromedio: 0, topProductos: [] };
    if (pestañaActiva === "reportes") {
      const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
      const historialUltimos30Dias = historial.filter(p => {
        if (!p.fecha || typeof p.fecha !== 'string') return false;
        const partes = p.fecha.split('/'); 
        if (partes.length !== 3) return false;
        const fechaPedido = new Date(partes[2], partes[1] - 1, partes[0]);
        fechaPedido.setHours(0, 0, 0, 0);
        const diffTime = hoy.getTime() - fechaPedido.getTime();
        const diffDias = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDias >= 0 && diffDias <= 30;
      });

      const totalRecaudado = historialUltimos30Dias.reduce((acc, p) => acc + (p.total || 0), 0);
      const totalPedidos = historialUltimos30Dias.length;
      const ticketPromedio = totalPedidos > 0 ? Math.round(totalRecaudado / totalPedidos) : 0;
      
      const ranking = {};
      const agregarAlRanking = (nombre, cantidad) => {
        let n = normSpelling(nombre);
        if (n === "FAINA" || n.includes("FAINA")) n = "FAINA TRADICIONAL"; 
        if (!ranking[n]) ranking[n] = 0;
        ranking[n] += cantidad;
      };

      historialUltimos30Dias.forEach(pedido => {
        if(pedido.items) {
          pedido.items.forEach(item => {
            const tipo = normSpelling(item.tipoItem);
            const nombreItem = normSpelling(item.n);
            const tamañoItem = normSpelling(item.tam);
            const cantidadBase = item.cantidad || 1;

            if (tipo === "PROMOCIÓN" || tipo === "PROMOCION") {
                const subItems = desglosarPromocion(nombreItem);
                subItems.forEach(sub => {
                    if (sub.categoria === "EMPANADAS" && item.gustos) {
                        const gustosCrudos = item.gustos.includes(':') ? item.gustos.split(':')[1] : item.gustos;
                        parseGustos(normSpelling(gustosCrudos)).forEach(g => { agregarAlRanking(`EMPANADA ${g.name}`, g.qty * cantidadBase); });
                    } else if (sub.categoria === "PORCIONES" && sub.sabor.includes("FAINA")) {
                        agregarAlRanking("FAINA TRADICIONAL", sub.cantidad * cantidadBase);
                    } else if (sub.categoria === "CALZONE") {
                        agregarAlRanking(`${sub.sabor} (${sub.tamano})`, sub.cantidad * cantidadBase);
                    } else if (sub.categoria === "BEBIDAS") {
                        agregarAlRanking(sub.sabor || "BEBIDA", sub.cantidad * cantidadBase);
                    } else if (sub.categoria === "PIZZA RELLENA" || sub.categoria === "PIZZA") {
                        agregarAlRanking(`${sub.sabor} (${sub.tamano})`, sub.cantidad * cantidadBase);
                    }
                });
            } else if (tipo === "EMPANADAS" || tipo === "EMPANADA") {
                if (item.gustos) {
                    parseGustos(normSpelling(item.gustos)).forEach(g => agregarAlRanking(`EMPANADA ${g.name}`, g.qty * cantidadBase));
                } else {
                    agregarAlRanking(nombreItem.startsWith("EMPANADA") ? nombreItem : `EMPANADA ${nombreItem}`, cantidadBase);
                }
            } else if (nombreItem === "MITAD Y MITAD" && item.gustos) {
                const mitades = item.gustos.split('/');
                const fallbackSize = (tamañoItem && tamañoItem !== "PORCIÓN" && tamañoItem !== "PORCION") ? tamañoItem : "GRANDE";
                mitades.forEach(mitad => {
                    const cleanM = normSpelling(mitad).replace(/\s*\([^)]*\)/g, '');
                    agregarAlRanking(`${cleanM} (${fallbackSize})`, 0.5 * cantidadBase);
                });
            } else {
                if (["PIZZA", "PIZZAS", "CALZONE", "CALZONES", "PIZZA RELLENA"].includes(tipo)) {
                     let nombreConTamaño = nombreItem;
                     if (tamañoItem && tamañoItem !== "PORCIÓN" && tamañoItem !== "PORCION") nombreConTamaño = `${nombreItem} (${tamañoItem})`;
                     else if (!nombreItem.includes("(GRANDE)") && !nombreItem.includes("(MEDIANA)") && !nombreItem.includes("(PORCIÓN)")) nombreConTamaño = `${nombreItem} (GRANDE)`;
                     agregarAlRanking(nombreConTamaño, cantidadBase);
                } else {
                     agregarAlRanking(nombreItem, cantidadBase);
                }
            }
          });
        }
      });
      const topProductos = Object.entries(ranking).sort((a, b) => b[1] - a[1]).slice(0, 5); 
      stats = { totalRecaudado, totalPedidos, ticketPromedio, topProductos };
    }
    return { pedidosPendientes: pend, historialPorFecha: histFechas, clientesEnriquecidos: clientesCalc, estadisticas: stats };
  }, [historial, clientes, busquedaCliente, pestañaActiva]);

  const indiceUltimoCliente = paginaClientes * CLIENTES_POR_PAGINA;
  const indicePrimerCliente = indiceUltimoCliente - CLIENTES_POR_PAGINA;
  const clientesPaginados = clientesEnriquecidos.slice(indicePrimerCliente, indiceUltimoCliente);
  const totalPaginasClientes = Math.ceil(clientesEnriquecidos.length / CLIENTES_POR_PAGINA);

  const totalPaginasPendientes = Math.ceil(pedidosPendientes.length / PENDIENTES_POR_PAGINA);
  const indiceUltimoPendiente = Math.min(paginaPendientes * PENDIENTES_POR_PAGINA, pedidosPendientes.length);
  const indicePrimerPendiente = (paginaPendientes - 1) * PENDIENTES_POR_PAGINA;
  const pendientesPaginados = pedidosPendientes.slice(indicePrimerPendiente, indiceUltimoPendiente);

  useEffect(() => {
    if (paginaPendientes > totalPaginasPendientes && totalPaginasPendientes > 0) setPaginaPendientes(totalPaginasPendientes);
    else if (totalPaginasPendientes === 0) setPaginaPendientes(1);
  }, [pedidosPendientes.length, paginaPendientes, totalPaginasPendientes]);

  const opcionesTipoProdConIcono = useMemo(() => [
    { value: 'Todos', label: 'Todas las categorías', icon: <Icons.List /> },
    { value: 'PIZZA', label: 'Pizzas', icon: <Icons.PizzaWhole /> },
    { value: 'PORCIONES', label: 'Porciones', icon: <Icons.PizzaSlice /> },
    { value: 'EMPANADAS', label: 'Empanadas', icon: <Icons.Empanada /> },
    { value: 'CALZONE', label: 'Calzones', icon: <Icons.Empanada /> },
    { value: 'PIZZA RELLENA', label: 'Pizzas Rellenas', icon: <Icons.PizzaWhole /> },
    { value: 'PROMOCIÓN', label: 'Promociones', icon: <Icons.Star /> },
    { value: 'BEBIDAS', label: 'Bebidas', icon: <Icons.Drink /> },
    { value: 'ESPECIALES', label: 'Especiales', icon: <Icons.Star /> }
  ], []);

  const opcionesTamanoConIcono = useMemo(() => [
    { value: 'Todos', label: 'Todos los tamaños', icon: <Icons.SizeAll /> },
    { value: 'GRANDE', label: 'Grande', icon: <Icons.SizeL /> },
    { value: 'MEDIANA', label: 'Mediana', icon: <Icons.SizeM /> }
  ], []);

  const opcionesPagoConIcono = useMemo(() => [
    { value: 'Todas', label: 'Todas las formas', icon: <Icons.List /> },
    { value: 'Efectivo', label: 'Efectivo', icon: <Icons.Bill /> },
    { value: 'Transferencia', label: 'Transferencia', icon: <Icons.Arrows /> },
    { value: 'Tarjeta', label: 'Tarjeta', icon: <Icons.Card /> },
    { value: 'QR', label: 'QR', icon: <Icons.Phone /> }
  ], []);

  const opcionesEnvioConIcono = useMemo(() => [
    { value: 'Todos', label: 'Todos los envíos', icon: <Icons.List /> },
    { value: 'Delivery', label: 'Delivery', icon: <Icons.Moto /> },
    { value: 'Pickup', label: 'Pickup', icon: <Icons.Store /> }
  ], []);

  const opcionesSabor = useMemo(() => {
    if (audTipoProd === "Todos") return [];
    let items = [];
    const posiblesKeys = Object.keys(menu).filter(k => {
      const kLow = k.toLowerCase();
      if (audTipoProd === "PIZZA" && ["pizza", "pizzas"].includes(kLow)) return true;
      if (audTipoProd === "PORCIONES" && ["porción", "porcion", "porciones"].includes(kLow)) return true;
      if (audTipoProd === "EMPANADAS" && ["empanada", "empanadas"].includes(kLow)) return true;
      if (audTipoProd === "CALZONE" && ["calzone", "calzones"].includes(kLow)) return true;
      if (audTipoProd === "PIZZA RELLENA" && ["pizza rellena", "pizzas rellenas"].includes(kLow)) return true;
      if (audTipoProd === "PROMOCIÓN" && ["promoción", "promociones", "promocion"].includes(kLow)) return true;
      if (audTipoProd === "BEBIDAS" && ["bebida", "bebidas"].includes(kLow)) return true;
      if (audTipoProd === "ESPECIALES" && ["especial", "especiales"].includes(kLow)) return true;
      return false;
    });

    posiblesKeys.forEach(k => { items = [...items, ...(menu[k].items || [])]; });
    const nombresUnicos = new Set();
    items.forEach(it => {
      const nombreLimpio = normSpelling(it.n).replace(/\b(GRANDE|MEDIANA|CHICA|PORCIÓN|PORCION)\b/gi, '').trim();
      if (nombreLimpio && nombreLimpio !== "MITAD Y MITAD") nombresUnicos.add(nombreLimpio);
    });
    return Array.from(nombresUnicos).sort();
  }, [audTipoProd, menu]);

  const toggleAuditRow = (id) => {
    setExpandedAuditRows(prev => ({...prev, [id]: !prev[id]}));
  };

  const ejecutarAuditoria = () => {
    setExpandedAuditRows({}); 
    let filtrados = historial;
    
    if (audDesde || audHasta) {
        const timeDesde = audDesde ? new Date(audDesde + "T00:00:00").getTime() : 0;
        const timeHasta = audHasta ? new Date(audHasta + "T23:59:59").getTime() : Infinity;
        filtrados = filtrados.filter(p => {
            if (!p.fecha) return false;
            const [d, m, y] = p.fecha.split('/');
            const dateP = new Date(y, m - 1, d).getTime();
            return dateP >= timeDesde && dateP <= timeHasta;
        });
    }

    if (audCliente.trim()) {
        const query = sanitizeText(audCliente);
        filtrados = filtrados.filter(p => {
            if (audClienteTipo === "nombre") return sanitizeText(p.cliente).includes(query);
            if (audClienteTipo === "telefono") return p.telefono && p.telefono.includes(audCliente.trim());
            if (audClienteTipo === "direccion") return sanitizeText(p.direccion).includes(query);
            return true;
        });
    }

    if (audPago !== "Todas") filtrados = filtrados.filter(p => p.metodoPago && p.metodoPago.toLowerCase() === audPago.toLowerCase());
    if (audEnvio !== "Todos") filtrados = filtrados.filter(p => p.tipoPedido && p.tipoPedido.toLowerCase() === audEnvio.toLowerCase());

    const tieneFiltroProdActivo = audTipoProd !== "Todos" || audTamProd !== "Todos" || audGustoProd.trim() !== "";
    const isOrderLevel = !tieneFiltroProdActivo;
    setEsFiltroPedidoActivo(isOrderLevel);
    
    let totalUnidadesFiltro = 0;
    let totalRecaudacionFiltro = 0;

    if (!isOrderLevel) {
        let queryGustoUpper = normSpelling(audGustoProd);
        let flexQuery = queryGustoUpper;
        if (flexQuery.includes("DOCENA") && flexQuery.includes("EMPANADA")) {
            flexQuery = flexQuery.includes("MEDIA") ? "MEDIA DOCENA" : "1 DOCENA";
        }

        filtrados = filtrados.map(p => {
            if (!p.items) return null;
            const menuHist = p.menuSnapshot || menu; 
            const matchingItems = [];
            let orderUnits = 0;
            let orderRevenue = 0;

            p.items.forEach(it => {
                const tipoItemClean = normSpelling(it.tipoItem);
                const nombreRaw = normSpelling(it.n); 
                const gustosLimpio = normSpelling(it.gustos);
                const baseQty = it.cantidad || 1;
                
                let isPromo = (tipoItemClean === "PROMOCIÓN" || tipoItemClean === "PROMOCION") || 
                              ((tipoItemClean === "EMPANADAS" || tipoItemClean === "EMPANADA") && 
                               nombreRaw.includes("DOCENA") && !nombreRaw.includes("MEDIA"));

                let matchTipo = evalTaxonomia(tipoItemClean, audTipoProd, nombreRaw);
                
                if (!matchTipo && !isPromo) return; 

                let itemMatchUnits = 0;
                let itemMatchRevenue = 0;
                const unitPriceActual = Number(it.p);

                if (isPromo) {
                    if (audTipoProd === "PROMOCIÓN" || audTipoProd === "PROMOCIONES" || audTipoProd === "PROMOCION") {
                        const isDocenaItem = (tipoItemClean === "EMPANADAS" || tipoItemClean === "EMPANADA") && nombreRaw.includes("DOCENA") && !nombreRaw.includes("MEDIA");
                        const matchPromoName = !flexQuery || nombreRaw.includes(flexQuery) || flexQuery.includes(nombreRaw) || gustosLimpio.includes(flexQuery) || (flexQuery === "1 DOCENA" && isDocenaItem);
                        if (matchPromoName) {
                            itemMatchUnits = baseQty;
                            itemMatchRevenue = unitPriceActual * baseQty;
                        }
                    } else {
                        let promoMatchedQty = 0;
                        let promoMatchedRev = 0;
                        const subItems = desglosarPromocion(nombreRaw);

                        subItems.forEach(sub => {
                            if (evalTaxonomia(sub.categoria, audTipoProd, sub.sabor)) {
                                let matchTam = audTamProd === "Todos";
                                if (audTamProd !== "Todos") {
                                    const tieneTamano = ["PIZZA", "CALZONE", "PIZZA RELLENA"].includes(sub.categoria.toUpperCase());
                                    matchTam = tieneTamano ? checkTamaño(sub.tamano, audTamProd) : false;
                                }

                                if (matchTam) {
                                    const vUni = obtenerPrecioHistoricoExacto(sub.categoria, sub.sabor, sub.tamano, menuHist);
                                    if (sub.categoria === "EMPANADAS" && it.gustos) {
                                        const gustosCrudos = it.gustos.includes(':') ? it.gustos.split(':')[1] : it.gustos;
                                        parseGustos(normSpelling(gustosCrudos)).forEach(g => {
                                            if (!queryGustoUpper || g.name === queryGustoUpper) {
                                                promoMatchedQty += (g.qty * baseQty);
                                                promoMatchedRev += (vUni > 0 ? vUni : (unitPriceActual/12)) * g.qty * baseQty;
                                            }
                                        });
                                    } else {
                                        let sbr = sub.sabor;
                                        if (sub.categoria === "CALZONE" && !sbr.includes("CALZONE")) sbr = "CALZONE " + sbr;
                                        if (sub.categoria === "PIZZA RELLENA" && !sbr.includes("RELLENA")) sbr = sbr + " RELLENA";
                                        const itemFlavorCore = sbr.replace(/\b(GRANDE|MEDIANA|CHICA|PORCIÓN|PORCION)\b/gi, '').trim();
                                        const matchesGustoPromo = !queryGustoUpper || itemFlavorCore === queryGustoUpper || (queryGustoUpper.includes("FAINA") && sub.sabor.includes("FAINA"));
                                        if (matchesGustoPromo) {
                                            promoMatchedQty += (sub.cantidad * baseQty);
                                            promoMatchedRev += (vUni > 0 ? vUni : unitPriceActual) * sub.cantidad * baseQty;
                                        }
                                    }
                                }
                            }
                        });

                        if (promoMatchedQty > 0) {
                            itemMatchUnits += promoMatchedQty;
                            itemMatchRevenue += promoMatchedRev; 
                        }
                    }
                } else {
                    let matchTamReg = audTamProd === "Todos";
                    if (audTamProd !== "Todos") {
                        const tieneTamano = ["PIZZA", "PIZZAS", "CALZONE", "CALZONES", "PIZZA RELLENA", "PIZZAS RELLENAS"].includes(tipoItemClean.toUpperCase());
                        matchTamReg = tieneTamano ? (checkTamaño(it.tam, audTamProd) || checkTamaño(nombreRaw, audTamProd)) : false;
                    }

                    if (!matchTipo || !matchTamReg) return;
                    
                    let packSize = 1;
                    if (tipoItemClean === "EMPANADAS" || tipoItemClean === "EMPANADA") {
                         if (nombreRaw.includes("DOCENA") && !nombreRaw.includes("MEDIA")) packSize = 12;
                         else if (nombreRaw.includes("MEDIA DOCENA")) packSize = 6;
                         else {
                             const mNum = nombreRaw.match(/(\d+)\s*EMP/i);
                             if (mNum) packSize = parseInt(mNum[1], 10);
                         }
                    }

                    let isMitadYMitad = nombreRaw.includes("MITAD Y MITAD");
                    const unitHistoricalPrice = unitPriceActual / packSize;
                    const lineTotal = unitPriceActual * baseQty;

                    if (!queryGustoUpper) {
                        if (isMitadYMitad) {
                            itemMatchUnits = baseQty; 
                            itemMatchRevenue = lineTotal;
                        } else if (tipoItemClean === "EMPANADAS" || tipoItemClean === "EMPANADA") {
                            itemMatchUnits = baseQty * packSize;
                            itemMatchRevenue = lineTotal;
                        } else {
                            itemMatchUnits = baseQty * packSize;
                            itemMatchRevenue = lineTotal;
                        }
                    } else {
                        if (isMitadYMitad) {
                            const mitadesList = gustosLimpio.split('/').map(g => g.replace(/\b(GRANDE|MEDIANA|CHICA|PORCIÓN|PORCION)\b/gi, '').trim());
                            if (mitadesList.includes(queryGustoUpper)) {
                                itemMatchUnits = baseQty * 0.5;
                                const valUnitarioMenu = obtenerPrecioHistoricoExacto("PIZZA", queryGustoUpper, it.tam, menuHist);
                                itemMatchRevenue = (valUnitarioMenu > 0 ? valUnitarioMenu : unitPriceActual) * 0.5 * baseQty;
                            }
                        } else if (tipoItemClean === "EMPANADAS" || tipoItemClean === "EMPANADA") {
                            if (gustosLimpio) {
                                const parsed = parseGustos(gustosLimpio);
                                let extQty = 0;
                                parsed.forEach(g => { if (g.name === queryGustoUpper) extQty += g.qty * baseQty; });
                                if (extQty > 0) { 
                                    itemMatchUnits = extQty; 
                                    itemMatchRevenue = unitHistoricalPrice * extQty; 
                                }
                            } else {
                                const itemFlavorCore = nombreRaw.replace(/\b(GRANDE|MEDIANA|CHICA|PORCIÓN|PORCION)\b/gi, '').trim();
                                if (itemFlavorCore === queryGustoUpper) { 
                                    itemMatchUnits = baseQty * packSize; 
                                    itemMatchRevenue = lineTotal; 
                                }
                            }
                        } else {
                            const itemFlavorCore = nombreRaw.replace(/\b(GRANDE|MEDIANA|CHICA|PORCIÓN|PORCION)\b/gi, '').trim();
                            const parsedGustosList = it.gustos ? normSpelling(it.gustos).split('/').map(g => g.replace(/\b(GRANDE|MEDIANA|CHICA|PORCIÓN|PORCION)\b/gi, '').trim()) : [];
                            const matchesGusto = itemFlavorCore === queryGustoUpper || parsedGustosList.includes(queryGustoUpper) || (queryGustoUpper.includes("FAINA") && nombreRaw.includes("FAINA"));
                            if (matchesGusto) {
                                itemMatchUnits = baseQty; 
                                itemMatchRevenue = lineTotal;
                            }
                        }
                    }
                }

                if (itemMatchUnits > 0) {
                    orderUnits += itemMatchUnits;
                    orderRevenue += itemMatchRevenue;
                    matchingItems.push({ ...it, _matchQty: itemMatchUnits });
                }
            });

            if (matchingItems.length > 0) {
                totalUnidadesFiltro += orderUnits;
                totalRecaudacionFiltro += orderRevenue;
                return { ...p, matchingItems, orderMatchedUnits: orderUnits };
            }
            return null;
        }).filter(Boolean);
    } else {
        filtrados = filtrados.map(p => {
            totalRecaudacionFiltro += (Number(p.total) || 0);
            return { ...p, matchingItems: p.items }; 
        });
        totalUnidadesFiltro = filtrados.length;
    }

    setAudMetricas({ unidades: totalUnidadesFiltro, recaudacion: totalRecaudacionFiltro });

    let resumenReact = null;
    if (isOrderLevel) {
        const plural = filtrados.length === 1 ? "pedido" : "pedidos";
        const pagoText = audPago !== "Todas" ? ` pagados mediante ${audPago.toUpperCase()}` : "";
        const envioText = audEnvio !== "Todos" ? ` con modalidad de envío ${audEnvio.toUpperCase()}` : "";
        resumenReact = (
            <>
              Se registraron <strong>{filtrados.length} {plural}</strong>{pagoText}{envioText}
              {audCliente.trim() ? ` para el cliente vinculado a "${audCliente.toUpperCase()}"` : ""}
              {audDesde && audHasta ? ` entre el ${audDesde.split('-').reverse().join('/')} y el ${audHasta.split('-').reverse().join('/')}.` : 
               audDesde ? ` a partir del ${audDesde.split('-').reverse().join('/')}.` : 
               audHasta ? ` hasta el ${audHasta.split('-').reverse().join('/')}.` : 
               ` en todo el historial operativo.`}
            </>
        );
    } else {
        const categoryNames = {
            "Todos": { s: "productos", p: "productos" }, "PIZZA": { s: "pizza", p: "pizzas" },
            "PORCIONES": { s: "porción", p: "porciones" }, "EMPANADAS": { s: "empanada", p: "empanadas" },
            "CALZONE": { s: "calzone", p: "calzones" }, "PIZZA RELLENA": { s: "pizza rellena", p: "pizzas rellenas" },
            "PROMOCIÓN": { s: "promoción", p: "promociones" }, "BEBIDAS": { s: "bebida", p: "bebidas" },
            "ESPECIALES": { s: "especial", p: "especiales" }
        };

        const catText = categoryNames[audTipoProd] || { s: audTipoProd.toLowerCase(), p: audTipoProd.toLowerCase() };
        const unidadesVisibles = Number.isInteger(totalUnidadesFiltro) ? totalUnidadesFiltro : totalUnidadesFiltro.toFixed(1);
        const noun = totalUnidadesFiltro === 1 ? catText.s : catText.p;
        const verb = totalUnidadesFiltro === 1 ? "registró" : "registraron";
        
        let subCajaText = "unidad vendida";
        if (totalUnidadesFiltro !== 1) subCajaText = "unidades vendidas";

        const envioText = audEnvio !== "Todos" ? ` modalidad ${audEnvio.toUpperCase()}` : "";

        resumenReact = (
            <>
              Se {verb} <strong>{unidadesVisibles} {subCajaText}</strong> de <strong>{noun}</strong>
              {esCategoriaConTamaño && audTamProd !== "Todos" && <> de tamaño <strong>{audTamProd.toLowerCase()}</strong></>}
              {audGustoProd.trim() && <> con sabor/detalle <strong>"{audGustoProd}"</strong></>}
              {audCliente.trim() && <> para el cliente vinculado a <strong>"{audCliente}"</strong></>}
              {audPago !== "Todas" && <> cobradas mediante <strong>{audPago.toLowerCase()}</strong></>}
              {audEnvio !== "Todos" && <>{audPago !== "Todas" ? " y" : ""} entregadas vía <strong>{audEnvio.toUpperCase()}</strong></>}
              {audDesde && audHasta && ` entre el ${audDesde.split('-').reverse().join('/')} y el ${audHasta.split('-').reverse().join('/')}.`}
              {audDesde && !audHasta && ` a partir del ${audDesde.split('-').reverse().join('/')}.`}
              {!audDesde && audHasta && ` registradas hasta el ${audHasta.split('-').reverse().join('/')}.`}
              {!audDesde && !audHasta && ` en todo el historial operativo.`}
            </>
        );
    }

    setAudResumenNLG(resumenReact);
    setAudResultados(filtrados);
  };

  const limpiarAuditoria = () => {
    setAudDesde(""); setAudHasta(""); setAudTipoProd("Todos"); setAudTamProd("Todos");
    setAudGustoProd(""); setAudCliente(""); setAudClienteTipo("nombre"); setAudPago("Todas"); setAudEnvio("Todos");
    setSugerenciasAudCliente([]); setAudResultados(null); setAudResumenNLG(""); setAudMetricas({ unidades: 0, recaudacion: 0 }); setExpandedAuditRows({});
  };

  const esCategoriaConTamaño = ["PIZZA", "CALZONE", "PIZZA RELLENA", "Todos"].includes(audTipoProd);
  const btnCircleEmpanadaStyle = { width: "26px", height: "26px", borderRadius: "50%", border: "2px solid #1a5c2a", background: "transparent", color: "#1a5c2a", fontSize: "18px", fontWeight: "900", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }; 

  const modalPedido = pedidoPendiente || ticketVisualizado;
  const isConfirmMode = !!pedidoPendiente;

  if (!authRole) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gridTemplateRows: '1fr 1fr', zIndex: -2 }}>
          <div style={{ gridRow: '1 / 3', backgroundImage: `url('${bg1}')`, backgroundSize: 'cover', backgroundPosition: 'center top' }} />
          <div style={{ backgroundImage: `url('${bg2}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ backgroundImage: `url('${bg3}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.70)', zIndex: -1 }} />
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', textAlign: 'center', maxWidth: '350px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <PrintLogo />
          </div>
          <h2 style={{ color: '#1a5c2a', marginBottom: '10px' }}>Ingreso al Sistema</h2>
          <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '25px' }}>Ingresar con PIN.</p>
          <form onSubmit={handlePinSubmit}>
            <input type="password" value={pinInput} onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))} placeholder="****" maxLength="4" style={{ width: '100%', padding: '15px', fontSize: '24px', textAlign: 'center', letterSpacing: '10px', borderRadius: '8px', border: `2px solid ${loginError ? '#ce1126' : '#cbd5e1'}`, marginBottom: '20px', outline: 'none', boxSizing: 'border-box' }} autoFocus />
            {loginError && <div style={{ color: '#ce1126', fontSize: '12px', marginBottom: '15px', fontWeight: 'bold' }}>PIN Incorrecto. Intente nuevamente.</div>}
            <button type="submit" style={{ width: '100%', padding: '15px', background: '#1a5c2a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '900', cursor: 'pointer' }}>INGRESAR</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <style type="text/css">
        {`
          body, html, #root { margin: 0; padding: 0; background-color: #f1f5f9; width: 100%; height: 100%; overflow-x: hidden; }
          .app { width: 100% !important; max-width: none !important; min-height: 100vh; display: flex; flex-direction: column; margin: 0 !important; padding: 0 !important; box-sizing: border-box; }
          .page { width: 100% !important; max-width: none !important; background-color: #f1f5f9; flex: 1; padding: 20px !important; padding-bottom: 40px !important; box-sizing: border-box !important; }
          .audit-control-v2 { display: flex; flex-direction: column; gap: 4px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; transition: all 0.2s ease; }
          .audit-control-v2:focus-within { border-bottom-color: #1a5c2a; }
          .audit-label-v2 { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
          .audit-input-v2 { width: 100%; border: none; background: transparent; font-size: 15px; font-weight: 700; color: #1e293b; outline: none; padding: 4px 0; }
          select.audit-input-v2 { appearance: none; cursor: pointer; }
          .hover-card { transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease !important; cursor: pointer; }
          .hover-card:hover:not(:disabled) { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 16px rgba(0,0,0,0.1) !important; border-color: #1a5c2a !important; }
          .hover-card-red { transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease !important; cursor: pointer; }
          .hover-card-red:hover:not(:disabled) { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 16px rgba(206,17,38,0.1) !important; border-color: #ce1126 !important; }
          .page-btn { background: transparent; border: 1.5px solid #1a5c2a; color: #1a5c2a; padding: 8px 16px; border-radius: 24px; font-weight: 800; font-size: 13px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
          .page-btn:hover:not(:disabled) { background: #f0f8f2; transform: translateY(-1px) scale(1.02); box-shadow: 0 4px 8px rgba(0,0,0,0.05); }
          .page-btn:disabled { border-color: #e2e8f0; color: #94a3b8; cursor: not-allowed; opacity: 0.5; }
          .btn-ver-detalle { padding: 8px 12px; border-radius: 8px; transition: all 0.2s ease; background: transparent; cursor: pointer; }
          .btn-ver-detalle:hover { background: #f1f5f9; transform: scale(1.05); border-radius: 20px; }
          .btn-sync { transition: all 0.2s ease; }
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
          
          .a-banner {
            background: #1a5c2a;
            border-radius: 12px;
            padding: 28px 32px;
            margin-bottom: 20px;
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 20px;
            align-items: center;
          }
          .a-banner-eyebrow {
            font-size: 10px; font-weight: 700; color: rgba(255,255,255,.55);
            text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px;
          }
          .a-banner-texto {
            font-size: 18px; color: rgba(255,255,255,.95); line-height: 1.6; max-width: 600px;
          }
          .a-banner-texto strong { color: white; font-weight: 900; }
          .a-stat-hero {
            text-align: center;
            background: rgba(255,255,255,.08);
            border: 1px solid rgba(255,255,255,.15);
            border-radius: 10px;
            padding: 20px 28px;
            min-width: 150px;
          }
          .a-stat-hero .num { font-size: 44px; font-weight: 900; color: #f5d020; line-height: 1; }
          .a-stat-hero .lbl { font-size: 11px; color: rgba(255,255,255,.6); font-weight: 600; margin-top: 5px; text-transform: uppercase; letter-spacing: .5px; }

          .a-pedido-row {
            background: white; border-radius: 10px; border: 1px solid #e2e8f0;
            margin-bottom: 10px; overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
            cursor: pointer;
          }
          .a-pedido-header {
            display: flex; align-items: center; gap: 14px;
            padding: 14px 18px;
          }
          .a-pedido-header .spacer { flex: 1; }
          .a-total { font-size: 16px; font-weight: 800; color: #1e293b; }
          .a-toggle {
            background: #e6f4ea; border: 1px solid #bbf7d0;
            color: #1a5c2a; font-size: 11px; font-weight: 700;
            padding: 5px 12px; border-radius: 6px; cursor: pointer;
            transition: all 0.2s ease;
          }
          .a-toggle:hover { background: #dcfce7; }
          .a-toggle.open { background: #f1f5f9; color: #475569; border-color: #cbd5e1; }
          .a-divider { height: 1px; background: #e2e8f0; margin: 0 18px; }
          .a-prods { padding: 14px 18px; }
          .a-prods-label { font-size: 10px; font-weight: 700; color: #64748b;
            text-transform: uppercase; letter-spacing: .8px; margin-bottom: 8px; }

          @media print {
            body { background: #ffffff !important; color: #000000 !important; margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact; }
            .topbar, .nav, .page, .modal-ov { display: none !important; }
            #seccion-comanda-termica { display: block !important; width: 100% !important; max-width: 100% !important; background: #ffffff !important; color: #000000 !important; margin: 0 !important; padding: 2mm !important; box-sizing: border-box !important; font-family: 'Courier New', Courier, monospace !important; }
            .print-obs-box { border: 3px solid #000 !important; background: #fff !important; color: #000 !important; padding: 10px !important; text-decoration: underline !important; }
            .print-obs-box div { color: #000 !important; }
            @page { margin: 0mm; }
          }
        `}
      </style>

      <div id="seccion-comanda-termica" style={{ display: "none" }}>
        {datosImpresionCocina && (
          <div style={{ fontFamily: "'Courier New', Courier, monospace", width: "100%", color: "#000", fontSize: "16px", lineHeight: "1.3" }}>
            <div style={{ textAlign: "center", fontSize: "24px", fontWeight: "900", borderBottom: "4px solid #000", paddingBottom: "10px", marginBottom: "12px" }}>
              ** COCINA **<br />PEDIDO Nº {String(datosImpresionCocina.id).padStart(4, '0')}
            </div>
            <div style={{ width: "100%", marginBottom: "15px" }}>
              {datosImpresionCocina.items?.map((item, idx) => {
                const isMitad = item.n.toUpperCase() === "MITAD Y MITAD";
                return (
                  <div key={idx} style={{ borderBottom: "2px dotted #000", paddingBottom: "10px", paddingTop: "10px" }}>
                    <div style={{ fontSize: "22px", fontWeight: "900" }}>[{item.cantidad}x] {item.tipoItem && item.tipoItem !== "GRAL" ? item.tipoItem.toUpperCase() : ''}</div>
                    {isMitad ? (
                       <>
                         <div style={{ fontSize: "20px", fontWeight: "900", paddingLeft: "10px", marginTop: "4px" }}>MITAD Y MITAD {item.tam ? `(${item.tam.toUpperCase()})` : ''}</div>
                         {item.gustos && item.gustos.split('/').map((g, i) => (<div key={i} style={{ fontSize: "18px", fontWeight: "900", paddingLeft: "25px", marginTop: "4px" }}>• 1/2 {g.trim().toUpperCase()}</div>))}
                       </>
                    ) : (
                       <>
                         <div style={{ fontSize: "20px", fontWeight: "900", paddingLeft: "10px", marginTop: "4px" }}>{item.n.toUpperCase()} {item.tam ? `(${item.tam.toUpperCase()})` : ''}</div>
                         {item.gustos && (<div style={{ fontSize: "16px", fontWeight: "bold", paddingLeft: "25px", marginTop: "4px" }}>↳ {item.gustos.toUpperCase()}</div>)}
                       </>
                    )}
                  </div>
                )
              })}
            </div>
            {datosImpresionCocina.observaciones && (
              <div className="print-obs-box" style={{ border: "2px solid #ce1126", background: "#fef2f2", padding: "12px", margin: "15px 0", textAlign: "center", borderRadius: "8px" }}>
                <div style={{ fontSize: "12px", fontWeight: "900", color: "#ce1126", letterSpacing: "1px", marginBottom: "4px" }}>OBSERVACIÓN</div>
                <div style={{ fontSize: "18px", fontWeight: "900", color: "#991b1b" }}>{datosImpresionCocina.observaciones.toUpperCase()}</div>
              </div>
            )}
            <div style={{ textAlign: "center", fontSize: "14px", fontWeight: "bold", margin: "30px 0", color: "#555" }}><br/>- - - - - CORTE / DOBLEZ - - - - -<br/><br/></div>
            <div style={{ border: "2px solid #000", padding: "10px", borderRadius: "4px" }}>
                <div style={{ textAlign: "center", fontSize: "18px", fontWeight: "900", borderBottom: "2px dashed #000", paddingBottom: "8px", marginBottom: "8px" }}>{datosImpresionCocina.tipoPedido === 'delivery' ? 'LOGÍSTICA - DELIVERY' : 'LOGÍSTICA - PICKUP'}</div>
                <div style={{ fontSize: "16px", lineHeight: "1.5" }}>
                  <b>PEDIDO Nº:</b> {String(datosImpresionCocina.id).padStart(4, '0')}<br/>
                  <b>FECHA:</b> {datosImpresionCocina.fecha} - {datosImpresionCocina.hora}<br />
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "8px", marginTop: "8px" }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>HORARIO DE ENTREGA PACTADO:</span>
                    <span style={{ fontSize: "22px", fontWeight: "900" }}>{datosImpresionCocina.horaRetiro}</span>
                  </div>
                  <div style={{ borderTop: "1px dotted #000", margin: "8px 0" }}></div>
                  <b>CLIENTE:</b> {datosImpresionCocina.cliente}<br />
                  <b>TEL:</b> {datosImpresionCocina.telefono || 'Sin registrar'}<br />
                  {datosImpresionCocina.tipoPedido === 'delivery' ? (
                     <div style={{ fontSize: "18px", marginTop: "5px", lineHeight: "1.4" }}>
                       {datosImpresionCocina.direccionDetalle ? (
                          <>
                             <b>DIRECCIÓN:</b> {datosImpresionCocina.direccionDetalle.calle}<br/>
                             {datosImpresionCocina.direccionDetalle.esCasa ? (<b>(CASA)</b>) : (<>{datosImpresionCocina.direccionDetalle.piso && <><b>PISO:</b> {datosImpresionCocina.direccionDetalle.piso} &nbsp;&nbsp;</>}{datosImpresionCocina.direccionDetalle.depto && <><b>DEPTO:</b> {datosImpresionCocina.direccionDetalle.depto}</>}</>)}
                          </>
                       ) : (<><b>DIRECCIÓN:</b> {(datosImpresionCocina.direccion || "").replace(/(PISO\s+\d+)\s+([A-Z0-9]+)$/i, "$1, DEPTO $2")}</>)}
                     </div>
                  ) : (<div style={{ fontSize: "18px", fontWeight: "900", marginTop: "5px" }}>RETIRA POR LOCAL</div>)}
                  <div style={{ borderTop: "1px dotted #000", margin: "8px 0" }}></div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                     <span style={{ fontSize: "16px" }}>PAGO: <b>{datosImpresionCocina.metodoPago.toUpperCase()}</b></span>
                     <span style={{ fontSize: "22px", fontWeight: "900" }}>${datosImpresionCocina.total.toLocaleString()}</span>
                  </div>
                </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "15px", fontSize: "12px" }}>PIZZERÍA CABALLITO</div>
          </div>
        )}
      </div>

      <div className="topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#1a5c2a" }}>
        <div className="header-container" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="header-logo" style={{ display: "flex", alignItems: "center" }}><HeaderLogo /></div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="tb-title" style={{ fontSize: "18px", fontWeight: "900", color: "#ffffff", margin: 0, lineHeight: "1.1" }}>Pizzería Caballito</div>
            <div className="tb-sub" style={{ fontSize: "11px", color: "#e2e8f0", marginTop: "2px" }}>Hidalgo 620, CABA · Delivery y Pickup</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {authRole === "ADMIN" && (
            <button 
              onClick={sincronizarMenu} 
              disabled={sincronizando} 
              className="hover-card btn-sync" 
              style={{ background: sincronizando ? "#e2e8f0" : "transparent", color: sincronizando ? "#64748b" : "#f5d020", border: "2px solid #f5d020", padding: "8px 16px", borderRadius: "20px", fontWeight: "900", fontSize: "12px", cursor: sincronizando ? "wait" : "pointer", display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.2s" }}
              onMouseEnter={(e) => { if(!sincronizando) { e.currentTarget.style.backgroundColor = "#f5d020"; e.currentTarget.style.color = "#1a5c2a"; } }}
              onMouseLeave={(e) => { if(!sincronizando) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#f5d020"; } }}
            >
              {sincronizando ? "⏳ Sincronizando..." : <><span style={{ display: "flex" }}><Icons.Arrows /></span> Sincronizar Precios</>}
            </button>
          )}
          <button onClick={handleLogout} className="hover-card-red" style={{ background: "#fef2f2", color: "#ce1126", border: "2px solid #ce1126", padding: "8px 16px", borderRadius: "20px", fontWeight: "900", fontSize: "12px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fee2e2"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fef2f2"; }}>
            <span style={{ display: "flex" }}><Icons.Logout /></span> Cerrar Sesión ({authRole})
          </button>
        </div>
      </div>

      <div className="nav" style={{ backgroundColor: "#1a5c2a", borderTop: "1px solid #15421f", display: "flex", gap: "2px", padding: "0 20px" }}>
        <div className="hover-card" onClick={() => setPestañaActiva("nuevo_pedido")} style={{ color: pestañaActiva === "nuevo_pedido" ? "#1a5c2a" : "#e2e8f0", backgroundColor: pestañaActiva === "nuevo_pedido" ? "#f1f5f9" : "transparent", padding: "12px 20px", fontWeight: "900", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", marginTop: "8px" }}>Nuevo pedido</div>
        <div className="hover-card" onClick={() => setPestañaActiva("pendientes")} style={{ color: pestañaActiva === "pendientes" ? "#1a5c2a" : "#e2e8f0", backgroundColor: pestañaActiva === "pendientes" ? "#f1f5f9" : "transparent", padding: "12px 20px", fontWeight: "900", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", marginTop: "8px" }}>Pendientes {pedidosPendientes.length > 0 && `(${pedidosPendientes.length})`}</div>
        {authRole === "ADMIN" && (
          <Fragment>
            <div className="hover-card" onClick={() => setPestañaActiva("historial")} style={{ color: pestañaActiva === "historial" ? "#1a5c2a" : "#e2e8f0", backgroundColor: pestañaActiva === "historial" ? "#f1f5f9" : "transparent", padding: "12px 20px", fontWeight: "900", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", marginTop: "8px" }}>Historial</div>
            <div className="hover-card" onClick={() => setPestañaActiva("reportes")} style={{ color: pestañaActiva === "reportes" ? "#1a5c2a" : "#e2e8f0", backgroundColor: pestañaActiva === "reportes" ? "#f1f5f9" : "transparent", padding: "12px 20px", fontWeight: "900", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", marginTop: "8px" }}>Reportes</div>
          </Fragment>
        )}
        <div className="hover-card" onClick={() => setPestañaActiva("clientes")} style={{ color: pestañaActiva === "clientes" ? "#1a5c2a" : "#e2e8f0", backgroundColor: pestañaActiva === "clientes" ? "#f1f5f9" : "transparent", padding: "12px 20px", fontWeight: "900", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", marginTop: "8px" }}>Clientes ({clientes.length})</div>
      </div>
      
      {pestañaActiva === "nuevo_pedido" && (
        <div className="page show" style={{ display: "flex", gap: "20px" }}>
          <div className="left" style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1.5 }}>
            
            <div style={{ background: '#fff', borderRadius: '12px', border: '2px solid #1a5c2a', overflow: 'hidden' }}>
              <div style={{ background: '#1a5c2a', color: 'white', padding: '14px 20px', fontWeight: '900', fontSize: '14px', letterSpacing: '0.5px' }}>
                AGREGAR PRODUCTOS
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {Object.keys(menu).map(c => (
                    <button key={c} className="hover-card" onClick={() => setCategoria(c)} style={{ padding: "8px 18px", borderRadius: "20px", fontSize: "12px", fontWeight: "900", border: "none", transition: "all 0.2s", background: categoria === c ? "#f5d020" : "#f1f5f9", color: categoria === c ? "#1e293b" : "#475569" }}>
                      {c.toUpperCase()}
                    </button>
                  ))}
                </div>

                {["pizza", "pizzas", "pizza rellena", "pizzas rellenas", "calzone", "calzones"].includes((categoria || "").toLowerCase()) && !modoMitades && (
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <div style={{ fontSize: "13px", fontWeight: "900", color: "#1a5c2a", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ display: 'flex' }}><Icons.Size /></span> TAMAÑO:
                    </div>
                    <button onClick={() => setTamañoSeleccionado("Grande")} className="hover-card" style={{ padding: "10px 24px", borderRadius: "8px", border: "2px solid #1a5c2a", background: tamañoSeleccionado === "Grande" ? "#1a5c2a" : "#fff", color: tamañoSeleccionado === "Grande" ? "#fff" : "#1a5c2a", fontWeight: "900", fontSize: "13px" }}>
                      GRANDE
                    </button>
                    <button onClick={() => setTamañoSeleccionado("Mediana")} className="hover-card" style={{ padding: "10px 24px", borderRadius: "8px", border: "2px solid #1a5c2a", background: tamañoSeleccionado === "Mediana" ? "#1a5c2a" : "#fff", color: tamañoSeleccionado === "Mediana" ? "#fff" : "#1a5c2a", fontWeight: "900", fontSize: "13px" }}>
                      {getTamañoDisplay("Mediana", categoria)}
                    </button>
                  </div>
                )}
                
                {modoMitades ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "12px", textAlign: "center", color: "#1e293b", border: "1px solid #e2e8f0" }}>
                      <b style={{ fontSize: "14px", color: "#1a5c2a", display: "flex", justifyContent: "center", alignItems: "center", gap: "6px" }}>
                        <span style={{ display: "flex" }}><Icons.HalfCircle /></span> ARMANDO MITAD Y MITAD [{getTamañoDisplay(tamañoSeleccionado, categoria)}]
                      </b>
                      <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600", display: "block", marginTop: "4px" }}>Seleccioná el 1º y 2º gusto para combinar</span>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div style={{ flex: 1, background: "#f0f8f2", border: "2px dashed #1a5c2a", borderRadius: "8px", padding: "15px", textAlign: "center", minHeight: "60px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", position: "relative" }}>
                        {mitades[0] ? (
                          <Fragment>
                            <b style={{fontSize:"14px", color:"#1a5c2a"}}>{mitades[0].n.toUpperCase()}</b>
                            <s style={{fontSize:"11px", color:"#64748b", fontWeight:"bold", textDecoration:"none"}}>${mitades[0].p}</s>
                            <button className="hover-card-red" onClick={() => removerMitadSeleccionada(0)} style={{position: "absolute", top: "-10px", right: "-10px", background: "#ce1126", color: "white", border: "none", borderRadius: "50%", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10}}><span style={{ display: "flex" }}><Icons.Trash /></span></button>
                          </Fragment>
                        ) : <em style={{color:"#8ab095", fontSize:"13px", fontStyle:"normal", fontWeight: "bold"}}>1ª Mitad Vacante</em>}
                      </div>
                      <div style={{ flex: 1, background: "#f0f8f2", border: "2px dashed #1a5c2a", borderRadius: "8px", padding: "15px", textAlign: "center", minHeight: "60px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", position: "relative" }}>
                        {mitades[1] ? (
                          <Fragment>
                            <b style={{fontSize:"14px", color:"#1a5c2a"}}>{mitades[1].n.toUpperCase()}</b>
                            <s style={{fontSize:"11px", color:"#64748b", fontWeight:"bold", textDecoration:"none"}}>${mitades[1].p}</s>
                            <button className="hover-card-red" onClick={() => removerMitadSeleccionada(1)} style={{position: "absolute", top: "-10px", right: "-10px", background: "#ce1126", color: "white", border: "none", borderRadius: "50%", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10}}><span style={{ display: "flex" }}><Icons.Trash /></span></button>
                          </Fragment>
                        ) : <em style={{color:"#8ab095", fontSize:"13px", fontStyle:"normal", fontWeight: "bold"}}>2ª Mitad Vacante</em>}
                      </div>
                    </div>
                    <div className="custom-scrollbar" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", maxHeight: "340px", overflowY: "auto", padding: "4px", paddingRight: "8px" }}>
                      {((menu["pizza"]?.items || menu["pizzas"]?.items || []).filter(p => (p.t || "").toLowerCase() === tamañoSeleccionado.toLowerCase())).map((p, i) => {
                        const seleccionada = mitades.some(m => m.n === p.n);
                        const nombreLimpio = p.n.replace(/\b(GRANDE|MEDIANA|CHICA|PORCIÓN|PORCION)\b/gi, '').trim();
                        return (<div key={i} onClick={() => toggleMitad(p)} className="hover-card" style={{ padding: "10px 14px", borderRadius: "8px", border: `1.5px solid ${seleccionada ? "#1a5c2a" : "#e2e8f0"}`, background: seleccionada ? "#f0f8f2" : "#fff", position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}><b style={{ flex: 1, color: "#1e293b", fontSize: "12px", whiteSpace: "normal", wordBreak: "break-word", textAlign: "left", lineHeight: "1.2" }}>{nombreLimpio.toUpperCase()}</b><div style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ color: "#1a5c2a", fontSize: "13px", fontWeight: "900", flexShrink: 0 }}>${p.p?.toLocaleString()}</span>{seleccionada && <em style={{ color: "#1a5c2a", display: "flex" }}><Icons.Check /></em>}</div></div>);
                      })}
                    </div>
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                      <button onClick={() => setModoMitades(false)} className="hover-card-red" style={{ flex: 1, padding: "12px", backgroundColor: "#fef2f2", color: "#ce1126", border: "1px solid #ce1126", borderRadius: "8px", fontSize: "14px", fontWeight: "900" }}>Cancelar Selección</button>
                      <button onClick={confirmarMitadYMitad} disabled={mitades.length !== 2} className={mitades.length === 2 ? "hover-card" : ""} style={{ flex: 1, padding: "12px", backgroundColor: "#1a5c2a", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "900", cursor: mitades.length === 2 ? "pointer" : "not-allowed", opacity: mitades.length === 2 ? 1 : 0.5 }}>Añadir al pedido</button>
                    </div>
                  </div>
                ) : modoEmpanadas > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div style={{ background: "#ce1126", borderRadius: "8px", padding: "16px", textAlign: "center", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ textAlign: "left" }}><b style={{ fontSize: "16px", display: "block" }}>ARMANDO {modoEmpanadas === 12 ? 'DOCENA' : (modoEmpanadas === 6 ? '1/2 DOCENA' : `${modoEmpanadas} EMPANADAS`)}</b><span style={{ fontSize: "13px", opacity: 0.9 }}>Seleccioná los gustos</span></div><div style={{ background: "rgba(0,0,0,0.2)", padding: "8px 16px", borderRadius: "20px", fontWeight: "900", fontSize: "16px" }}>{totalGustosEmpanadas} / {modoEmpanadas}</div></div>
                    <div className="custom-scrollbar" style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "340px", overflowY: "auto", paddingRight: "8px" }}>
                      {(() => {
                        const empanadasList = (menu["empanada"]?.items || menu["empanadas"]?.items || [])
                          .filter(p => {
                             const nLower = (p.n || "").toLowerCase();
                             return !nLower.includes("docena") && !nLower.includes("media") && !nLower.includes("promo");
                          })
                          .sort((a, b) => getEmpPriority(a.n) - getEmpPriority(b.n) || a.n.localeCompare(b.n));
                        
                        return empanadasList.map((p, i) => {
                          const cantidad = gustosEmpanadas[p.n] || 0;
                          return (<div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: "8px", border: "1px solid #e2e8f0", background: cantidad > 0 ? "#fef2f2" : "#fff" }}><div><b style={{ display: "block", color: "#1e293b", fontSize: "14px" }}>{p.n.toUpperCase()}</b></div><div style={{ display: "flex", alignItems: "center", gap: "12px" }}><button style={{...btnCircleEmpanadaStyle, backgroundColor: cantidad === 0 ? "#fef2f2" : "#ce1126", borderColor: "#ce1126", color: cantidad === 0 ? "#ce1126" : "#fff"}} onClick={() => modificarGustoEmpanada(p.n, -1)}>−</button><span style={{ fontWeight: "900", minWidth: "24px", textAlign: "center", fontSize: "18px", color: "#1e293b" }}>{cantidad}</span><button style={{...btnCircleEmpanadaStyle, backgroundColor: totalGustosEmpanadas >= modoEmpanadas ? "#f0f8f2" : "#1a5c2a", borderColor: "#1a5c2a", color: totalGustosEmpanadas >= modoEmpanadas ? "#1a5c2a" : "#fff"}} onClick={() => modificarGustoEmpanada(p.n, 1)}>+</button></div></div>);
                        });
                      })()}
                    </div>
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                      <button onClick={() => setModoEmpanadas(0)} className="hover-card-red" style={{ flex: 1, padding: "14px", backgroundColor: "#fef2f2", color: "#ce1126", border: "1px solid #ce1126", borderRadius: "8px", fontSize: "14px", fontWeight: "900" }}>Cancelar</button>
                      <button onClick={confirmarEmpanadas} disabled={totalGustosEmpanadas !== modoEmpanadas} className={totalGustosEmpanadas === modoEmpanadas ? "hover-card" : ""} style={{ flex: 1, padding: "14px", backgroundColor: "#1a5c2a", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "900", cursor: totalGustosEmpanadas === modoEmpanadas ? "pointer" : "not-allowed", opacity: totalGustosEmpanadas === modoEmpanadas ? 1 : 0.5, transition: "opacity 0.2s" }}>Confirmar Combo</button>
                    </div>
                  </div>
                ) : (
                  <Fragment>
                    {["pizza", "pizzas"].includes((categoria || "").toLowerCase()) && (
                      <button onClick={() => setModoMitades(true)} className="hover-card" style={{ width: "100%", padding: "14px", backgroundColor: "#fff", color: "#1a5c2a", border: "2px dashed #1a5c2a", borderRadius: "8px", fontSize: "14px", fontWeight: "900", marginBottom: "20px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                        <span style={{ display: "flex" }}><Icons.HalfCircle /></span> ARMAR MITAD Y MITAD [{getTamañoDisplay(tamañoSeleccionado, categoria)}]
                      </button>
                    )}
                    
                    {["empanada", "empanadas"].includes((categoria || "").toLowerCase()) && (
                      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
                        <button onClick={() => setModoEmpanadas(12)} className="hover-card" style={{ flex: 1, padding: "16px 0", backgroundColor: "#ce1126", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "900", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>DOCENA (${precioDocena.toLocaleString()})</button>
                        <button onClick={() => setModoEmpanadas(6)} className="hover-card" style={{ flex: 1, padding: "16px 0", backgroundColor: "#e8820c", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "900", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>1/2 DOCENA (${precioMediaDocena.toLocaleString()})</button>
                      </div>
                    )}
                    
                    <div className="custom-scrollbar" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "4px", maxHeight: "340px", overflowY: "auto", paddingRight: "8px" }}>
                      {(() => {
                        const catLower = (categoria || "").toLowerCase();
                        let gridItems = (menu[categoria]?.items || []).filter(p => {
                          if (["pizza", "pizzas", "pizza rellena", "pizzas rellenas", "calzone", "calzones"].includes(catLower)) return (p.t || "").toLowerCase() === tamañoSeleccionado.toLowerCase();
                          return true; 
                        });

                        if (["empanada", "empanadas"].includes(catLower)) {
                            gridItems = gridItems.filter(p => {
                               const nLower = (p.n || "").toLowerCase();
                               return !nLower.includes("docena") && !nLower.includes("media") && !nLower.includes("promo");
                            }).sort((a, b) => getEmpPriority(a.n) - getEmpPriority(b.n) || a.n.localeCompare(b.n));
                        }

                        return gridItems.map((p, i) => {
                          let nombreLimpio = p.n;
                          if (["pizza", "pizzas", "pizza rellena", "pizzas rellenas", "calzone", "calzones", "porción", "porcion", "porciones"].includes(catLower)) {
                              nombreLimpio = p.n.replace(/\b(GRANDE|MEDIANA|CHICA|PORCIÓN|PORCION)\b/gi, '').trim();
                          }
                          return (
                            <div key={i} className="hover-card" onClick={() => manejarSeleccionProducto(p)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff" }}>
                              <b style={{ flex: 1, color: "#1e293b", fontSize: "14px", whiteSpace: "normal", wordBreak: "break-word", lineHeight: "1.3" }}>{nombreLimpio.toUpperCase()}</b>
                              <span style={{ color: "#1a5c2a", fontSize: "15px", fontWeight: "900", flexShrink: 0 }}>${p.p?.toLocaleString()}</span>
                            </div>
                          )
                        });
                      })()}
                    </div>
                  </Fragment>
                )}
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '12px', border: '2px solid #1a5c2a', overflow: 'hidden' }}>
              <div style={{ background: '#1a5c2a', color: 'white', padding: '14px 20px', fontWeight: '900', fontSize: '14px', letterSpacing: '0.5px' }}>
                DATOS DE ENVÍO
              </div>
              
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: "11px", fontWeight: "900", color: "#1e293b", textTransform: "uppercase", marginBottom: "8px" }}>
                    <span style={{ color: '#1a5c2a', display: 'flex' }}><Icons.PhoneInput /></span> TELÉFONO
                  </label>
                  <input 
                    type="tel" 
                    placeholder="Ej: 1145678901" 
                    value={telefono} 
                    onChange={(e) => { 
                      const val = e.target.value.replace(/\D/g, ''); 
                      setTelefono(val); 
                      buscarSugerenciasFormulario(val); 
                    }} 
                    style={{ width: "100%", background: "#f1f5f9", border: "none", borderRadius: "8px", padding: "14px 16px", fontSize: "15px", fontWeight: "600", color: "#1e293b", outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: "11px", fontWeight: "900", color: "#1e293b", textTransform: "uppercase", marginBottom: "8px" }}>
                    <span style={{ color: '#1a5c2a', display: 'flex' }}><Icons.MapPin /></span> DIRECCIÓN DE ENTREGA 
                    {tipoPedido === "pickup" && <span style={{fontSize:"10px", color:"#94a3b8", fontWeight:"normal", marginLeft:"5px", textTransform: "none"}}>(Opcional en Pickup)</span>}
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 70px 80px", gap: "10px", alignItems: "center", transition: "opacity 0.2s" }}>
                    <input 
                      placeholder="Calle y Altura (Ej: Lacroze 2314)" 
                      value={calle} 
                      onChange={(e) => { 
                        setCalle(e.target.value); 
                        buscarSugerenciasFormulario(e.target.value); 
                      }} 
                      style={{ width: "100%", background: "#f1f5f9", border: "none", borderRadius: "8px", padding: "14px 16px", fontSize: "15px", fontWeight: "600", color: "#1e293b", outline: "none", boxSizing: "border-box" }}
                    />
                    <button 
                       className="hover-card"
                       onClick={() => setEsCasa(!esCasa)}
                       style={{
                         padding: "14px 16px", borderRadius: "8px", border: "none",
                         background: esCasa ? "#1a5c2a" : "#f1f5f9",
                         color: esCasa ? "white" : "#1a5c2a",
                         fontWeight: "900", cursor: "pointer", margin: 0,
                         display: "flex", alignItems: "center", gap: "6px", fontSize: "14px"
                       }}>
                       <span style={{ display: 'flex' }}><Icons.House /></span> CASA
                    </button>
                    <input 
                      placeholder="Piso" 
                      value={piso} 
                      disabled={esCasa}
                      onChange={(e) => setPiso(e.target.value.replace(/\D/g, ''))} 
                      style={{ width: "100%", background: esCasa ? "#e2e8f0" : "#f1f5f9", border: "none", borderRadius: "8px", padding: "14px 16px", fontSize: "15px", fontWeight: "600", color: "#1e293b", outline: "none", boxSizing: "border-box" }}
                    />
                    <input 
                      placeholder="Dpto" 
                      value={depto} 
                      disabled={esCasa}
                      onChange={(e) => setDepto(e.target.value.toUpperCase())} 
                      style={{ width: "100%", background: esCasa ? "#e2e8f0" : "#f1f5f9", border: "none", borderRadius: "8px", padding: "14px 16px", fontSize: "15px", fontWeight: "600", color: "#1e293b", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: "11px", fontWeight: "900", color: "#1e293b", textTransform: "uppercase", marginBottom: "8px" }}>
                    <span style={{ color: '#1a5c2a', display: 'flex' }}><Icons.User /></span> NOMBRE DEL CLIENTE
                  </label>
                  <input 
                    placeholder="Ej: Juan García" 
                    value={nombre} 
                    onChange={(e) => { 
                      setNombre(e.target.value); 
                      buscarSugerenciasFormulario(e.target.value); 
                    }} 
                    style={{ width: "100%", background: "#f1f5f9", border: "none", borderRadius: "8px", padding: "14px 16px", fontSize: "15px", fontWeight: "600", color: "#1e293b", outline: "none", boxSizing: "border-box" }}
                  />

                  {sugerenciasAutocompletado.length > 0 && (
                    <div className="custom-scrollbar" style={{ background: "white", border: "1.5px solid #1a5c2a", borderRadius: "12px", padding: "10px", marginTop: "4px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", maxHeight: "200px", overflowY: "auto", zIndex: 50, position: "absolute", width: "100%" }}>
                      <div style={{ fontSize: "10px", fontWeight: "900", color: "#1a5c2a", padding: "4px 16px 8px 6px", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0", marginBottom: "8px" }}>🔍 Coincidencias en CRM:</div>
                      {sugerenciasAutocompletado.map((sug) => (
                        <div key={sug.id} onClick={() => seleccionarClienteAutocompletar(sug)} className="hover-card" style={{ padding: "12px", borderBottom: "1px solid #f1f5f9", display: "flex", flexDirection: "column", gap: "6px", cursor: "pointer", borderRadius: "8px", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <b style={{ color: "#1e293b", fontSize: "14px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", paddingRight: "10px" }}>{sug.nombre}</b>
                            <span style={{ fontSize: "10px", background: "#1a5c2a", color: "white", padding: "4px 10px", borderRadius: "6px", fontWeight: "900", flexShrink: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>Seleccionar</span>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px", fontSize: "11px", color: "#64748b" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ color: "#1a5c2a", display: "flex" }}><Icons.PhoneInput /></span> <b>{sug.telefonos.join(" / ")}</b></span>
                            {sug.direccion && <span style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}><span style={{ color: "#1a5c2a", display: "flex" }}><Icons.MapPin /></span> {sug.direccion}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "10px" }}>
                  <div>
                    <label style={{ display: 'block', fontSize: "11px", fontWeight: "900", color: "#1e293b", textTransform: "uppercase", marginBottom: "8px" }}>TIPO DE PEDIDO</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div className="hover-card" onClick={() => setTipoPedido("delivery")} style={{ flex: 1, padding: "14px", borderRadius: "8px", border: tipoPedido === "delivery" ? "2px solid #1a5c2a" : "1px solid #cbd5e1", background: tipoPedido === "delivery" ? "#e6f4ea" : "#fff", color: tipoPedido === "delivery" ? "#166534" : "#1e293b", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s" }}>
                        <span style={{ display: 'flex' }}><Icons.Moto /></span> Delivery
                      </div>
                      <div className="hover-card" onClick={() => setTipoPedido("pickup")} style={{ flex: 1, padding: "14px", borderRadius: "8px", border: tipoPedido === "pickup" ? "2px solid #1a5c2a" : "1px solid #cbd5e1", background: tipoPedido === "pickup" ? "#fef9c3" : "#fff", color: tipoPedido === "pickup" ? "#b45309" : "#1e293b", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s" }}>
                        <span style={{ display: 'flex' }}><Icons.Store /></span> Pickup
                      </div>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: "11px", fontWeight: "900", color: "#1e293b", textTransform: "uppercase", marginBottom: "8px" }}>MÉTODO DE PAGO</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      {[
                        { id: 'Transferencia', icon: <Icons.Arrows /> },
                        { id: 'QR', icon: <Icons.Phone /> },
                        { id: 'Efectivo', icon: <Icons.Bill /> },
                        { id: 'Tarjeta', icon: <Icons.Card /> }
                      ].map(pago => (
                        <div key={pago.id} className="hover-card" onClick={() => setMetodoPago(pago.id)} style={{ padding: "14px", borderRadius: "8px", border: metodoPago === pago.id ? "2px solid #1a5c2a" : "1px solid #cbd5e1", background: metodoPago === pago.id ? "#1a5c2a" : "#fff", color: metodoPago === pago.id ? "#fff" : "#1e293b", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s", fontSize: "12px" }}>
                          <span style={{ display: 'flex' }}>{pago.icon}</span> {pago.id}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="right" style={{ flex: 1 }}>
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: '100%', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ fontSize: "14px", fontWeight: "900", color: "#1a5c2a", textTransform: "uppercase", letterSpacing: "0.5px" }}>PRODUCTOS SELECCIONADOS</div>
                {carrito.length > 0 && (
                  <button onClick={limpiarCarrito} className="hover-card-red" style={{ fontSize: "12px", color: "#ce1126", border: "1.5px solid #ce1126", background: "transparent", borderRadius: "6px", padding: "6px 14px", fontWeight: "800" }}>Borrar todo</button>
                )}
              </div>
              
              <div className="custom-scrollbar" style={{ flex: 1, overflowY: "auto", paddingRight: "5px", marginBottom: "20px" }}>
                {carrito.length === 0 ? (
                  <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#94a3b8", gap: "15px", opacity: 0.7 }}>
                    <div style={{ display: "flex", transform: "scale(3)" }}><Icons.PizzaSlice /></div>
                    <div style={{ fontSize: "14px", fontWeight: "600", fontStyle: "italic", textAlign: "center", maxWidth: "200px", lineHeight: "1.5" }}>Agregá productos desde el panel izquierdo</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {carrito.map((item) => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#f8fafc" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "14px", color: "#1e293b", fontWeight: "900" }}>{item.n.toUpperCase()}</div>
                          {item.tam && <div style={{ fontSize: "12px", color: "#1a5c2a", fontWeight: "800", marginTop: "2px" }}>{item.tam}</div>}
                          {item.gustos && <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", marginTop: "4px", lineHeight: "1.3" }}>{item.gustos}</div>}
                        </div>
                        
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 10px 0 20px" }}>
                          <button style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid #ce1126", background: "#fef2f2", color: "#ce1126", fontWeight: "900", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => modificarCantidad(item.id, -1)}>−</button>
                          <span style={{ fontWeight: "900", fontSize: "15px", color: "#1e293b", minWidth: "16px", textAlign: "center" }}>{item.cantidad}</span>
                          <button style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid #1a5c2a", background: "#f0f8f2", color: "#1a5c2a", fontWeight: "900", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => modificarCantidad(item.id, 1)}>+</button>
                        </div>
                        
                        <div style={{ color: "#1a5c2a", fontWeight: "900", fontSize: "16px", minWidth: "70px", textAlign: "right" }}>
                          ${(Number(item.p || 0) * item.cantidad).toLocaleString()}
                        </div>
                        
                        <button style={{ background: "none", border: "none", color: "#ce1126", cursor: "pointer", display: "flex", padding: "4px", marginLeft: "10px" }} onClick={() => eliminarDelCarrito(item.id)} className="hover-card-red">
                          <span style={{ display: 'flex' }}><Icons.Trash /></span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {carrito.length > 0 && (
                  <input 
                    type="text" 
                    placeholder="📝 Observaciones (Ej: sin orégano...)" 
                    value={observaciones} 
                    onChange={(e) => setObservaciones(e.target.value)}
                    style={{ width: "100%", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "14px 16px", fontSize: "13px", fontWeight: "600", outline: "none", color: "#1e293b", boxSizing: "border-box" }}
                  />
                )}
                
                <div style={{ background: "#1a5c2a", borderRadius: "10px", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ color: "#fff", fontSize: "14px", fontWeight: "900", letterSpacing: "0.5px" }}>MONTO TOTAL</div>
                    <div style={{ color: "#8ab095", fontSize: "12px", fontWeight: "600", marginTop: "2px" }}>{carrito.reduce((acc, item) => acc + item.cantidad, 0)} productos</div>
                  </div>
                  <div style={{ color: "#f5d020", fontSize: "32px", fontWeight: "900", letterSpacing: "-0.5px" }}>
                    ${montoTotal.toLocaleString()}
                  </div>
                </div>
                
                <button 
                  onClick={procesarGeneracionPedido} 
                  className="hover-card" 
                  style={{ background: "#ce1126", color: "white", border: "none", borderRadius: "10px", padding: "20px", fontSize: "18px", fontWeight: "900", letterSpacing: "1px", textTransform: "uppercase" }}
                >
                  GENERAR PEDIDO
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {pestañaActiva === "pendientes" && (
        <div className="page show" style={{ flexDirection: "column" }}>
          
          <div style={{ marginBottom: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "10px", borderBottom: "3px solid #f5d020", paddingBottom: "12px" }}>
              <div style={{ flex: "1 1 auto", display: "flex", alignItems: "center", gap: "15px", flexWrap: "wrap" }}>
                <h2 style={{ color: "#1a5c2a", margin: "0", fontSize: "24px", display: "inline-block", fontWeight: "900" }}>Pedidos Pendientes</h2>
                <div style={{ background: "#ce1126", color: "white", padding: "6px 14px", borderRadius: "20px", fontWeight: "900", fontSize: "14px", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: "6px", boxShadow: "0 2px 4px rgba(206,17,38,0.3)" }}>
                    {pedidosPendientes.length} EN PREPARACIÓN
                </div>
              </div>
            </div>
          </div>

          {pedidosPendientes.length === 0 ? (
            <div style={{ textAlign: "center", color: "#888", fontStyle: "italic", marginTop: "30px" }}>No hay pedidos pendientes en este momento.</div>
          ) : (
            <Fragment>
              <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))" }}>
                {pendientesPaginados.map(pedido => {
                  const tipoPill = getPillStyle('tipo', pedido.tipoPedido);
                  return (
                  <div 
                    key={pedido.id} 
                    className="hover-card" 
                    style={{ 
                      display: "flex", 
                      flexDirection: "column",
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "16px",
                      padding: "24px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                      position: "relative",
                      overflow: "hidden"
                    }}
                    onClick={() => setTicketVisualizado(pedido)}
                  >
                    <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div style={{ fontSize: "22px", fontWeight: "900", color: "#1e293b", letterSpacing: "-0.5px" }}>
                        Pedido Nº <span style={{ color: "#ce1126" }}>{String(pedido.id).padStart(4, '0')}</span>
                      </div>
                      <div style={{ background: "#f1f5f9", border: "1px solid #cbd5e1", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", color: "#334155", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ color: "#1a5c2a", display: "flex" }}><Icons.Clock /></span> Ingreso: {pedido.hora}
                      </div>
                    </div>

                    <div style={{ position: "relative", zIndex: 1, display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
                      <span style={{ background: tipoPill.bg, color: tipoPill.color, padding: "6px 14px", borderRadius: "6px", fontSize: "11px", fontWeight: "900", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: "6px", textTransform: "uppercase" }}>
                        <span style={{ display: 'flex' }}>{tipoPill.icon}</span> {pedido.tipoPedido}
                      </span>
                      <span style={{ background: "#fef9c3", color: "#854d0e", padding: "6px 14px", borderRadius: "6px", fontSize: "11px", fontWeight: "900", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ color: "#854d0e", display: "flex" }}><Icons.Clock /></span> ENTREGAR: {pedido.horaRetiro}
                      </span>
                    </div>

                    <div style={{ position: "relative", zIndex: 1, fontSize: "14px", color: "#334155", marginBottom: "16px", lineHeight: "1.6" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "#1a5c2a", fontSize: "16px", display: "flex" }}><Icons.User /></span> 
                        <span><b>Cliente:</b> {pedido.cliente}</span>
                      </div>
                      {pedido.tipoPedido === 'delivery' && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                          <span style={{ color: "#1a5c2a", fontSize: "16px", display: "flex" }}><Icons.MapPin /></span> 
                          <span><b>Dirección:</b> {(pedido.direccion || "").replace(/(PISO\s+\d+)\s+([A-Z0-9]+)$/i, "$1, DEPTO $2")}</span>
                        </div>
                      )}
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '0 0 16px 0', position: "relative", zIndex: 1 }} />

                    <div className="custom-scrollbar" style={{ position: "relative", zIndex: 1, fontSize: "14px", color: "#444", marginBottom: "10px", flex: 1, lineHeight: "1.8", maxHeight: "160px", overflowY: "auto", paddingRight: "5px" }}>
                      {pedido.items && pedido.items.map((it, idx) => {
                        const mostrarTipo = it.tipoItem && it.tipoItem !== "GRAL";
                        return (
                          <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                            <span style={{ color: "#94a3b8", fontSize: "18px", lineHeight: "1.2" }}>•</span>
                            <div>
                              <span style={{ color: "#64748b", fontWeight: "600" }}>{it.cantidad}x </span>
                              {mostrarTipo && <span style={{ color: "#94a3b8", fontWeight: "600" }}>[{it.tipoItem}] </span>}
                              <b style={{ color: "#1e293b" }}>{it.n.toUpperCase()}</b>
                              {it.tam && <span style={{ color: "#94a3b8" }}> ({it.tam})</span>}
                              {it.gustos && <div style={{ color: "#1a5c2a", fontSize: "13px", fontWeight: "600", marginTop: "2px" }}>↳ {it.gustos}</div>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {pedido.items && pedido.items.length > 3 && (
                      <div style={{ textAlign: "center", fontSize: "11px", color: "#d97706", fontWeight: "900", marginBottom: "15px", backgroundColor: "#fef3c7", padding: "6px", borderRadius: "6px", zIndex: 1, position: "relative", border: "1px dashed #f59e0b" }}>
                          ↓ Hay {pedido.items.length - 3} ítem(s) oculto(s). Scrollea la lista ↓
                      </div>
                    )}

                    <button 
                      onClick={(e) => { e.stopPropagation(); marcarComoCompletado(pedido.id); }} 
                      style={{ width: "100%", padding: "14px", background: "#1a5c2a", color: "white", border: "none", borderRadius: "8px", fontWeight: "900", fontSize: "15px", cursor: "pointer", transition: "background 0.2s", marginTop: "auto", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", position: "relative", zIndex: 1 }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#15803d"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1a5c2a"}
                    >
                      <span style={{ display: "flex" }}><Icons.Check /></span>
                      Marcar como Completado
                    </button>
                  </div>
                )})}
              </div>
              
              {/* Controles de Paginación de Pendientes (Minimal Outline) */}
              {totalPaginasPendientes > 1 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "30px", padding: "6px 6px", marginTop: "30px", marginBottom: "20px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                  <button 
                    disabled={paginaPendientes === 1}
                    onClick={() => setPaginaPendientes(prev => Math.max(prev - 1, 1))}
                    className={paginaPendientes === 1 ? "page-btn" : "page-btn hover-card"}
                  >
                    ← Anterior
                  </button>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px" }}>
                     <div style={{ display: "flex", gap: "4px" }}>
                        <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#1a5c2a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>{paginaPendientes}</span>
                     </div>
                     <span style={{ color: "#cbd5e1" }}>|</span>
                     <span style={{ color: "#64748b", fontWeight: "600" }}>Página <b style={{color: "#1e293b"}}>{paginaPendientes}</b> de <b style={{color: "#1e293b"}}>{totalPaginasPendientes}</b></span>
                  </div>
                  <button 
                    disabled={paginaPendientes === totalPaginasPendientes}
                    onClick={() => setPaginaPendientes(prev => Math.min(prev + 1, totalPaginasPendientes))}
                    className={paginaPendientes === totalPaginasPendientes ? "page-btn" : "page-btn hover-card"}
                  >
                    Siguiente →
                  </button>
                </div>
              )}
            </Fragment>
          )}
        </div>
      )}

      {pestañaActiva === "historial" && authRole === "ADMIN" && (
        <div className="page show" style={{ flexDirection: "column" }}>
          
          <div style={{ marginBottom: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "10px", borderBottom: "3px solid #f5d020", paddingBottom: "12px" }}>
              <div style={{ flex: "1 1 auto" }}>
                <h2 style={{ color: "#1a5c2a", margin: "0 0 4px 0", fontSize: "24px", display: "inline-block", fontWeight: "900" }}>Historial de Pedidos Recibidos</h2>
                <span style={{ fontSize: "13px", color: "#64748b", display: "block" }}>Registro cronológico y control operativo de comandas procesadas.</span>
              </div>
              {historial.length > 0 && (
                <button 
                  onClick={vaciarHistorialPedidos}
                  className="hover-card-red"
                  style={{ background: "#fef2f2", color: "#991b1b", border: "1px solid #fca5a5", borderRadius: "8px", padding: "10px 16px", fontWeight: "900", fontSize: "13px", flex: "0 0 auto", marginTop: "5px", display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span style={{ display: "flex" }}><Icons.Trash /></span>
                  Vaciar Todo el Historial
                </button>
              )}
            </div>
          </div>

          {historial.length === 0 ? (
            <div style={{ textAlign: "center", color: "#888", fontStyle: "italic", marginTop: "30px" }}>Sin pedidos registrados.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {Object.keys(historialPorFecha).sort((a, b) => {
                const [diaA, mesA, añoA] = a.split('/');
                const [diaB, mesB, añoB] = b.split('/');
                return new Date(añoB, mesB - 1, diaB) - new Date(añoA, mesA - 1, diaA);
              }).map(fecha => {
                const pedidosDelDia = historialPorFecha[fecha];
                const totalDelDia = pedidosDelDia.reduce((acc, p) => acc + (p.total || 0), 0);

                const parts = fecha.split('/');
                const dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
                const isToday = new Date().toLocaleDateString('es-AR') === fecha;
                const isYesterday = (() => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    return yesterday.toLocaleDateString('es-AR') === fecha;
                })();

                let humanDate = dateObj.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
                if (isToday) humanDate = `HOY · ${humanDate}`;
                else if (isYesterday) humanDate = `AYER · ${humanDate}`;

                return (
                  <div key={fecha} style={{ marginBottom: "10px" }}>
                    <div style={{ background: "#1a5c2a", borderLeft: "6px solid #f5d020", color: "white", padding: "12px 20px", borderRadius: "8px", margin: "4px 0 15px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                      <span style={{ fontSize: "14px", fontWeight: "900", letterSpacing: "0.5px" }}>{humanDate}</span>
                      <span style={{ fontSize: "11px", background: "#f5d020", color: "#1a2e12", padding: "4px 12px", borderRadius: "12px", fontWeight: "900", marginLeft: "auto" }}>
                        {pedidosDelDia.length} pedido{pedidosDelDia.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {pedidosDelDia.map(p => {
                        const pagoPill = getPillStyle('pago', p.metodoPago);
                        const tipoPill = getPillStyle('tipo', p.tipoPedido);
                        const estadoPill = getPillStyle('estado', p.estado);

                        return (
                          <div 
                            key={p.id} 
                            className="hover-card"
                            onClick={() => setTicketVisualizado(p)}
                            style={{ 
                               display: "flex",
                               alignItems: "center",
                               justifyContent: "space-between",
                               background: "#fff",
                               border: "1px solid #e2e8f0",
                               borderRadius: "8px",
                               padding: "16px 20px",
                               boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
                            }} 
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "20px", flex: 1 }}>
                              <div style={{ background: "#1a5c2a", color: "#fff", padding: "8px 12px", borderRadius: "8px", textAlign: "center", minWidth: "60px" }}>
                                <div style={{ fontSize: "16px", fontWeight: "900", letterSpacing: "0.5px", color: "#f5d020" }}>#{String(p.id).padStart(4, '0')}</div>
                                <div style={{ fontSize: "10px", fontWeight: "600", marginTop: "2px", opacity: 0.8 }}>{p.hora}</div>
                              </div>

                              <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "150px" }}>
                                <span style={{ fontSize: "15px", fontWeight: "900", color: "#1e293b" }}>{p.cliente}</span>
                              </div>

                              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                <span style={{ background: tipoPill.bg, color: tipoPill.color, padding: "4px 10px", borderRadius: "4px", fontSize: "10px", fontWeight: "900", letterSpacing: "0.5px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "4px" }}>
                                   <span style={{ display: "flex" }}>{tipoPill.icon}</span> {p.tipoPedido}
                                </span>
                                <span style={{ background: pagoPill.bg, color: pagoPill.color, padding: "4px 10px", borderRadius: "4px", fontSize: "10px", fontWeight: "900", letterSpacing: "0.5px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "4px" }}>
                                   <span style={{ display: "flex" }}>{pagoPill.icon}</span> {p.metodoPago}
                                </span>
                                <span style={{ background: estadoPill.bg, color: estadoPill.color, padding: "4px 10px", borderRadius: "4px", fontSize: "10px", fontWeight: "900", letterSpacing: "0.5px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "4px" }}>
                                   <span style={{ display: "flex" }}>{estadoPill.icon}</span> {p.estado === "pendiente" ? "PENDIENTE" : "ENTREGADO"}
                                </span>
                              </div>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexShrink: 0 }}>
                              <div style={{ fontWeight: "900", color: "#1a5c2a", fontSize: "20px" }}>
                                ${p.total.toLocaleString()}
                              </div>
                              <button 
                                onClick={(e) => { e.stopPropagation(); eliminarPedidoHistorial(p.id, e); }} 
                                className="hover-card-red"
                                style={{ padding: "8px 16px", backgroundColor: "#fff", color: "#ce1126", border: "1px solid #ce1126", borderRadius: "20px", fontSize: "11px", fontWeight: "800", transition: "all 0.2s" }}
                              >
                                Anular Ticket
                              </button>
                              <div className="btn-ver-detalle" style={{ fontSize: "13px", color: "#1e293b", fontWeight: "800", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                                Ver detalle <span>➔</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      background: "#f8fafc", 
                      border: "1px solid #e2e8f0", 
                      borderRadius: "8px", 
                      padding: "16px 20px", 
                      marginTop: "10px"
                    }}>
                      <span style={{ fontSize: "12px", fontWeight: "900", color: "#475569", textTransform: "uppercase" }}>
                        CIERRE DE JORNADA · {fecha}
                      </span>
                      <span style={{ fontSize: "12px", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>
                        TOTAL DÍA: <span style={{ fontSize: "16px", fontWeight: "900", color: "#1a5c2a", marginLeft: "4px" }}>${totalDelDia.toLocaleString()}</span>
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {pestañaActiva === "reportes" && authRole === "ADMIN" && (
        <div className="page show" style={{ flexDirection: "column" }}>
          
          <div style={{ marginBottom: "25px", padding: "0 10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "10px", borderBottom: "3px solid #f5d020", paddingBottom: "12px" }}>
              <div style={{ flex: "1 1 auto" }}>
                <h2 style={{ color: "#1a5c2a", margin: "0 0 4px 0", fontSize: "24px", display: "inline-block", fontWeight: "900" }}>Reportes y Auditoría</h2>
                <span style={{ fontSize: "13px", color: "#64748b", display: "block" }}>Análisis de métricas financieras y herramientas de auditoría avanzada.</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "2px solid #e2e8f0", paddingBottom: "15px", paddingLeft: "10px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                onClick={() => setRepTab("pulso")}
                className="hover-card"
                style={{
                  padding: "8px 20px",
                  background: repTab === "pulso" ? "#1a5c2a" : "#ffffff",
                  color: repTab === "pulso" ? "white" : "#1a5c2a",
                  border: "2px solid #1a5c2a",
                  borderRadius: "20px",
                  fontWeight: "900",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <span style={{ display: "flex" }}><Icons.ChartBar /></span>
                Pulso Mensual
              </button>
              <button 
                onClick={() => setRepTab("auditoria")}
                className="hover-card"
                style={{
                  padding: "8px 20px",
                  background: repTab === "auditoria" ? "#1a5c2a" : "#ffffff",
                  color: repTab === "auditoria" ? "white" : "#1a5c2a",
                  border: "2px solid #1a5c2a",
                  borderRadius: "20px",
                  fontWeight: "900",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <span style={{ display: "flex" }}><Icons.SearchGlass /></span>
                Auditoría Avanzada
              </button>
            </div>
            {repTab === "pulso" && (
              <span style={{ background: "#e6f4ea", color: "#166534", padding: "6px 14px", borderRadius: "20px", fontSize: "11px", fontWeight: "900" }}>MÉTRICAS GLOBALES: ÚLTIMOS 30 DÍAS</span>
            )}
          </div>

          <div style={{ padding: "0 10px" }}>
            {repTab === "pulso" && (
              <Fragment>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginBottom: "20px" }}>
                  
                  {/* KPI 1 */}
                  <div className="hover-card" style={{ position: "relative", overflow: "hidden", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#1a5c2a", textTransform: "uppercase", fontWeight: "900", letterSpacing: "0.5px" }}>
                        <span style={{ color: "#1a5c2a", display: "flex" }}><Icons.Money /></span> TOTAL RECAUDADO
                      </div>
                      <div style={{ fontSize: "32px", color: "#1a5c2a", fontWeight: "900", margin: "10px 0" }}>
                        ${estadisticas.totalRecaudado.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* KPI 2 */}
                  <div className="hover-card" style={{ position: "relative", overflow: "hidden", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#1a5c2a", textTransform: "uppercase", fontWeight: "900", letterSpacing: "0.5px" }}>
                        <span style={{ color: "#1a5c2a", display: "flex" }}><Icons.Box /></span> PEDIDOS TOTALES
                      </div>
                      <div style={{ fontSize: "32px", color: "#1a5c2a", fontWeight: "900", margin: "10px 0" }}>
                        {estadisticas.totalPedidos}
                      </div>
                    </div>
                  </div>

                  {/* KPI 3 */}
                  <div className="hover-card" style={{ position: "relative", overflow: "hidden", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#1a5c2a", textTransform: "uppercase", fontWeight: "900", letterSpacing: "0.5px" }}>
                        <span style={{ color: "#1a5c2a", display: "flex" }}><Icons.Target /></span> TICKET PROMEDIO
                      </div>
                      <div style={{ fontSize: "32px", color: "#1a5c2a", fontWeight: "900", margin: "10px 0" }}>
                        ${estadisticas.ticketPromedio.toLocaleString()}
                      </div>
                    </div>
                  </div>

                </div>

                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #f1f5f9", paddingBottom: "16px", marginBottom: "20px" }}>
                     <div>
                        <h3 style={{ fontSize: "16px", color: "#1e293b", margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ display: "flex", color: "#1a5c2a" }}><Icons.StarFilled /></span> Top 5 Productos Más Vendidos
                        </h3>
                     </div>
                  </div>

                  {estadisticas.topProductos.length === 0 ? (
                    <div style={{ color: "#888", fontStyle: "italic", fontSize: "13px", textAlign: "center", padding: "30px 0" }}>Aún no hay suficientes datos de ventas.</div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: "200px", gap: "10px" }}>
                      {(() => {
                          const maxCount = Math.max(...estadisticas.topProductos.map(p => p[1]));
                          const chartColors = ["#1a5c2a", "#327a44", "#549c63", "#82be8f", "#cbd5e1"];
                          return estadisticas.topProductos.map((prod, idx) => {
                              const heightPct = Math.max((prod[1] / maxCount) * 100, 5);
                              
                              return (
                                  <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
                                     <div style={{ width: "100%", height: `${heightPct}%`, minHeight: "28px", background: chartColors[idx] || "#cbd5e1", borderRadius: "6px 6px 0 0", position: "relative", transition: "height 0.5s ease" }}>
                                         <div style={{ position: "absolute", top: "-22px", width: "100%", textAlign: "center", fontSize: "14px", fontWeight: "900", color: "#1e293b" }}>{prod[1]}</div>
                                     </div>
                                     <div style={{ marginTop: "12px", fontSize: "10px", fontWeight: "800", color: "#64748b", textAlign: "center", textTransform: "uppercase", lineHeight: "1.3", height: "28px", display: "flex", alignItems: "flex-start", justifyContent: "center", width: "100%" }}>
                                        <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>{prod[0]}</span>
                                     </div>
                                  </div>
                              );
                          });
                      })()}
                    </div>
                  )}
                  
                  <div style={{ marginTop: "20px", fontSize: "11px", color: "#64748b", background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", lineHeight: "1.4", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <span style={{ color: "#94a3b8", display: "flex", marginTop: "2px" }}><Icons.Info /></span>
                    <div>
                      <b>Nota de Auditoría de Datos:</b> El sistema normaliza errores ortográficos heredados, desglosa combos y extrae gustos individuales. Toda pizza/calzone se agrupa bajo el patrón <b>[GUSTO] ([TAMAÑO])</b>. Las pizzas "Mitad y Mitad" suman 0.5 unidades a cada sabor.
                    </div>
                  </div>

                </div>
              </Fragment>
            )}

            {repTab === "auditoria" && (
              <Fragment>
                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", marginBottom: "20px", position: "relative" }}>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                    <div style={{ background: "#1a5c2a", color: "#fff", padding: "10px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icons.SearchGlass />
                    </div>
                    <div>
                      <h3 style={{ margin: "0 0 4px 0", color: "#1e293b", fontSize: "18px", fontWeight: "900" }}>Creador de Consultas</h3>
                      <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>Filtrá por cualquier combinación de criterios</div>
                    </div>
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
                    
                    <div className="audit-control-v2">
                      <label className="audit-label-v2">Desde Fecha</label>
                      <input type="date" className="audit-input-v2" value={audDesde} onChange={(e) => setAudDesde(e.target.value)} />
                    </div>
                    
                    <div className="audit-control-v2">
                      <label className="audit-label-v2">Hasta Fecha</label>
                      <input type="date" className="audit-input-v2" value={audHasta} onChange={(e) => setAudHasta(e.target.value)} />
                    </div>

                    <div className="audit-control-v2" style={{ position: "relative", gridColumn: "1 / -1" }}>
                      <label className="audit-label-v2">Filtrar Cliente</label>
                      <div style={{ display: "flex", gap: "10px", width: "100%", alignItems: "center" }}>
                        <select 
                          className="audit-input-v2"
                          value={audClienteTipo} 
                          onChange={(e) => { 
                            setAudClienteTipo(e.target.value); 
                            setAudCliente(""); 
                            setSugerenciasAudCliente([]); 
                          }} 
                          style={{ width: "auto", color: "#1a5c2a", fontWeight: "900", paddingRight: "10px", borderBottom: "none" }}
                        >
                          <option value="nombre">Nombre</option>
                          <option value="telefono">Teléfono</option>
                          <option value="direccion">Dirección</option>
                        </select>
                        <span style={{ color: "#cbd5e1", fontSize: "18px" }}>|</span>
                        <input 
                          type={audClienteTipo === 'telefono' ? 'tel' : 'text'} 
                          className="audit-input-v2"
                          placeholder={audClienteTipo === 'nombre' ? 'Ej: Juan...' : audClienteTipo === 'telefono' ? 'Ej: 1144...' : 'Ej: Lacroze...'} 
                          value={audCliente} 
                          onChange={(e) => buscarSugerenciasAuditoria(e.target.value, audClienteTipo)} 
                          style={{ flex: 1, borderBottom: "none" }}
                        />
                      </div>
                      
                      {sugerenciasAudCliente.length > 0 && (
                        <div style={{ background: "white", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "5px 0", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", maxHeight: "180px", overflowY: "auto", zIndex: 100, position: "absolute", top: "100%", left: 0, right: 0, marginTop: "4px" }}>
                          {sugerenciasAudCliente.map((sug) => (
                            <div key={sug.id} onClick={() => seleccionarClienteAuditoria(sug)} className="hover-card" style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", flexDirection: "column", gap: "4px", cursor: "pointer" }}>
                              <b style={{ color: "#1e293b", fontSize: "14px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{sug.nombre}</b>
                              <div style={{ fontSize: "11px", color: "#64748b", display: "flex", flexDirection: "column", gap: "2px" }}>
                                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ color: "#1a5c2a", display: "flex" }}><Icons.PhoneInput /></span> <b>{sug.telefonos.join(" / ")}</b></span>
                                {sug.direccion && <span style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}><span style={{ color: "#1a5c2a", display: "flex" }}><Icons.MapPin /></span> {sug.direccion}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="audit-control-v2" style={{ borderBottom: "none", paddingBottom: 0 }}>
                      <label className="audit-label-v2" style={{ marginBottom: "4px" }}>Categoría Producto</label>
                      <CustomSelect 
                        value={audTipoProd} 
                        options={opcionesTipoProdConIcono} 
                        onChange={(val) => {
                          setAudTipoProd(val);
                          if (!["PIZZA", "CALZONE", "PIZZA RELLENA", "Todos"].includes(val)) {
                              setAudTamProd("Todos");
                          }
                          setAudGustoProd("");
                        }} 
                      />
                    </div>

                    <div className="audit-control-v2" style={{ opacity: esCategoriaConTamaño ? 1 : 0.5, borderBottom: "none", paddingBottom: 0 }}>
                      <label className="audit-label-v2" style={{ marginBottom: "4px" }}>Tamaño Producto</label>
                      <CustomSelect 
                        value={audTamProd} 
                        options={opcionesTamanoConIcono} 
                        onChange={(val) => setAudTamProd(val)}
                        disabled={!esCategoriaConTamaño} 
                      />
                    </div>

                    <div className="audit-control-v2">
                      <label className="audit-label-v2">Sabor / Detalle</label>
                      {audTipoProd === "Todos" ? (
                        <input 
                          type="text" 
                          className="audit-input-v2"
                          placeholder="Ej: Muzzarella..." 
                          value={audGustoProd} 
                          onChange={(e) => setAudGustoProd(e.target.value)} 
                        />
                      ) : (
                        <select 
                          className="audit-input-v2"
                          value={audGustoProd} 
                          onChange={(e) => setAudGustoProd(e.target.value)} 
                        >
                          <option value="">Cualquier sabor...</option>
                          {opcionesSabor.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      )}
                    </div>

                    <div className="audit-control-v2" style={{ borderBottom: "none", paddingBottom: 0 }}>
                      <label className="audit-label-v2" style={{ marginBottom: "4px" }}>Medio de Pago</label>
                      <CustomSelect 
                        value={audPago} 
                        options={opcionesPagoConIcono} 
                        onChange={(val) => setAudPago(val)} 
                      />
                    </div>
                    
                    <div className="audit-control-v2" style={{ borderBottom: "none", paddingBottom: 0 }}>
                      <label className="audit-label-v2" style={{ marginBottom: "4px" }}>Tipo de Envío</label>
                      <CustomSelect 
                        value={audEnvio} 
                        options={opcionesEnvioConIcono} 
                        onChange={(val) => setAudEnvio(val)} 
                      />
                    </div>

                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "32px", paddingTop: "20px", borderTop: "1px solid #f1f5f9" }}>
                    <button onClick={limpiarAuditoria} className="hover-card-red" style={{ background: "transparent", color: "#ce1126", border: "1.5px solid #ce1126", borderRadius: "8px", fontWeight: "900", padding: "10px 24px", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ display: 'flex' }}><Icons.Trash /></span> Limpiar
                    </button>
                    <button onClick={ejecutarAuditoria} className="hover-card" style={{ background: "#1a5c2a", color: "white", border: "none", borderRadius: "8px", fontWeight: "900", padding: "10px 24px", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ display: 'flex' }}><Icons.Check /></span> Buscar
                    </button>
                  </div>

                </div>

                {audResultados && (
                  <div style={{ marginTop: "20px" }}>
                    
                    <div className="a-banner">
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div className="a-banner-eyebrow">RESUMEN DE AUDITORÍA · {audTipoProd.toUpperCase()} {audGustoProd ? `— SABOR "${audGustoProd.toUpperCase()}"` : ''}</div>
                        <div className="a-banner-texto">{audResumenNLG}</div>
                      </div>
                      <div className="a-stat-hero">
                        <div className="num">
                          {esFiltroPedidoActivo ? audResultados.length : (Number.isInteger(audMetricas.unidades) ? audMetricas.unidades : audMetricas.unidades.toFixed(1))}
                        </div>
                        <div className="lbl">
                          {esFiltroPedidoActivo ? (audResultados.length === 1 ? "PEDIDO TOTAL" : "PEDIDOS TOTALES") : "UNIDADES VENDIDAS"}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "25px" }}>
                      
                      <div className="hover-card" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "900", letterSpacing: "0.5px" }}>
                          <span style={{ color: "#1a5c2a", display: "flex" }}><Icons.List /></span> TICKETS AFECTADOS
                        </div>
                        <div style={{ fontSize: "28px", color: "#1a5c2a", fontWeight: "900", margin: "10px 0 0 0" }}>
                          {audResultados.length} <span style={{ fontSize: "14px", fontWeight: "700", color: "#94a3b8" }}>pedidos</span>
                        </div>
                      </div>

                      <div className="hover-card" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "900", letterSpacing: "0.5px" }}>
                          <span style={{ color: "#1a5c2a", display: "flex" }}><Icons.Money /></span> SUMA DE TICKETS
                        </div>
                        <div style={{ fontSize: "28px", color: "#1a5c2a", fontWeight: "900", margin: "10px 0 0 0" }}>
                          ${audResultados.reduce((acc, p) => acc + (p.total || 0), 0).toLocaleString()}
                        </div>
                      </div>

                      <div className="hover-card" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "900", letterSpacing: "0.5px" }}>
                          <span style={{ color: "#1a5c2a", display: "flex" }}><Icons.Target /></span> RECAUDACIÓN ESPECÍFICA
                        </div>
                        <div style={{ fontSize: "28px", color: "#1a5c2a", fontWeight: "900", margin: "10px 0 0 0" }}>
                          ${audMetricas.recaudacion.toLocaleString()}
                        </div>
                      </div>

                    </div>
                    
                    {audResultados.length === 0 ? (
                      <div style={{ padding: "40px", textAlign: "center", color: "#64748b", fontStyle: "italic", background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                        No hay transacciones que coincidan con los filtros aplicados.
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {audResultados.map((p) => {
                          const isExpanded = !!expandedAuditRows[p.id];
                          const tipoPill = getPillStyle('tipo', p.tipoPedido);
                          const pagoPill = getPillStyle('pago', p.metodoPago);
                          
                          return (
                            <div key={p.id} className="a-pedido-row hover-card" onClick={() => setTicketVisualizado(p)} style={{ cursor: "pointer" }}>
                              <div className="a-pedido-header" style={{ flexWrap: "wrap" }}>
                                <div style={{ minWidth: "80px" }}>
                                  <div style={{ fontSize: "18px", fontWeight: "900", color: "#ce1126" }}>#{String(p.id).padStart(4, '0')}</div>
                                  <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600", marginTop: "2px" }}>{p.fecha} · {p.hora}</div>
                                </div>
                                <div style={{ width: "2px", height: "30px", background: "#e2e8f0" }}></div>
                                <div style={{ fontSize: "15px", fontWeight: "900", color: "#1e293b", minWidth: "150px", display: "flex", alignItems: "center", gap: "6px" }}>
                                  <span style={{ color: "#1a5c2a", display: "flex" }}><Icons.User/></span> {p.cliente.toUpperCase()}
                                </div>
                                <div style={{ display: "flex", gap: "8px" }}>
                                  <span style={{ background: pagoPill.bg, color: pagoPill.color, padding: "6px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "900", display: "flex", alignItems: "center", gap: "6px", textTransform: "uppercase" }}><span style={{display: "flex"}}>{pagoPill.icon}</span> {p.metodoPago}</span>
                                  <span style={{ background: tipoPill.bg, color: tipoPill.color, padding: "6px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "900", display: "flex", alignItems: "center", gap: "6px", textTransform: "uppercase" }}><span style={{display: "flex"}}>{tipoPill.icon}</span> {p.tipoPedido}</span>
                                </div>
                                <div className="spacer"></div>
                                <div className="a-total">${p.total.toLocaleString()}</div>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); toggleAuditRow(p.id); }} 
                                  className={`a-toggle ${isExpanded ? 'open' : ''}`}
                                >
                                  {isExpanded ? "Ocultar productos ↑" : "Ver productos ↓"}
                                </button>
                              </div>
                              
                              {isExpanded && (
                                <>
                                  <div className="a-divider"></div>
                                  <div className="a-prods">
                                    <div className="a-prods-label">PRODUCTOS AUDITADOS EN ESTE TICKET</div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                      {p.matchingItems?.map((it, idx) => (
                                        <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", color: "#1e293b" }}>
                                          <span style={{ color: "#94a3b8", fontSize: "18px", lineHeight: "1.2" }}>•</span>
                                          <div style={{ lineHeight: "1.4" }}>
                                            <span style={{ fontWeight: "900", color: "#475569" }}>[{it.cantidad}x]</span> 
                                            <span style={{ fontWeight: "900", marginLeft: "6px", color: "#1e293b" }}>{it.n}</span> 
                                            {it.tam && <span style={{ color: "#64748b", marginLeft: "4px", fontWeight: "600" }}>({it.tam})</span>} 
                                            {it.gustos && <div style={{ color: "#1a5c2a", fontSize: "13px", fontWeight: "700", marginTop: "2px" }}>↳ {it.gustos}</div>}
                                          </div>
                                        </div>
                                      ))}
                                      {p.orderMatchedUnits !== undefined && p.orderMatchedUnits > 0 && (
                                        <div style={{ marginTop: "6px" }}>
                                           <span style={{ color: "#d97706", fontSize: "12px", fontWeight: "900", display: "inline-flex", alignItems: "center", gap: "6px", background: "#fef3c7", padding: "6px 12px", borderRadius: "6px", border: "1px dashed #f59e0b" }}>
                                             <span style={{ display: "flex" }}><Icons.Check/></span> Total extraído del ticket: {p.orderMatchedUnits} unid.
                                           </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </Fragment>
            )}

          </div>
        </div>
      )}

      {pestañaActiva === "clientes" && (
        <div className="page show" style={{ flexDirection: "column" }}>
          
          <div style={{ marginBottom: "25px", padding: "0 10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "15px", borderBottom: "3px solid #f5d020", paddingBottom: "12px" }}>
              <div style={{ flex: "1 1 auto", minWidth: "200px" }}>
                <h2 style={{ color: "#1e293b", margin: "0 0 4px 0", fontSize: "24px", display: "inline-block", fontWeight: "900" }}>Agenda de Clientes</h2>
                <span style={{ fontSize: "13px", color: "#64748b", display: "block", marginTop: "4px" }}>Gestión de contactos y métricas de consumo en tiempo real.</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "nowrap", flex: "0 1 auto" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex" }}>
                    <Icons.SearchGlass />
                  </div>
                  <input type="text" placeholder="Buscar nombre, tel o dirección..." value={busquedaCliente} onChange={(e) => setBusquedaCliente(e.target.value)} style={{ padding: "10px 15px 10px 38px", borderRadius: "8px", border: "none", minWidth: "250px", outline: "none", fontSize: "13px", backgroundColor: "#ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }} />
                </div>
                <button 
                  onClick={iniciarCreacionCliente} 
                  className="hover-card"
                  style={{ background: "#1a5c2a", color: "white", border: "none", borderRadius: "8px", padding: "11px 18px", fontWeight: "bold", fontSize: "13px", whiteSpace: "nowrap" }}>
                  + Nuevo Cliente
                </button>
                {clientes.length > 0 && authRole === "ADMIN" && (
                  <button 
                    onClick={vaciarDirectorioClientes}
                    className="hover-card-red"
                    style={{ background: "#fef2f2", color: "#ce1126", border: "1px solid #ce1126", borderRadius: "8px", padding: "10px 18px", fontWeight: "bold", fontSize: "13px", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <span style={{ display: 'flex' }}><Icons.Trash /></span>
                    Vaciar toda la agenda
                  </button>
                )}
              </div>
            </div>
          </div>

          {clientesEnriquecidos.length === 0 ? (
            <div style={{ textAlign: "center", color: "#888", fontStyle: "italic", marginTop: "30px" }}>{clientes.length === 0 ? "Aún no hay clientes registrados." : "No se encontraron resultados."}</div>
          ) : (
            <Fragment>
              <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", padding: "0 10px" }}>
                {clientesPaginados.map((c) => {
                  return (
                    <div 
                      key={c.id} 
                      style={{ 
                        background: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "16px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                        height: "100%",
                        position: "relative"
                      }}
                    >
                      <div 
                        className="hover-card"
                        onClick={() => setClienteVisualizado(c)}
                        style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "15px", position: "relative", zIndex: 1, flexGrow: 1 }}
                      >
                        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                          <div style={{ width: "45px", height: "45px", borderRadius: "50%", background: "#1a5c2a", color: "white", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "16px", fontWeight: "900", flexShrink: 0 }}>
                            {getInitials(c.nombre)}
                          </div>
                          <div>
                            <b style={{ fontSize: "15px", color: "#1e293b", display: "block" }}>{c.nombre.toUpperCase()}</b>
                            <div style={{ color: "#64748b", fontSize: "12px", marginTop: "4px", display: "flex", flexDirection: "column", gap: "2px" }}>
                              {c.telefonos.map((tel, idx) => (<span key={idx} style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ color: '#1a5c2a', display: 'flex' }}><Icons.PhoneInput /></span> {tel}</span>))}
                            </div>
                          </div>
                        </div>

                        <div style={{ color: "#64748b", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px", lineHeight: "1.3" }}>
                           <span style={{ color: '#1a5c2a', display: 'flex' }}><Icons.MapPin /></span> 
                           {c.direccion ? c.direccion : <em style={{ color: "#94a3b8", fontStyle: "normal", fontWeight: "900" }}>SIN DIRECCIÓN / RETIRA LOCAL</em>}
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "5px" }}>
                          <div style={{ background: "#f1f5f9", padding: "10px", borderRadius: "8px" }}>
                            <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "900", letterSpacing: "0.5px" }}>ÚLTIMO PEDIDO</div>
                            <div style={{ fontSize: "14px", color: "#1e293b", fontWeight: "900", marginTop: "4px" }}>{c.metricas.ultimoPedido}</div>
                          </div>
                          <div style={{ background: "#f1f5f9", padding: "10px", borderRadius: "8px" }}>
                            <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "900", letterSpacing: "0.5px" }}>HISTÓRICO</div>
                            <div style={{ fontSize: "14px", color: "#1e293b", fontWeight: "900", marginTop: "4px" }}>{c.metricas.totalPedidos} {c.metricas.totalPedidos === 1 ? 'pedido' : 'pedidos'}</div>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fef9c3", padding: "12px 15px", borderRadius: "8px", marginTop: "auto" }}>
                          <span style={{ fontSize: "11px", color: "#b45309", fontWeight: "900", letterSpacing: "0.5px" }}>ÚLTIMOS 30 DÍAS • {c.metricas.mesPedidos} PEDIDO(S)</span>
                          <span style={{ fontSize: "16px", color: "#b45309", fontWeight: "900" }}>$ {c.metricas.mesGastado.toLocaleString()}</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
                        <button 
                          onClick={(e) => { e.stopPropagation(); editarClienteExistente(c); }} 
                          style={{ flex: 1, padding: "12px", background: "#dcfce7", color: "#166534", border: "none", fontSize: "13px", fontWeight: "900", transition: "all 0.2s", display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", borderTop: "3px solid transparent", borderRadius: 0, cursor: "pointer" }} 
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#bbf7d0"; e.currentTarget.style.boxShadow = "inset 0 4px 0 0 #166534"; }} 
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#dcfce7"; e.currentTarget.style.boxShadow = "none"; }}
                        >
                          <span style={{ display: "flex" }}><Icons.Edit /></span> Editar
                        </button>
                        {authRole === "ADMIN" && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); eliminarCliente(c.id); }} 
                            style={{ flex: 1, padding: "12px", background: "#fee2e2", color: "#991b1b", border: "none", fontSize: "13px", fontWeight: "900", transition: "all 0.2s", display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", borderTop: "3px solid transparent", borderRadius: 0, cursor: "pointer" }} 
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fecaca"; e.currentTarget.style.boxShadow = "inset 0 4px 0 0 #991b1b"; }} 
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fee2e2"; e.currentTarget.style.boxShadow = "none"; }}
                          >
                            <span style={{ display: "flex" }}><Icons.Trash /></span> Borrar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Controles de Paginación de Clientes (Minimal Outline) */}
              {totalPaginasClientes > 1 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "30px", padding: "6px 6px", marginTop: "30px", marginBottom: "20px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                  <button 
                    disabled={paginaClientes === 1}
                    onClick={() => setPaginaClientes(prev => Math.max(prev - 1, 1))}
                    className={paginaClientes === 1 ? "page-btn" : "page-btn hover-card"}
                  >
                    ← Anterior
                  </button>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px" }}>
                     <div style={{ display: "flex", gap: "4px" }}>
                        <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#1a5c2a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>{paginaClientes}</span>
                     </div>
                     <span style={{ color: "#cbd5e1" }}>|</span>
                     <span style={{ color: "#64748b", fontWeight: "600" }}>Página <b style={{color: "#1e293b"}}>{paginaClientes}</b> de <b style={{color: "#1e293b"}}>{totalPaginasClientes}</b></span>
                  </div>
                  <button 
                    disabled={paginaClientes === totalPaginasClientes}
                    onClick={() => setPaginaClientes(prev => Math.min(prev + 1, totalPaginasClientes))}
                    className={paginaClientes === totalPaginasClientes ? "page-btn" : "page-btn hover-card"}
                  >
                    Siguiente →
                  </button>
                </div>
              )}
            </Fragment>
          )}
        </div>
      )}

      {clienteEnEdicion && (
        <div className="modal-ov show" style={{ zIndex: 1200 }}>
          <div className="modal-box" style={{ maxWidth: "450px", padding: "30px", position: "relative", borderRadius: "20px", border: "none" }}>
            <button className="m-close hover-card-red" onClick={() => setClienteEnEdicion(null)} style={{ color: "#ce1126", fontSize: "14px", top: "15px", right: "20px", background: "#fff", border: "2px solid #ce1126", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", padding: 0 }}>X</button>
            <h2 style={{ color: "#1a5c2a", margin: "0 0 25px 0", fontSize: "22px", fontWeight: "900" }}>
              <span style={{ borderBottom: "4px solid #f5d020", paddingBottom: "5px", display: "inline-block" }}>
                {clienteEnEdicion.isNew ? "Crear Nuevo Cliente" : "Editar Cliente"}
              </span>
            </h2>
            
            <div className="form-group" style={{ marginBottom: "20px" }}>
               <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: "10px", color: "#1e293b", fontWeight: "900" }}><span style={{ color: '#1a5c2a', display: 'flex' }}><Icons.User /></span> NOMBRE REGISTRADO</label>
               <input className="form-control" style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "10px", padding: "12px 16px" }} placeholder="Ej: Carlos Pérez" value={clienteEnEdicion.nombre} onChange={e => setClienteEnEdicion({...clienteEnEdicion, nombre: e.target.value})} />
            </div>
            
            <div className="form-group" style={{ position: "relative", marginBottom: "20px" }}>
               <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: "10px", color: "#1e293b", fontWeight: "900" }}><span style={{ color: '#1a5c2a', display: 'flex' }}><Icons.MapPin /></span> DIRECCIÓN DE ENTREGA</label>
               <div style={{ display: "grid", gridTemplateColumns: "1fr auto 65px 70px", gap: "8px", alignItems: "center" }}>
                 <input 
                   className="form-control" 
                   style={{ margin: 0, background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "10px", padding: "12px 16px" }}
                   placeholder="Calle y Altura (Ej: Lacroze 2314)" 
                   value={clienteEnEdicion.calleEdit || ""} 
                   onChange={(e) => setClienteEnEdicion({...clienteEnEdicion, calleEdit: e.target.value})} 
                 />
                 <button 
                    className="hover-card"
                    onClick={() => setClienteEnEdicion({...clienteEnEdicion, esCasaEdit: !clienteEnEdicion.esCasaEdit})}
                    style={{
                      padding: "12px", borderRadius: "10px", border: "1px solid #1a5c2a",
                      background: clienteEnEdicion.esCasaEdit ? "#f0f8f2" : "transparent",
                      color: "#1a5c2a",
                      fontWeight: "bold", margin: 0, display: "flex", alignItems: "center", gap: "6px"
                    }}>
                    <span style={{ display: 'flex' }}><Icons.House /></span> CASA
                 </button>
                 <input 
                   className="form-control" 
                   style={{ background: clienteEnEdicion.esCasaEdit ? "#f1f5f9" : "white", margin: 0, border: "1px solid #cbd5e1", borderRadius: "10px", padding: "12px" }}
                   placeholder="Piso" 
                   value={clienteEnEdicion.pisoEdit || ""} 
                   disabled={clienteEnEdicion.esCasaEdit}
                   onChange={(e) => setClienteEnEdicion({...clienteEnEdicion, pisoEdit: e.target.value.replace(/\D/g, '')})} 
                 />
                 <input 
                   className="form-control" 
                   style={{ background: clienteEnEdicion.esCasaEdit ? "#f1f5f9" : "white", margin: 0, border: "1px solid #cbd5e1", borderRadius: "10px", padding: "12px" }}
                   placeholder="Dpto" 
                   value={clienteEnEdicion.deptoEdit || ""} 
                   disabled={clienteEnEdicion.esCasaEdit}
                   onChange={(e) => setClienteEnEdicion({...clienteEnEdicion, deptoEdit: e.target.value.toUpperCase()})} 
                 />
               </div>
            </div>

            <div className="form-group" style={{ marginBottom: "25px" }}>
              {clienteEnEdicion.telefonos.map((tel, idx) => (
                <div key={idx} style={{ marginBottom: "12px" }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: "10px", color: "#1e293b", fontWeight: "900" }}>
                     <span style={{ color: '#1a5c2a', display: 'flex' }}><Icons.PhoneInput /></span> {idx === 0 ? "TELÉFONO PRINCIPAL" : `TELÉFONO ALTERNATIVO ${idx}`}
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input className="form-control" type="tel" placeholder="Ej: 114567..." value={tel} onChange={e => { const nuevosTels = [...clienteEnEdicion.telefonos]; nuevosTels[idx] = e.target.value.replace(/\D/g, ''); setClienteEnEdicion({...clienteEnEdicion, telefonos: nuevosTels}); }} style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "10px", padding: "12px 16px" }} />
                    {idx > 0 && (
                       <button className="hover-card-red" onClick={() => { const nuevosTels = clienteEnEdicion.telefonos.filter((_, i) => i !== idx); setClienteEnEdicion({...clienteEnEdicion, telefonos: nuevosTels}); }} style={{ background: "transparent", color: "#ce1126", border: "1px solid #ce1126", borderRadius: "10px", padding: "0 14px", fontWeight: "bold", display: "flex", alignItems: "center" }}><span style={{ display: "flex" }}><Icons.Trash /></span></button>
                    )}
                  </div>
                </div>
              ))}
              <button onClick={() => setClienteEnEdicion({...clienteEnEdicion, telefonos: [...clienteEnEdicion.telefonos, ""]})} className="hover-card" style={{ background: "transparent", color: "#1a5c2a", border: "1px dashed #1a5c2a", borderRadius: "10px", padding: "12px 10px", fontSize: "13px", fontWeight: "800", width: "100%", marginTop: "5px" }}>+ Agregar otro teléfono</button>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setClienteEnEdicion(null)} className="hover-card-red" style={{ flex: 1, padding: "14px", background: "#fee2e2", color: "#991b1b", border: "none", borderRadius: "10px", fontWeight: "900", fontSize: "14px" }}>Cancelar</button>
              <button onClick={guardarEdicionCliente} className="hover-card" style={{ flex: 1, padding: "14px", background: "#1a5c2a", color: "white", border: "none", borderRadius: "10px", fontWeight: "900", fontSize: "14px" }}>Guardar Registro</button>
            </div>
          </div>
        </div>
      )}

      {/* MOTOR UNIFICADO DE MODALES DE TICKET Y DEMORA */}
      {mostrarModalDemora && (
        <div className="modal-ov show" style={{ zIndex: 1250 }}>
          <div className="modal-box" style={{ maxWidth: "450px", padding: "30px", textAlign: "center", borderRadius: "20px", border: "none" }}>
            <h2 style={{ color: "#1a5c2a", marginBottom: "8px", fontSize: "22px", fontWeight: "900" }}>
              Demora de entrega
            </h2>
            <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "25px", fontWeight: "600" }}>
              {tipoPedido === "delivery" ? "Seleccioná en cuánto tiempo se entregará este pedido" : "Seleccioná en cuánto tiempo pasarán a retirar"}
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
              {[20, 30, 40, 50, 60, 90].map(min => (
                <button 
                  key={min} 
                  onClick={() => confirmarConDemora(min)} 
                  className="hover-card" 
                  style={{ padding: "14px", background: "#f0f8f2", border: "1.5px solid #1a5c2a", borderRadius: "10px", color: "#1a5c2a", fontSize: "16px", fontWeight: "900", cursor: "pointer" }}
                >
                  En {min} min
                </button>
              ))}
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button 
                onClick={() => setMostrarModalDemora(false)} 
                className="hover-card-red" 
                style={{ width: "100%", padding: "14px", background: "#fee2e2", color: "#ce1126", border: "none", borderRadius: "10px", fontWeight: "900", cursor: "pointer", fontSize: "15px" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalPedido && (
        <div className="modal-ov show" style={{ zIndex: 1100, backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
          <div className="modal-box" style={{ maxWidth: "600px", width: "90%", padding: "0", borderRadius: "20px", border: "2px solid #1a5c2a", borderTopWidth: "0", display: "flex", flexDirection: "column", maxHeight: "90vh" }}>
            <div style={{ borderTop: "8px solid #1a5c2a", background: "#fff", display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", minHeight: 0 }}>
              
              <div style={{ padding: "20px 30px 10px 30px", flexShrink: 0 }}>
                <button className="m-close hover-card-red" onClick={() => isConfirmMode ? setPedidoPendiente(null) : setTicketVisualizado(null)} style={{ color: "#ce1126", fontSize: "14px", top: "15px", right: "20px", background: "#fff", border: "2px solid #ce1126", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", padding: 0 }}>X</button>
                
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "40px", width: "110px", backgroundColor: "#ffffff", borderRadius: "8px", border: "2px solid #1a5c2a", padding: "4px" }}>
                    <img src={logoPrintImg} alt="Pizzería Caballito" style={{ height: "100%", width: "auto", objectFit: "contain", objectPosition: "center", pointerEvents: "none" }} />
                  </div>
                </div>
                
                <div style={{ textAlign: "center", marginBottom: "15px" }}>
                  <h2 style={{ color: "#ce1126", margin: "0", fontSize: "20px", fontWeight: "900", textTransform: "uppercase" }}>Pedido Nº {String(modalPedido.id).padStart(4, '0')}</h2>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px", fontWeight: "500" }}>{modalPedido.fecha} · {modalPedido.hora}</div>
                </div>

                <hr style={{ border: "none", borderTop: "2px dashed #cbd5e1", margin: "0 0 15px 0" }} />

                <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "15px", border: "1px solid #e2e8f0", marginBottom: "10px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "900", color: "#1a5c2a", letterSpacing: "1px", marginBottom: "10px", textTransform: "uppercase" }}>DATOS DE ENVÍO</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px", fontSize: "13px", color: "#1e293b" }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}><span style={{ color: "#1a5c2a", display: "flex" }}>{modalPedido.tipoPedido === 'delivery' ? <Icons.Moto/> : <Icons.Store/>}</span><span style={{ fontWeight: "800", minWidth: "60px" }}>Tipo:</span> <span>{modalPedido.tipoPedido.toUpperCase()}</span></div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}><span style={{ color: "#1a5c2a", display: "flex" }}><Icons.User/></span><span style={{ fontWeight: "800", minWidth: "60px" }}>Cliente:</span> <span>{modalPedido.cliente}</span></div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}><span style={{ color: "#1a5c2a", display: "flex" }}><Icons.PhoneInput/></span><span style={{ fontWeight: "800", minWidth: "60px" }}>Teléfono:</span> <span>{modalPedido.telefono}</span></div>
                    {modalPedido.tipoPedido === 'delivery' ? (
                      <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}><span style={{ color: "#1a5c2a", display: "flex" }}><Icons.MapPin/></span><span style={{ fontWeight: "800", minWidth: "60px" }}>Dirección:</span> <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{(modalPedido.direccion || "").replace(/(PISO\s+\d+)\s+([A-Z0-9]+)$/i, "$1, DEPTO $2")}</span></div>
                    ) : (
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}><span style={{ color: "#1a5c2a", display: "flex" }}><Icons.Clock/></span><span style={{ fontWeight: "800", minWidth: "60px" }}>Retiro:</span> <span>{modalPedido.horaRetiro}</span></div>
                    )}
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}><span style={{ color: "#1a5c2a", display: "flex" }}><Icons.Bill/></span><span style={{ fontWeight: "800", minWidth: "60px" }}>Pago:</span> <span>{modalPedido.metodoPago}</span></div>
                  </div>
                </div>
              </div>

              {/* CONTENEDOR DE TABLA INDEPENDIENTE (CON SCROLL Y LÍMITES DUROS) */}
              <div className="custom-scrollbar" style={{ flex: 1, minHeight: "150px", overflowY: "auto", padding: "0 30px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ background: "#1a5c2a", color: "white" }}>
                      <th style={{ padding: "10px 12px", textAlign: "left", borderRadius: "8px 0 0 8px", position: "sticky", top: 0, zIndex: 10, background: "#1a5c2a" }}>Producto</th>
                      <th style={{ padding: "10px 12px", textAlign: "center", position: "sticky", top: 0, zIndex: 10, background: "#1a5c2a" }}>Cant.</th>
                      <th style={{ padding: "10px 12px", textAlign: "right", borderRadius: "0 8px 8px 0", position: "sticky", top: 0, zIndex: 10, background: "#1a5c2a" }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalPedido.items && modalPedido.items.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "12px", color: "#1e293b" }}>
                          <b style={{ color: "#475569" }}>{item.tipoItem && item.tipoItem !== "GRAL" ? `[${item.tipoItem}] ` : ''}</b>
                          <span style={{ fontWeight: "800" }}>{item.n}</span> {item.tam ? `- ${item.tam}` : ''} {item.gustos ? `(${item.gustos})` : ''}
                        </td>
                        <td style={{ padding: "12px", textAlign: "center", fontWeight: "900", color: "#1e293b" }}>{item.cantidad}</td>
                        <td style={{ padding: "12px", textAlign: "right", fontWeight: "900", color: "#ce1126" }}>${(Number(item.p || 0) * item.cantidad).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div style={{ padding: "10px 30px 25px 30px", flexShrink: 0 }}>
                {modalPedido.items && modalPedido.items.length > 3 && (
                  <div style={{ textAlign: "center", fontSize: "11px", color: "#d97706", fontWeight: "900", marginBottom: "10px", backgroundColor: "#fef3c7", padding: "8px", borderRadius: "6px", border: "1px dashed #f59e0b" }}>
                      ↓ Hay {modalPedido.items.length - 3} ítem(s) más abajo. Scrollea la lista ↓
                  </div>
                )}
                
                <div style={{ background: "#1a5c2a", color: "white", padding: "15px 20px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                  <div style={{ fontSize: "15px", fontWeight: "900", letterSpacing: "1px" }}>MONTO TOTAL</div>
                  <div style={{ color: "#f5d020", fontSize: "24px", fontWeight: "900" }}>${(modalPedido.total || 0).toLocaleString()}</div>
                </div>

                {isConfirmMode ? (
                  <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                    <button onClick={() => ejecutarCierreYImpresion(modalPedido, true)} className="hover-card" style={{ width: "100%", padding: "12px", background: "#1a5c2a", color: "white", border: "none", borderRadius: "12px", fontWeight: "900", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <span style={{ display: "flex" }}><Icons.Printer /></span> Confirmar e Imprimir
                    </button>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button onClick={() => setPedidoPendiente(null)} className="hover-card-red" style={{ flex: 1, padding: "12px", background: "#fff", color: "#ce1126", border: "2px solid #ce1126", borderRadius: "12px", fontWeight: "900", cursor: "pointer", fontSize: "13px" }}>Volver a editar</button>
                      <button onClick={() => ejecutarCierreYImpresion(modalPedido, false)} className="hover-card" style={{ flex: 1, padding: "12px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: "12px", fontWeight: "900", cursor: "pointer", fontSize: "13px" }}>Solo Guardar</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button onClick={() => setTicketVisualizado(null)} className="hover-card-red" style={{ flex: 1, padding: "12px", background: "#fff", color: "#ce1126", border: "2px solid #ce1126", borderRadius: "12px", fontWeight: "900", cursor: "pointer", fontSize: "14px" }}>Cerrar</button>
                    <button onClick={() => {
                        setDatosImpresionCocina(modalPedido);
                        setTimeout(() => { window.print(); setDatosImpresionCocina(null); }, 350);
                    }} className="hover-card" style={{ flex: 1, padding: "12px", background: "#1a5c2a", color: "white", border: "none", borderRadius: "12px", fontWeight: "900", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <span style={{ display: "flex" }}><Icons.Printer /></span> Imprimir
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
} 