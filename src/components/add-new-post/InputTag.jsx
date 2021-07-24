import React, { useState, useContext } from 'react'
import './InputTag.css'

import { ArticleContext } from '../../Contexts/articleContext';




const InputTag = () => {
  const { state, dispatch } = useContext(ArticleContext)

  
  const [focused, setFocused] = useState(false)

  const removeTag = (i) => {
    const newTags = [ ...state.tags ];
    newTags.splice(i, 1);
    dispatch({ payload : { tags : newTags } })
  }


  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      if (state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      dispatch({ payload : { tags : [...state.tags, val] } })
      e.target.value = ""
    } else if (e.key === 'Backspace' && !val) {
      removeTag(state.tags.length - 1);
    }
  }





  return (
    <div className={focused ? "input-tag focused" : "input-tag"} dir="rtl" lang="ar" >
      <ul className="input-tag__tags">
        { state.tags.map((tag, i) => (
          <li key={tag}>
            {tag}
            <button type="button" onClick={() => { removeTag(i); }}>+</button>
          </li>
        ))}
        <li className="input-tag__tags__input"><input onBlur={() => setFocused(false)} onFocus={() => setFocused(true)} type="text" placeholder="أييييييييي" onKeyDown={inputKeyDown}  /></li>
      </ul>
    </div>
  );

}


/*


class InputTag extends React.Component {
  constructor() {
    super();
    
    this.state = {
      focused : false,
      tags: [
        'Tags',
        'Input'
      ]
    };
  }
  
  removeTag = (i) => {
    const newTags = [ ...this.state.tags ];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
  }

  inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      this.setState({ tags: [...this.state.tags, val]});
      this.tagInput.vaInputTaglue = null;
      e.target.value = ""
    } else if (e.key === 'Backspace' && !val) {
      this.removeTag(this.state.tags.length - 1);
    }
  }


  render() {
    const { tags } = this.state;

    return (
      <div className={this.state.focused ? "input-tag focused" : "input-tag"} dir="rtl" lang="ar" >
        <ul className="input-tag__tags">
          { tags.map((tag, i) => (
            <li key={tag}>
              {tag}
              <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
            </li>
          ))}
          <li className="input-tag__tags__input"><input onBlur={() => this.state.focused = false} onFocus={() => this.state.focused = true} type="text" placeholder="أييييييييي" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
        </ul>
      </div>
    );
  }
}*/

export default InputTag