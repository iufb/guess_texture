import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useCameraPermission } from 'react-native-vision-camera';
import { AppStates } from './consts';
import { CameraScreen } from './screens/CameraScreen';
import { MainScreen } from './screens/MainScreen';
import { useLocation } from './store/base';
export default function App() {
    const { hasPermission, requestPermission } = useCameraPermission()
    const { location } = useLocation(state => state)

    if (!hasPermission) return <PermissionScreen requestPermission={requestPermission} />
    const render = () => {
        switch (location.base) {
            case AppStates.main: return <MainScreen />
            case AppStates.camera: return <CameraScreen />
        }
    }

    return <View style={[styles.container]}>
        {render()}
        <StatusBar style='auto' />
    </View>

}

const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1
    },
}));
