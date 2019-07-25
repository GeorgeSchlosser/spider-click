
import React from "react";
import Card from '@material-ui/core/Card';
import "./row.css";
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";

const Row = card => (
    <Card
        raised={true}
        key={card.id}
        className="card"
    >
        <img
            src={`imgs/${card.image}`}
            alt={card.name}
            className="card-image"
            onClick={card.handleClick}
            id={card.id}
        />
    </Card>
)

export default Row;