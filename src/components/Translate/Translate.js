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
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  // const [gifLimit, setGifLimit] = useState(20)     // to be used for infinite scroll
  // const [gifOffset, setGifOffset] = useState(0)    // to be used for infinite scroll

  const translate = () => {
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${input}&weirdness=${weirdness}`
    setIsSearch(false)
    setIsLoading(true)
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setIsError(true)
          setIsLoading(false)
        }
        return response.json()
      })
      .then((data) => {
        setResult(data.data.images.original.url)
        setMessage('')
        setInput('')
        setWeirdness('')
        setInputSearch('')
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
        setIsError(false)
        setMessage('Sorry, something went wrong! Please try again.')
      })
  }

  const search = () => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${inputSearch}&limit=20&offset=0&rating=g&lang=en`
    setIsSearch(true)
    setIsLoading(true)
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setIsError(true)
          setIsLoading(false)
        }
        return response.json()
      })
      .then((data) => {
        const gifs = data.data.map((gif) => gif.images.original.url)
        setSearchResult(gifs)
        setMessage('')
        setInput('')
        setWeirdness('')
        setInputSearch('')
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
        setIsError(false)
        setMessage('Sorry, something went wrong! Please try again.')
      })
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const handleSearch = (e) => {
    setInputSearch(e.target.value)
  }
  const weirdnessValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const handleWeirdness = (e) => {
    setWeirdness(e.target.value)
  }

  //-------Infinite scroll incomplete: below code I put together after searching online------
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
        <Typography variant='h3' color='secondary' mt='20px' gutterBottom>
          Welcome to GIPHY Translate
        </Typography>
        <TextField
          variant='outlined'
          label='Enter your phrase'
          size='small'
          color='secondary'
          value={input}
          onChange={handleChange}
        />
        <Box display='inline' ml='10px'>
          <FormControl size='small' sx={{ minWidth: 120 }}>
            <InputLabel color='secondary'>Weirdness</InputLabel>
            <Select
              label='Weirdness'
              value={weirdness}
              color='secondary'
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
        <Button
          variant='contained'
          color='secondary'
          size='large'
          sx={{ height: '40px', ml: '10px' }}
          onClick={translate}
        >
          Translate
        </Button>

        <br />
        <Box mt='30px'>
          <TextField
            label='Search here'
            size='small'
            value={inputSearch}
            onChange={handleSearch}
          ></TextField>
          <Button
            variant='contained'
            color='secondary'
            size='large'
            sx={{ height: '40px', ml: '10px' }}
            onClick={search}
          >
            Search
          </Button>
        </Box>
        <br />

        {isLoading && <Typography>Loading...</Typography>}
        {isError && (
          <Typography>
            Sorry, something went wrong! Please try again.
          </Typography>
        )}

        {message ? (
          <Typography mt='20px'>{message}</Typography>
        ) : isSearch ? (
          searchResult && (
            <List
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // overflow: 'scroll',      // to be used for infinite scroll
                // maxHeight: '400px',      // to be used for infinite scroll
              }}
              // onScroll={handleScroll}    // to be used for infinite scroll
            >
              {searchResult.map((gif, index) => (
                <Box
                  key={index}
                  component='img'
                  src={gif}
                  alt={`${gif} GIF`}
                  display='block'
                  mt='20px'
                />
              ))}
            </List>
          )
        ) : (
          result && (
            <Box component='img' src={result} alt={`${result} GIF`} mt='20px' />
          )
        )}
      </Container>
    </>
  )
}
export default Translate
