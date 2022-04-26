import React from 'react'
import { styled } from '@mui/system'
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

type Props = {
  markers: IMarker[]
  visible: boolean
  closeList: (val: boolean) => void
}

const AccordionRoot = styled('div')(({ theme }) => ({
  width: '100%',
}))

const ListCard: React.FC<Props> = ({ markers, visible, closeList }) => {
  const handleClose = () => {
    closeList(false)
  }
  return (
    <>
      { visible && (
        <Box sx={{ 
          width: '100%'
        }}>
          <Card variant="outlined">
            <React.Fragment>
              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
              { markers ? (
                <AccordionRoot>
                  { markers.map((item: IMarker, index: number) => {
                    let lastTime: string = ""
                   
                    return (
                      <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                          <Typography className="heading">
                            { item.title }
                            { item.address }
                            { item.location_id }
                            { item.icon }
                            
                            
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                     
                        </AccordionDetails>
                      </Accordion>
                    )}
                  )}
                </AccordionRoot>
              ) : (
                <h3>No Data</h3>
              )}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleClose}>Close</Button>
              </CardActions>
            </React.Fragment>
          </Card>
        </Box>
      )}
    </>
  )
}

export default ListCard