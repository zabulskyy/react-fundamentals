import React from 'react';
import * as firebase from 'firebase';

class CoursePage extends React.Component {

  setRefAuthor = (author) => {
    this.author = author;
  }

  setRefTitle = (title) => {
    this.title = title;
  }

  setRefText = (text) => {
    this.text = text;
  }

  saveCourse = () => {
    const database = firebase.database();
    const author = this.author.value;
    const title = this.title.value;
    const text = this.text.value;

    database.ref('/courses/' + title).set({
      author: author,
      title: title,
      text: text,
    })
  }

  log = () => {
    firebase.database().ref('courses').once('value').then(snapshot => {
      console.log(snapshot.val())
    })
  }

  render() {
    const {
      log,
      saveCourse,
      setRefAuthor,
      setRefTitle,
      setRefText,
    } = this;
    return (
      <div>
        <input className="form-control" type="text" id="author" ref={setRefAuthor}></input>
        <input className="form-control" type="text" id="title" ref={setRefTitle}></input>
        <input className="form-control" type="text" id="text" ref={setRefText}></input>
        <button onClick={saveCourse} type="button" id="btnSaveCourse" className='bttn bttn-primary'>Save</button>
        <button onClick={log} type="button" className='bttn bttn-primary'>Look</button>

      </div>
    );
  }
}


export default CoursePage
