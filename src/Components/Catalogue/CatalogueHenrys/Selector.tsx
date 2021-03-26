import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../Redux/hooks';
import { filterTecnologies } from '../../../Redux/actions';
// import type { RootState } from "src/Redux/store"
import './Selector.css';

const Selector = () => {
    const arr: string[] = [];
    const [chips, setChips] = useState(arr);
    const [method, setMethod] = useState('');
    // const fitered = useSelector((state) => state.alumnosFiltrados);
    const dispatch = useDispatch();

    const backTecnologies = [
        'SQL',
        'Express js',
        'Node js',
        'MongoDB',
        'Javascript'
    ];
    const frontTecnologies = ['React', 'Redux', 'Angular', 'Javascript', 'CSS'];
    const languages = ['English', 'Spanish', 'Portuguese', 'Chinese'];
    const modalidad = ['Local', 'Remoto', 'Relocalizacion'];
    const gender = ['Femenino', 'Masculino'];
    const experience = [
        'Menos de 1 año',
        'Entre 1 y 2 años',
        'Entre 2 y 3 años',
        'Mas de 3 años'
    ];

    const handleOption = async (option: string) => {
        await setMethod('add');
        !chips.includes(option) && (await setChips([...chips, option]));
    };

    useEffect(() => {
        method === 'add' && dispatch(filterTecnologies(chips, 'add'));
        method === 'sub' && dispatch(filterTecnologies(chips, 'sub'));
    }, [chips, method]);

    const handleClose = async (value: any) => {
        await setMethod('sub');
        const aux = chips.filter((el) => el !== value);
        setChips(aux);
    };

    return (
        <div className="selector">
            {chips.length > 0
                ? chips.map((el, key) => {
                      return (
                          <div
                              className="flex justify-center w-max m-1 font-medium py-1 px-1 rounded-full text-yellow-100 bg-yellow-700 border border-yellow-700 "
                              key={key}>
                              <div className="text-sm font-normal leading-none w-full flex-initial">
                                  {el}
                              </div>
                              <div className="flex flex-auto flex-row-reverse">
                                  <div
                                      data-value={el}
                                      onClick={(e) => {
                                          handleClose(
                                              e.currentTarget.getAttribute(
                                                  'data-value'
                                              )
                                          );
                                      }}
                                      onKeyPress={() =>
                                          console.log('modificar')
                                      }
                                      role="button"
                                      tabIndex={0}>
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="10%"
                                          height="10%"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="feather feather-x cursor-pointer hover:text-yellow-400 rounded-full w-4 h-4 ml-2">
                                          <line
                                              x1="18"
                                              y1="6"
                                              x2="6"
                                              y2="18"></line>
                                          <line
                                              x1="6"
                                              y1="6"
                                              x2="18"
                                              y2="18"></line>
                                      </svg>
                                  </div>
                              </div>
                          </div>
                      );
                  })
                : null}

            <p className="selectorCategory">Position</p>
            <div
                className="selectorOption"
                onClick={() => handleOption('BackEnd')}
                onKeyPress={() => console.log('')}
                role="button"
                tabIndex={0}>
                BackEnd{' '}
            </div>
            <div
                className="selectorOption"
                onClick={() => handleOption('FrontEnd')}
                onKeyPress={() => console.log('')}
                role="button"
                tabIndex={0}>
                FrontEnd{' '}
            </div>

            <p className="selectorCategory">Tecnologies</p>
            {!chips.includes('FrontEnd') &&
                !chips.includes('BackEnd') &&
                [...frontTecnologies, ...backTecnologies].map((el, key) => (
                    <div
                        key={key}
                        className="selectorOption"
                        onClick={() => handleOption(el)}
                        onKeyPress={() => console.log('')}
                        role="button"
                        tabIndex={0}>
                        {el}
                    </div>
                ))}
            {chips.includes('FrontEnd') &&
                frontTecnologies.map((el, key) => (
                    <div
                        key={key}
                        className="selectorOption"
                        onClick={() => handleOption(el)}
                        onKeyPress={() => console.log('')}
                        role="button"
                        tabIndex={0}>
                        {el}
                    </div>
                ))}
            {chips.includes('BackEnd') &&
                backTecnologies.map((el, key) => (
                    <div
                        key={key}
                        className="selectorOption"
                        onClick={() => handleOption(el)}
                        onKeyPress={() => console.log('')}
                        role="button"
                        tabIndex={0}>
                        {el}
                    </div>
                ))}

            <p className="selectorCategory">Languages</p>
            {languages.map((el, key) => (
                <div
                    key={key}
                    className="selectorOption"
                    onClick={() => handleOption(el)}
                    onKeyPress={() => console.log('')}
                    role="button"
                    tabIndex={0}>
                    {el}
                </div>
            ))}
            <p className="selectorCategory">Modalidad de trabajo</p>
            {modalidad.map((el, key) => (
                <div
                    key={key}
                    className="selectorOption"
                    onClick={() => handleOption(el)}
                    onKeyPress={() => console.log('')}
                    role="button"
                    tabIndex={0}>
                    {el}
                </div>
            ))}
            <p className="selectorCategory">Genero</p>
            {gender.map((el, key) => (
                <div
                    key={key}
                    className="selectorOption"
                    onClick={() => handleOption(el)}
                    onKeyPress={() => console.log('')}
                    role="button"
                    tabIndex={0}>
                    {el}
                </div>
            ))}
            <p className="selectorCategory">Experiencia</p>
            {experience.map((el, key) => (
                <div
                    key={key}
                    className="selectorOption"
                    onClick={() => handleOption(el)}
                    onKeyPress={() => console.log('')}
                    role="button"
                    tabIndex={0}>
                    {el}
                </div>
            ))}
        </div>
    );
};

export default Selector;
