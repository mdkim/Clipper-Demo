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
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { deepmerge } from '@mui/utils';
import {
  experimental_extendTheme as extendMuiTheme,
} from '@mui/material/styles';

import { getClips, getFavorites, updateFavorite, getClip } from '../io-api';
// eslint-disable-next-line
import { get500 } from '../io-api';

const darkTheme = extendTheme({
    palette: {
      mode: 'dark'
    }
  });
const theme = deepmerge(darkTheme, extendMuiTheme());

export default function ClipsPage() {

  const [clips, setClips] = useState([]);
  const [faves, setFaves] = useState({});
  const [program, setProgram] = useState({});
  const [playerUrl, setPlayerUrl] = useState("");
  const [isPlayerOpen, setPlayerOpen] = useState(false);
  const [unknownError, setUnknownError] = useState("");
  const [pageProps] = useState({
    programId: useLocation().pathname.split("/")[2] ?? "favorites"
  });

  useEffect(() => {
    loadFaves();
    console.log("called Effect loadFaves()");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadClips();
    console.log("called Effect loadClips()");
    // eslint-disable-next-line
  }, [faves]);

  // state handlers

  function openPlayer(playerUrl) {
    setPlayerUrl(playerUrl);
    setPlayerOpen(true);
  }

  function closePlayer() {
    setPlayerUrl("");
    setPlayerOpen(false);
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
    // uri = /favorites
    if (pageProps.programId === "favorites") {
      let result = [];
      for (const clipId in faves) {
        await getClip(clipId)
          .then((res) => {
            result.push(res.data);
          }).catch((err) => {
            setUnknownErrorHandler(err);
          });
      }
      setClips(result);
      return result;
    }
    // uri = /clips/${clipId}
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

  async function loadFaves() {
    if (!pageProps.programId
      && pageProps.programId !== "favorites") {
        console.log("exiting loadFaves(), pageProps.programId=" + pageProps.programId);
        return;
    }

    setUnknownErrorHandler(null);
    await getFavorites()
      .then((res) => {
        setFaves(res.data);
      }).catch((err) => {
        setUnknownErrorHandler(err);
      });
  }

  async function toggleFavorite(clipId) {
    setUnknownErrorHandler(null);
    let isCurrFavorite = faves[clipId];
    if (!isCurrFavorite) isCurrFavorite = false;
    console.log("isCurrFavorite=" + isCurrFavorite);
    await updateFavorite(clipId, !isCurrFavorite)
      .then((res) => { // not accurate in case of deleting nonexistent record
        const favesCopy = Object.assign({}, faves);
        favesCopy[clipId] = !isCurrFavorite; // use passed in value instead
        setFaves(favesCopy);
      }).catch((err) => {
        setUnknownErrorHandler(err);
      });
  }

  function isFavorite(clipId) {
    if (!faves[clipId]) return false;
    return true;
  }

  return (
    <CssVarsProvider theme={theme}>
      <main>
        <Typography color="danger" level="body1">
          {
            !unknownError ? "" :
              <span style={{ display: 'inline-block', margin: 20 }} >
                {unknownError}
              </span>
          }
        </Typography>
        <Sheet>
          <Player
            fnClosePlayer={closePlayer} playerUrl={playerUrl}
            isPlayerOpen={isPlayerOpen} title=""
          />
        </Sheet>
        <Sheet sx={{ display: 'flex', flexWrap: 'wrap', pt: 2, pl: 6 }}>
          <img src={program.ArtworkUrl ?? "/pixel.gif"} className="programArtwork"
            alt="Podcasts for {program.Name} from {program.Author}"
          />
          <div>
            <Typography level="h4">
              {program.Name ?? "Favorites"}
            </Typography>
            <Typography level="h7">
              {program.Author}
            </Typography>
          </div>
        </Sheet>
        <Sheet sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, pt: 4, pl: 6 }}>
          {clips.map((clip, i) => {
            return (
              <GradientCover key={i} clip={clip}
                fnOpenPlayer={openPlayer}
                fnToggleFavorite={toggleFavorite}
                isFavorite={isFavorite(clip.Id)}
              />
            );
          })}
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}

function Player({ fnClosePlayer, playerUrl, isPlayerOpen, title }) {
  return (
    <Drawer open={isPlayerOpen} anchor="top" onClose={() => fnClosePlayer()}>
      {
        !playerUrl ?
          <div>Loading...</div> :
          <iframe src={playerUrl} title={title} allow="autoplay" sandbox="allow-scripts"></iframe>
      }
    </Drawer>
  );
}

function GradientCover({ fnOpenPlayer, fnToggleFavorite, clip, isFavorite }) {
  const c = clip;
  const date = new Date(Date.parse(c.PublishedUtc)).toDateString();
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="1">
          <img src={c.ImageUrl} loading="lazy" alt="Podcast {c.Title} published {date}" />
        </AspectRatio>
        <IconButton
          size="lg"
          variant="solid"
          color="primary"
          aria-label="Toggle favorite"
          sx={{
            position: 'absolute',
            zIndex: 200,
            borderRadius: '50%',
            right: '1rem',
            bottom: 0,
            transform: 'translateY(50%)',
            backgroundColor: '#054DA7'
          }}
          onClick={() => fnToggleFavorite(c.Id)}
        >
          {
            isFavorite ?
              <FavoriteIcon /> :
              <FavoriteBorder />
          }
        </IconButton>
      </CardOverflow>
      <Typography level="body1" sx={{ lineHeight: "sm", mt: 1 }}>
        <Link component="button" overlay
          onClick={() => fnOpenPlayer(c.EmbedUrl)}
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
