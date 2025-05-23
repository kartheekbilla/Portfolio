// // Custom cursor effects
// document.addEventListener("DOMContentLoaded", () => {
//   // Create custom cursor elements
//   const cursorDot = document.createElement("div")
//   cursorDot.className = "cursor-dot"
//   document.body.appendChild(cursorDot)

//   const cursorOutline = document.createElement("div")
//   cursorOutline.className = "cursor-outline"
//   document.body.appendChild(cursorOutline)

//   // Add cursor styles if not already in CSS
//   const style = document.createElement("style")
//   style.innerHTML = `
//         .cursor-dot {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 8px;
//             height: 8px;
//             background-color: var(--primary-color);
//             border-radius: 50%;
//             transform: translate(-50%, -50%);
//             pointer-events: none;
//             z-index: 9999;
//             transition: transform 0.1s ease;
//         }
        
//         .cursor-outline {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 40px;
//             height: 40px;
//             border: 2px solid var(--primary-color);
//             border-radius: 50%;
//             transform: translate(-50%, -50%);
//             pointer-events: none;
//             z-index: 9998;
//             transition: transform 0.15s ease, width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
//         }
        
//         a:hover ~ .cursor-dot,
//         button:hover ~ .cursor-dot,
//         .btn:hover ~ .cursor-dot,
//         .hover-effect:hover ~ .cursor-dot {
//             transform: translate(-50%, -50%) scale(1.5);
//         }
        
//         a:hover ~ .cursor-outline,
//         button:hover ~ .cursor-outline,
//         .btn:hover ~ .cursor-outline,
//         .hover-effect:hover ~ .cursor-outline {
//             width: 60px;
//             height: 60px;
//             border-color: var(--secondary-color);
//         }
//     `
//   document.head.appendChild(style)

//   // Track mouse movement
//   document.addEventListener("mousemove", (e) => {
//     // Update dot position immediately
//     cursorDot.style.left = `${e.clientX}px`
//     cursorDot.style.top = `${e.clientY}px`

//     // Update outline position with slight delay for trailing effect
//     cursorOutline.style.left = `${e.clientX}px`
//     cursorOutline.style.top = `${e.clientY}px`
//   })

//   // Add special effects for interactive elements
//   const interactiveElements = document.querySelectorAll("a, button, .btn, .hover-effect")

//   interactiveElements.forEach((el) => {
//     el.addEventListener("mouseenter", () => {
//       cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)"
//       cursorOutline.style.width = "60px"
//       cursorOutline.style.height = "60px"
//       cursorOutline.style.borderColor = "var(--secondary-color)"
//     })

//     el.addEventListener("mouseleave", () => {
//       cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
//       cursorOutline.style.width = "40px"
//       cursorOutline.style.height = "40px"
//       cursorOutline.style.borderColor = "var(--primary-color)"
//     })
//   })

//   // Add click effect
//   document.addEventListener("mousedown", () => {
//     cursorDot.style.transform = "translate(-50%, -50%) scale(0.7)"
//     cursorOutline.style.transform = "translate(-50%, -50%) scale(0.7)"
//   })

//   document.addEventListener("mouseup", () => {
//     cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
//     cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
//   })

//   // Hide cursor when leaving window
//   document.addEventListener("mouseleave", () => {
//     cursorDot.style.opacity = "0"
//     cursorOutline.style.opacity = "0"
//   })

//   document.addEventListener("mouseenter", () => {
//     cursorDot.style.opacity = "1"
//     cursorOutline.style.opacity = "1"
//   })
// })
