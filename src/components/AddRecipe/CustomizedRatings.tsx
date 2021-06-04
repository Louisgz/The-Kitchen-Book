import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Box from '@material-ui/core/Box';

const StyledRating = withStyles({
    iconFilled: {
        color: '#3c8112',
    },
    iconHover: {
        color: '#3c8112',
    },
})(Rating);

export default function CustomizedRatings(props: any) {
    const { setDifficulty } = props;
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <StyledRating
                    name="customized-rating difficulty"
                    defaultValue={1}
                    getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    precision={1}
                    onChange={(event, newValue) => {
                        setDifficulty(newValue);
                    }}
                    icon={<WhatshotIcon fontSize="large" />}
                />
            </Box>
        </div>
    );
}