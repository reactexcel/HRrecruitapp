import{AsyncStorage} from 'react-native';

export const setItem = async (dataName,data) => {
    try {
        await AsyncStorage.setItem(dataName,data)
    }
    catch(error){
        console.log(error);
    }
}

export const getItem = async dataName => {
    try{
        const value = await AsyncStorage.getItem(dataName);
        // console.log(value,'<<<<<<');
        
        if(value !== null){
            return JSON.parse(value);
        }
    }
    catch(error){
        console.log(error)
    }
}