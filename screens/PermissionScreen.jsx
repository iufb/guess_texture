
import { MotiImage, MotiText } from 'moti';
import { View } from 'react-native';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import { Button } from '../components/Button';
export const PermissionScreen = ({ requestPermission }) => {
    return (
        <View style={[styles.container]}>
            <MotiImage from={{ scale: .5, opacity: 0, translateY: 100 }} animate={{ scale: 1, opacity: 1, translateY: 0 }} transition={{
                type: 'timing',
            }} source={require('./../assets/images/CameraPermission.png')} />
            <MotiText
                from={{ opacity: 0, translateY: -100 }} animate={{ opacity: 1, translateY: 0 }} transition={{
                    type: 'timing',
                }}
                style={[styles.text]}>Нам нужен доступ к камере, чтобы вы могли сделать снимок прямо в приложении. Это необходимо для анализа изображения, получения цвета из фото.
                Мы не используем камеру в фоновом режиме и не сохраняем снимки без вашего ведома.</MotiText>
            <Button onPress={() => requestPermission()} style={{ width: UnistylesRuntime.screen.width - 20 }} >Разрешить</Button>
        </View>
    );
};
const styles = StyleSheet.create((theme) => ({
    container: {
        width: '100%',
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly'

    },
    text: {
        textAlign: 'center',
        color: theme.colors.textLight,
        fontSize: 20,
        paddingHorizontal: 10,
    }
}))
