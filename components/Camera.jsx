
import * as FileSystem from 'expo-file-system';
import { useEffect, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import { Camera as CameraView, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useAppState } from '../hooks/useAppState';
import * as ColorAnalyzer from '../modules/color-analyzer/src/ColorAnalyzerModule.ts';
const CONTROLS_HEIGHT = 200

const saveImage = async (uri) => {
    const filename = uri.split('/').pop() || 'temp.jpg'
    const destination = `${FileSystem.documentDirectory}${filename}`

    try {
        await FileSystem.copyAsync({
            from: uri,
            to: destination,
        })
        console.log('Saved to:', destination)
        return destination
    } catch (error) {
        console.error('Error saving file:', error)
        return null
    }
}
export const PermissionView = () => {

    const { hasPermission, requestPermission } = useCameraPermission()
    useEffect(() => {
        if (!hasPermission) {
            requestPermission()

        }
    }, [hasPermission])

    if (hasPermission) return <Camera />
    return <View style={[styles.container]} >
        <Text style={[styles.noPermissionMessage]} >No permission added</Text>
        <Pressable onPress={requestPermission} hitSlop={10}>
            <Text>
                Ask Again
            </Text>
        </Pressable>
    </View>

}
const Camera = () => {
    const device = useCameraDevice('back')

    const cameraRef = useRef(null)
    const appState = useAppState()
    const isActive = appState === "active"
    const capturePhoto = async () => {
        try {
            if (cameraRef.current) {
                const photo = await cameraRef.current.takePhoto()
                const path = await saveImage('file://' + photo.path)
                const res = await ColorAnalyzer.default.getAverageColor(path, photo.width / 2, photo.height / 2)

                await FileSystem.deleteAsync(path)
                console.log(res)
            } else {
                console.error('Camera ref is null')
            }
        } catch (e) {
            console.log(e)
        }
    }
    if (!device) return <View><Text>No Device!</Text>  </View>

    return <View style={[styles.cameraContainer]}><CameraView ref={cameraRef} photo device={device} isActive={isActive} style={[styles.camera]} />
        <View style={[styles.controlsContainer]}>
            <Pressable onPress={capturePhoto} style={[styles.captureBtn]} hitSlop={10}>
            </Pressable>
        </View>
    </View>
}

const styles = StyleSheet.create((theme) => ({
    container: {
        width: UnistylesRuntime.screen.width,
        backgroundColor: theme.colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    noPermissionMessage: {
        textAlign: 'center',
        fontSize: 24,
    },
    cameraContainer: {
        flex: 1
    },
    camera: {
        height: UnistylesRuntime.screen.height - CONTROLS_HEIGHT
    },
    controlsContainer: {
        height: CONTROLS_HEIGHT,
        justifyContent: 'center', alignItems: 'center'
    },
    captureBtn: {
        width: 50, height: 50,
        borderRadius: '100%',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'gray'
    }
}))
