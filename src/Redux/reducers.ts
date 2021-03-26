import {
    FETCHALUMNOS,
    FILTERTECNOLOGIES,
    SEARCHBYNAME,
    MODIFYALUMN
} from './actions';

const initialState = {
    alumnos: [],
    alumnosFiltrados: []
};

const alumnosReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCHALUMNOS:
            return {
                ...state,
                alumnos: action.payload
            };

        case FILTERTECNOLOGIES: {
            let aux: any[] = [];
            action.payload.array.length > 0
                ? action.payload.array.forEach((filter: any) => {
                      action.payload.method === 'add'
                          ? (aux = state.alumnosFiltrados?.filter(
                                (student: any) => {
                                    return [
                                        ...student.abilities,
                                        ...student.languages
                                    ].includes(filter);
                                }
                            ))
                          : (aux = state.alumnos?.filter((student: any) => {
                                return [
                                    ...student.abilities,
                                    ...student.languages
                                ].includes(filter);
                            }));
                  })
                : (aux = state.alumnos);
            return {
                ...state,
                alumnosFiltrados: aux
            };
        }
        case MODIFYALUMN:
            return {
                ...state,
                alumnos: action.payload
            };
        default:
            return state;
    }
};

export default alumnosReducer;

// {
//     name:string
//     age:number
//     surname:string
//     abilities:[string]
//     picture:string
//     country:string
//     }
