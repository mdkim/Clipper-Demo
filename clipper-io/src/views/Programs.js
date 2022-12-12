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
  const [unknownError, setUnknownError] = useState("");

  useEffect(() => {
    loadPrograms();
    console.log("called Effect getPrograms()");
    // eslint-disable-next-line
  }, []);

  // state handlers

  // state handlers for Errors
  
  const setUnknownErrorHandler = (err) => {
    let unknownError = "";
    if (err) {
      console.log(err);
      unknownError = "Unknown error";
    }
    setUnknownError(unknownError);
  }

  // event handlers

  async function loadPrograms() {
    setUnknownErrorHandler(null);
    await getPrograms()
      .then((response) => {
        setPrograms(response.data.Programs);
      }).catch((err) => {
        setUnknownErrorHandler(err);
      });
  }

  return (
    <CssVarsProvider theme={darkTheme}>
      <main>
        <Typography color="danger" level="body1">
          {unknownError}
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
  const permalink = "http://localhost:3000/clips/" + p.Id;
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="1">
          <img src={p.ArtworkUrl} loading="lazy" alt="Podcasts for {program.Name} from {program.Author}" />
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
      <Typography level="h4" sx={{ mt: 1, lineHeight: "sm" }}>
        <Link href={permalink} overlay underline="none">
          <b>{p.Name}</b>
        </Link>
      </Typography>
      <Typography level="h6" className="oneline">
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