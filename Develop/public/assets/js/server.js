const express = require("express");
const fs = require("fs");
const id = require('nanoid')
const path = require("path")
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../../public")));

app.get('/notes', (request, response) => response.sendFile(path.join(__dirname, "../../notes.html")));

app.get('/api/notes', (request, response) => response.sendFile(path.join(__dirname, '../../../db/db.json')));

app.post('/api/notes', (request, response) =>{
    let note = request.body
    request.body.id = id.nanoid();

    fs.readFile(path.join(__dirname, "../../../db/db.json"), (error, response)=>{
        if(error) throw error
        let allNotesInFile = JSON.parse(response)
        allNotesInFile.push(note);

        fs.writeFile(path.join(__dirname, "../../../db/db.json"), JSON.stringify(allNotesInFile), (error)=>{
            if(error) throw error
        })
    })
    response.end()
})

app.delete("/api/notes/:id", (request, response) => {

    let deleteNoteId = request.params.id;

    fs.readFile(path.join(__dirname, "../../../db/db.json"), (error, response) => {
        if (error) throw error;
        let allNotesInDbFile = JSON.parse(response);
        let newArrayWithoutDeletedNote = allNotesInDbFile.filter((allNotes) => allNotes.id !== deleteNoteId);
        fs.writeFile(path.join(__dirname, "../../../db/db.json"), JSON.stringify(newArrayWithoutDeletedNote), (error) => {
            if (error) throw error;
          })
      });
      response.end()
  });

