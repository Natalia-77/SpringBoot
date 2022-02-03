import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import AnimalActionCreators from '../store/action-creators';


export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(AnimalActionCreators, dispatch);
}