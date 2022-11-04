import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import { Alert, AlertTitle, List, ListItem, ListItemText, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from "@mui/material";
import { useState } from 'react';
import agent from '../../App/api/agent';

export default function Aboutpage() {
    const actions = [
        { icon: <FileCopyIcon />, name: '400' },
        { icon: <SaveIcon />, name: '401' },
        { icon: <PrintIcon />, name: '404' },
        { icon: <ShareIcon />, name: '500' },
        { icon: <ShareIcon />, name: 'validationerror' }
    ];

    const [validationerrors, setvalidationerrors] = useState<string[]>([])
    function getvalidationerrors() {
        agent.testerrors.getvalidationerror()
            .then(() => console.log())
            .catch(error => setvalidationerrors(error)
            )
    }
    return (
        <>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                <SpeedDialAction
                    key={actions[0].name}
                    icon={actions[0].icon}
                    tooltipTitle={actions[0].name}
                    onClick={() => agent.testerrors.get400error().catch(error => console.log(error))}
                /> <SpeedDialAction
                    key={actions[1].name}
                    icon={actions[1].icon}
                    tooltipTitle={actions[1].name}
                    onClick={() => agent.testerrors.get401error().catch(error => console.log(error))}
                /> <SpeedDialAction
                    key={actions[2].name}
                    icon={actions[2].icon}
                    tooltipTitle={actions[2].name}
                    onClick={() => agent.testerrors.get404error().catch(error => console.log(error))}
                /> <SpeedDialAction
                    key={actions[3].name}
                    icon={actions[3].icon}
                    tooltipTitle={actions[3].name}
                    onClick={() => agent.testerrors.get500error().catch(error => console.log(error))}
                /> <SpeedDialAction
                    key={actions[4].name}
                    icon={actions[4].icon}
                    tooltipTitle={actions[4].name}
                    onClick={getvalidationerrors}
                />

            </SpeedDial>

            <Typography sx={{ mt: 20 }} variant="h6" component="h6" color='black' >
                This is About page
            </Typography>
            {validationerrors.length > 0 &&
                <Alert severity='error'>
                    <AlertTitle>ValidationErrors</AlertTitle>
                    <List>
                        {validationerrors.map(error =>
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>)}
                    </List>
                </Alert>
            }
        </>
    )
}