import { StyleSheet } from 'react-native-unistyles'

const lightTheme = {
    colors: {
        primary: '#ff1ff4',
        secondary: '#1ff4ff'
    },
    gap: (v) => v * 8
}

const otherTheme = {
    colors: {
        primary: '#aa12ff',
        secondary: 'pink'
    },
    gap: (v) => v * 8
}

const appThemes = {
    light: lightTheme,
    other: otherTheme
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
