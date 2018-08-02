import React from "react";
import { Text, StyleSheet, View, Platform } from "react-native";

const ProgressBar = ({items,index}) => {
    let renderBar = items.map((item,k)=>{
        let Css = index == k ? 1 : 0.2;
        let backGrndColr = index == k ? 'white': 'black'
        return(
            <View key={k} style={[styles.block, { opacity: Css, backgroundColor:backGrndColr}]} />
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
        flexDirection: 'row', 
        justifyContent: 'center' 
    },
    block: { 
        width: 7, 
        height: 7, 
        alignSelf: 'center', 
        marginLeft: 5,
        borderRadius:20 
    }
});

export default ProgressBar;
