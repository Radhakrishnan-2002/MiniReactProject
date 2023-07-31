import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// function CountryCard(props) {
//   return (
//     <Card sx={{ maxWidth: 400, width: 250, height: 330 }}>
//       <CardMedia
//         component="img"
//         alt={props.name}
//         height="140"
//         image={props.flagUrl}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {props.name}
//         </Typography>
//         <Typography variant="body2">Capital: {props.capital}</Typography>
//         <Typography variant="body2">Population: {props.population}</Typography>
//       </CardContent>
//     </Card>
//   );
// }

// export default CountryCard;


function CountryCard(props) {
  return (
    <Card sx={{ maxWidth: 400, width: 250, height: 330 }}>
      <CardMedia
        component="img"
        alt={props.name}
        height="140"
        image={props.flagUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <PeopleIcon sx={{ marginRight: 4 }} />
          <Typography variant="body2">Population: {props.population}</Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <LocationOnIcon sx={{ marginRight: 4 }} />
          <Typography variant="body2">Capital: {props.capital}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default CountryCard;

