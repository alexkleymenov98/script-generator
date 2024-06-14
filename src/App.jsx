import * as Styled from './App.styled.js';
import { useState } from 'react';
import { defaultDataForGenerate } from './constants.js';

import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { sql } from '@codemirror/lang-sql';
import { javascript } from '@codemirror/lang-javascript';

function App() {
  const [data, setData] = useState([0]);
  const [values, setValues] = useState({
    0: defaultDataForGenerate,
  });

  const [result, setResult] = useState('');

  const [error, setError] = useState('');

  const onAddNewTemplate = (index) => {
    setValues((values) => ({ ...values, [index + 1]: defaultDataForGenerate }));
    setData((data) => [...data, index + 1]);
  };

  const onRemoveTemplate = (index) => {
    setData((data) => [...data.filter((num) => index !== num)]);
  };

  const onChangeTemplate = (template, code) => {
    setValues((values) => {
      const current = values[code];
      return {
        ...values,
        [code]: {
          ...current,
          template,
        },
      };
    });
  };

  const onChangeParameters = (parameters, code) => {
    setValues((values) => {
      const current = values[code];
      return {
        ...values,
        [code]: {
          ...current,
          parameters,
        },
      };
    });
  };

  const formatterJSON = (key) => {
    const parameters = values[key].parameters;

    try {
      const newParameters = JSON.stringify(JSON.parse(parameters), null, 2);
      onChangeParameters(newParameters, key);
    } catch (e) {
      alert(e.message);
    }
  };

  const onSubmit = () => {
    try {
      setError('');
      setResult('');
      const sendData = data.reduce(
        (acc, current) => {
          const template = values[current].template;
          const accTemplate = acc?.template ?? '';

          return {
            template: accTemplate + ' ' + template,
            parameters: {
              ...acc.parameters,
              ...JSON.parse(values[current].parameters),
            },
          };
        },
        {
          template: '',
          parameters: {},
        }
      );

      fetch('/api/expandTemplate', {
        method: 'POST',
        body: JSON.stringify(sendData),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((data) => {
          if (data.ok) {
            return data.text();
          }

          throw Error(`${data.statusText}`);
        })
        .then((result) => {
          setResult(result);
        })
        .catch((e) => {
          setError(e.message);
        });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Styled.Container>
      <Styled.Title>Добавить новый скрипт</Styled.Title>
      <Styled.BlockWithTemplate>
        {data.map((key, index) => (
          <Styled.ScriptBlock key={key}>
            <Styled.BlockCodes>
              <Styled.ScriptTitle>Шаблон</Styled.ScriptTitle>
              <CodeMirror
                value={values[key].template}
                extensions={[javascript({})]}
                onChange={(value) => onChangeTemplate(value, key)}
              />

              <Styled.CodeBlockHeader>
                <Styled.ScriptTitle>Параметры</Styled.ScriptTitle>
                <Styled.CodeNavBlock>
                  <Styled.ButtonCode onClick={() => formatterJSON(key)}>
                    Форматировать
                  </Styled.ButtonCode>
                </Styled.CodeNavBlock>
              </Styled.CodeBlockHeader>
              <CodeMirror
                indentWithTab
                value={values[key].parameters}
                extensions={[json()]}
                onChange={(value) => onChangeParameters(value, key)}
              />
            </Styled.BlockCodes>
            <Styled.BlockSettings>
              {index === data.length - 1 && (
                <Styled.SettingBtn onClick={() => onAddNewTemplate(key)}>+</Styled.SettingBtn>
              )}
              <Styled.SettingBtn onClick={() => onRemoveTemplate(key)}>-</Styled.SettingBtn>
            </Styled.BlockSettings>
          </Styled.ScriptBlock>
        ))}
        <hr />
        <Styled.Button onClick={onSubmit}>Сгенерировать</Styled.Button>
        {!!error && <Styled.ErrorText>{error}</Styled.ErrorText>}
        <CodeMirror value={result} extensions={[sql()]} readOnly />
      </Styled.BlockWithTemplate>
    </Styled.Container>
  );
}

export default App;
