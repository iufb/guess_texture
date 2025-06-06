import * as FileSystem from 'expo-file-system';
import { MotiPressable } from 'moti/interactions';
import { useEffect, useMemo, useRef } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import { Camera as CameraView, useCameraDevice } from 'react-native-vision-camera';
import { AppStates } from '../consts';
import { useAppState } from '../hooks/useAppState';
import * as ColorAnalyzer from '../modules/color-analyzer/src/ColorAnalyzerModule.ts';
import { useLocation } from '../store/base';
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

export const CameraScreen = () => {
    const { setLocation, location: { params } } = useLocation(state => state)
    console.log(params)

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

    return <View style={[styles.cameraContainer]}>
        <Pressable style={[styles.close]} onPress={() => setLocation(AppStates.main, '')}>
            <Image style={[styles.x]} source={require('../assets/images/close.png')} />
        </Pressable>
        <CameraView ref={cameraRef} photo device={device} isActive={isActive} style={[styles.camera]} />
        <View style={[styles.controlsContainer]}>
            <CaptureBtn capture={capturePhoto} />
        </View>
    </View>
}
const CaptureBtn = ({ capture }) => {
    const size = useSharedValue(57)
    const radius = useSharedValue(100)
    const progress = useSharedValue(0)
    useEffect(() => {
        size.value = withSpring(57);
        radius.value = withTiming(100, { duration: 200 });
    }, [])
    const animatedStyle = useAnimatedStyle(() => {
        return { width: size.value, height: size.value, borderRadius: radius.value, borderWidth: 1 }
    })
    return <View style={[styles.captureOuter]}>
        <MotiPressable
            animate={useMemo(
                () => ({ hovered, pressed }) => {
                    'worklet'

                    return {
                        borderWidth: hovered || pressed ? 10 : 1,
                    }
                },
                []
            )}
            onPress={capture} transition={useMemo(
                () => ({ hovered, pressed }) => {
                    'worklet'

                    return {
                        delay: hovered || pressed ? 0 : 100,
                    }
                },
                []
            )} style={[styles.captureInner, animatedStyle]}>
        </MotiPressable>
    </View>
}
const styles = StyleSheet.create((theme) => ({
    cameraContainer: {
        flex: 1,
        backgroundColor: theme.colors.dark,
    },
    close: {
        zIndex: 20,
        position: 'absolute',
        bottom: 70,
        right: 30,
        width: 40, height: 40, borderRadius: 100, backgroundColor: theme.colors.secondary,
        alignItems: 'center', justifyContent: 'center'

    },
    x: {
        color: theme.colors.dark,
        width: 19, height: 19
    },
    camera: {
        height: UnistylesRuntime.screen.height - CONTROLS_HEIGHT
    },
    controlsContainer: {
        height: CONTROLS_HEIGHT,
        justifyContent: 'center', alignItems: 'center'
    },
    captureOuter: {
        marginBottom: 25,
        width: 64, height: 64, backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center'
    },
    captureInner: {
        width: 57, height: 57, backgroundColor: 'white', borderWidth: 2, borderColor: 'black'
    },
}))
