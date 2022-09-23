import { View, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
    return(
        <View style={styles.container}>
            <Text style={styles.content}>Home Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    content: {
        color: 'black',
        fontWeight: '600',
        fontSize: 32,
    }
})