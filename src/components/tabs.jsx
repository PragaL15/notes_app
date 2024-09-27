import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import '../styles/BD.css';

export function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function BasicTabs() {
  const [value, setValue] = useState(0); // Controls which tab is displayed
  const [title, setTitle] = useState(''); // Note title
  const [text, setText] = useState(''); // Note text
  const [listOfNotes, setListOfNotes] = useState([
    {
      id: 1,
      title: 'Intro',
      content: 'This is Pragalya',
    },
    {
      id: 2,
      title: 'Preface',
      content: 'Know about the book',
    },
  ]);
  const [archivedNotes, setArchivedNotes] = useState([]); // Store archived notes

  // States for editing functionality
  const [editingNoteId, setEditingNoteId] = useState(null); // To track which note is being edited
  const [editedTitle, setEditedTitle] = useState(''); // To hold the edited title
  const [editedContent, setEditedContent] = useState(''); // To hold the edited content

  // Add a new note
  const addNote = (event) => {
    event.preventDefault();
    const newNote = { id: Date.now(), title, content: text };

    setListOfNotes([...listOfNotes, newNote]); // Add the new note
    setTitle(''); // Reset title input
    setText('');  // Reset text input
  };

  // Handle deleting a note
  const abort = (id) => {
    const filteredNotes = listOfNotes.filter((note) => note.id !== id);
    setListOfNotes(filteredNotes); // Update notes by removing the one clicked
  };

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle checkbox change for archiving notes
  const handleCheckboxChange = (noteId) => {
    const noteToArchive = listOfNotes.find(note => note.id === noteId); // Find the note by id
    if (noteToArchive) {
      // Move note to archive and remove from the current list
      setArchivedNotes([...archivedNotes, noteToArchive]);
      setListOfNotes(listOfNotes.filter(note => note.id !== noteId));
    }
  };

  // Handle editing a note
  const handleEditOption = (noteId) => {
    const noteToEdit = listOfNotes.find(note => note.id === noteId); // Find the note by id
    if (noteToEdit) {
      setEditingNoteId(noteId); // Set the note ID to the state
      setEditedTitle(noteToEdit.title); // Set the title to be edited
      setEditedContent(noteToEdit.content); // Set the content to be edited
    }
  };

  // Save the edited note
  const saveEditedNote = () => {
    setListOfNotes(prevNotes =>
      prevNotes.map(note => 
        note.id === editingNoteId ? { ...note, title: editedTitle, content: editedContent } : note
      )
    );
    setEditingNoteId(null); // Reset editing state
    setEditedTitle(''); // Clear title input
    setEditedContent(''); // Clear content input
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Tab Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Archive" {...a11yProps(1)} />
          <Tab label="Personal" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {/* Tab One: All Notes */}
      <CustomTabPanel value={value} index={0}>
        <div className="NotesAll">
          <div className="text">
            {/* Form to add a new note */}
            <form onSubmit={addNote}>
              <input
                value={title}
                placeholder="Title"
                onChange={(event) => setTitle(event.target.value)}
                required
              />
              <textarea
                value={text}
                placeholder="Enter your text"
                onChange={(event) => setText(event.target.value)}
                required
              />
              <button type="submit" className="button">Add Note</button>
            </form>
          </div>

          {/* Display list of notes */}
          <div className="notes-grid">
            {listOfNotes.map((note) => (
              <div className="note-item" key={note.id}>
                {editingNoteId === note.id ? (
                  <div>
                    <input
                      value={editedTitle}
                      onChange={(event) => setEditedTitle(event.target.value)}
                      required
                    />
                    <textarea
                      value={editedContent}
                      onChange={(event) => setEditedContent(event.target.value)}
                      required
                    />
                    <button onClick={saveEditedNote}>
                      <SaveAltIcon />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="notes-header">
                      <Checkbox
                        sx={{ borderRadius: 0, boxShadow: 0, width: 24, ml: 1 }}
                        onChange={() => handleCheckboxChange(note.id)} // Archive note on checkbox check
                      />
                      <button onClick={() => handleEditOption(note.id)}>
                        <EditIcon />
                      </button>
                      <button onClick={() => abort(note.id)}>x</button>
                    </div>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CustomTabPanel>

      {/* Tab Two: Archive */}
      <CustomTabPanel value={value} index={1}>
        <div className="notes-grid">
          {archivedNotes.map((note) => (
            <div className="note-item" key={note.id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </CustomTabPanel>

      {/* Tab Three: Personal */}
      <CustomTabPanel value={value} index={2}>
        <div>Personal Content</div>
      </CustomTabPanel>
    </Box>
  );
}
