import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import { extendTheme } from '@mui/joy/styles';

import Drawer from '@mui/material/Drawer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deepmerge } from '@mui/utils';
import {
  experimental_extendTheme as extendMuiTheme,
} from '@mui/material/styles';

import { getClips } from '../io-api';

const darkTheme = extendTheme({
    palette: {
      mode: 'dark'
    }
  });
const theme = deepmerge(darkTheme, extendMuiTheme());

export default function ClipsPage() {

  const [clips, setClips] = useState([]);
  const [program, setProgram] = useState({});
  const [playerUrl, setPlayerUrl] = useState("");
  const [isPlayerOpen, setPlayerOpen] = useState(false);
  const [unknownError, setUnknownError] = useState("");
  const [pageProps] = useState({
    programId: useLocation().pathname.split("/")[2]
  });

  useEffect(() => {
    loadClips();
    console.log("called Effect loadClips()");
    console.log("in useEffect(): playerUrl=" + playerUrl + ", isPlayerOpen=" + isPlayerOpen);
    // eslint-disable-next-line
  }, [isPlayerOpen, playerUrl]);

  // state handlers

  function openPlayer(playerUrl) {
    setPlayerUrl(playerUrl);
    setPlayerOpen(true);
    console.log("calling openPlayer(" + playerUrl + ")");
  }

  function closePlayer() {
    setPlayerUrl("");
    setPlayerOpen(false);
    console.log("calling closePlayer()");
  }

  // state handlers for Errors
  
  const setUnknownErrorHandler = (err) => {
    let unknownError = "";
    if (err) {
      console.log("err=" + err);
      unknownError = "Unknown error";
    }
    setUnknownError(unknownError);
  }

  // event handlers

  async function loadClips() {
    if (!pageProps.programId) return;
    setUnknownErrorHandler(null);
    await getClips(pageProps.programId)
      .then((res) => {
        setClips(res.Clips);
        setProgram(res.Program);
      }).catch((err) => {
        setUnknownErrorHandler(err);
      });
  }

  return (
    <CssVarsProvider theme={theme}>
      <main>
        <Typography color="danger" level="body1">
          {unknownError}
        </Typography>
        <Sheet>
          <Player
            fn={closePlayer} playerUrl={playerUrl}
            isPlayerOpen={isPlayerOpen} title=""
          />
        </Sheet>
        <Sheet sx={{ display: 'flex', flexWrap: 'wrap', pt: 6, pl: 6 }}>
          <img src={program.ArtworkUrl} className="programArtwork"
            alt="Podcasts for {program.Name} from {program.Author}"
          />
          <div>
            <Typography level="h4">
              {program.Name}
            </Typography>
            <Typography level="h7">
              {program.Author}
            </Typography>
          </div>
        </Sheet>
        <Sheet sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, p: 6 }}>
          {clips.map((clip, i) => {
            return (
              <GradientCover fn={openPlayer} clip={clip} key={i} />
            );
          })}
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}

function Player({ fn, playerUrl, isPlayerOpen, title }) {
  const closePlayer = () => fn();
  console.log("in Player: playerUrl=" + playerUrl + ", isPlayerOpen=" + isPlayerOpen);
  return (
    <Drawer open={isPlayerOpen} anchor="top" onClose={() => closePlayer()}>
      {
        !playerUrl ?
          <div>Loading...</div> :
          <iframe src={playerUrl} title={title} allow="autoplay" sandbox="allow-scripts"></iframe>
      }
    </Drawer>
  );
}

function GradientCover({ fn, clip}) {
  const openPlayer = (playerUrl) => {
     fn(playerUrl);
  };

  const c = clip;
  const date = new Date(Date.parse(c.PublishedUtc)).toDateString();
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="1">
          <img src={c.ImageUrl} loading="lazy" alt="Podcast {c.Title} published {date}" />
        </AspectRatio>
        <IconButton
          size="lg" color="primary" variant="solid" aria-label="Favorite"
          sx={{
            position: 'absolute', transform: 'translateY(50%)',
            right: '1rem', bottom: 0, borderRadius: '50%'
          }}
        >
          <FavoriteIcon color="white" />
        </IconButton>
      </CardOverflow>
      <Typography level="body1" sx={{ lineHeight: "sm", mt: 1 }}>
        <Link component="button" overlay
          onClick={() => openPlayer(c.EmbedUrl)}
          underline="none" textAlign="left"
        >
            <b>{c.Title}</b>
        </Link>
      </Typography>
      <Typography level="h7" display="flex" justifyContent="flex-end">
        {date}
      </Typography>
      <div className="description">
        <Typography level="body2" sx={{ mt: 1 }}>
          {c.Description}
        </Typography>
      </div>
    </Card>
  );
}
