import { useState, useEffect } from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { extendTheme } from '@mui/joy/styles';

import { getPrograms } from '../io-api';

const darkTheme = extendTheme({
    palette: {
      mode: 'dark'
    }
  });

export default function ProgramsPage() {

  const [programs, setPrograms] = useState([]);
  const [pageProps, setProps] = useState({
    unknownError: ""
  });

  useEffect(() => {
    loadPrograms();
    console.log("called Effect getPrograms()");
  }, []);

  // state handlers

  // state handlers for Errors
  
  const setUnknownError = (err) => {
    const propsCopy = Object.assign({}, pageProps);
    propsCopy.unknownError = "";
    if (err) {
      console.log(err);
      propsCopy.unknownError = "Unknown error";
    }
    setProps(propsCopy);
  }

  // event handlers

  async function loadPrograms() {
    setUnknownError(null);
    await getPrograms()
      .then((response) => {
        setPrograms(response.data.Programs);
      }).catch((err) => {
        setUnknownError(err);
      });
  }

  return (
    <CssVarsProvider theme={darkTheme}>
      <main>
        <Typography color="danger" level="body1">
          {pageProps.unknownError}
        </Typography>
        <Sheet sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, p: 6 }}>
          {programs.map((program, i) => {
            return (
              <GradientCover program={program} key={i} />
            );
          })}
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}

function GradientCover(props) {
  const p = props.program;
  const permalink = "localhost:3000/programs/" + p.Id;
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="1">
          <img src={p.ArtworkUrl} loading="lazy" alt="" />
        </AspectRatio>
        <IconButton
          aria-label="Favorite"
          size="lg"
          variant="solid"
          color="primary"
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            right: '1rem',
            bottom: 0,
            transform: 'translateY(50%)',
          }}
        >
          <FavoriteIcon color="white" />
        </IconButton>
      </CardOverflow>
      <Link href={permalink} overlay underline="none">
        <Typography level="h4" sx={{ mt: 1 }}>
          <b>{p.Name}</b>
        </Typography>
      </Link>
      <Typography level="h7" className="oneline">
        {p.Author}
      </Typography>
      <div className="description">
        <Typography level="body2" sx={{ mt: 1 }}>
          {p.Description}
        </Typography>
      </div>
    </Card>
  );
}