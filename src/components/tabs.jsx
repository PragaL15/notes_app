import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import '../styles/BD.css'
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
  const [value, setValue] = useState(0);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [listOfNotes, setListOfNotes] = useState([
    {
      id: 1,
      title: "Intro",
      content: "This is Pragalya",
    },
    {
      id: 2,
      title: "Preface",
      content: "Know about the book",
    },
  ]);

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
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

            <button type="submit" class="button">Add Note</button>
          </form>
          </div>
          {/* Display list of notes */}
          <div className="notes-grid">
            {listOfNotes.map((note) => (
              <div className="note-item" key={note.id}>
                <div className="notes-header">
                  <button onClick={() => abort(note.id)}>x</button>
                </div>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      </CustomTabPanel>

      {/* Tab Two: Archive */}
      <CustomTabPanel value={value} index={1}>
        <div>Archive Content</div>
      </CustomTabPanel>

      {/* Tab Three: Personal */}
      <CustomTabPanel value={value} index={2}>
        <div>Personal Content</div>
      </CustomTabPanel>
    </Box>
  );
}
