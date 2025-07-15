/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./shared/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "screen-65": "69vh",
        "screen-80": "80vh",
        "screen-81": "81vh",
        "screen-82": "82vh",
        "screen-83": "83vh",
        "screen-84": "84vh",
        "screen-85": "85vh",
        "screen-90": "90vh",
        "screen-95": "95vh",
      },
      colors: {
        hrBlue: "#559CDA",
        powderBlue: "#72A7FF",
        lightGray: "#2A2A2A",
        hrOrange: "#ED8028",
        hrGreen: "#1E8449",
        hrPurple: "#9B51E0",
        hrRed: "#FF4B34",
        menuText: "#6D6D6D",
      },
      padding: {
        265: "265px",
        23: "91.5px",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      width: {
        "15%": "12%",
      },
      maxWidth: {
        "10%": "10%",
        "20%": "20%",
        "50%": "50%",
        "80%": "80%",
      },
      maxHeight: {
        "10%": "10%",
        "20%": "20%",
        "50%": "50%",
        "80%": "80%",
      },
    },
  },
  plugins: [],
};
