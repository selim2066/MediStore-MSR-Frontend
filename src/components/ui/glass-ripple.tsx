// ! water drop ripple effect for clicks, theme-aware and optimized for performance
// "use client";
// import { useEffect, useCallback } from "react";

// export default function GlassRipple() {
//   const spawn = useCallback((x: number, y: number) => {
//     const isDark = document.documentElement.classList.contains("dark");

//     const mk = (size: number, styles: Partial<CSSStyleDeclaration>) => {
//       const el = document.createElement("div");

//       Object.assign(el.style, {
//         position: "fixed",
//         borderRadius: "9999px",
//         pointerEvents: "none",
//         left: x + "px",
//         top: y + "px",
//         width: size + "px",
//         height: size + "px",
//         marginLeft: -size / 2 + "px",
//         marginTop: -size / 2 + "px",
//         zIndex: "9999",
//         transformOrigin: "center",
//         willChange: "transform, opacity",
//         ...styles,
//       });

//       document.body.appendChild(el);
//       return el;
//     };

//     // Theme-aware colors
//     const ringColor  = isDark ? "rgba(56,189,248,0.55)" : "rgba(6,120,200,0.45)";
//     const glowColor  = isDark ? "rgba(56,189,248,0.25)" : "rgba(6,120,200,0.18)";
//     const coreStart  = isDark ? "rgba(255,255,255,0.95)" : "rgba(6,120,200,0.85)";
//     const coreMid    = isDark ? "rgba(56,189,248,0.45)" : "rgba(6,120,200,0.25)";
//     const trailColor = isDark ? "rgba(255,255,255,0.10)" : "rgba(6,120,200,0.15)";

//     // 🔵 Outer ripple (tiny + smooth water drop)
//     const outer = mk(1.5, {
//       border: `1px solid ${ringColor}`,
//       boxShadow: `0 0 3px ${glowColor}`,
//     });

//     outer.animate(
//       [
//         { transform: "scale(1)", opacity: "0.85" },
//         { transform: "scale(45)", opacity: "0" },
//       ],
//       {
//         duration: 800,
//         easing: "cubic-bezier(0.12,0.7,0.2,1)",
//         fill: "forwards",
//       }
//     ).onfinish = () => outer.remove();

//     // 💧 Core water drop (tiny and sharp)
//     const core = mk(2.5, {
//       background: `radial-gradient(circle, ${coreStart} 0%, ${coreMid} 45%, transparent 100%)`,
//       boxShadow: `0 0 5px ${glowColor}`,
//     });

//     core.animate(
//       [
//         { transform: "scale(1)", opacity: "1" },
//         { transform: "scale(14)", opacity: "0" },
//       ],
//       {
//         duration: 600,
//         easing: "cubic-bezier(0.05,0.75,0.2,1)",
//         fill: "forwards",
//       }
//     ).onfinish = () => core.remove();

//     // 🌊 Subtle trail ripple
//     const trail = mk(1, {
//       border: `0.5px solid ${trailColor}`,
//     });

//     trail.animate(
//       [
//         { transform: "scale(1)", opacity: "0.3" },
//         { transform: "scale(40)", opacity: "0" },
//       ],
//       {
//         duration: 950,
//         easing: "cubic-bezier(0.05,0.55,0.15,1)",
//         fill: "forwards",
//       }
//     ).onfinish = () => trail.remove();
//   }, []);

//   useEffect(() => {
//     const onClick = (e: MouseEvent) => spawn(e.clientX, e.clientY);
//     window.addEventListener("click", onClick);
//     return () => window.removeEventListener("click", onClick);
//   }, [spawn]);

//   return null;
// }

// ! plus
"use client";
import { useEffect, useCallback } from "react";

export default function GlassRipple() {
  const spawn = useCallback((x: number, y: number) => {
    const isDark = document.documentElement.classList.contains("dark");

    const mk = (size: number, styles: Partial<CSSStyleDeclaration>, text = "+", fontSize = 10) => {
      const el = document.createElement("div");

      Object.assign(el.style, {
        position: "fixed",
        borderRadius: "9999px",
        pointerEvents: "none",
        left: x + "px",
        top: y + "px",
        width: size + "px",
        height: size + "px",
        marginLeft: -size / 2 + "px",
        marginTop: -size / 2 + "px",
        zIndex: "9999",
        transformOrigin: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        lineHeight: "1",
        userSelect: "none",
        willChange: "transform, opacity",
        fontSize: fontSize + "px",
        ...styles,
      });

      el.textContent = text;
      document.body.appendChild(el);
      return el;
    };

    // Healing green theme (medical)
    const ringColor  = isDark ? "rgba(34,197,94,0.55)" : "rgba(22,163,74,0.45)";
    const glowColor  = isDark ? "rgba(34,197,94,0.25)" : "rgba(22,163,74,0.18)";
    //const coreStart  = isDark ? "rgba(220,252,231,0.95)" : "rgba(34,197,94,0.85)";
   // const coreMid    = isDark ? "rgba(34,197,94,0.45)" : "rgba(22,163,74,0.25)";
    const trailColor = isDark ? "rgba(255,255,255,0.10)" : "rgba(22,163,74,0.15)";

    // ➕ Outer healing pulse
    const outer = mk(2, {
      color: ringColor,
      textShadow: `0 0 10px ${glowColor}`,
      fontSize: "4px",
    });

    outer.animate(
      [
        { transform: "scale(1)", opacity: "0.85" },
        { transform: "scale(15)", opacity: "0" },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.12,0.7,0.2,1)",
        fill: "forwards",
      }
    ).onfinish = () => outer.remove();

    // 💚 Core healing drop (plus sign)
    const core = mk(3, {
      color: isDark ? "#dcfce7" : "#16a34a",
      textShadow: `0 0 4px ${glowColor}`,
      fontSize: "5px",
    });

    core.animate(
      [
        { transform: "scale(3)", opacity: "1" },
        { transform: "scale(2)", opacity: "0" },
      ],
      {
        duration: 800,
        easing: "cubic-bezier(0.05,0.75,0.2,1)",
        fill: "forwards",
      }
    ).onfinish = () => core.remove();

    // 🌿 Soft healing trail
    const trail = mk(1, {
      color: trailColor,
      fontSize: "4px",
    });

    trail.animate(
      [
        { transform: "scale(1)", opacity: "0.3" },
        { transform: "scale(4)", opacity: "0.2" },
      ],
      {
        duration: 950,
        easing: "cubic-bezier(0.05,0.55,0.15,1)",
        fill: "forwards",
      }
    ).onfinish = () => trail.remove();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => spawn(e.clientX, e.clientY);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [spawn]);

  return null;
}

