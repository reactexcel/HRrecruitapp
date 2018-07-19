import React from "react";
import { Text, StyleSheet, View, Platform } from "react-native";

const ProgressBar = ({items,index}) => {
    let renderBar = items.map((item,k)=>{
        let Css = index == k ? 1 : 0.3;
        return(
            <View key={k} style={[styles.block, { opacity: Css}]} />
        )
    })
    return (
    <View style={styles.container}>
        {renderBar}
    </View>
    )    
};

const styles = StyleSheet.create({
    container: { 
        marginTop: 50, 
        flexDirection: 'row', 
        justifyContent: 'center' 
    },
    block: { 
        width: 30, 
        height: 3, 
        backgroundColor: 'white', 
        alignSelf: 'center', 
        marginLeft: 5 
    }
});

export default ProgressBar;
