import { CustomHobby } from "../model/types"
import uuid from 'react-native-uuid';

const generateHobby = (customHobbyInput: string): CustomHobby => {        
    return {
        id: uuid.v4(),
        name: customHobbyInput,
    }
}

export default generateHobby;
