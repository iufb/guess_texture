
import { MotiImage, MotiView } from 'moti';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import { AppStates } from '../consts';
import { useLocation } from '../store/base';
const chevronAnimation = {
    from: {
        opacity: 0,
        translateX: -20,

    },
    animate: {
        opacity: 1,
        translateX: 0,

    },
    transition: {
        type: 'timing',
    }
}
const mainImageAnimation = {
    from: {
        opacity: 0,
        scale: .7

    },
    animate: {
        opacity: 1,
        scale: 1,
    },
    transition: {
        type: 'timing',
    }

}
const actionMenuAnimation = {
    from: {
        opacity: 0,
        translateX: -UnistylesRuntime.screen.width

    },
    animate: {
        opacity: 1,
        translateX: 0,
    },
    transition: {
        type: 'timing',
    }

}
export const MainScreen = () => {
    const { setLocation } = useLocation(state => state)
    return <View style={[styles.container]} >
        <Image style={[styles.logo]} source={require('../assets/images/Logo.png')} />
        <MotiImage resizeMode='contain' source={require('../assets/images/Main.png')} style={[styles.mainImage]}  {...mainImageAnimation} />
        <Text style={[styles.title]}>Выберите действие:</Text>

        <MotiView {...actionMenuAnimation}>
            <TouchableOpacity style={[styles.btn]}>

                <View style={[styles.textContainer]}>
                    <Text style={[styles.btnTitle]}>Определить</Text>
                    <Text style={[styles.btnSubtitle]}>Сделайте фото и определите название</Text>
                </View>
                <MotiView style={[styles.circle]} {...chevronAnimation}>
                    <Image style={[styles.chevron]} source={require('../assets/images/chevronRight.png')} />
                </MotiView>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setLocation(AppStates.camera, 'add')} style={[styles.btn]}>
                <View style={[styles.textContainer]}>
                    <Text style={[styles.btnTitle]}>Добавить</Text>
                    <Text style={[styles.btnSubtitle]}>Сделайте фото и сохраните новое название</Text>
                </View>
                <MotiView style={[styles.circle]} {...chevronAnimation}>
                    <Image style={[styles.chevron]} source={require('../assets/images/chevronRight.png')} />
                </MotiView>
            </TouchableOpacity>
        </MotiView>


    </View>

}
const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: UnistylesRuntime.statusBar.height + 10
    },
    logo: {
        width: 247,
        height: 61
    },
    mainImage: {
        width: UnistylesRuntime.screen.width - 50,
        height: UnistylesRuntime.screen.width - 50

    },
    title: {
        fontSize: 20,
        color: theme.colors.textDark, fontWeight: 'bold',
        marginBottom: 30,
    },
    btn: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.primary
    },
    textContainer: {
        width: '80%'
    },
    btnTitle: {
        fontSize: 16,
        color: theme.colors.textDark, fontWeight: 'bold'

    },
    btnSubtitle: {
        marginVertical: 5,
        fontSize: 14,
        color: theme.colors.textLight, fontWeight: 'bold',
        maxWidth: '90%'

    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        width: 50, height: 50, borderRadius: 100
    },
    chevron: {}
}));
