import { StyleSheet } from 'react-native-unistyles'

const lightTheme = {
    colors: {
        primary: '#10B981',
        secondary: '#FFFFFF',
        card: "#CCFBF1",
        textLight: "#8B8C92",
        textDark: "#000000",
        dark: "#242424"
    },
    gap: (v) => v * 8
}



const appThemes = {
    light: lightTheme,
}

const breakpoints = {
    xs: 0,
    sm: 300,
    md: 500,
    lg: 800,
    xl: 1200
}




StyleSheet.configure({
    settings: {
        initialTheme: 'light',
    },
    breakpoints,
    themes: appThemes
})
