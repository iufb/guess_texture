import { StatusBar } from 'expo-status-bar';
import { NativeModules } from 'react-native';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import { PermissionView } from './components/Camera';
const { ColorAnalyzer } = NativeModules
export default function App() {
    console.log(UnistylesRuntime.statusBar.height)
    return (
        <>
            <PermissionView />
            <StatusBar style="dark" />
        </>
    );
}

const styles = StyleSheet.create((theme) => ({
    container: {
        paddingTop: UnistylesRuntime.statusBar.height,
        flex: 1,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
}));
