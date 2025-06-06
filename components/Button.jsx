
import { MotiPressable } from 'moti/interactions';
import { useMemo } from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const Button = ({ children, style, ...props }) => {
    return (
        <MotiPressable
            animate={useMemo(
                () => ({ hovered, pressed }) => {
                    'worklet'

                    return {
                        opacity: hovered || pressed ? 0.8 : 1,
                        translateY: hovered || pressed ? 2 : 0
                    }
                },
                []
            )}
            transition={useMemo(
                () => ({ hovered, pressed }) => {
                    'worklet'

                    return {
                        delay: hovered || pressed ? 0 : 100,
                    }
                },
                []
            )}
            style={[styles.container, style]} {...props}>
            <Text style={[styles.text]}>{children}</Text>
        </MotiPressable>
    );
};

const styles = StyleSheet.create((theme) => ({
    container: {
        backgroundColor: theme.colors.primary,
        width: '100%',
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'

    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
}))
