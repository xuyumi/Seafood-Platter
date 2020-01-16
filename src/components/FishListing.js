import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card,Modal, SimpleModal} from '@material-ui/core/';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function strip(html){
   var doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'relative',
    width: 750,
    height: '80%',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    padding: theme.spacing(2, 4, 3),
  },
    
  card: {
    maxWidth: 400,
    height:400
  },
    
  media: {
    height: 190,
  },
    
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default function FishListing(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <h1 id="infoTitle">{props.name}</h1>
        <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:"center"}}>
            {'"'+props.sciname+'"'}
        </Typography><br/>
      
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={2.5}>
            {props.images.length ? (props.images).map(tile => (
              <GridListTile key={tile.src}>
                <img src={tile.src} alt={tile.alt} />
              </GridListTile>
            )) : null }
          </GridList>
        </div>
      
        <h3>Physical Description</h3>
        <p id="simple-modal-description">
          {strip(props.data['Physical Description'])}
        </p>
        <h3>Habitat</h3>
        <p id="simple-modal-description">
          {!props.data['Habitat'] ? <p>N/A</p> : strip(props.data['Habitat'])}
        </p>
        <h3>Habitat Impacts</h3>
        <p id="simple-modal-description">
          {!props.data['Habitat Impacts'] ? <p>N/A</p> : strip(props.data['Habitat Impacts'])}
        </p>
        <h3>Location</h3>
        <p id="simple-modal-description">
          {!props.data['Location'] ? <p>N/A</p> : strip(props.data['Location'])}
        </p>
        <h3>Population Status</h3>
        <p id="simple-modal-description">
          {!props.data['Population Status'] ? <p>N/A</p> : strip(props.data['Population Status'])}
        </p>
        <h3>Harvest Type</h3>
        <p id="simple-modal-description">
          {!props.data['Harvest Type'] ? <p>N/A</p> : strip(props.data['Harvest Type'])}
        </p>
        <h3>Fishing Rate</h3>
        <p id="simple-modal-description">
          {!props.data['Fishing Rate'] ? <p>N/A</p> : strip(props.data['Fishing Rate'])}
        </p>
      </div>
    </Modal>


    <Card className={classes.card} style={{margin: "1vh"}} onClick={handleOpen}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.illustration}
          style={{backgroundSize: "30vh"}}
        />
        <CardContent style={{textAlign: "center"}}>
          <Typography gutterBottom variant="h5" component="h3">
                {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
                {'"'+props.sciname+'"'}
          </Typography><br/>
          <Typography variant="caption" color="textSecondary" component="p">
                {(props.availability.replace(/<\/?[^>]+(>|$)/g, "")).replace(/(&gt;)(?:&nbsp;|<br>)+(\s?&lt;)/g,'$1$2')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}