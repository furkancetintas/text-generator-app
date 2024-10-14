import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchText } from '../../redux/TextSlice/textsSlice';

function Text() {
  const [paragraphCount, setParagraphCount] = useState(2);
  const [textFormat, setTextFormat] = useState('text');

  const dispatch = useDispatch();
  const texts = useSelector((state) => state.text.items);
  console.log(texts);

  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchText(paragraphCount, textFormat));
  }, [dispatch, paragraphCount]);

  return (
    <div>
      <h1>Text Generator</h1>
      <input
        type="number"
        value={paragraphCount}
        onChange={(e) => setParagraphCount(e.target.value)}
        min={1}
      />
      <br />
      <select
        value={textFormat}
        onChange={(e) => setTextFormat(e.target.value)}
      >
        <option value="text">Text</option>
        <option value="html">HTML</option>
      </select>

      <br />

      <div className="row col-11 mx-auto mt-4 bottomDiv">
        <div className="col-11 my-3 mx-auto p-3">
          {status === 'loading' && <p>Yükleniyor...</p>}
          {error && status === 'failed' && <p>Error: {error}</p>}
          {texts?.map((text, i) => (
            <p key={i}>
              {textFormat === 'html' ? '<p>' + text + '</p>' : text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Text;
