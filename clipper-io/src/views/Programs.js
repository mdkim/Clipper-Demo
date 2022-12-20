import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

import { getPrograms, apiUpdateClientOrgId } from '../io-api';

const darkTheme = extendTheme({
    palette: {
      mode: 'dark'
    }
  });

export default function ProgramsPage() {

  const [programs, setPrograms] = useState([]);
  const [unknownError, setUnknownError] = useState("");
  const [orgId, setOrgId] = useState("");

  useEffect(() => {
    loadPrograms();
    console.log("called Effect loadPrograms(), orgId=" + orgId);
    // eslint-disable-next-line
  }, [orgId]);

  // state handlers

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

  async function loadPrograms() {
    setUnknownErrorHandler(null);
    await getPrograms()
      .then((response) => {
        setPrograms(response.data.Programs);
      }).catch((err) => {
        setUnknownErrorHandler(err);
      });
  }

  function updateClientOrgId(e) {
    const sel = e.target;
    const orgId = sel.options[sel.selectedIndex].value;
    apiUpdateClientOrgId(orgId);
    setOrgId(orgId);
  }

  return (
    <CssVarsProvider theme={darkTheme}>
      <main>
        <div sx={{ pt: 1, pb: 1, pl: 6, zIndex: 1, position: 'fixed', width: '100%', backgroundColor: '#222' }}>
          <select placeholder="Program..." onChange={(e) => updateClientOrgId(e)}>
            {/* scraped 2 pages: https://github.com/search?p=2&q=omnycontent+org&type=Code */}
            {getOrgIds().map((org, i) => {
              const id_label = Object.entries(org)[0];
              return (
                <option value={id_label[0]} key={i}>
                  {getLabel(id_label[0], id_label[1])}
                </option>
              )
            })}
          </select>
          <Typography color="danger" level="body1">
            {
              !unknownError ? "" :
                <span style={{ display: 'inline-block', margin: 20 }} >
                  {unknownError}
                </span>
            }
          </Typography>
        </div>
        <div style={{ display: 'inline-block', marginTop: 48, marginBottom: 6, marginLeft: 48 }}>

        </div>
        <Sheet sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, pt: 4, pb: 4, pl: 6 }}>
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
  const permalink = "/clips/" + p.Id;
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="1">
          <img src={p.ArtworkUrl} loading="lazy" alt="Podcasts for {program.Name} from {program.Author}" />
        </AspectRatio>
      </CardOverflow>
      <Typography level="h4" sx={{ mt: 1, lineHeight: "sm" }}>
        <Link component={RouterLink} to={permalink} overlay underline="none">
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

function getLabel(orgId, orgLabel) {
  if (orgLabel) return orgLabel;
  const label = orgId.substring(0, 5) + "...-..." + orgId.substring(-5);
  return label;
}

function getOrgIds() {
  const orgIds = [
    {"aaea4e69-af51-495e-afc9-a9760146922b": "huge list of programs"},
    {"289ceca7-bef3-48af-9f74-a4ba0095cab1": "for kids"},
    {"4bb33704-615b-4054-aae9-ace500fd4197": "Indian"},
    {"8edea6b9-fca4-41a1-83ee-aa76002b9dd8": "crypto"},
    {"5dcefa8e-00a9-4595-8ce1-a4ab0080f142": ""},
    {"3aeeb75f-3358-42d4-8232-acad017ea3bd": ""},
    {"650c5084-d813-4594-aae1-a5fd007677a7": ""},
    {"796469f9-ea34-46a2-8776-ad0f015d6beb": ""},
    {"885ace83-027a-47ad-ad67-aca7002f1df8": ""},
    {"9b7dacdf-a925-4f95-84dc-ac46003451ff": ""},
    {"9c074afa-3313-47e8-b802-a9f900789975": ""},
    {"aaea4e69-af51-495e-afc9-a9760146922b": ""},
    {"acc8cc57-ff7c-44c5-9bd6-ab0900fbdc43": ""},
    {"d83f52e4-2455-47f4-982e-ab790120b954": ""},
    {"e73c998e-6e60-432f-8610-ae210140c5b1": ""},
    {"ac0be969-d7df-460c-a66c-a6f900e1ebd1": ""},
    {"42233656-1562-49af-98d5-acd100df7932": ""},
    {"5ac1e950-45c7-4eb7-87c0-aa0f018441b8": ""},
    {"8c0a4104-a688-4e57-91fd-ad7b00d5dddd": ""},
    {"58028bcf-e01f-4274-aca7-ad3300f67928": ""},
    {"9b7dacdf-a925-4f95-84dc-ac46003451ff": ""},
  ];
  return orgIds;
}