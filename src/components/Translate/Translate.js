import {
  Button,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { Box, Container } from '@mui/system'
import { useState } from 'react'

const GIPHY_API_KEY = process.env.REACT_APP_GIPHY_API_KEY

const Translate = () => {
  const [result, setResult] = useState('')
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')
  const [weirdness, setWeirdness] = useState('')
  const [searchResult, setSearchResult] = useState('')
  const [inputSearch, setInputSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  // const [gifLimit, setGifLimit] = useState(20)     // to be used for infinte scroll
  // const [gifOffset, setGifOffset] = useState(0)    // to be used for infinte scroll

  const translate = () => {
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${input}&weirdness=${weirdness}`
    setIsSearch(false)
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResult(data.data.images.original.url)
        setMessage('')
      })
      .catch(() => setMessage('Sorry, something went wrong! Please try again.'))
    // clearInputs()
  }

  const search = () => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${inputSearch}&limit=20&offset=0&rating=g&lang=en`
    setIsSearch(true)
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const gifs = data.data.map((gif) => gif.images.original.url)
        setSearchResult(gifs)
        setMessage('')
      })
      .catch(() => setMessage('Sorry, something went wrong! Please try again.'))
    // clearInputs()
  }

  // ------------Unable to clear inputs------------
  // const clearInputs = () => {
  //   setInput('')
  //   setInputSearch('')
  //   setWeirdness('')
  // }

  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const handleSearch = (e) => {
    setInputSearch(e.target.value)
  }
  const weirdnessValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const handleWeirdness = (e) => {
    setWeirdness(e.target.value)
    translate()
  }

  //-------Infinte scroll incomplete: below code I put together after searching online------
  // const handleScroll = (e) => {
  //   const { scrollTop, clientHeight, scrollHeight } = e.target
  //   if (scrollTop + clientHeight >= scrollHeight - 100) {
  //     setGifLimit((prevLimit) => prevLimit + 20)
  //     setGifOffset((prevOffset) => prevOffset + 20)
  //     console.log('bottom of page')
  //   }
  // }

  return (
    <>
      <Container sx={{ textAlign: 'center' }}>
        <Typography variant="h3" color="secondary" mt="20px" gutterBottom>
          Welcome to GIPHY Translate
        </Typography>
        <TextField
          variant="outlined"
          label="Enter your phrase"
          size="small"
          color="secondary"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ height: '40px', ml: '10px' }}
          onClick={translate}
        >
          Translate
        </Button>
        <Box display="inline" ml="100px">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel color="secondary">Weirdness</InputLabel>
            <Select
              label="Weirdness"
              value={weirdness}
              color="secondary"
              onChange={handleWeirdness}
            >
              {weirdnessValues.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <br />
        <Box mt="30px">
          <TextField
            label="Search here"
            size="small"
            onChange={handleSearch}
          ></TextField>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ height: '40px', ml: '10px' }}
            onClick={search}
          >
            Search
          </Button>
        </Box>
        <br />

        {message ? (
          <Typography mt="20px">{message}</Typography>
        ) : isSearch ? (
          searchResult && (
            <List
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // overflow: 'scroll',      // to be used for infinte scroll
                // maxHeight: '400px',      // to be used for infinte scroll
              }}
              // onScroll={handleScroll}    // to be used for infinte scroll
            >
              {searchResult.map((gif, index) => (
                <Box
                  key={index}
                  component="img"
                  src={gif}
                  alt={`${gif} GIF`}
                  display="block"
                  mt="20px"
                />
              ))}
            </List>
          )
        ) : (
          result && (
            <Box component="img" src={result} alt={`${result} GIF`} mt="20px" />
          )
        )}
      </Container>
    </>
  )
}
export default Translate
