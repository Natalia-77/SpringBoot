import * as AnimalListAction from '../../components/actions/action_animals';
import * as BookListAction from '../../components/actions/action-book';

const actions = {
    ...AnimalListAction,
    ...BookListAction
}

export default actions;