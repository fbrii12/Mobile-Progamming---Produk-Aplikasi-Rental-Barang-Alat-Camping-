const colors = {
    // Warna utama (alam)
    forestGreen: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,   // hijau hutan
    olive: (opacity = 1) => `rgba(107, 142, 35, ${opacity})`,        // hijau daun
    earthBrown: (opacity = 1) => `rgba(139, 94, 60, ${opacity})`,    // coklat tanah

    // Warna pendukung
    sand: (opacity = 1) => `rgba(244, 230, 200, ${opacity})`,        // warna pasir
    skyBlue: (opacity = 1) => `rgba(135, 206, 235, ${opacity})`,     // langit
    sunsetOrange: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,  // senja

    // Netral
    white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

    // Dark mode (malam camping vibes 🌙)
    nightGreen: (opacity = 1) => `rgba(20, 40, 20, ${opacity})`,
    nightBlue: (opacity = 1) => `rgba(25, 25, 60, ${opacity})`,

    grey: (opacity = 1) => `rgba(109, 125, 154, ${opacity})`,
}

export default colors;